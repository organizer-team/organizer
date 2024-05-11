import express from 'express';

import { getTasksByUserId, createTask } from '../controllers/task.js';

const taskRouter = express.Router();

taskRouter.get('/:userId', getTasksByUserId);
taskRouter.post('/create', createTask);

export default taskRouter;
