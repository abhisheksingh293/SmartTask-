# SmartTask Hub 📝

SmartTask Hub is a robust Full-Stack Task Management Application built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). It enables users to efficiently manage their daily tasks with features like secure authentication, real-time updates, filtering, and sorting.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Live Demo

- **Frontend (App):** [LINK_TO_VERCEL_APP](https://your-app-url.vercel.app)
- **Backend (API):** [LINK_TO_RENDER_API](https://your-api-url.onrender.com)
- **Demo Video:** [LINK_TO_VIDEO](https://your-video-link)

---

## ✨ Features

- **🔐 User Authentication**: Secure Register/Login flow using JWT & Bcrypt.
- **📋 Task CRUD**: Create, Read, Update, and Delete tasks seamlessly.
- **🔍 Advanced Search**: Real-time filtering by task title.
- **🏗️ Organization**:
  - Filter by Status (Pending, In Progress, Completed).
  - Sort by Date (Newest/Oldest) or Due Date.
- **⚡ Responsive UI**: Fully optimized for Desktop, Tablet, and Mobile.
- **🔔 Toast Notifications**: Contextual feedback for all user actions.
- **🛡️ Data Protection**: Input validation and protected API routes.

---

## 🛠️ Technologies Used

### Frontend
- **React.js (Vite)**: Fast and modern UI library.
- **Tailwind CSS**: Utility-first styling for responsiveness.
- **Axios**: API integration with interceptors for global error handling.
- **Lucide React**: Beautiful vector icons.

### Backend
- **Node.js & Express.js**: RESTful API architecture.
- **MongoDB & Mongoose**: NoSQL database for flexible data modeling.
- **Bcrypt.js**: Secure password hashing.
- **UniqID/UUID**: Unique identifiers.

---

## ⚙️ Local Setup Instructions

Follow these steps to run the project locally.

### 1️⃣ Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas Account)
- Git

### 2️⃣ Backend Setup
```bash
# Clone the repository
git clone https://github.com/your-username/smarttask-hub.git
cd smarttask-hub

# Install dependencies
npm install

# Create environment variables
# Copy .env.example to .env
cp .env.example .env

# Open .env and add your values:
# MONGO_URI=your_mongo_url
# JWT_SECRET=your_secret
# PORT=5000

# Start Server
npm run dev
```

### 3️⃣ Frontend Setup
```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Create environment variables
# Copy .env.example to .env
cp .env.example .env

# Ensure .env has:
# VITE_API_URL=http://localhost:5000

# Start React App
npm run dev
```

Visit `http://localhost:5173` to view the app!

---

## 📡 API Documentation

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login user & get Token | ❌ |
| `GET` | `/api/tasks` | Get all tasks for logged-in user | ✅ |
| `POST` | `/api/tasks` | Create a new task | ✅ |
| `PUT` | `/api/tasks/:id` | Update a task | ✅ |
| `DELETE` | `/api/tasks/:id` | Delete a task | ✅ |

---

## 📂 Project Structure

```
task-management-app/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth & Toast Context
│   │   ├── pages/          # App Views (Dashboard, Login)
│   │   └── services/       # API Services
├── config/                 # DB Configuration
├── controllers/            # Route Controllers
├── models/                 # Mongoose Models
├── routes/                 # API Routes
├── utils/                  # Helper functions
└── server.js               # Entry point
```

---

## 🔮 Future Improvements

- [ ] **Drag & Drop**: Kanban board interface.
- [ ] **Dark Mode**: System-wide theme toggle.
- [ ] **Reminders**: Email notifications for due tasks.
- [ ] **Collaboration**: Shared workspaces for teams.

---

**Built with ❤️ by [Your Name]**
