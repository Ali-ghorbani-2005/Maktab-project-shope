import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/home/home';
import Admin from '../pages/adminpages/admin';
import Orders from '../pages/ordersPages/orders';
import Product from '../pages/productPages/product';

export default function Index() {
    return (
        <>

            <BrowserRouter>

                <Routes>

                    <Route path='/' element={<Home />} />
                    <Route path='/Admin' element={<Admin />} />
                    <Route path='/Orders' element={<Orders />} />
                    <Route path='/Product' element={<Product />} />


                </Routes>

            </BrowserRouter>


        </>
    )
}
