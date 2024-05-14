import express from 'express';

import { getAreasByUserId, createArea } from '../controllers/area.js';

const areaRouter = express.Router();

areaRouter.get('/:userId', getAreasByUserId);
areaRouter.post('/create', createArea);

export default areaRouter;
