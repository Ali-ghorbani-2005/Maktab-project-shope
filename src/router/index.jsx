import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/home/home';
import Admin from '../pages/adminpages/admin';
import Orders from '../pages/ordersPages/orders';
import Product from '../pages/productPages/product'; 
import AdmiLogin from '../pages/adminpages/admiLogin';

export default function Index() {
    return (
        <>

            <BrowserRouter>

                <Routes>

                    <Route path='/' element={<Home />} />
                    <Route path='/Admin' element={<Admin />} />
                    <Route path='/Orders' element={<Orders />} />
                    <Route path='/Product' element={<Product />} />
                    <Route path='/AdmiLogin' element={<AdmiLogin />} />

                </Routes>

            </BrowserRouter>


        </>
    )
}
