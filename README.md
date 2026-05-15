# 📝 Notes App

A full-stack Notes App built using **Node.js, Express, MongoDB, and Vanilla JavaScript**.

## 🚀 Features

- Create notes
- View notes
- Update notes
- Delete notes
- Clean UI with sidebar + editor layout
- Persistent storage with MongoDB

## 🛠 Tech Stack

- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Frontend: HTML, CSS, JavaScript

## 📂 Project Structure
project/
- ├── routes/
  - │ └── notes.js
- ├── middleware/
  - │ └── logger.js
- ├── models/
  - │ └── note.js
- ├── frontend/
  - │ ├── index.html
  - │ ├── style.css
  - │ └── script.js
- ├── .env
- ├── .gitignore
- ├── server.js

## ▶️ How to Run

1. Install dependencies
- npm install
2. Add your MongoDB URI in .env file
- MONGO_URI=your_mongodb_connection_string
3. Start server
- node server.js
4. Open frontend
- open index.html using live server

## 📌 API Endpoints

- GET `/api/notes` → Get all notes
- GET `/api/notes/:id` → Get single note
- POST `/api/notes` → Create note
- PUT `/api/notes/:id` → Update note
- DELETE `/api/notes/:id` → Delete note

## ✨ Future Improvements

- Add authentication
- Improve UI