// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchProductById } from '../../services/productService';

// const Product = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0); // ایندکس تصویر فعلی

//   useEffect(() => {
//     const getProduct = async () => {
//       try {
//         const response = await fetchProductById(id);
//         setProduct(response.data.product);
//         setLoading(false);
//       } catch (error) {
//         setError('خطا در دریافت اطلاعات محصول');
//         setLoading(false);
//       }
//     };

//     getProduct();
//   }, [id]);

//   if (loading) {
//     return <div>در حال بارگذاری...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!product) {
//     return <div>محصول یافت نشد</div>;
//   }

//   // هندل کردن تغییر به تصویر بعدی
//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   // هندل کردن تغییر به تصویر قبلی
//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">

//      <div className='flex justify-end'>
//       <div className='border-2 border-gray-300 w- h-14  rounded-lg mt-10'>
//         <h1 className="text-2xl flex justify-end font-bold mb-4 mt-3 mr-2  " > {product.name}<p>مدل</p><p>{product.brand}</p> <p>برند</p> {product.category.name} <p>دسته بندی</p> </h1>
//       </div> 
//       </div>

//       {/* اسلایدر تصاویر */}
//       <div className='mt-3'>
//         {product.images && product.images.length > 0 && (
//           <div className="relative w-full max-w-lg mx-auto ">
//             <div className="relative h-96 overflow-hidden rounded-lg">
//               {/* تصویر فعلی */}
//               <img
//                 src={`http://${product.images[currentImageIndex]}`}
//                 alt={`${product.name} - تصویر ${currentImageIndex + 1}`}
//                 className=" w-64 ml-28 object-cover"
//               />
//             </div>

//             {/* دکمه‌های قبلی و بعدی */}
//             <button
//               onClick={prevImage}
//               className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
//             >
//               ◀
//             </button>
//             <button
//               onClick={nextImage}
//               className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
//             >
//               ▶
//             </button>

//             {/* نشانگرها */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//               {product.images.map((_, index) => (
//                 <span
//                   key={index}
//                   className={`w-3 h-3 rounded-full ${currentImageIndex === index
//                       ? 'bg-white'
//                       : 'bg-gray-400'
//                     }`}
//                 ></span>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>


     
//       <p className="mb-2">قیمت: {product.price} تومان</p>
     
//       <p className="mb-4">توضیحات: {product.description}</p>
//       <p className="mb-2">دسته‌بندی: {product.category.name}</p>
//       <p className="mb-4">زیر دسته: {product.subcategory.name}</p>

//     </div>
//   );
// };

// export default Product; 






import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../services/productService';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetchProductById(id);
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        setError('خطا در دریافت اطلاعات محصول');
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-lg text-gray-700">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-10 text-gray-500">محصول یافت نشد</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      {/* اطلاعات محصول */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* اسلایدر تصاویر */}
        <div className="relative">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <img
              src={`http://${product.images[currentImageIndex]}`}
              alt={`${product.name} - تصویر ${currentImageIndex + 1}`}
              className=" w-96 ml-28 object-cover"
            />
          </div>
          {/* دکمه‌های قبلی و بعدی */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            ◀
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            ▶
          </button>
          {/* نشانگرها */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {product.images.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentImageIndex === index ? 'bg-slate-400' : 'bg-gray-500'
                }`}
              ></span>
            ))}
          </div>
        </div>

       
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-2"><span className="font-semibold text-xl">برند:</span> {product.brand}</p>
          <p className="text-gray-700 mb-2 flex"><p className="font-semibold">قیمت:</p> <p className='text-lg font-mono'>تومان</p> {product.price} </p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">تعداد موجود:</span> {product.quantity}</p>
          <p className="text-gray-700 mb-4 flex"><p className="font-semibold">توضیحات:</p> {product.description}</p>
       
        </div>
      </div>

     
      <div className="mt-8 flex justify-center">
        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
};

export default Product;