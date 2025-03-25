from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
import os
from dotenv import load_dotenv
import httpx
from functools import wraps
import bcrypt
import secrets

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
if not os.getenv('JWT_SECRET_KEY'):
    # Generate a secure random key if not set
    os.environ['JWT_SECRET_KEY'] = secrets.token_hex(32)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize JWT
jwt = JWTManager(app)

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_KEY')
SUPABASE_ANON_KEY = os.getenv('SUPABASE_ANON_KEY')

if not all([SUPABASE_URL, SUPABASE_KEY, SUPABASE_ANON_KEY]):
    raise ValueError("Missing Supabase environment variables")

# Supabase client helper
def supabase_client():
    return httpx.Client(
        base_url=SUPABASE_URL,
        headers={
            'apikey': SUPABASE_KEY,
            'Authorization': f'Bearer {SUPABASE_KEY}'
        }
    )

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        current_user_id = get_jwt_identity()
        with supabase_client() as client:
            response = client.get(f'/rest/v1/users?id=eq.{current_user_id}&select=role')
            if response.status_code != 200:
                return jsonify({'error': 'Failed to verify user role'}), 500
            
            user = response.json()[0]
            if user['role'] != 'teacher':
                return jsonify({'error': 'Admin access required'}), 403
        
        return fn(*args, **kwargs)
    return wrapper

@app.route('/api/config', methods=['GET'])
def get_config():
    return jsonify({
        'VITE_SUPABASE_URL': SUPABASE_URL,
        'VITE_SUPABASE_ANON_KEY': SUPABASE_ANON_KEY
    })

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    with supabase_client() as client:
        # Get user from database
        response = client.get(
            '/rest/v1/users',
            params={
                'email': f'eq.{email}',
                'select': '*'
            }
        )
        
        if response.status_code != 200:
            return jsonify({'error': 'Failed to fetch user'}), 500
        
        users = response.json()
        if not users:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        user = users[0]
        stored_hash = user['password_hash'].replace('$2a$', '$2b$')
        
        # Verify password using bcrypt
        if not bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Create JWT token
        access_token = create_access_token(identity=user['id'])
        
        return jsonify({
            'token': access_token,
            'user': {
                'id': user['id'],
                'email': user['email'],
                'name': user['name'],
                'role': user['role']
            }
        })

@app.route('/api/auth/verify', methods=['GET'])
@jwt_required()
def verify_token():
    current_user_id = get_jwt_identity()
    
    with supabase_client() as client:
        response = client.get(
            '/rest/v1/users',
            params={
                'id': f'eq.{current_user_id}',
                'select': '*'
            }
        )
        
        if response.status_code != 200:
            return jsonify({'error': 'Failed to fetch user'}), 500
        
        users = response.json()
        if not users:
            return jsonify({'error': 'User not found'}), 404
        
        user = users[0]
        return jsonify({
            'id': user['id'],
            'email': user['email'],
            'name': user['name'],
            'role': user['role']
        })

@app.route('/api/courses', methods=['GET'])
def get_courses():
    with supabase_client() as client:
        response = client.get('/rest/v1/courses?select=*')
        if response.status_code != 200:
            return jsonify({'error': 'Failed to fetch courses'}), 500
        
        return jsonify(response.json())

@app.route('/api/courses', methods=['POST'])
@jwt_required()
@admin_required
def create_course():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    with supabase_client() as client:
        response = client.post(
            '/rest/v1/courses',
            json={
                'title': data['title'],
                'description': data['description'],
                'language': data['language'],
                'level': data['level'],
                'teacher_id': current_user_id
            }
        )
        
        if response.status_code != 201:
            return jsonify({'error': 'Failed to create course'}), 500
        
        return jsonify(response.json()), 201

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 0))
    app.run(host='0.0.0.0', port=port)