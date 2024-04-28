import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext';
import restaurantfinder from '../apis/restaurantfinder';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
const RestaurantPage = () => {
    const {id} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantContext);

    useEffect(()=>{
      const fetchRestaurant = async()=>{
        try {
          const response = await restaurantfinder.get(`/${id}`);
          setSelectedRestaurant(response.data.data);
        } catch (error) {
          console.log(error)
        }
      }

      fetchRestaurant();
    }, [])
    console.log(selectedRestaurant)
  return (
    <div>
      {
        selectedRestaurant && (
          <>
          <h1 className='text-center'>
            {selectedRestaurant.restaurant[0].name}
          </h1>
            <div className="mt-3">
              <Reviews reviews={selectedRestaurant.reviews}/>
              <AddReview/>
            </div>
          </>
        )
      }
    </div>
  )
}

export default RestaurantPage
