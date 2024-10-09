import React, { useState, useContext } from 'react';
import { CartContext } from '../../services/cartContext'; // وارد کردن Context
import { finalizeOrder } from '../../services/orderServices'; // تابع نهایی کردن سفارش

const OrderConfirmationModal = ({ onClose }) => {
  const [userId, setUserId] = useState(''); // اضافه کردن input برای userId
  const { cartItems , clearCart } = useContext(CartContext); // دریافت cartItems از Context

// const handleFinalize = async () => {
//   if (!userId) {
//     alert('لطفا شماره کاربری را وارد کنید');
//     return;
//   }

//   if (cartItems.length === 0) {
//     alert('سبد خرید خالی است. لطفاً محصولی را اضافه کنید.');
//     return;
//   }

//   const orderData = {
//     user: userId,
//     products: cartItems.map((item) => ({
//       product: item._id,
//       count: item.quantity,
//     })),
//   };

//   try {
//     // ارسال سفارش به سرور
//     await finalizeOrder(orderData); // ارسال داده‌ها به سرور

//     // پاک کردن سبد خرید
//     clearCart(); // پاک کردن سبد خرید

//     // آماده‌سازی پارامترهای URL برای ارسال اطلاعات به پروژه دوم
//     const queryParams = new URLSearchParams({
//       user: userId,
//       orderData: JSON.stringify(orderData), 
//       confirmend: 'flase'
//     });

//     // هدایت کاربر به پروژه دوم با پارامترها
//     window.location.href = `http://localhost:5174/confirm-order?${queryParams.toString()}`;

//   } catch (error) {
//     alert('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
//     console.error('Error finalizing order:', error);
//   }
// };

const handleFinalize = () => {
  if (!userId) {
    alert('لطفا شماره کاربری را وارد کنید');
    return;
  }

  if (cartItems.length === 0) {
    alert('سبد خرید خالی است. لطفاً محصولی را اضافه کنید.');
    return;
  }

  // آماده‌سازی پارامترهای URL برای ارسال اطلاعات به پروژه دوم
  const orderData = {
    user: userId,
    products: cartItems.map((item) => ({
      product: item._id,
      count: item.quantity,
    })),
  };

  const queryParams = new URLSearchParams({
    user: userId,
    orderData: JSON.stringify(orderData),
  });

  // هدایت به صفحه تایید سفارش
  window.location.href = `http://localhost:5174/confirm-order?${queryParams.toString()}`;
};
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">نهایی کردن سفارش</h2>
        <label className="block mb-2">شماره کاربری:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button
            onClick={handleFinalize}
            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            تایید
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal; 







// const handleFinalize = async () => {
//   if (!userId) {
//     alert('لطفا شماره کاربری را وارد کنید');
//     return;
//   }

//   // بررسی اینکه سبد خرید خالی نیست
//   if (cartItems.length === 0) {
//     alert('سبد خرید خالی است. لطفاً محصولی را اضافه کنید.');
//     return;
//   }

//   // آماده‌سازی داده‌های سفارش برای ارسال به سرور
//   const orderData = {
//     user: userId, // ارسال userId
//     products: cartItems.map((item) => ({
//       product: item._id, // فقط شناسه محصول باید ارسال شود
//       count: item.quantity,
//     })),
//     deliveryStatus: false, // وضعیت تحویل (false)
//   }; 

//   console.log('دادهای ارسالی' , orderData);

//   // ارسال سفارش به سرور
  // try {
  //   await finalizeOrder(orderData);
  //   // alert('سفارش با موفقیت ثبت شد'); 
  //   clearCart()
  //   onClose(); // بستن مودال 
  //   window.location.href='http://localhost:5174/'
  // } catch (error) {
  //   console.error('خطا در ثبت سفارش:', error);
  //   alert('خطایی رخ داد. لطفا دوباره تلاش کنید.');
  // }
// }; 












// const handleFinalize = async () => {
//   if (!userId) {
//     alert('لطفا شماره کاربری را وارد کنید');
//     return;
//   }

//   if (cartItems.length === 0) {
//     alert('سبد خرید خالی است. لطفاً محصولی را اضافه کنید.');
//     return;
//   }

//   const orderData = {
//     user: userId,
//     products: cartItems.map((item) => ({
//       product: item._id,
//       count: item.quantity,
//     })),
//   };

//   try {
//     // ارسال سفارش به سرور
//     const response = await finalizeOrder(orderData); // ارسال داده‌ها به سرور

//     // پاک کردن سبد خرید
//     clearCart(); // پاک کردن سبد خرید

//     // آماده‌سازی پارامترهای URL برای ارسال اطلاعات به پروژه دوم
//     const queryParams = new URLSearchParams({
//       user: userId,
//       orderData: JSON.stringify(orderData),
//       confirmed: 'true', // اضافه کردن پارامتر confirmed
//     });

//     // هدایت کاربر به پروژه دوم با پارامترها
//     window.location.href = `http://localhost:5174/confirm-order?${queryParams.toString()}`;

//   } catch (error) {
//     alert('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
//     console.error('Error finalizing order:', error);
//   }
// }; 














// const handleFinalize = async () => {
//   if (!userId) {
//     alert('لطفا شماره کاربری را وارد کنید');
//     return;
//   }

//   if (cartItems.length === 0) {
//     alert('سبد خرید خالی است. لطفاً محصولی را اضافه کنید.');
//     return;
//   }

//   const orderData = {
//     user: userId,
//     products: cartItems.map((item) => ({
//       product: item._id,
//       count: item.quantity,
//     })),
//   };

//   // آماده‌سازی پارامترهای URL برای ارسال اطلاعات به پروژه دوم
//   const queryParams = new URLSearchParams({
//     user: userId,
//     orderData: JSON.stringify(orderData),
//   });

//   // هدایت کاربر به پروژه دوم با پارامترها
//   window.location.href = `http://localhost:5174/confirm-order?${queryParams.toString()}`;
// };

// const handleFinalize = async () => {
//   if (!userId) {
//     alert('لطفا شماره کاربری را وارد کنید');
//     return;
//   }

//   if (cartItems.length === 0) {
//     alert('سبد خرید خالی است. لطفاً محصولی را اضافه کنید.');
//     return;
//   }

//   const orderData = {
//     user: userId,
//     products: cartItems.map((item) => ({
//       product: item._id,
//       count: item.quantity,
//     })),
//   };

//   try {
//     // ارسال سفارش به سرور
//     await finalizeOrder(orderData); // اینجا را به تابع finalizeOrder متصل کن
// clearCart()
//     // آماده‌سازی پارامترهای URL برای ارسال اطلاعات به پروژه دوم
//     const queryParams = new URLSearchParams({
//       user: userId,
//       orderData: JSON.stringify(orderData), // توجه داشته باش که ممکن است اینجا نیاز به تغییر باشد
//     });

//     // هدایت کاربر به پروژه دوم با پارامترها
//     window.location.href = `http://localhost:5174/confirm-order?${queryParams.toString()}`;

//   } catch (error) {
//     alert('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
//     console.error('Error finalizing order:', error); // چاپ خطا در کنسول
//   }
// }; 