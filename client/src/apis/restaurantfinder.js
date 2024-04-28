import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:2345/api/v1/restaurants",
    
})