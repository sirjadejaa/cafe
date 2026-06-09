import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRoutes from './routes';
import prisma from './config/db';
import { preWarmMenuCache } from './controllers/menu.controller';

dotenv.config();

// Pre-heat Prisma client connection to prevent cold starts on first user request
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to the database.');
    preWarmMenuCache();
  })
  .catch((err) => console.error('Error pre-connecting to the database:', err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Brew & Dine API' });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { prisma };
