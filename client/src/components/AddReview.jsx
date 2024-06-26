import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import restaurantfinder from '../apis/restaurantfinder'

const AddReview = () => {
    const [name, setName] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState("")
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmitReview = async(e)=>{
        e.preventDefault();
        try {
            const response = await restaurantfinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating
            })
            navigate('/');
            
        } catch (error) {
            console.log(error)
        }

    }
    

  return (
    <div className='mb-3'>
        <form action="">
            <div className="form-row">
                <div className="form-group col-8">
                    <label htmlFor="name">Name</label>
                    <input 
                    id='name' 
                    placeholder="Name" 
                    className="form-control" 
                    type="text" 
                    value={name} 
                    onChange={e=>setName(e.target.value)}/>
                </div>
                <div className="form-group col-8">
                    <label htmlFor="rating">Rating</label>
                    <select 
                    value={rating} 
                    onChange={e=>setRating(e.target.value)}
                    id="rating" 
                    className='form-select'>
                        <option value="" disabled>rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="Review">Review</label>
                <textarea 
                value={reviewText} 
                onChange={e=>setReviewText(e.target.value)}
                id="Review" 
                className='form-control'></textarea>
            </div>
            <button type="submit" onClick={handleSubmitReview} className='btn btn-primary mt-2'>Submit</button>
        </form>
    </div>
  )
}

export default AddReview
