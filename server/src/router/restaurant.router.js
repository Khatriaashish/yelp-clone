const router = require('express').Router();
const db = require('../db')

router.route('/')
//get all restaurants
    .get(async (req, res)=>{
        try{
            // const result = await db.query("SELECT * FROM restaurants");
            const restaurantRatingData = await db.query('select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;')
            res.json({
                status: 'success',
                results: restaurantRatingData.rows.length,
                data: {
                    restaurants: restaurantRatingData.rows
                }
            })
        }
        catch(except){
            res.status(500).json({
                status: "error",
                message: except.message??"An error occured"
            })
        }
    })
//create reaturants
    .post(async (req, res)=>{
        try{
            const data = req.body;
            const result = await db.query("insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *", [data.name, data.location, data.price_range]);
            res.json({
                status: 'success',
                results: result.rows.length,
                data: {
                    restaurants: result.rows
                }
            })
        }
        catch(except){
            res.status(500).json({
                status: "error",
                message: except.message??"An error occured"
            })
        }
        
    })

router.route('/:id')
    //get restaurant by id
    .get(async(req, res)=>{
        try{
            const id = req.params.id;
            // const restaurant = await db.query("select * from restaurants where id=$1", [id]);
            const restaurantRatingData = await db.query('select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = review.restaurant_id where id=$1;', [req.params.id])

            const reviews = await db.query( "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
            [req.params.id]);
            

            
            res.json({
                status: 'success',
                data: {
                    restaurant: restaurantRatingData.rows,
                    reviews: reviews.rows
                }
            })
        }
        catch(except){
            res.status(500).json({
                status: "error",
                message: except.message??"An error occured"
            })
        }
    })

    //delete restaurant by id
    .delete(async(req, res)=>{
        try{
            const id = req.params.id;
            const result = await db.query("delete from restaurants where id=$1", [id]);
            res.json({
                status: 'success',
                results: result.rows.length,
                data: {
                    restaurant: result.rows
                }
            })
        }
        catch(except){
            res.status(500).json({
                status: "error",
                message: except.message??"An error occured"
            })
        }
    })
    //update restaurant by id
    .put(async (req, res)=>{
        try{
            const id = req.params.id;
            const result = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, id]);
            res.json({
                status: 'success',
                results: result.rows.length,
                data: {
                    restaurants: result.rows
                }
            })
        }
        catch(except){
            res.status(500).json({
                status: "error",
                message: except.message??"An error occured"
            })
        }
    })

    router.post('/:id/addReview', async(req, res)=>{
        try {
            const response = await db.query('insert into reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;', [req.params.id, req.body.name, req.body.review, +req.body.rating]);
            res.json({
                status: 'success',
                data: {
                    review: response.rows[0]
                }
            })
        } catch (error) {
            console.log(error)
        }
    })

module.exports = router