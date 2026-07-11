# ⚡ QuizPulse

QuizPulse is a full-stack real-time quiz platform that enables users to create, host, and participate in interactive quizzes. The platform supports both manually created quizzes and AI-generated quizzes from a topic or uploaded PDF, making quiz creation significantly faster while providing a seamless live multiplayer experience.

Built with scalability in mind, QuizPulse combines a modern React frontend with a modular Node.js backend, real-time communication using Socket.IO, MongoDB for persistent storage, and Google's Gemini API for AI-powered quiz generation.

##  Features

- Create custom MCQ quizzes
- AI quiz generation from any topic
- Generate quizzes directly from PDF study material
- Real-time multiplayer quiz sessions
- Join rooms using unique room codes or scaning QR code
- Live leaderboard with instant score updates
- Dashboard for managing created quizzes
- Responsive modern UI

---

## 🏗️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Socket.IO
- Multer
- PDF2JSON
- Google Gemini API

---

## ⚙️ Backend Highlights

The backend follows a modular feature-based architecture with separate controllers, services, routes, models, and socket handlers.

Key responsibilities include:

- REST API development using Express
- Real-time room management with Socket.IO
- AI-powered quiz generation using Gemini API
- PDF text extraction and quiz generation
- MongoDB data modeling with Mongoose
- Input validation and centralized error handling
- Feature-based folder organization for maintainability and scalability

---

## 📂 Project Structure

```
QuizPulse
│
├── client
│   ├── features
│   ├── shared
│   ├── services
│   └── pages
│
└── server
    ├── config
    ├── common
    ├── features
    │   ├── ai
    │   ├── quiz
    │   ├── room
    │   └── game
    ├── sockets
    └── utils
```

---

## 🔄 Real-Time Features

- Live quiz rooms
- Instant player joining
- Live question synchronization
- Real-time leaderboard updates
- Socket-based event handling
- Room code sharing

---

## 🌐 Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

---

## 📸 Screenshots

_Add screenshots or GIFs here._

---

## Future Improvements

- Authentication and user accounts
- Quiz sharing via links
- Analytics dashboard
- Adaptive quiz difficulty
- Public quiz library
- Export quizzes
- Multiplayer chat
- Detailed performance reports

---

## Author

**👩🏻‍💻Vaishnavi Waghmare**

GitHub: https://github.com/vaish9825
