# 📝 Notes App

A simple Notes App built using **Node.js, Express, and Vanilla JavaScript**.

## 🚀 Features

- Create notes
- View notes
- Update notes
- Delete notes
- Clean UI with sidebar + editor layout

## 🛠 Tech Stack

- Backend: Node.js, Express
- Frontend: HTML, CSS, JavaScript
- Storage: JSON file

## 📂 Project Structure
project/
- ├── routes/
  - │ └── notes.js
- ├── middleware/
  - │ └── logger.js
- ├── data/
  - │ └── notes.json
- ├── frontend/
  - │ ├── index.html
  - │ ├── style.css
  - │ └── script.js
- ├── server.js


## ▶️ How to Run

1. Install dependencies
- npm install 
2. Start server
- node server.js
3. Open frontend 
- open index.html using liver server 


## 📌 API Endpoints

- GET `/api/notes` → Get all notes  
- GET `/api/notes/:id` → Get single note  
- POST `/api/notes` → Create note  
- PUT `/api/notes/:id` → Update note  
- DELETE `/api/notes/:id` → Delete note  

## ✨ Future Improvements

- Add database (MongoDB)
- Add authentication
- Improve UI
