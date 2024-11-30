import React, { useState, useEffect } from "react";
import { fetchProductsBySubcategory } from "../../services/productService";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { numberWithCommas } from "../../utils/dataConverter";

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
    <div className="mt-44 mr-14">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20 ml-10">
          {products.map((product) => (
            <div key={product._id} className="flex flex-col p-4">
              <div className="border h-96 w-full border-zinc-200 shadow-sm rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={`http://${product.images[0]}`}
                    className="w-[300px] h-52 object-cover rounded-t-lg"
                    alt={product.name}
                  />
                  <div className="p-4">
                    <p className="text-xl font-bold">{product.brand}</p>
                    <p className="mt-1 text-slate-600 text-lg">مدل: {product.name}</p>
                    <p className="flex mt-5 text-xl font-semibold">
                      <span className="pr-2">تومان </span>{ numberWithCommas(product.price)}
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