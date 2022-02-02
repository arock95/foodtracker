import express from 'express';
import { addToDatabase } from '../controllers/health_controller.js';
const health_router = express.Router();

health_router.post('/', addToDatabase)

export {health_router};