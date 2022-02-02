import express from 'express';
const health_router = express.Router();

health_router.get('/', function(req, res) {
    res.send('farts');
})

export {health_router};