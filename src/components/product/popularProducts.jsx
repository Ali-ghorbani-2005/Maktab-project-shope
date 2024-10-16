import React, { useEffect, useState } from 'react';
import { fetchProductsByIds } from '../../services/productService';
import { Link } from 'react-router-dom';

export default function PopularProducts() {

    const [products, setProducts] = useState([]);
    const productIds = ['66e94a7f778f8357565b66ab', '66e73e59f1027ded62f5a08a', '66ec3543236b3b7bc84b5ccb', '66e94995778f8357565b66a3'];

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
                <div className='bg-slate-100 border border-neutral-400 w-full md:w-[1300px] rounded-2xl h-auto p-6'>
                    <div className='flex justify-end mb-4'>
                        <p className='text-3xl font-bold'>پر فروش ها</p>
                    </div>
                    <div className="products-list grid grid-cols-2 md:grid-cols-4 gap-4">
                        {products.length > 0 ? (
                            products.map(product => (
                                product ? (
                                    <div key={product._id} className='flex flex-col items-center border-2 h-auto border-zinc-400 shadow-md hover:shadow-lg hover:shadow-black p-4'>
                                        <Link to={`/product/${product._id}`}>
                                            <img src={`http://${product.images[0]}`} className='w-full h-48 object-cover rounded-lg' alt={product.name} />
                                            <p className='text-2xl mt-3 font-bold'>{product.brand}</p>
                                            <p className='mt-2 text-slate-600 text-lg'>مدل {product.name}</p>
                                            <p className='flex mt-5 text-xl'><span>تومان</span> {product.price}</p>
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
