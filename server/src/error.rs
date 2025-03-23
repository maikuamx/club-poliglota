use rocket::http::Status;
use rocket::response::status;
use rocket::serde::json::Json;
use serde::Serialize;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ApiError {
    #[error("Internal server error: {0}")]
    Internal(String),
    
    #[error("Not found: {0}")]
    NotFound(String),
    
    #[error("Unauthorized: {0}")]
    Unauthorized(String),
    
    #[error("Bad request: {0}")]
    BadRequest(String),
    
    #[error("Forbidden: {0}")]
    Forbidden(String),
}

#[derive(Serialize)]
pub struct ErrorResponse {
    pub error: String,
}

impl From<ApiError> for status::Custom<Json<ErrorResponse>> {
    fn from(error: ApiError) -> Self {
        let status = match error {
            ApiError::Internal(_) => Status::InternalServerError,
            ApiError::NotFound(_) => Status::NotFound,
            ApiError::Unauthorized(_) => Status::Unauthorized,
            ApiError::BadRequest(_) => Status::BadRequest,
            ApiError::Forbidden(_) => Status::Forbidden,
        };

        status::Custom(
            status,
            Json(ErrorResponse {
                error: error.to_string(),
            }),
        )
    }
}