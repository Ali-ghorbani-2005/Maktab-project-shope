

import React, { useState, useEffect } from "react";
import { fetchProductsBySubcategory } from "../../services/productService"; // Fetch products by subcategory
import { useParams } from "react-router-dom"; // Get subcategoryId from the URL

const SubcategoryProduct = () => {
  const { subcategoryId } = useParams(); // Get subcategoryId from the route params
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

  return (
    <div className="mt-4">
      {products.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-sm">{product.description}</p>
              <p className="text-green-500 font-semibold">${product.price}</p> 
              <img src={product.thumbnail} alt="" />
            </div>
          ))}
        </div>
      ) : (
        <p>No products available for this subcategory</p>
      )}
    </div>
  );
};

export default SubcategoryProduct;