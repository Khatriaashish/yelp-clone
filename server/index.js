const express = require('express');
const app = express();
require('dotenv').config();
const restaurantRouter = require('./src/router/restaurant.router')

app.use(express.json());

app.use('/api/v1/restaurants', restaurantRouter);

const PORT = process.env.PORT || 2345;

app.listen(PORT, (err)=>{
    if(!err){
        console.log(`Server is up at port ${PORT}`);
    }
});