import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/home/home';
import Admin from '../pages/adminpages/admin';
import Orders from '../pages/ordersPages/orders';
import Product from '../pages/productPages/product';
import AdmiLogin from '../pages/adminpages/admiLogin';
import SubcategoryProduct from '../pages/productPages/subcategoryProduct';
import AdminProduct from '../pages/adminpages/adminProduct'; 
import AdminLayout from '../components/adminpages/adminLayout';



export default function Index() {
    return (
        <>

            <BrowserRouter>


                <Routes>

                    <Route path='/' element={<Home />} />

                    <Route element={<AdminLayout />}>
                    <Route path='/Admin' element={<Admin />} />  
                    <Route path='/AdminProduct' element={<AdminProduct />} />
                    </Route>
                    <Route path='/Orders' element={<Orders />} />
                    <Route path='/Product' element={<Product />} />
                    <Route path='/admin-login' element={<AdmiLogin />} />
                    <Route path='/subcategoryProduct/:subcategoryId' element={<SubcategoryProduct />} />
                    




                </Routes>

            </BrowserRouter>


        </>
    )
}  





// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// import Home from '../pages/home/home';
// import Admin from '../pages/adminpages/admin';
// import Orders from '../pages/ordersPages/orders';
// import Product from '../pages/productPages/product';
// import AdmiLogin from '../pages/adminpages/admiLogin';
// import SubcategoryProduct from '../pages/productPages/subcategoryProduct';
// import AdminProduct from '../pages/adminpages/adminProduct';
// import AdminLayout from '../pages/adminpages/adminLayout';



// export default function Index() {
//     return (
//         <>
//             <BrowserRouter>
//                 <Routes>
//                     <Route path='/' element={<Home />} />
//                     <Route path='/admin-login' element={<AdmiLogin />} />
//                     <Route element={<AdminLayout />}>
//                         <Route path='/Admin' element={<Admin />} />
//                         <Route path='/AdminProduct' element={<AdminProduct />} />
//                     </Route>
//                     <Route path='/Orders' element={<Orders />} />
//                     <Route path='/Product' element={<Product />} />

//                     <Route path='/subcategoryProduct/:subcategoryId' element={<SubcategoryProduct />} />
//                 </Routes>
//             </BrowserRouter>
//         </>
//     );
// }







