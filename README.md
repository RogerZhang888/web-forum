# Web Forum

This repository contains a simple web forum built for the CVWO Winter Assignment.
The project is implemented as a full-stack application with a clear separation between frontend, backend, authentication, and database responsibilities.
NOTE: This project is not yet complete, certain features have not been implemented yet. 

## Architecture Overview
### Frontend
* Vite + React
* Material UI (MUI) for UI components
* Handles user interaction and presentation
* Communicates with the backend via RESTful APIs
* Uses Supabase Auth (client-side) for user login and registration

### Backend
* Go + Chi framework
* Exposes RESTful API endpoints for topics, posts, and comments
* API routing
* Authentication-based authorization
* Ownership checks (create/delete)
* Data validation and business logic
* Verifies and trusts Supabase-issued JWTs sent from the frontend
* Connects directly to the database using a PostgreSQL connection string

### Database
* Supabase-hosted PostgreSQL
* Uses Supabase Auth for user authentication
* Forum data stored in custom tables:
* * topics
* * posts
* * comments
* * profiles
* Ownership is enforced via foreign keys referencing auth.users.id
* User display data (e.g. username) is stored separately from authentication data

### Authentication Flow
* User authenticates via Supabase Auth on the frontend
* Supabase issues a JWT access token
* Frontend sends the JWT in the Authorization header
* Backend verifies the token and extracts the authenticated user ID
* The backend enforces permissions for all mutating operations

### Current Features
* User authentication
* Topic creation and listing
* Posts grouped under topics
* Comments under posts
* Ownership-based deletion
* Public read access, protected write access