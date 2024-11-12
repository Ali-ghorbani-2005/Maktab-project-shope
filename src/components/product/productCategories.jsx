import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { numberWithCommas } from '../../utils/dataConverter';


const ProductsCategories = () => {
  const { categoryId } = useParams(); // دریافت آیدی کتگوری از URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // تابع برای دریافت محصولات
  const fetchProducts = async (categorySlug) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8000/api/products?category=${categorySlug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.products; // دریافت محصولات
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // خطا را پرتاب کنید تا در بخش useEffect مدیریت شود
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts(categoryId); // فراخوانی تابع با آیدی کتگوری
        setProducts(productsData); // ذخیره محصولات
      } catch (error) {
        console.error("Error in useEffect:", error);
      } finally {
        setLoading(false); // بارگذاری تمام شده است
      }
    };

    getProducts();
  }, [categoryId]);

  if (loading) {
    return <p>در حال بارگذاری محصولات...</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">محصولات</h1>
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
                      <span className='pr-2'>تومان </span>{numberWithCommas (product.price)}
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
    </div>
  );
};

export default ProductsCategories;