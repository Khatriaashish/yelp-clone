import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import restaurantfinder from '../apis/restaurantfinder';

const UpdateRestaurant = () => {
    const { id } = useParams();
    const [ name, setName ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ priceRange, setPriceRange ] = useState("Price Range");

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const updateRestaurant = await restaurantfinder.put(`/${id}`, {
                name,
                location,
                price_range: priceRange
            });
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await restaurantfinder.get(`/${id}`);
                console.log(response)
                setName(response.data.data.restaurant[0].name);
                setLocation(response.data.data.restaurant[0].location);
                setPriceRange(response.data.data.restaurant[0].price_range);
                console.log(name, location)
            } catch (error) {
                
            }
        }

        fetchData();
    }, [])
  return (
    <div>
        <h1>{name}</h1>
      <form action="">
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
             className='form-control' 
             type="text"
             value={name}
                onChange={(e)=>setName(e.target.value)} 
             />
        </div>
        <div className="form-group">
            <label htmlFor="location">Location</label>
            <input value={location}
                onChange={(e)=>setLocation(e.target.value)}
                className='form-control' type="text" />
        </div>
        <div className="form-group">
            <label htmlFor="priceRange">PriceRange</label>

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
        <div>
            <button type='submit' onClick={handleSubmit} className='btn btn-primary btn-sm'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateRestaurant
