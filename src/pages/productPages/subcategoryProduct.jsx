import React, { useState, useEffect } from "react";
import { fetchProductsBySubcategory } from "../../services/productService";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const SubcategoryProduct = () => {
  const { subcategoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProductsBySubcategory(subcategoryId);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();

  }, [subcategoryId]);
  console.log(products);
  return (
    // <div className="mt-44 mr-14">
    //   {products.length > 0 ? (
    //     <div className="grid grid-cols-4 mt-20 ">
    //       {products.map((product) => (
    //         <div key={product._id} className="flex flex-wrap  p-4 ml-5"> 

    //           <div className=' border  h-96 w-72 border-zinc-400 shadow-sm rounded-lg shadow-black ml-6 hover:shadow-lg hover:shadow-black '> 
    //           <Link to={`/product/${product._id}`}>
    //             <img src={`http://${product.images[0]}`} className='w-52' alt="" />
    //             <p className='text-2xl mt-3 font-bold'>{product.brand}</p>
    //             <p className='mt-2 text-slate-600 text-lg'>مدل{product.name}</p> 
    //             </Link>
    //             <p className='flex mt-5 text-xl'><p>تومان</p>{product.price}</p>

    //           </div> 


    //         </div>

    //       ))}

    //     </div>
    //   ) : (
    //     <p>No products available for this subcategory</p>
    //   )}
    // </div> 



    <div className="mt-44 mr-14">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
          {products.map((product) => (
            <div key={product._id} className="flex flex-col p-4">
              <div className="border h-96 w-full border-zinc-400 shadow-sm rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={`http://${product.images[0]}`}
                    className="w-full h-52 object-cover rounded-t-lg"
                    alt={product.name}
                  />
                  <div className="p-4">
                    <p className="text-xl font-bold">{product.brand}</p>
                    <p className="mt-1 text-slate-600 text-lg">مدل: {product.name}</p>
                    <p className="flex mt-5 text-xl font-semibold">
                      <span>تومان </span>{product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">No products available for this subcategory</p>
      )}
    </div>


  );

};

export default SubcategoryProduct;