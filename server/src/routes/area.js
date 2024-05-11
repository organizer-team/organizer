import express from 'express';

import { getAreasByUserId } from '../controllers/area.js';

const areaRouter = express.Router();

areaRouter.get('/:userId', getAreasByUserId);

export default areaRouter;
