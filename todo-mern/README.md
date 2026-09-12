# MERN To-Do List App

A full-stack To-Do List application built with MongoDB, Express.js, React, and Node.js (MERN).

## Project Structure

```
todo-mern/
├── backend/
│   ├── config/db.js            # MongoDB connection
│   ├── models/Task.js          # Task schema
│   ├── controllers/taskController.js  # API logic
│   ├── routes/taskRoutes.js    # Express routes
│   ├── server.js               # App entry point
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/api.js          # fetch() calls to backend
    │   ├── components/TaskForm.jsx
    │   ├── components/TaskList.jsx
    │   ├── App.js
    │   └── App.css
    └── .env.example
```

## Setup & Run

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and put your MongoDB connection string (MongoDB Atlas or local)
npm run dev      # uses nodemon, or `npm start`
```

The backend runs on `http://localhost:5000` by default.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# make sure REACT_APP_API_URL points to your backend, e.g. http://localhost:5000/api/tasks
npm start
```

The React app runs on `http://localhost:3000` and talks to the backend using the browser's built-in `fetch` API (no extra HTTP library needed).

## API Endpoints

| Method | Endpoint              | Description                          |
|--------|------------------------|---------------------------------------|
| GET    | /api/tasks             | Get all tasks (supports `?search=` and `?status=`) |
| GET    | /api/tasks/:id         | Get a single task                    |
| POST   | /api/tasks             | Create a new task                    |
| PUT    | /api/tasks/:id         | Update a task                        |
| PATCH  | /api/tasks/:id/status  | Update only status/completed         |
| DELETE | /api/tasks/:id         | Delete a task                        |

## Environment Variables

**backend/.env**
```
PORT=5000
MONGO_URI=your-mongodb-connection-string
CLIENT_ORIGIN=http://localhost:3000
```

**frontend/.env**
```
REACT_APP_API_URL=http://localhost:5000/api/tasks
```

## Deployment

- Backend: deploy to **Render** (set `MONGO_URI` and `CLIENT_ORIGIN` as environment variables in the Render dashboard).
- Frontend: deploy to **Netlify** (set `REACT_APP_API_URL` to your live Render backend URL as a build environment variable).

## Challenges Faced & How They Were Addressed

- **CORS errors between frontend and backend:** Solved by explicitly setting the `CLIENT_ORIGIN` in the backend's CORS middleware to match the deployed frontend URL.
- **Keeping the UI in sync with the database:** Solved by re-fetching the task list after every create/update/delete action, so the UI always reflects the latest backend state.
- **Search performance while typing:** Solved by debouncing the search input (300ms delay) before calling the API, to avoid firing a request on every keystroke.
- **Handling failed API calls gracefully:** Solved with try/catch blocks around every Axios call and a visible error message in the UI instead of a silent failure.

---
বাংলা সারাংশ: এটি একটি সম্পূর্ণ MERN (MongoDB, Express, React, Node.js) To-Do List অ্যাপ্লিকেশন। `backend` ফোল্ডারে API (তৈরি, পড়া, আপডেট, ডিলিট, সার্চ) আছে এবং `frontend` ফোল্ডারে React অ্যাপ আছে যেটা Axios দিয়ে সেই API-গুলোর সাথে যুক্ত। উপরের ধাপ অনুসরণ করে দুটো ফোল্ডারেই `npm install` করে `.env` ফাইল বসিয়ে রান করলেই অ্যাপটি চালু হয়ে যাবে।
