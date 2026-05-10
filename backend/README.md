# TrainTrack Backend

Backend part of the TrainTrack application built as a standalone Express.js REST API.

## Features

- REST API built with Express.js
- Healthcheck endpoint
- JSON request handling
- CORS configuration for frontend communication
- Environment-based configuration

## Technology Stack

- Node.js
- Express.js
- Prisma Postgres
- CORS
- dotenv
- nodemon

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

- The backend will run at `http://localhost:3000/api`

### Environment Variables

- Create a .env file in the project root and define:
```markdown
PORT=3000
FRONTEND_URL=http://localhost:5173
DATABASE_URL="postgresql://postgres:{PASSWORD}@localhost:5432/traintrack?schema=public"
```
### Start in Production Mode

```bash
npm start
```

### API Base URL

```bash
http://localhost:3000/api
```

- Example response (GET http://localhost:3000/api/health):
```bash
{
  "status": "ok",
  "service": "traintrack-backend"
}
```

## Project Structure

```bash
prisma/
  migrations/
  schema.prisma
  seed.js
src/
  app.js               # Express app configuration
  server.js            # Application entry point
  routes/              # API route definitions
  controllers/         # Request handlers
  services/            # Business logic layer
  repositories/        # Data access layer
  middlewares/         # Custom middlewares
  validators/          # Request validation logic
  utils/               # Shared helper functions
```