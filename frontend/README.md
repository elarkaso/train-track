# TrainTrack Frontend

Frontend part of the TrainTrack application built as a standalone React SPA using Vite.

TrainTrack is a web application for recording workouts and analyzing training balance across muscle groups. The frontend provides pages for workout overview, workout creation, workout detail, exercise assignment, and training balance analysis.

## Features

- Workout overview page
- Create workout form
- Workout detail page
- Assign exercise to workout
- Training balance analysis
- Client-side routing with React Router
- Connection to standalone Express.js backend API

## Technology Stack

- React
- Vite
- React Router

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

- The application will open at `http://localhost:5173/`
- Expected backend base URL: `http://localhost:3000/api` (see Environment Variables)

### Environment Variables

```markdown
VITE_API_BASE_URL=http://localhost:3000/api
```
### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```bash
src/
  api/                 # API communication layer
  components/          # Reusable UI components
    common/            # Shared components such as layout
  pages/               # Application pages / views
  router/              # Routing configuration
  types/               # Shared frontend types
  utils/               # Utility functions
  App.jsx              # Application root
  main.jsx             # Entry point
```