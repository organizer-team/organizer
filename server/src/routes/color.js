import express from 'express';

import { getColors } from '../controllers/color.js';

const colorRouter = express.Router();

colorRouter.get('/', getColors);

export default colorRouter;
