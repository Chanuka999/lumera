# Lumera

Full-stack MERN e-commerce / product platform (React + Node/Express + MongoDB).

This repository contains a monorepo for the Lumera project with a backend API (Express + Mongoose) and a frontend SPA built with React + Vite.

## Repository layout

- `backend/` — Node.js / Express API, MongoDB models, controllers and routes.
- `frontend/` — React app (Vite) with pages, components and styles.

## Tech stack

- Backend: Node.js, Express, Mongoose (MongoDB), JWT, Nodemailer
- Frontend: React, Vite, Tailwind (optional), React Router
- Dev tools: nodemon (backend), vite (frontend)

## Quick start (Windows PowerShell)

Prerequisites:

- Node.js (v16+ recommended)
- npm
- MongoDB instance (Atlas or local)

1. Backend

Open a PowerShell terminal and run:

```powershell
cd .\backend
npm install
# create a .env file using the example variables below
npm run dev
```

The backend exposes its API (default port in `.env` or 5000). The `backend/package.json` includes these scripts:

- `npm start` — run `node index.js`
- `npm run dev` — run `nodemon index.js` (development)

2. Frontend

Open another PowerShell terminal and run:

```powershell
cd .\frontend
npm install
npm run dev
```

The frontend uses Vite; by default it runs on `http://localhost:5173` (or another free port).

Frontend `package.json` scripts include:

- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview built assets

## Environment variables

Create a `.env` file in `backend/` with values for your environment. Example variables used by this project (adjust names to match actual code if necessary):

- `PORT=5000`
- `MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.example.mongodb.net/lumera?retryWrites=true&w=majority`
- `JWT_SECRET=your_jwt_secret_here`
- `EMAIL_HOST=smtp.example.com`
- `EMAIL_PORT=587`
- `EMAIL_USER=you@example.com`
- `EMAIL_PASS=your_email_password`
- `CLIENT_URL=http://localhost:5173`

Note: Review `backend/index.js` and any `dotenv` usage to confirm exact variable names required by the project.

## Database

This project uses MongoDB via Mongoose. Point `MONGO_URI` to a running MongoDB. For quick local development you can run MongoDB locally or use a free Atlas cluster.

## API & Routes

Key route folders live under `backend/routes/` (such as `productRouter.js`, `userRouter.js`, `orderRouter.js`, `studentRouter.js`). Controllers are in `backend/controllers/`.

Example endpoints (adjust if your app differs):

- `POST /api/users/register` — register a new user
- `POST /api/users/login` — login, receive JWT
- `GET /api/products` — list products
- `POST /api/orders` — create order

Check the routers in `backend/routes` for the definitive list.

## Development notes

- The backend is set to use ES modules (`"type": "module"` in `backend/package.json`). Keep imports/exports in that style.
- The frontend uses modern React and Vite; ESLint is configured in the frontend for linting.

## Building for production

1. Build frontend assets:

```powershell
cd .\frontend
npm run build
```

2. Serve the built frontend from any static host or configure the backend server to serve the `dist` folder (optional). If you want to serve the built frontend from Express, copy or move the `dist` output into a public folder and add static middleware to `backend/index.js`.

## Tests

No automated tests are included in the repository by default. Add unit/integration tests and CI when ready.

## Contributing

- Fork the repo and create a feature branch: `git checkout -b feature/your-feature`
- Open a pull request describing your changes
- Keep changes focused and add tests where applicable

## Troubleshooting

- If the backend cannot connect to MongoDB, confirm `MONGO_URI` and network access (Atlas IP whitelist or local Mongo running).
- If the frontend fails to start, ensure Node and Vite dependencies are properly installed.

## Useful commands (PowerShell)

```powershell
# Backend (dev)
cd .\backend; npm install; npm run dev

# Frontend (dev)
cd .\frontend; npm install; npm run dev

# Build frontend
cd .\frontend; npm run build
```

## License

Add a license file if you intend to open-source this project (e.g., MIT). Place `LICENSE` at the repo root.

## Contact

If you need help or want to collaborate, open an issue or contact the repository owner.

---

Generated README for the Lumera project. Update environment variable names and endpoint examples if your code uses different names.
