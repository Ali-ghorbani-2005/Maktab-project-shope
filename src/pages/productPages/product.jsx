import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../services/productService';
import { CartContext } from '../../services/cartContext';
import { numberWithCommas } from '../../utils/dataConverter';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [availableStock, setAvailableStock] = useState(0); // موجودی محصول
  const [errorMessage, setErrorMessage] = useState(''); // پیام خطا
  const [displayMessage, setDisplayMessage] = useState(''); // پیام نمایش داده شده
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetchProductById(id);
        setProduct(response.data.product);
        setAvailableStock(response.data.product.quantity || 0); // استفاده از quantity برای موجودی
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

  const handleAddToCart = () => {
    setShowModal(true);
    setErrorMessage(''); // پاک کردن پیام خطا هنگام باز شدن مودال
  };

  const handleConfirmOrder = () => {
    if (quantity > availableStock) {
      const message = `مجاز به انتخاب بیشتر از ${availableStock} تا نیستید.`;
      setDisplayMessage(message);
      setTimeout(() => {
        setDisplayMessage('');
      }, 2000);
    } else {
      addToCart(product, quantity);
      setShowModal(false);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + change;
      if (newQuantity < 1) return 1; // حداقل 1 عدد
      if (newQuantity > availableStock) {
        const message = `مجاز به انتخاب بیشتر از ${availableStock} تا نیستید.`;
        setDisplayMessage(message);
        setTimeout(() => {
          setDisplayMessage('');
        }, 2000);
        return availableStock; // حداکثر برابر با موجودی
      }
      return newQuantity;
    });
  };

  return (
    <div className="mt-48 mx-auto max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* اسلایدر تصاویر */}
        <div className="relative">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-right">
            {product.name} مدل <span className="text-darkGold">{product.brand}</span>
          </h1>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src={`http://${product.images[currentImageIndex]}`}
              alt={`${product.name} - تصویر ${currentImageIndex + 1}`}
              className="w-[52%] ml-48 h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              ◀
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-opacity-75"
            >
              ▶
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {product.images.map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-slate-400' : 'bg-gray-500'}`}
                ></span>
              ))}
            </div>
          </div>
        </div>

        {/* اطلاعات محصول */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 text-right">خرید بیمه برای محصول</p>
            <div className="flex justify-end mt-2">
              <button className="w-32 h-8 rounded-lg border-2 border-blue-500 text-blue-500 text-sm flex items-center">
                <span className="text-lg">+</span>
                <span className="ml-2">بیمه میخواهم</span>
              </button>
            </div>
            <p className="flex justify-end text-sm text-gray-700 font-semibold mt-2">
              <span className="text-xs pr-1">تومان</span> {numberWithCommas(170000)}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-end text-sm text-darkGold font-semibold">موجود در انبار فروشنده - ارسال 1 روز کاری</p>
            <p className="text-sm flex justify-end font-semibold">
              <span className="text-green-500">عالی</span>:<span className="text-gray-700">ارزیابی عملکرد</span>
            </p>
            <p className="flex justify-end font-semibold text-sm mt-2">
              ماه گارانتی شرکتی: <span className="ml-1">{numberWithCommas(18)}</span>
            </p>
          </div>

          {/* نمایش موجودی به رنگ قرمز */}
          <div className="flex justify-end font-semibold text-sm mt-2 text-red-500">
            موجودی: <span className="ml-1">{availableStock}</span>
          </div>

          <div className="flex items-baseline justify-end mb-4">
            <span className="text-gray-600 font-semibold">تومان</span>
            <span className="text-2xl ml-1">{numberWithCommas(product.price)}</span>
          </div>

          <div className="flex justify-center">
            <button onClick={handleAddToCart} className="bg-lightGreen font-semibold text-xl text-white py-3 px-8 rounded-lg hover:bg-green-500 transition duration-300">
              خرید
            </button>
          </div>
        </div>
      </div>

     

      {/* توضیحات محصول */}
      <div className="rounded-xl border-2 border-darkGold p-4 mt-6">
        <p className="text-gray-700 mb-2 text-lg font-bold text-right">توضیحات:</p>
        <p className="font-semibold text-right">{product.description}</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-600">
              X
            </button>
            <div >
              {displayMessage && (
                <div className="mt-1 text-red-600 text-center font-semibold">
                  {displayMessage}
                </div>
              )}
            </div>
            <h2 className="text-lg font-bold mb-4 mt-5">انتخاب تعداد</h2>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                +
              </button>
            </div>
            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
            <button
              onClick={handleConfirmOrder}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;