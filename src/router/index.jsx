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
import HomeLayout from '../components/component-home/HomeLayout/homeLayout';
import AllLaptops from '../pages/productPages/allLaptops';
import { CartProvider } from '../services/cartContext';
import FinalizeOrderPage from '../components/orderComponents/FinalizeOrderPage';
import AllPhone from '../pages/productPages/allPhone';
import UserInfo from '../components/orderComponents/UserInfo';
import SuccessPurchase from '../pages/Transaction/successPurchase';
import CancelPurchase from '../pages/Transaction/cancelPurchase';
import ProductsCategories from '../components/product/productCategories';


export default function Index() {
    return (
        <> 
             <CartProvider> 

            <BrowserRouter> 
                <Routes>
                    <Route path='/' element={<Navigate to="/Loding" />} />
                    <Route path='/Loding' element={<Loding />} />


                    {/* Admin Routes */}
                    <Route element={<AdminLayout />}>
                        <Route path='/Admin' element={<Admin />} />
                        <Route path='/admin-product' element={<AdminProduct />} />
                        <Route path='/admin-inventory' element={<AdminInventory />} />
                        <Route path='/admin-order' element={<AdminOrder />} />
                    </Route>

                    {/* Home Routes */}
                    <Route element={<HomeLayout />}>
                        <Route path='/home' element={<Home />} />
                        <Route path='/subcategoryProduct/:subcategoryId' element={<SubcategoryProduct />} />
                        <Route path='/finalize-order' element={<FinalizeOrderPage />} />
                            <Route path='/Orders' element={<Orders />} />
                            <Route path='/Product/:id' element={<Product />} />
                        
                        <Route path='/all-laptops' element={<AllLaptops />} /> 
                        <Route path='/all-phone' element={<AllPhone />} /> 
                        <Route path='//products-categories/:categoryId' element={<ProductsCategories />} /> 
                        <Route path='/user-info' element={<UserInfo />} />
                    </Route>

                    {/* Admin Login */}
                    <Route path='/admin-login' element={<AdmiLogin />} /> 
                     
                    <Route path='/success-purchase' element={<SuccessPurchase />} />  
                    <Route path='/cancel-purchase' element={<CancelPurchase />} /> 
                </Routes>
            </BrowserRouter>  
            
            </CartProvider>
        </>
    );
}


