# Career Co-Pilot 🚀

Career Co-Pilot is a **full-stack web application** that recommends career paths based on a user’s skills.  
Users can enter their skills, receive a recommended career along with a learning roadmap, and track their search history.

This project demonstrates **modern full-stack development practices**, including authentication, REST APIs, and database integration.

---

## 🌍 Live Demo

Frontend:  
https://career-co-pilot-sigma.vercel.app

Backend API:  
https://career-co-pilot-1-szo7.onrender.com

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- Fetch API
- CSS

### Backend
- Flask (Python)
- JWT Authentication
- Bcrypt password hashing

### Database
- PostgreSQL (Render)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL
---

## ✨ Features

- 🔐 User registration and login
- 🧠 Skill-based career recommendation
- 📚 Learning roadmap suggestions
- 📜 Search history tracking
- 🗑 Delete history entries
- 📄 Pagination for history results
- 🔒 Protected API routes using JWT
- ⚡ Centralized API request handler (`api.js`)
- 🌍 Deployed full-stack application (Vercel + Render)

---

## 🧠 How It Works

1. User enters skills in the frontend UI.
2. React converts the input into an array.
3. Skills are sent to the Flask backend via a POST request.
4. Flask processes the skills using rule-based logic.
5. Backend returns the recommended career and roadmap.
6. React dynamically displays the results and stores search history.


## 🏗 System Architecture

```
        ┌──────────────────────┐
        │     React Frontend   │
        │   (Vite + Fetch API) │
        └───────────┬──────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │       Flask API      │
        │     REST Endpoints   │
        └───────────┬──────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │   JWT Authentication │
        │ Token Generation &   │
        │ Token Verification   │
        └───────────┬──────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │    PostgreSQL DB     │
        │ Users + SearchHistory│
        └──────────────────────┘
```

## 📡 API Endpoints

### Register User
POST /register

Registers a new user.

---

### Login User

POST /login


Authenticates user and returns JWT token.

---

### Recommend Career
POST /recommend

Input:

{
"skills": ["python", "sql"]
}

Returns recommended career and roadmap.

---

### Get Search History

GET /history?page=1


Returns paginated user search history.

---

### Delete History Entry

DELETE /history/:id


Deletes a specific history entry.

---

## ▶️ Running the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/abhilash2124/career-co-pilot.git
cd career-co-pilot


2️⃣ Backend Setup
cd backend
python -m venv venv
pip install -r requirements.txt
python app.py

Backend runs on:
http://127.0.0.1:5000


3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173


🔐 Environment Variables
Create a .env file inside the backend folder:
JWT_SECRET_KEY=your_secret_key
DB_HOST=localhost
DB_NAME=career_copilot
DB_USER=postgres
DB_PASSWORD=your_password


📌 Future Improvements
AI/ML based career recommendation model
Improved UI/UX design
Expanded career dataset
Advanced recommendation system

👨‍💻 Author
Abhilash Addagatla
GitHub:
https://github.com/abhilash2124



### 🏠 Home Page
![Alt text](screenshots/Home.png)

### 🔐 Login Page
![Alt text](https://github.com/abhilash2124/career-co-pilot/blob/7f6da7997719f7857dedfde78426cd3974cfec84/screenshots/Home.png)

### 🎯 Career Recommendation
![Result Page](./frontend/screenshots/Result.png)

![Home](./screenshots/Home.png)
![Login](./screenshots/Login.png)
![UI](./screenshots/Result.png)