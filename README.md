# Brew & Dine | Luxury 3D Restaurant Platform

A premium, full-stack restaurant and cafe website built with modern technologies.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP, Three.js (R3F).
- **Backend**: Node.js, Express.js, PostgreSQL, Prisma ORM, JWT.
- **State Management**: Zustand.
- **Payments**: Stripe.
- **Containerization**: Docker.

## Features
- 🚀 **Cinematic 3D Hero**: Interactive 3D coffee cup and smooth reveal animations.
- 🔐 **Secure Auth**: Full JWT registration, login, and protected routes.
- 🍱 **Dynamic Menu**: Real-time filtering, search, and admin CRUD.
- 🛒 **Persistent Cart**: Zustand-powered shopping bag with local storage sync.
- 📅 **Table Reservations**: Real-time booking system with guest and location selection.
- 📊 **Admin Dashboard**: Analytics, order tracking, and menu management.
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop.

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL
- Docker (optional)

### Setup & Installation

1. **Install Dependencies**:
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd frontend && npm install
   ```

2. **Database Setup**:
   Update `backend/.env` with your PostgreSQL URL.
   ```bash
   cd backend
   npx prisma migrate dev
   npm run prisma:generate
   npx prisma db seed
   ```

3. **Run Development Servers**:
   ```bash
   # Terminal 1 (Backend)
   cd backend && npm run dev
   
   # Terminal 2 (Frontend)
   cd frontend && npm run dev
   ```

4. **Docker Deployment**:
   ```bash
   docker-compose up --build
   ```

## Admin Credentials (Seed)
- **Email**: `admin@cafe.com`
- **Password**: `admin123`
