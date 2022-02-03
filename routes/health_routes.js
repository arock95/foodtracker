import express from 'express';
import { post_health, get_health } from '../controllers/health_controller.js';
const health_router = express.Router();

health_router.post('/', post_health);
health_router.get('/', get_health);

export {health_router};