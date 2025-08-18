# 📚 Online Bookstore Application

An online bookstore application built with **React (frontend)**, **Node.js/Express (backend)**, and **MongoDB (database)**.  
Users can browse books, search by title or author, view book details, register/login, and manage their list of favorite books.

---

## 🚀 Features

- **Browse & Search** books by title or author.
- **View Book Details** with cover images and descriptions.
- **User Authentication** (signup & login).
- **Favorites Management** – add/remove books from favorites.
- **Responsive UI** built with React.
- **Backend API** with CRUD operations.
- **Unit Tests** for both frontend and backend.
- **Dockerized Setup** for easy deployment.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Redux Toolkit, Bootstrap  
- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Monorepo Tooling:** Nx  
- **Testing:** Jest, React Testing Library  
- **Containerization:** Docker, Docker Compose  

---
## ⚙️ Setup / Installation

1. Install dependencies:

```bash
npm install
````

2. Create a .env file in the project root with the following content:

```bash
PORT=5000
MONGO_URI=mongodb+srv://rauleduardodeveloper:mTgGVQVMshRHUbm1@cluster0.r6bnrqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
SECRET_KEY=thisisasecretkey
NODE_ENV=development
````


### 🔹 Start Backend (API)
Run the backend service with:

```bash
npx nx serve api
``` 
### 🔹 Start Frontend (UI)
Run the frontend service with:

```bash
npx nx serve ui
``` 
###  🧪 Running Tests
```bash
npx nx test ui
npx nx test api
``` 
### 🔹 Run with Docker
```bash
docker compose build
docker compose up
```
### 📂 Project Structure
```bash 
.
├── .nx/ # Nx workspace internals
├── .vscode/ # VSCode settings
├── coverage/ # Test coverage reports
├── dist/
│ ├── uploads/ # Uploaded book files (demo data)
│ └── packages/ # Built output for api & ui
│
├── node_modules/ # Dependencies
│
├── packages/
│ ├── api/ # Backend (Express, DB, API routes)
│ └── ui/ # Frontend (React app)
│
├── shared-types/
│ └── src/ # Shared TypeScript types
│
├── .dockerignore
├── .env # Environment variables
├── .gitignore
├── .prettierignore
├── .prettierrc
├── docker-compose.yaml # Docker setup for full app
├── Dockerfile # Multi-stage build for API & UI
├── error.log # Error logs
├── eslint.config.js # ESLint config
├── jest.config.ts # Jest config
├── jest.preset.js
├── nx.json # Nx workspace config
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.base.json
└── tsconfig.json
``` 

