import React, { useEffect, useState } from 'react';
import { fetchProductsByIds } from '../../services/productService'; 
import { Link } from 'react-router-dom';

export default function PopularProducts() { 

    const [products, setProducts] = useState([]);
    const productIds = ['', '66e73e59f1027ded62f5a08a', '66ec3543236b3b7bc84b5ccb' , '66e94995778f8357565b66a3'];

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

            <div className='bg-slate-100 border-[1px] border-neutral-400 w-[1300px] rounded-2xl h-[500px]'>  
                <div className='flex justify-end mr-10 '>
                <div className=' flex justify-end '> 
                    
                      <div className=' flex justify-end   '>
                        <p className='flex text-3xl font-bold  mt-0.5   '>پر فروش ها</p>
                      </div> 
                     
                </div>  
                
                </div>
            <div className="products-list flex mt-3">
                {products.length > 0 ? (
                    products.map(product => (
                        product && product ? ( 
                            <div key={product._id} className='flex flex-wrap gap-4 p-4 ml-10'>   
                         <Link to={`/product/${product._id}`}>
                            <div className=' border-2 h-96 border-zinc-400 shadow-md shadow-black ml-6 hover:shadow-lg hover:shadow-black '>
                                
                            
                            <img src={`http://${product.images[0]}`} className='w-52' alt="" />
                               <p className='text-2xl mt-3 font-bold'>{product.brand}</p>
                                <p className='mt-2 text-slate-600 text-lg'>مدل{product.name}</p>
                                <p className='flex mt-5 text-xl'><p>تومان</p>{product.price}</p>  
                               
                                </div>  
                                </Link>
                              
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
  )
}
