import express from 'express';
import { post_food, get_food } from '../controllers/food_controller.js';
const foodRouter = express.Router();

foodRouter.get('/', get_food );

foodRouter.post('/', post_food);

export {foodRouter} ;