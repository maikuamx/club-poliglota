use crate::auth::AuthenticatedUser;
use crate::db::DbPool;
use crate::error::ApiError;
use crate::models::{Course, CreateCourseRequest, UserRole};
use rocket::serde::json::Json;
use uuid::Uuid;

#[get("/courses")]
pub async fn get_courses(db: &rocket::State<DbPool>) -> Result<Json<Vec<Course>>, ApiError> {
    let courses = sqlx::query_as::<_, Course>("SELECT * FROM courses ORDER BY created_at DESC")
        .fetch_all(&**db)
        .await
        .map_err(|_| ApiError::Internal("Failed to fetch courses".into()))?;

    Ok(Json(courses))
}

#[get("/courses/<course_id>")]
pub async fn get_course(
    db: &rocket::State<DbPool>,
    course_id: String,
) -> Result<Json<Course>, ApiError> {
    let course_uuid = Uuid::parse_str(&course_id)
        .map_err(|_| ApiError::BadRequest("Invalid course ID".into()))?;

    let course = sqlx::query_as::<_, Course>("SELECT * FROM courses WHERE id = $1")
        .bind(course_uuid)
        .fetch_optional(&**db)
        .await
        .map_err(|_| ApiError::Internal("Database error".into()))?
        .ok_or_else(|| ApiError::NotFound("Course not found".into()))?;

    Ok(Json(course))
}

#[post("/courses", format = "json", data = "<course>")]
pub async fn create_course(
    db: &rocket::State<DbPool>,
    auth: AuthenticatedUser,
    course: Json<CreateCourseRequest>,
) -> Result<Json<Course>, ApiError> {
    if auth.role != UserRole::Teacher {
        return Err(ApiError::Forbidden("Only teachers can create courses".into()));
    }

    let course_id = Uuid::new_v4();
    let teacher_id = Uuid::parse_str(&auth.user_id)
        .map_err(|_| ApiError::Internal("Invalid user ID".into()))?;

    let course = sqlx::query_as::<_, Course>(
        "INSERT INTO courses (id, title, description, language, level, teacher_id) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *",
    )
    .bind(course_id)
    .bind(&course.title)
    .bind(&course.description)
    .bind(&course.language)
    .bind(&course.level)
    .bind(teacher_id)
    .fetch_one(&**db)
    .await
    .map_err(|_| ApiError::Internal("Failed to create course".into()))?;

    Ok(Json(course))
}