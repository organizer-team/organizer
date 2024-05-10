import express from 'express';
import cors from 'cors';
// node-cron is a tool that allows you to schedule tasks to run at specific times or intervals.
import cron from 'node-cron';

// Load our .env variables
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import colorRouter from './routes/color.js';
import areaRouter from './routes/area.js';

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());

// CORS
const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));

// Cookies
import cookieParser from 'cookie-parser';
import { deleteUserIfExpired } from './models/User.js';
app.use(cookieParser());

// We use cron to schedule tasks
cron.schedule('00 12 * * *', () => {
  // running a task every day at 12:00
  deleteUserIfExpired();
});

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/color', colorRouter);
app.use('/api/area', areaRouter);

export default app;
