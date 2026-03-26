# RecroAI

RecroAI is a full-stack AI mock interview platform built for realistic interview practice, resume-aware question generation, instant scoring, and downloadable performance reports.

It combines a React frontend with a Node.js and Express backend, MongoDB for persistence, Firebase Google Sign-In for authentication, and Gemini for interview intelligence.

## Highlights

- AI-generated technical and HR interview questions
- Resume upload and structured resume analysis
- Voice-based interview flow using Web Speech APIs
- Per-answer scoring for confidence, communication, and correctness
- Interview history with detailed reports
- PDF export for sharing and revision
- Credit-based interview attempts

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Motion
- Recharts
- Firebase Authentication

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT auth via httpOnly cookies
- Multer for resume uploads
- PDF.js for resume text extraction
- Gemini API for AI workflows

## Project Structure

```text
RecroAi/
|-- client/
|   |-- src/
|   |-- public/
|   `-- package.json
|-- server/
|   |-- config/
|   |-- controllers/
|   |-- middlewares/
|   |-- models/
|   |-- routes/
|   |-- services/
|   `-- package.json
|-- render.yaml
`-- README.md
```

## Core Flows

### Authentication

Users sign in with Google through Firebase. The backend creates or finds the user, issues a JWT, and stores it in an httpOnly cookie.

### Resume-based Interview Setup

Users can upload a PDF resume. The backend extracts text, sends it to Gemini for structured parsing, and uses that context to personalize interview questions.

### Interview Evaluation

Each answer is evaluated by AI for confidence, communication, and correctness. The app stores question-level feedback and computes a final interview score.

## Local Setup

### Prerequisites

- Node.js 18 or newer
- A MongoDB database
- A Gemini API key
- A Firebase project with Google Sign-In enabled

### Environment Variables

#### Server

Create `server/.env`:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=8000
CLIENT_URL=http://localhost:5173
```

#### Client

Create `client/.env`:

```env
VITE_FIREBASE_APIKEY=your_firebase_api_key
```

### Install and Run

```bash
npm install --prefix server
npm install --prefix client
npm run dev --prefix server
npm run dev --prefix client
```

Frontend runs on `http://localhost:5173` and the API runs on `http://localhost:8000`.

## Production Deployment

This project is prepared for a free deployment using:

- Render free web service
- MongoDB Atlas free cluster

The production server serves the built React app and the API from the same service.

### Production Build

```bash
npm install --prefix client
npm install --prefix server
npm run build --prefix client
npm start --prefix server
```

### Render Configuration

The repo includes [render.yaml](./render.yaml) for Blueprint-based deployment.

Required environment variables:

```env
NODE_ENV=production
PORT=10000
CLIENT_URL=https://your-app.onrender.com
MONGODB_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_random_secret
GEMINI_API_KEY=your_gemini_api_key
VITE_FIREBASE_APIKEY=your_firebase_api_key
```

### Firebase Setup for Production

Add your Render domain to Firebase Authentication authorized domains before testing Google Sign-In in production.

## Notes

- Resume uploads are stored temporarily and processed on the backend.
- Browser speech features work best in Chromium-based browsers.
- HTTPS is required for browser speech APIs outside localhost.

## Status

This repository is now prepared for:

- clean GitHub publishing
- secret-safe sharing
- step-by-step free deployment
