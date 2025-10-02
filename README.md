# AI Schedule Builder

AI Schedule Builder is a full-stack application that leverages AI (Google Gemini) to help users create, manage, and update recurring events and schedules. The backend is built with NestJS and Prisma (PostgreSQL), while the frontend uses Next.js. Authentication is handled via Clerk.

## Features

- Natural language event creation using AI
- Recurring event support (iCalendar RFC)
- User authentication (Clerk)
- Modern Next.js frontend
- PostgreSQL database with Prisma ORM

## Project Structure

- `backend/` — NestJS API, Prisma, Gemini integration
- `frontend/` — Next.js app

## Getting Started

1. Install dependencies in both `backend/` and `frontend/`.
2. Set up your environment variables (see `.env.example` if available).
3. Run database migrations with Prisma.
4. Start the backend and frontend servers.
