use crate::auth::AuthenticatedUser;
use crate::db::DbPool;
use crate::error::ApiError;
use crate::models::{User, UserResponse};
use rocket::serde::json::Json;
use uuid::Uuid;

#[get("/users/profile")]
pub async fn get_profile(
    db: &rocket::State<DbPool>,
    auth: AuthenticatedUser,
) -> Result<Json<UserResponse>, ApiError> {
    let user_id = Uuid::parse_str(&auth.user_id)
        .map_err(|_| ApiError::Internal("Invalid user ID".into()))?;

    let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE id = $1")
        .bind(user_id)
        .fetch_optional(&**db)
        .await
        .map_err(|_| ApiError::Internal("Database error".into()))?
        .ok_or_else(|| ApiError::NotFound("User not found".into()))?;

    Ok(Json(UserResponse {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    }))
}

#[patch("/users/profile", format = "json", data = "<update>")]
pub async fn update_profile(
    db: &rocket::State<DbPool>,
    auth: AuthenticatedUser,
    update: Json<UserResponse>,
) -> Result<Json<UserResponse>, ApiError> {
    let user_id = Uuid::parse_str(&auth.user_id)
        .map_err(|_| ApiError::Internal("Invalid user ID".into()))?;

    let user = sqlx::query_as::<_, User>(
        "UPDATE users SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
    )
    .bind(&update.name)
    .bind(user_id)
    .fetch_one(&**db)
    .await
    .map_err(|_| ApiError::Internal("Failed to update profile".into()))?;

    Ok(Json(UserResponse {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    }))
}