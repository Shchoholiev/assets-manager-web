# assets-manager-web

A web application for managing, browsing, creating, editing, and compiling code assets and projects with user authentication and support for AI-driven project startup assistance.

## Table of Contents

- [Features](#features)
- [Stack](#stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
- [Configuration](#configuration)

## Features

- User authentication with signup, login, logout, password reset, and email confirmation.
- Browse, add, edit, and delete personal or company-related code assets.
- Manage folders and files within code assets including create, rename, delete, and editing functionality.
- Project creation support with AI integration to start projects from prompts.
- Combine multiple code assets into a project.
- Compile projects and view compilation output.
- Responsive UI with accessibility considerations.
- Monaco editor integration for code editing with custom theming.
- Pagination and filtering of assets based on tags and search.
- Modal dialogs for confirmations and forms.
- Real-time UI feedback with spinners and toasts.

## Stack

- Frontend framework: React
- State management and asynchronous data fetching: React Query
- Code editing: Monaco Editor
- AI integration for project assistance
- Responsive design with react-responsive
- CI/CD configured with Azure Pipelines

## Installation

### Prerequisites

- Node.js (version 20.x preferred)
- npm (Node Package Manager)

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/Shchoholiev/assets-manager-web.git
cd assets-manager-web

# Install dependencies
npm install

# Start development server
npm run dev

# Build static production files
npm run build

# Preview production build locally
npm run preview
```

## Configuration

Create a `.env` file in the project root (or adjust existing) with the following environment variable:

```env
VITE_API_BASE_URL=https://assets-manager-api-dev.azurewebsites.net
```

- `VITE_API_BASE_URL` — URL of the backend API to connect with for user authentication, assets, folders, files, and projects management.

Ensure local storage is accessible for saving and refreshing JWT access and refresh tokens for authentication.

For development container support, the `.devcontainer/devcontainer.json` is configured to use Node.js environment.

Azure Pipelines config is preconfigured for CI/CD deployment targeting Azure's Linux web app service.
