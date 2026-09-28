# Stackyn AI Builder

Stackyn is a full-stack AI-powered website builder that turns a simple prompt into a full React application, stores it in MongoDB, lets users edit files, preview live changes, and publish the final result.

Built with React + Vite on the frontend, Express + MongoDB on the backend, and OpenRouter-powered AI generation for project planning and code creation.

## Features

- AI-generated website scaffolding from a natural-language prompt
- Auto-planning of file structure before generation
- Real-time project status tracking while files are being created
- Chat-based revision workflow for updating generated apps
- File explorer and code editor-like browsing for generated project files
- Live preview of the current website project
- Authentication with email/password and cookie-based sessions
- MongoDB persistence for projects, files, and chat history
- One-click publishing and downloadable project export

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Lucide icons
- Axios
- react-hot-toast
- Sandpack integration for preview/editing workflow

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- OpenRouter AI integration
- Zod validation schemas

## How It Works

1. A user signs in and enters a prompt such as “Create a portfolio website for a designer”.
2. The backend creates a project record and starts AI generation in the background.
3. The AI plans the website structure, generates files, and saves them to MongoDB incrementally.
4. The frontend polls the active project and updates progress in the builder UI.
5. Users can chat with the AI to revise the generated app, edit files manually, preview changes, and publish the result.

## Project Structure

```text
Stackyn-AI-Builder/
├── README.md
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── package.json
│   └── server.js
└── package.json (if present in the parent workspace)
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+
- npm or pnpm
- MongoDB Atlas or a local MongoDB instance
- An OpenRouter API key

## Environment Variables

Create a `.env` file inside the `server` folder with the following variables:

```env
PORT=3000
JWT_SECRET=your_super_secret_key
MONGODB_URI=mongodb+srv://your_user:your_password@your_cluster.mongodb.net/stackyn
ORIGINS=http://localhost:5173,http://localhost:3000
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=cohere/north-mini-code:free
AI_MAX_CONCURRENCY=6
NODE_ENV=development
```

## Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Stackyn-AI-Builder
```

### 2. Install Client Dependencies

```bash
cd client
npm install
```

### 3. Install Server Dependencies

```bash
cd ../server
npm install
```

## Running the App

### Start the backend server

```bash
cd server
npm run dev
```

The API will run on:

```text
http://localhost:3000
```

### Start the frontend

```bash
cd client
npm run dev
```

The Vite app will run on:

```text
http://localhost:5173
```

## Available Scripts

### Client

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Server

```bash
npm run dev
npm run start
```

## Core App Flow

### Authentication
- User registers or logs in
- The server creates a JWT and stores it as an HTTP-only cookie
- Protected routes require the token for access

### Project Generation
- User submits a prompt from the homepage
- Backend creates a pending project record
- AI generates a plan and file list
- Files are created progressively and saved to the database

### Project Editing and Preview
- Users browse files in the builder UI
- Files are stored as project data and can be edited manually
- Project preview loads generated app content via the app preview flow

### Revision Workflow
- Users send additional prompts like “Add a pricing section”
- Backend builds a manifest and sends file context to the AI
- AI proposes targeted file operations
- Changes are applied and the project version is incremented

## API Overview

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Projects
- `POST /api/projects`
- `GET /api/projects`
- `GET /api/projects/:id`
- `PUT /api/projects/:id/files`
- `DELETE /api/projects/:id`
- `POST /api/projects/:id/chat`
- `POST /api/projects/:id/publish`

### Public Access
- `GET /api/projects/public/:id`

## Notes

- The AI generation behavior depends on the selected OpenRouter model and the quality of the prompt.
- If generation fails midway, the project enters a failed state and a detailed error is saved in the database.
- The app is designed for experimentation and rapid prototyping rather than production-grade enterprise deployment out of the box.

## Author

Prasoon Dwivedi

## License

This project is currently distributed without a formal license declaration in the repository. If you plan to share or deploy it publicly, add a license file and choose an appropriate open-source license.

## Future Improvements

- Add a richer code editor with syntax highlighting
- Support multi-page app generation and routing
- Add drag-and-drop component editing
- Improve AI verification and final code quality checks
- Add deployment automation and production hosting support
- Introduce tests for backend routes and frontend behavior

---

