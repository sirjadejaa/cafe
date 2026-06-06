#!/bin/sh
echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Seeding database with menu items..."
node prisma/seed.js

echo "Starting server..."
npm run dev
