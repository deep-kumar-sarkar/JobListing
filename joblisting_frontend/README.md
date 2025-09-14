# Job Listing Frontend (React + Vite + Tailwind)

This is a simple frontend for your Job Listing backend running on `http://localhost:8080`.
It supports:
- View all jobs (GET /Alljobs)
- Search jobs by profile (GET /jobs?profile=...)
- Search jobs by free text (GET /jobs/{text})
- Post a new job (POST /jobs)

## Getting started

1. Install dependencies:
   npm install

2. Start the dev server (make sure your backend is running on port 8080):
   npm run dev

Open the URL printed in the console (usually `http://localhost:5173`).

## CORS / Proxy
This app uses a Vite dev-server proxy so the frontend can call the backend without CORS issues.
Requests are sent to paths starting with `/api` and are forwarded to `http://localhost:8080`.
If you run the frontend in production without the Vite dev server, configure CORS in the backend or host the frontend from the same origin.

## Notes
- Tailwind CSS is enabled via the `@tailwindcss/vite` plugin and `@import "tailwindcss";` in CSS files.
- UI is modularized: reusable components live in `src/components`, API helpers in `src/services/api.js`, and `src/App.jsx` composes the screens. Adjust endpoint paths if your backend differs.
