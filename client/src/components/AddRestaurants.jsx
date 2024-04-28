import React, { useContext, useState } from 'react'
import restaurantfinder from '../apis/restaurantfinder';
import { RestaurantContext } from '../context/RestaurantContext';

const AddRestaurants = () => {
  const {addRestaurants} = useContext(RestaurantContext);
  const [ name, setName ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ priceRange, setPriceRange ] = useState("Price Range");

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await restaurantfinder.post('/', {
        name: name,
        location: location,
        price_range: priceRange
      })
      console.log(response);
      addRestaurants(response.data.data.restaurants);
    } catch (error) {
      
    }
  }
  return (
    <div className='mb-4'>
      <form action="">
        <div className="row">
            <div className="col">
                <input type="text" 
                className='form-control' 
                placeholder='Name of the restaurant' 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className="col">
                <input type="text" 
                className='form-control' 
                placeholder='Location'
                value={location}
                onChange={(e)=>setLocation(e.target.value)}/>
            </div>
            <div className="col">
                <select 
                className='form-select my-1 mr-sm-2'
                value={priceRange}
                onChange={(e)=>setPriceRange(e.target.value)}
                >
                    <option disabled>Price Range</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>
            </div>
            <button 
            className="btn btn-primary btn-sm col"
            onClick={handleSubmit}
            >Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurants
