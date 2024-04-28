import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantPage from './routes/RestaurantPage';
import { RestaurantContextProvider } from './context/RestaurantContext';

const App = () => {
    return (
        <RestaurantContextProvider>
            <div className='container'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/restaurants/:id/update' element={<UpdatePage />} />
                        <Route path='/restaurants/:id' element={<RestaurantPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </RestaurantContextProvider>
    )
}

export default App;