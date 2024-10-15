// import React, { useState } from 'react';

// const UserInfo = () => {
//     const [deliveryDate, setDeliveryDate] = useState('');

//     const handlePurchase = () => {
//         // اینجا می‌توانید منطق خرید را پیاده‌سازی کنید و به پروژه دوم هدایت کنید
//         alert(`خرید با تاریخ تحویل ${deliveryDate} تایید شد.`);
//     };

//     return (
//         <div className="container mx-auto mt-44">
//             <h1 className="text-3xl font-semibold mb-6">اطلاعات کاربر</h1>
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">تاریخ تحویل (شمسی)</label>
//                 <input
//                     type="date"
//                     value={deliveryDate}
//                     onChange={(e) => setDeliveryDate(e.target.value)}
//                     className="border border-gray-300 p-2 rounded-lg w-full"
//                 />
//             </div>
//             <button onClick={handlePurchase} className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4">
//                 خرید
//             </button>
//         </div>
//     );
// };

// export default UserInfo; 



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../services/cartContext'; // فرض کنید CartContext شامل اطلاعات سبد خرید است

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { cartItems } = React.useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    // فرض کنید اطلاعات کاربر از localStorage یا API دریافت می‌شود
    const token = localStorage.getItem('token');
    if (token) {
      // در اینجا می‌توانید اطلاعات کاربر را از API بگیرید
      // برای مثال:
      const decoded = JSON.parse(atob(token.split('.')[1])); // فرض بر این است که توکن شامل اطلاعات کاربر است
      setUserInfo(decoded);
    } else {
      navigate('/login'); // اگر کاربر لاگین نکرده باشد به صفحه لاگین بروید
    }
  }, [navigate]);

  const handlePurchase = () => {
    if (!userInfo) {
      alert('لطفا ابتدا وارد شوید.');
      return;
    }

    if (cartItems.length === 0) {
      alert('سبد خرید خالی است. لطفاً محصولی را اضافه کنید.');
      return;
    }

    // آماده‌سازی پارامترهای URL برای ارسال اطلاعات به پروژه دوم
    const orderData = {
      user: userInfo.id, // فرض کنید id کاربر در اطلاعات کاربر موجود است
      products: cartItems.map((item) => ({
        product: item._id,
        count: item.quantity,
      })),
    };

    const queryParams = new URLSearchParams({
      user: userInfo.id,
      orderData: JSON.stringify(orderData),
    });

    // هدایت به صفحه تایید سفارش پروژه دوم
    window.location.href = `http://localhost:5174/confirm-order?${queryParams.toString()}`;
  };

  return (
    <div className="container mx-auto mt-44">
      <h1 className="text-3xl font-semibold mb-6">اطلاعات کاربر</h1>
      {userInfo ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg font-bold">نام: {userInfo.name}</p>
          <p className="text-lg font-bold">ایمیل: {userInfo.email}</p>
          <p className="text-lg font-bold">شماره کاربری: {userInfo.username}</p>
          <button
            onClick={handlePurchase}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
          >
            خرید
          </button>
        </div>
      ) : (
        <p className="text-gray-500">بارگذاری اطلاعات...</p>
      )}
    </div>
  );
};

export default UserInfo;