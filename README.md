# Calcly Platform

Full-stack custom calculator platform inspired by the provided visual direction.

## Stack

- Frontend: React + TypeScript + React Router + Context
- Backend: Node.js + Express + JWT + PostgreSQL
- Tests: Vitest + Testing Library + Supertest

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create Postgres database and run schema:
   ```bash
   psql postgresql://postgres:postgres@localhost:5432/calcly -f db/schema.sql
   ```
3. Copy environment:
   ```bash
   cp server/.env.example server/.env
   ```
4. Run both frontend and backend:
   ```bash
   npm run dev
   ```

- Frontend: http://localhost:5173
- API: http://localhost:4000/api

## Scripts

- `npm run dev` - run client and server concurrently
- `npm run build` - build client and server
- `npm run test` - run unit tests in both workspaces

## API Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/templates` (auth)
- `POST /api/templates` (auth)
- `PUT /api/templates/:id` (auth)
- `GET /api/templates/share/:shareId`
