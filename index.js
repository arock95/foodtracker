import express from 'express';
import helmet from 'helmet';
import {foodRouter} from './routes/food_routes.js';
import { health_router } from './routes/health_routes.js';

const app = express();
const port = 8080;

app.use(helmet());
app.use(express.json());
app.set('query parser', 'simple');

app.use('/food', foodRouter)
app.use('/health', health_router)

app.listen(port, function(){
    console.log(`app running on port ${port}`)
});