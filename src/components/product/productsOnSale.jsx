// import React, { useEffect, useState } from 'react';
// import { fetchProductsByIds } from '../../services/productService';
// import { Link } from 'react-router-dom';
// import './product.css'

// const ProductByIds = () => {
//     const [products, setProducts] = useState([]);
//     const productIds = ['66e1d5c777b825705a3770ce', '66ec3469236b3b7bc84b5cb7', '66e73575f1027ded62f5a06c', '66eb12a6a2b620243a107b33']; // آیدی‌های محصولات

//     useEffect(() => {
//         const loadProducts = async () => {
//             try {
//                 const data = await fetchProductsByIds(productIds);
//                 console.log('Fetched Products:', data);

//                 // استخراج محصول از ساختار داده‌ای
//                 const productsArray = data.map(item => item.data.product).filter(product => product);
//                 setProducts(productsArray);
//             } catch (error) {
//                 console.error('Failed to load products', error);
//             }
//         };

//         loadProducts();
//     }, []);

//     return (
//         <>


//             <div className='flex justify-center items-center'>
//                 <div className='bg-slate-100 border-5 border-red-600 md:w-[1400px] sm:w-[750px] rounded-2xl h-[500px] shadow-lg'>
//                     <div className='flex justify-center items-center'>
//                         <div className='bg-red-500 mt-3 h-14 md:w-[1260px] sm:w-[600px] flex justify-center items-center rounded-xl'>
//                             <div className='pulse-effect'>
//                                 <div className='border-2 w-24 h-8 border-white flex justify-center items-center rounded-md'>
//                                     <p className='flex text-2xl text-white'>
//                                         <span className='text-yellow-300 text-3xl'>%</span> OFF
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="products-list flex flex-wrap justify-center mt-4">
//                         {products.length > 0 ? (
//                             products.map(product => (
//                                 product && product ? (
//                                     <div key={product._id} className='flex flex-col items-center gap-4 p-4'>
//                                         <div className='border-2 h-96 border-zinc-400 w-52 shadow-md hover:shadow-lg hover:shadow-black rounded-lg transition duration-300'>
//                                             <Link to={`/product/${product._id}`}>
//                                                 <img src={`http://${product.images[0]}`} className='w-52 h-48 object-cover rounded-t-lg' alt={product.name} />
//                                                 <div className='p-4'>
//                                                     <p className='text-2xl font-bold'>{product.brand}</p>
//                                                     <p className='mt-2 text-slate-600 text-lg'>مدل {product.name}</p>
//                                                     <p className='flex mt-5 text-xl'><span>تومان</span> {product.price}</p>
//                                                 </div>
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <p key={product._id}>Product data is incomplete</p>
//                                 )
//                             ))
//                         ) : (
//                             <p>No products available</p>
//                         )}
//                     </div>
//                 </div>
//             </div>

//         </>
//     );
// };

// export default ProductByIds;  




import React, { useEffect, useState } from 'react';
import { fetchProductsByIds } from '../../services/productService';
import { Link } from 'react-router-dom';
import './product.css';

const ProductByIds = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const productIds = ['66e1d5c777b825705a3770ce', '66ec3469236b3b7bc84b5cb7', '66e73575f1027ded62f5a06c', '66eb12a6a2b620243a107b33'];

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProductsByIds(productIds);
                const productsArray = data.map(item => item.data.product).filter(product => product);
                setProducts(productsArray);
            } catch (error) {
                console.error('Failed to load products', error);
            }
        };

        loadProducts();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 2) % products.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 2 + products.length) % products.length);
    };

    // محاسبه تعداد محصولات قابل نمایش
    const getVisibleProducts = () => {
        return products.slice(currentIndex, currentIndex + 2);
    };

    return (
        <>
            <div className='flex justify-center items-center'>
                <div className='bg-slate-100 border-5 border-red-600 md:w-[1400px] sm:w-[750px] rounded-2xl h-[500px] shadow-lg'>
                    <div className='flex justify-center items-center'>
                        <div className='bg-red-500 mt-3 h-14 md:w-[1260px] sm:w-[600px] flex justify-center items-center rounded-xl'>
                            <div className='pulse-effect'>
                                <div className='border-2 w-24 h-8 border-white flex justify-center items-center rounded-md'>
                                    <p className='flex text-2xl text-white'>
                                        <span className='text-yellow-300 text-3xl'>%</span> OFF
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="products-list flex flex-wrap justify-center mt-4">
                        <div className="flex">
                            {getVisibleProducts().length > 0 ? (
                                getVisibleProducts().map(product => (
                                    <div key={product._id} className='flex flex-col items-center gap-4 p-4'>
                                        <div className='border-2 h-96 border-zinc-400 w-52 shadow-md hover:shadow-lg hover:shadow-black rounded-lg transition duration-300'>
                                            <Link to={`/product/${product._id}`}>
                                                <img src={`http://${product.images[0]}`} className='w-52 h-48 object-cover rounded-t-lg' alt={product.name} />
                                                <div className='p-4'>
                                                    <p className='text-2xl font-bold'>{product.brand}</p>
                                                    <p className='mt-2 text-slate-600 text-lg'>مدل {product.name}</p>
                                                    <p className='flex mt-5 text-xl'><span>تومان</span> {product.price}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No products available</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button onClick={prevSlide} className="bg-gray-300 rounded p-2 hover:bg-gray-400">
                            قبلی
                        </button>
                        <button onClick={nextSlide} className="bg-gray-300 rounded p-2 hover:bg-gray-400">
                            بعدی
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductByIds;






{/* <div className='flex justify-center items-center'> 

            <div className='bg-slate-100 border-[5px] border-red-600 md:w-[1400px] sm:w-[750px] sm: rounded-2xl h-[500px]'>  
                <div className='flex justify-center items-center'>
                <div className='bg-red-500 mt-3 h-14 md:w-[1260px] sm:w-[600px]  flex justify-center items-center rounded-xl '> 
                       
                       <div className='pulse-effect'>
                      <div className='border-2  w-24 h-8 border-white flex justify-center items-center rounded-[3px]'>
                        <p className='flex text-2xl text-white mt-0.5'> <p className='text-yellow-300 text-3xl'>%</p>OFF</p>
                      </div>  
                      </div>
                     
                </div>  
                
                </div>
            <div className="products-list flex">
                {products.length > 0 ? (
                    products.map(product => (
                        product && product ? ( // بررسی وجود product و thumbnail 
                            <div key={product._id} className='flex flex-wrap gap-4  p-4 sm:-mr-10 md:ml-16'>   
                         
                            <div className=' border-2 h-96 border-zinc-400 shadow-md  sm:h-80 md:h-96 sm:w-36 md:w-52 shadow-black ml-6 hover:shadow-lg hover:shadow-black '>
                                
                            <Link to={`/product/${product._id}`}>
                            <img src={`http://${product.images[0]}`} className='w-52' alt="" />
                               <p className='text-2xl mt-3 font-bold'>{product.brand}</p>
                                <p className='mt-2 text-slate-600 text-lg'>مدل{product.name}</p>
                                <p className='flex mt-5 text-xl'><p>تومان</p>{product.price}</p>  
                                </Link>
                                </div> 
                              
                            </div>
                        ) : (
                            <p key={product._id}>Product data is incomplete</p>
                        )
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>  
        </div> */}