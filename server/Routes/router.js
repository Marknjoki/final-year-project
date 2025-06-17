import express from 'express';
import getStops from '../Contoller/getStops.js'
import getRoutes from '../Contoller/getRoutes.js';
import getStages from '../Contoller/getStage.js';
const router = express.Router();


router.get('/stops', getStops);
router.get('/stages', getStages);
router.get('/routes', getRoutes);

export default router;