const router = require('express').Router();
const db = require('../db')

router.route('/')
//get all restaurants
    .get(async (req, res)=>{
        const result = await db.query("SELECT * FROM restaurants");
        res.json({
            status: 'success',
            data: {
                restaurant: result
            }
        })
    })
//create reaturants
    .post((req, res)=>{
        
    })

router.route('/:id')
    //get restaurant by id
    .get((req, res)=>{
        
    })
    //delete restaurant by id
    .delete((req, res)=>{
        
    })
    //update restaurant by id
    .put((req, res)=>{
        
    })

module.exports = router