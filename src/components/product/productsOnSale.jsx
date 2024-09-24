import React, { useEffect, useState } from 'react';
import { fetchProductsByIds } from '../../services/productService';
 
const ProductByIds = () => {
    const [products, setProducts] = useState([]);
    const productIds = ['66e1d5c777b825705a3770ce', '66ec3469236b3b7bc84b5cb7', '66e73575f1027ded62f5a06c' , '66eb12a6a2b620243a107b33']; // آیدی‌های محصولات

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProductsByIds(productIds);
                console.log('Fetched Products:', data);

                // استخراج محصول از ساختار داده‌ای
                const productsArray = data.map(item => item.data.product).filter(product => product);
                setProducts(productsArray); 
            } catch (error) {
                console.error('Failed to load products', error);
            }
        };

        loadProducts();
    }, []);

    return ( 
        <>
        <div className='flex justify-center items-center'> 

            <div className='bg-slate-100 border-[5px] border-red-600 w-[1300px] rounded-2xl h-[500px]'>  
                <div className='flex justify-center items-center'>
                <div className='bg-red-500 mt-3 h-14 w-[1260px] flex justify-center items-center rounded-xl '> 
                    
                      <div className='border-2  w-24 h-8 border-white flex justify-center items-center rounded-[3px]'>
                        <p className='flex text-2xl text-white mt-0.5'> <p className='text-yellow-300 text-3xl'>%</p>OFF</p>
                      </div> 
                     
                </div>  
                
                </div>
            <div className="products-list flex">
                {products.length > 0 ? (
                    products.map(product => (
                        product && product ? ( // بررسی وجود product و thumbnail 
                            <div key={product._id} className='flex flex-wrap gap-4 p-4 ml-10'>   
                         
                            <div className=' border-2 h-96 border-zinc-400 shadow-md shadow-black ml-6 hover:shadow-lg hover:shadow-black '>
                                
                            
                            <img src={`http://${product.images[0]}`} className='w-52' alt="" />
                               <p className='text-2xl mt-3 font-bold'>{product.brand}</p>
                                <p className='mt-2 text-slate-600 text-lg'>مدل{product.name}</p>
                                <p className='flex mt-5 text-xl'><p>تومان</p>{product.price}</p>  
                                
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
        </div>

        </>
    );
};

export default ProductByIds;