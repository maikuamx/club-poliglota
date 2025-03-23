use crate::auth::{create_token, hash_password, verify_password};
use crate::db::DbPool;
use crate::error::ApiError;
use crate::models::{AuthResponse, LoginRequest, RegisterRequest, User, UserResponse};
use rocket::serde::json::Json;
use uuid::Uuid;

#[post("/auth/login", format = "json", data = "<login>")]
pub async fn login(
    db: &rocket::State<DbPool>,
    login: Json<LoginRequest>,
) -> Result<Json<AuthResponse>, ApiError> {
    let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE email = $1")
        .bind(&login.email)
        .fetch_optional(&**db)
        .await
        .map_err(|_| ApiError::Internal("Database error".into()))?
        .ok_or_else(|| ApiError::Unauthorized("Invalid credentials".into()))?;

    if !verify_password(&login.password, &user.password_hash)? {
        return Err(ApiError::Unauthorized("Invalid credentials".into()));
    }

    let token = create_token(&user)?;
    Ok(Json(AuthResponse {
        token,
        user: UserResponse {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
    }))
}

#[post("/auth/register", format = "json", data = "<register>")]
pub async fn register(
    db: &rocket::State<DbPool>,
    register: Json<RegisterRequest>,
) -> Result<Json<AuthResponse>, ApiError> {
    let password_hash = hash_password(&register.password)?;
    let user_id = Uuid::new_v4();

    let user = sqlx::query_as::<_, User>(
        "INSERT INTO users (id, email, password_hash, name, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    )
    .bind(user_id)
    .bind(&register.email)
    .bind(&password_hash)
    .bind(&register.name)
    .bind(&register.role)
    .fetch_one(&**db)
    .await
    .map_err(|_| ApiError::Internal("Failed to create user".into()))?;

    let token = create_token(&user)?;
    Ok(Json(AuthResponse {
        token,
        user: UserResponse {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
    }))
}