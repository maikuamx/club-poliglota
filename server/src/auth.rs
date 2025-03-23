use crate::error::ApiError;
use crate::models::{User, UserRole};
use bcrypt::{hash, verify, DEFAULT_COST};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use rocket::http::Status;
use rocket::request::{FromRequest, Outcome, Request};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub role: UserRole,
    pub exp: usize,
}

pub struct AuthenticatedUser {
    pub user_id: String,
    pub role: UserRole,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for AuthenticatedUser {
    type Error = ApiError;

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        let token = match request.headers().get_one("Authorization") {
            Some(token) => token.replace("Bearer ", ""),
            None => {
                return Outcome::Failure((
                    Status::Unauthorized,
                    ApiError::Unauthorized("No token provided".into()),
                ))
            }
        };

        match validate_token(&token) {
            Ok(claims) => Outcome::Success(AuthenticatedUser {
                user_id: claims.sub,
                role: claims.role,
            }),
            Err(e) => Outcome::Failure((Status::Unauthorized, e)),
        }
    }
}

pub fn hash_password(password: &str) -> Result<String, ApiError> {
    hash(password.as_bytes(), DEFAULT_COST).map_err(|_| ApiError::Internal("Failed to hash password".into()))
}

pub fn verify_password(password: &str, hash: &str) -> Result<bool, ApiError> {
    verify(password.as_bytes(), hash).map_err(|_| ApiError::Internal("Failed to verify password".into()))
}

pub fn create_token(user: &User) -> Result<String, ApiError> {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    let expiration = chrono::Utc::now()
        .checked_add_signed(chrono::Duration::hours(24))
        .expect("valid timestamp")
        .timestamp() as usize;

    let claims = Claims {
        sub: user.id.to_string(),
        role: user.role.clone(),
        exp: expiration,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .map_err(|_| ApiError::Internal("Failed to create token".into()))
}

pub fn validate_token(token: &str) -> Result<Claims, ApiError> {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");

    decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::default(),
    )
    .map(|data| data.claims)
    .map_err(|_| ApiError::Unauthorized("Invalid token".into()))
}