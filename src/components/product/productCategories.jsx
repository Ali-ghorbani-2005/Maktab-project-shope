// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ProductsCategories = () => {
//   const { categoryId } = useParams(); // دریافت آیدی کتگوری از URL
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:8000/api/products?categoryId=${categoryId}`);
// //         setProducts(response.data.data.products); // ذخیره محصولات
// //       } catch (error) {
// //         console.error("Error fetching products:", error);
// //       } finally {
// //         setLoading(false); // بارگذاری تمام شده است
// //       }
// //     };

// //     fetchProducts();
// //   }, [categoryId]); 


// useEffect(() => {
//     const fetchProducts = async () => {
//       const token = localStorage.getItem('token'); // دریافت توکن از localStorage

//       try {
//         const response = await axios.get(`http://localhost:8000/api/products?categoryId=${categoryId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // اضافه کردن توکن به هدر
//           },
//         });
//         setProducts(response.data.data.products); // ذخیره محصولات
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false); // بارگذاری تمام شده است
//       }
//     };

//     fetchProducts();
//   }, [categoryId]);

//   if (loading) {
//     return <p>در حال بارگذاری محصولات...</p>;
//   }

//   return (
//     <div className="container mx-auto mt-10">
//       <h1 className="text-2xl font-semibold mb-4">محصولات</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div key={product._id} className="border rounded-lg p-4">
//               <img src={product.thumbnail} alt={product.name} className="w-full h-40 object-cover mb-4" />
//               <h2 className="text-lg font-bold">{product.name}</h2>
//               <p className="text-gray-500">قیمت: {product.price.toLocaleString()} تومان</p>
//               <p className="text-sm">{product.description.slice(0, 100)}...</p>
//             </div>
//           ))
//         ) : (
//           <p>محصولی یافت نشد.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductsCategories;   





import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import axios from 'axios'; 


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
    </div>
  );
};

export default ProductsCategories;