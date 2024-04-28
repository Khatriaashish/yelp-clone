import React, { useContext, useEffect } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import restaurantfinder from '../apis/restaurantfinder';
import {useNavigate} from "react-router-dom";
import StarRating from './StarRating';
const RestaurantList = () => {
    const { restaurants, setRestaurants } = useContext(RestaurantContext);
    const navigate = useNavigate();
    const handleDelete = async(e, id)=>{
        e.stopPropagation();
        try {
            const response = await restaurantfinder.delete('/'+id);
            setRestaurants(restaurants.filter(restaurant=> {
                return restaurant.id !== id
            }));
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async(e, id)=>{
        e.stopPropagation();
        try {
            navigate(`restaurants/${id}/update`)
        } catch (error) {
           console.log(error) 
        }
    }

    const handleRestaurantSelect = (id)=>{
        navigate(`/restaurants/${id}`);

    }

    const renderRating = (restaurant)=>{
        if(!restaurant.count){
            return <span className="text-warning">0 reviews</span>
        }
        return (
            <>
            <StarRating rating={restaurant.average_rating}/>
            <span className="text-warning mx-1">{restaurant.count}</span>
            </>
        )
    }

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                // Fetch restaurants from the context provider
                const response = await restaurantfinder.get('/');
                setRestaurants(response.data.data.restaurants);
                console.log(restaurants)
            } catch (error) {
                console.log(error);
            }
        };
        fetchRestaurant();
    }, [setRestaurants]); // Include setRestaurants in the dependency array

    return (
        <div>
            <div className="list-group">
                <table className="table table-hover">
                    <thead className='bg-primary'>
                        <tr className='bg-primary'>
                            <th scope='col'>Restaurant</th>
                            <th scope='col'>Location</th>
                            <th scope='col'>Price Range</th>
                            <th scope='col'>Ratings</th>
                            <th scope='col'>Edit</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants && restaurants.map(restaurant => (
                            <tr onClick={()=> handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td><button onClick={(e)=>{handleUpdate(e, restaurant.id)}} className="btn btn-warning btn-sm">Edit</button></td>
                                <td><button onClick={(e)=>{handleDelete(e, restaurant.id)}} className="btn btn-danger btn-sm">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RestaurantList;
