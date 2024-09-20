import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/home/home';
import Admin from '../pages/adminpages/admin';
import Orders from '../pages/ordersPages/orders';
import Product from '../pages/productPages/product';
import AdmiLogin from '../pages/adminpages/admiLogin';
import SubcategoryProduct from '../pages/productPages/subcategoryProduct';
import AdminProduct from '../pages/adminpages/adminProduct'; 
import AdminLayout from '../components/adminpages/adminLayout'; 
import AdminInventory from '../pages/adminpages/adminInventory'; 
import AdminOrder from '../pages/adminpages/adminOrder'; 
import Loding from '../pages/lodingPages/loding';




export default function Index() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                  
                    <Route path='/' element={<Navigate to="/Loding" />} />
                    <Route path='/Loding' element={<Loding />} />
                    <Route path='/home' element={<Home />} />

                    <Route element={<AdminLayout />}>
                        <Route path='/Admin' element={<Admin />} />  
                        <Route path='/admin-product' element={<AdminProduct />} /> 
                        <Route path='/admin-inventory' element={<AdminInventory />} />  
                        <Route path='/admin-order' element={<AdminOrder />} /> 
                    </Route>

                    <Route path='/Orders' element={<Orders />} />
                    <Route path='/Product' element={<Product />} />
                    <Route path='/admin-login' element={<AdmiLogin />} />
                    <Route path='/subcategoryProduct/:subcategoryId' element={<SubcategoryProduct />} />  
                   

                </Routes>
            </BrowserRouter>
        </>
    );
}


