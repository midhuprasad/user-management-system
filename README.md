# user-management-system
User Management System with Django REST Framework (backend) and a simple JavaScript frontend.


## Setup Instructions

### 1. Clone Repo

https://github.com/midhuprasad/user-management-system.git

 cd user-management-system

## 2. Create Virtual Environment

python -m venv venv
venv\Scripts\activate      

## 3. Install Requirements

pip install -r requirements.txt

## 4. Apply Migrations

python manage.py migrate

## 5. Run Development Server

python manage.py runserver

Now open:
Frontend at [http://127.0.0.1:8000](http://127.0.0.1:8000)


## Authentication

* Register: `POST /api/auth/register/`
* Login (JWT): `POST /api/auth/login/`
* Token Refresh: `POST /api/auth/token/refresh/`
* Change Password: `POST /api/auth/change-password/`

Pass JWT in headers for all protected endpoints:

Authorization: Bearer <your-access-token>

## API Endpoints

## Profile

* `GET /api/profile/` → Get profile
* `PUT /api/profile/` → Update profile

## Notes

* `GET /api/notes/` → List notes
* `POST /api/notes/` → Create note
* `PUT /api/notes/{id}/` → Update note
* `DELETE /api/notes/{id}/` → Delete note

## API Documentation

Available at runtime:

* Swagger UI → [http://127.0.0.1:8000/api/schema/swagger-ui/](http://127.0.0.1:8000/api/schema/swagger-ui/)
* ReDoc → [http://127.0.0.1:8000/api/schema/redoc/](http://127.0.0.1:8000/api/schema/redoc/)
* OpenAPI Schema JSON → [http://127.0.0.1:8000/api/schema/](http://127.0.0.1:8000/api/schema/)


## Postman Testing

You can test APIs using Postman.

1. Import the included Postman Collection (`User Management System API.json`)
2. Set base URL → `http://127.0.0.1:8000`
3. Add JWT token in Headers:
   Key: Authorization
   Value: Bearer <your-access-token>
