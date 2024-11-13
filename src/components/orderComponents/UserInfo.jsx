// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CartContext } from '../../services/cartContext';

// const UserInfo = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [deliveryDate, setDeliveryDate] = useState(''); // اضافه کردن state برای تاریخ تحویل
//   const { cartItems } = React.useContext(CartContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decoded = JSON.parse(atob(token.split('.')[1]));
//       // فراخوانی API برای دریافت اطلاعات کاربر
//       fetch(`http://localhost:8000/api/users/${decoded.id}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('خطا در دریافت اطلاعات کاربر');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setUserInfo(data.data.user); // دسترسی به داده کاربر
//         })
//         .catch((error) => {
//           console.error('Error fetching user info:', error);
//           navigate('/login');
//         });
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handlePurchase = () => {
//     if (!userInfo) {
//       alert('لطفا ابتدا وارد شوید.');
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert('سبد خرید خالی است. لطفاً محصولی را اضافه کنید.');
//       return;
//     }

//     if (!deliveryDate) {
//       alert('لطفا تاریخ تحویل را انتخاب کنید.');
//       return;
//     }

//     const orderData = {
//       user: userInfo._id,
//       products: cartItems.map((item) => ({
//         product: item._id,
//         count: item.quantity,
//       })),
//       deliveryDate, // اضافه کردن تاریخ تحویل به داده‌های سفارش
//     };

//     const queryParams = new URLSearchParams({
//       user: userInfo._id,
//       orderData: JSON.stringify(orderData),
//     });

//     window.location.href = `http://localhost:5174/confirm-order?${queryParams.toString()}`;
//   };

//   return (
//     <div className="container mx-auto mt-44">
//       <h1 className="text-3xl font-semibold mb-6">اطلاعات خریدار</h1>
//       {userInfo ? (
//         <div className="bg-white p-6 rounded-lg shadow-lg text-right">
//           <p className="text-lg font-bold">نام: {userInfo.firstname}</p>
//           <p className="text-lg font-bold">نام خانوادگی: {userInfo.lastname}</p>
//           <p className="text-lg font-bold">نام کاربری: {userInfo.username}</p>
//           <p className="text-lg font-bold">شماره تماس: {userInfo.phoneNumber}</p>
//           <p className="text-lg font-bold">آدرس: {userInfo.address}</p>

//           {/* فیلد ورودی برای تاریخ تحویل */}
//           <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
//             تاریخ تحویل:
//           </label>
//           <input
//             type="date"
//             value={deliveryDate}
//             onChange={(e) => setDeliveryDate(e.target.value)}
//             className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-150 ease-in-out"
//           />

//           <button
//             onClick={handlePurchase}
//             className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
//           >
//             خرید
//           </button>
//         </div>
//       ) : (
//         <p className="text-gray-500">بارگذاری اطلاعات...</p>
//       )}
//     </div>
//   );
// };

// export default UserInfo; 






// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CartContext } from '../../services/cartContext';

// const UserInfo = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [deliveryDate, setDeliveryDate] = useState('');
//   const { cartItems } = React.useContext(CartContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decoded = JSON.parse(atob(token.split('.')[1]));
//       fetch(`http://localhost:8000/api/users/${decoded.id}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('خطا در دریافت اطلاعات کاربر');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setUserInfo(data.data.user);
//         })
//         .catch((error) => {
//           console.error('Error fetching user info:', error);
//           navigate('/login');
//         });
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handlePurchase = () => {
//     if (!userInfo) {
//       alert('لطفا ابتدا وارد شوید.');
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert('سبد خرید خالی است. لطفاً محصولی را اضافه کنید.');
//       return;
//     }

//     if (!deliveryDate) {
//       alert('لطفا تاریخ تحویل را انتخاب کنید.');
//       return;
//     }

//     const selectedDate = new Date(deliveryDate);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // تنظیم ساعت امروز به نیمه شب

//     if (selectedDate < today) {
//       alert('مجاز به انتخاب تاریخی که گذشته است نیستید.');
//       return;
//     }

//     const orderData = {
//       user: userInfo._id,
//       products: cartItems.map((item) => ({
//         product: item._id,
//         count: item.quantity,
//       })),
//       deliveryDate,
//     };

//     const queryParams = new URLSearchParams({
//       user: userInfo._id,
//       orderData: JSON.stringify(orderData),
//     });

//     window.location.href = `http://localhost:5174/confirm-order?${queryParams.toString()}`;
//   };

//   return (
//     <div className="container mx-auto mt-44">
//       <h1 className="text-3xl font-semibold mb-6">اطلاعات خریدار</h1>
//       {userInfo ? (
//         <div className="bg-white p-6 rounded-lg shadow-lg text-right">
//           <p className="text-lg font-bold">نام: {userInfo.firstname}</p>
//           <p className="text-lg font-bold">نام خانوادگی: {userInfo.lastname}</p>
//           <p className="text-lg font-bold">نام کاربری: {userInfo.username}</p>
//           <p className="text-lg font-bold">شماره تماس: {userInfo.phoneNumber}</p>
//           <p className="text-lg font-bold">آدرس: {userInfo.address}</p>

//           <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
//             تاریخ تحویل:
//           </label>
//           <input
//             type="date"
//             value={deliveryDate}
//             onChange={(e) => setDeliveryDate(e.target.value)}
//             className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-150 ease-in-out"
//           />

//           <button
//             onClick={handlePurchase}
//             className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
//           >
//             خرید
//           </button>
//         </div>
//       ) : (
//         <p className="text-gray-500">بارگذاری اطلاعات...</p>
//       )}
//     </div>
//   );
// };

// export default UserInfo; 




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../services/cartContext';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // اضافه کردن state برای پیام خطا
  const { cartItems } = React.useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      fetch(`http://localhost:8000/api/users/${decoded.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('خطا در دریافت اطلاعات کاربر');
          }
          return response.json();
        })
        .then((data) => {
          setUserInfo(data.data.user);
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handlePurchase = () => {
    if (!userInfo) {
      showError('لطفا ابتدا وارد شوید.');
      return;
    }

    if (cartItems.length === 0) {
      showError('سبد خرید خالی است. لطفاً محصولی را اضافه کنید.');
      return;
    }

    if (!deliveryDate) {
      showError('لطفا تاریخ تحویل را انتخاب کنید.');
      return;
    }

    const selectedDate = new Date(deliveryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // تنظیم ساعت امروز به نیمه شب

    if (selectedDate < today) {
      showError('مجاز به انتخاب تاریخی که گذشته است نیستید.');
      return;
    }

    const orderData = {
      user: userInfo._id,
      products: cartItems.map((item) => ({
        product: item._id,
        count: item.quantity,
      })),
      deliveryDate,
    };

    const queryParams = new URLSearchParams({
      user: userInfo._id,
      orderData: JSON.stringify(orderData),
    });

    window.location.href = `http://localhost:5174/confirm-order?${queryParams.toString()}`;
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 2000); // بعد از 2 ثانیه پیام را ناپدید می‌کند
  };

  return (
    <div className="container mx-auto mt-44">
      <h1 className="text-3xl font-semibold mb-6">اطلاعات خریدار</h1>
      {errorMessage && (
        <div className="bg-red-500 text-white flex justify-end p-4 rounded-lg mb-4">
          {errorMessage}
        </div>
      )}
      {userInfo ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-right">
          <p className="text-lg font-bold">نام: {userInfo.firstname}</p>
          <p className="text-lg font-bold">نام خانوادگی: {userInfo.lastname}</p>
          <p className="text-lg font-bold">نام کاربری: {userInfo.username}</p>
          <p className="text-lg font-bold">شماره تماس: {userInfo.phoneNumber}</p>
          <p className="text-lg font-bold">آدرس: {userInfo.address}</p>

          <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
            تاریخ تحویل:
          </label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-150 ease-in-out"
          />

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