# Web Forum

This repository contains a simple web forum built for the CVWO Winter Assignment.
It is a full-stack application with a clear separation between frontend, backend, authentication, and database responsibilities.

Click [here](https://rz-web-forum.netlify.app) to visit the deployed site. The frontend is hosted on Netlify and backend is hosted on Render. If visiting for the first time, please give a few minutes for the server to restart. <br><br>

## Local Setup
Local setup is optional. The deployed site contains all required functionality for grading. 

### Prerequisites
- Node.js (>=18)
- Go (>=1.21)
- Supabase account

### Environment variables

Create a `.env` file in `/client`:

VITE_SUPABASE_URL=... <br>
VITE_SUPABASE_ANON_KEY=... <br>
VITE_API_BASE_URL=... 

Create a `.env` file in `/server`:

DATABASE_URL =... <br>
SUPABASE_JWT_SECRET =... 

### Run backend
cd server
go run main.go

### Run frontend
cd client
npm install
npm run dev

Frontend runs at http://localhost:5173  
Backend runs at http://localhost:3000

## Architecture Overview
### Frontend
* Vite + React
* Material UI for UI components
* Handles user interaction and presentation
* Communicates with the backend via RESTful APIs
* Uses Supabase Auth (client-side) for user login and registration

### Backend
* Go + Chi framework
* Exposes RESTful API endpoints for topics, posts, and comments
* API routing
* Authentication-based authorization
* Ownership checks for create/delete requests
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
* The backend enforces permissions for all mutating operations (post/delete)

## Current Features
* User authentication
* Topic creation and listing
* Posts grouped under topics
* Comments under posts
* Ownership-based deletion
* Public read access, protected write access

## AI Usage Declaration
ChatGPT was used 
* as a search engine to explain certain engineering concepts and best practices.
* occasionally, to assist in debugging after I tried to identify the source of an error and fix the error myself but could not successfully do so. 

Built by Roger Zhang
<br>
Last updated 9 January 2026