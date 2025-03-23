#[macro_use]
extern crate rocket;

mod auth;
mod db;
mod error;
mod handlers;
mod models;
mod schema;

use dotenv::dotenv;
use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::{Request, Response};

pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new(
            "Access-Control-Allow-Methods",
            "POST, GET, PATCH, DELETE, OPTIONS",
        ));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

#[launch]
fn rocket() -> _ {
    dotenv().ok();
    
    rocket::build()
        .attach(CORS)
        .mount(
            "/api",
            routes![
                handlers::auth::login,
                handlers::auth::register,
                handlers::courses::get_courses,
                handlers::courses::create_course,
                handlers::courses::get_course,
                handlers::users::get_profile,
                handlers::users::update_profile,
            ],
        )
}