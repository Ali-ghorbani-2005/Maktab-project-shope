// import React, { useState, useContext } from 'react';
// import { CartContext } from '../../services/cartContext';
// import OrderConfirmationModal from '../../components/orderComponents/OrderConfirmationModal'; 

// const Cart = () => {
//   const { cartItems, removeFromCart, clearCart } = useContext(CartContext); 
//   const [showModal, setShowModal] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);
//   const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);  

//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 5; // تعداد آیتم‌ها در هر صفحه

//   //   // محاسبه شروع و پایان آیتم‌های هر صفحه
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
//     const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

//   const handleDeleteClick = (item) => {
//     setItemToDelete(item);
//     setShowModal(true);
//   }; 

//   const testClearCart = () => {
//     clearCart();
//     console.log('Cart cleared');
//   };

//   const confirmDelete = () => {
//     if (itemToDelete) {
//       removeFromCart(itemToDelete._id);
//       setShowModal(false);
//     }
//   };

//   const cancelDelete = () => {
//     setShowModal(false);
//   };

//   const handleFinalizeOrder = () => {
//     // باز کردن مودال نهایی کردن سفارش
//     setIsFinalizeModalOpen(true); 
//   };

//   const finalizeOrder = () => {
//     // فرض کنید سفارش در اینجا نهایی می‌شود
//     clearCart(); // پاک کردن سبد خرید
//     setIsFinalizeModalOpen(false); // بستن مودال
//     alert('سفارش شما با موفقیت ثبت شد.');
//   }; 


//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container mx-auto mt-44">
//       <h1 className="text-3xl font-bold mb-6">سبد خرید</h1>
//       {currentItems.length === 0 ? (
//         <p className="text-gray-500">سبد خرید شما خالی است</p>
//       ) : (
//         <div>
//           {/* نمایش سبد خرید به‌صورت جدول */}
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 bg-gray-200">محصول</th>
//                 <th className="py-2 px-4 bg-gray-200">قیمت</th>
//                 <th className="py-2 px-4 bg-gray-200">تعداد</th>
//                 <th className="py-2 px-4 bg-gray-200">قیمت کل</th>
//                 <th className="py-2 px-4 bg-gray-200">عملیات</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((item) => (
//                 <tr key={item._id}>
//                   <td className="border px-4 py-2">{item.name}</td>
//                   <td className="border px-4 py-2">{item.price} تومان</td>
//                   <td className="border px-4 py-2">{item.quantity}</td>
//                   <td className="border px-4 py-2">{item.price * item.quantity} تومان</td>
//                   <td className="border px-4 py-2"> 
//                     <div className='flex justify-center items-center'>
//                     <button
//                       onClick={() => handleDeleteClick(item)}
//                       className=" text-white  rounded-lg hover:bg-red-600"
//                     >
//                       <img src="imgs/site-icons/remove.png" className='w-8' alt="" />
//                     </button> 
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div>
//           <div className="flex justify-center mt-4">
//             {[...Array(Math.ceil(cartItems.length / itemsPerPage)).keys()].map((number) => (
//               <button
//                 key={number + 1}
//                 onClick={() => paginate(number + 1)}
//                 className={`mx-1 px-3 py-2 rounded-lg ${
//                   currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
//                 }`}
//               >
//                 {number + 1}
//               </button>
//             ))}
//           </div>
//           </div>
//           <button
//             onClick={handleFinalizeOrder}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
//           > 
//           نهایی کردن سبد خرید
//           </button>
//         </div>
//       )}

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <p className="text-lg font-bold mb-4">آیا از حذف این محصول مطمئن هستید؟</p>
//             <div className="flex justify-end">
//               <button
//                 onClick={confirmDelete}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
//               >
//                 بله
//               </button>
//               <button
//                 onClick={cancelDelete}
//                 className="bg-gray-500 text-white px-4 py-2 rounded-lg"
//               >
//                 خیر
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {isFinalizeModalOpen && (
//         <OrderConfirmationModal
//           onClose={() => setIsFinalizeModalOpen(false)}
//           onConfirm={finalizeOrder} // افزودن finalizeOrder به مودال
//         />
//       )}

//       <button onClick={testClearCart}>Clear Cart Test</button>
//     </div>
//   );
// };

// export default Cart; 












import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../../services/cartContext';
import OrderConfirmationModal from '../../components/orderComponents/OrderConfirmationModal';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, addToCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null); // برای ردیابی آیتمی که در حال ویرایش است
  const [editedQuantity, setEditedQuantity] = useState(0); // ذخیره تعداد ویرایش‌شده

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };
  const handleEditClick = (item) => {
    setEditingItemId(item._id); // تنظیم آیتم در حال ویرایش
    setEditedQuantity(item.quantity); // مقدار فعلی تعداد محصول را تنظیم می‌کنیم
  };

  const handleSaveEdit = (item) => {
    addToCart(item, editedQuantity - item.quantity); // به تعداد محصول فعلی اضافه می‌کنیم
    setEditingItemId(null); // بعد از ذخیره، حالت ویرایش را غیرفعال می‌کنیم
  };

  const handleCancelEdit = () => {
    setEditingItemId(null); // لغو ویرایش و بازگشت به حالت اولیه
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete._id);
      setShowModal(false);
    }
  };

  const handleFinalizeOrder = () => {
    setIsFinalizeModalOpen(true);
  };



  const finalizeOrder = () => {
    clearCart();
    setIsFinalizeModalOpen(false);
    alert('سفارش شما با موفقیت  .');
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPrice = currentItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
   

    // <div className="container mx-auto mt-44">
    //   <h1 className="text-3xl font-semibold mb-6">سبد خرید شما</h1>
    //   {currentItems.length === 0 ? (
    //     <div className='flex justify-center items-center -mt-10'>
    //       <div>
    //         <img src="imgs/site-icons/order.webp" className='w-96' alt="" />
    //         <p className="text-gray-500 mt-10 text-2xl font-semibold">سبد خرید شما خالی است</p>
    //       </div>
    //     </div>
    //   ) : (
    //     <div>
    //       <div className="flex justify-end">
    //         <div className="border-2 border-gray-300 w-full max-w-3xl h-auto rounded-lg shadow-lg p-4 bg-white">
    //           {currentItems.map((item) => (
    //             <div key={item._id} className="border-b py-4 mb-4 last:border-none last:mb-0">
    //               <div className="flex space-x-6 items-center">
    //                 <img
    //                   src={`http://${item.images[0]}`}
    //                   className="w-24 h-24 object-cover rounded-lg shadow-sm"
    //                   alt={item.name}
    //                 />
    //                 <div className="flex-1">
    //                   <div className="flex justify-between items-center">
    //                     <div>
    //                       <p className="font-bold text-xl text-gray-800">{item.name}</p>
    //                       <p className="text-lg font-medium text-gray-600">مدل {item.brand}</p>
    //                     </div>
    //                     <p className="font-semibold text-lg text-gray-700">{item.price} تومان</p>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="mt-4 flex justify-between items-center">
    //                 {editingItemId === item._id ? (
    //                   <div>
    //                     <div className="flex items-center space-x-2">
    //                       <button
    //                         onClick={() => setEditedQuantity((prevQuantity) => Math.max(1, prevQuantity - 1))}
    //                         className="bg-red-500 text-white px-3 py-2 rounded-lg"
    //                       >
    //                         -
    //                       </button>
    //                       <input
    //                         type="number"
    //                         value={editedQuantity}
    //                         onChange={(e) => setEditedQuantity(Math.max(1, Number(e.target.value)))}
    //                         className="border border-gray-300 p-2 w-16 text-center rounded-lg"
    //                       />
    //                       <button
    //                         onClick={() => setEditedQuantity((prevQuantity) => prevQuantity + 1)}
    //                         className="bg-green-500 text-white px-3 py-2 rounded-lg"
    //                       >
    //                         +
    //                       </button>
    //                     </div>
    //                     <div className="flex space-x-2 mt-3">
    //                       <button
    //                         onClick={() => handleSaveEdit(item)}
    //                         className="bg-green-500 text-white px-4 py-2 rounded-lg"
    //                       >
    //                         ذخیره
    //                       </button>
    //                       <button
    //                         onClick={handleCancelEdit}
    //                         className="bg-gray-500 text-white px-4 py-2 rounded-lg"
    //                       >
    //                         لغو
    //                       </button>
    //                     </div>
    //                   </div>
    //                 ) : (
    //                   <div className="font-medium text-lg text-gray-900">
    //                     تعداد: {item.quantity}
    //                   </div>
    //                 )}
    //                 <p className="font-semibold text-lg text-gray-700">
    //                   {item.price * item.quantity} تومان
    //                 </p>
    //                 <div className="flex space-x-4">
    //                   <button
    //                     onClick={() => handleEditClick(item)}
    //                     className="flex justify-center items-center text-gray-600 hover:text-gray-800"
    //                   >
    //                     <img src="imgs/site-icons/edit.png" className="w-8 h-8 hover:scale-110 transition-transform" alt="Edit" />
    //                   </button>
    //                   <button
    //                     onClick={() => handleDeleteClick(item)}
    //                     className="flex justify-center items-center text-gray-600 hover:text-red-600"
    //                   >
    //                     <img src="imgs/site-icons/remove.png" className="w-8 h-8 hover:scale-110 transition-transform" alt="Delete" />
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       <div className="flex justify-center mt-6 space-x-2">
    //         {[...Array(Math.ceil(cartItems.length / itemsPerPage)).keys()].map((number) => (
    //           <button
    //             key={number + 1}
    //             onClick={() => paginate(number + 1)}
    //             className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ease-in-out ${currentPage === number + 1
    //               ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
    //               : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
    //               }`}
    //           >
    //             {number + 1}
    //           </button>
    //         ))}
    //       </div>

    //       <div className="border shadow-lg shadow-gray-300 w-full max-w-lg p-6 rounded-xl bg-white">
    //         <div className="flex items-center justify-between">
    //           <div className="flex items-baseline space-x-1 text-gray-700">
    //             <p className="text-xl font-bold">{totalPrice}</p>
    //             <p className="text-sm font-semibold text-gray-500">تومان</p>
    //           </div>
    //           <p className="text-lg font-semibold">جمع کل</p>
    //         </div>
    //         <button
    //           onClick={handleFinalizeOrder}
    //           className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg mt-6 transition-all duration-300 ease-in-out"
    //         >
    //           نهایی کردن سبد خرید
    //         </button>
    //       </div>
    //     </div>
    //   )}

    //   {showModal && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    //       <div className="bg-white p-6 rounded-lg shadow-lg">
    //         <p className="text-lg font-bold mb-4">آیا از حذف این محصول مطمئن هستید؟</p>
    //         <div className="flex justify-end">
    //           <button
    //             onClick={confirmDelete}
    //             className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
    //           >
    //             بله
    //           </button>
    //           <button
    //             onClick={cancelDelete}
    //             className="bg-gray-500 text-white px-4 py-2 rounded-lg"
    //           >
    //             خیر
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   {isFinalizeModalOpen && (
    //     <OrderConfirmationModal
    //       onClose={() => setIsFinalizeModalOpen(false)}
    //       onConfirm={finalizeOrder}
    //     />
    //   )}
    // </div>  

<div className="container mx-auto mt-44">
  <h1 className="text-3xl font-semibold mb-6">سبد خرید شما</h1>
  {currentItems.length === 0 ? (
    <div className='flex justify-center items-center -mt-10'>
      <div>
        <img src="imgs/site-icons/order.webp" className='w-96' alt="" />
        <p className="text-gray-500 mt-10 text-2xl font-semibold">سبد خرید شما خالی است</p>
      </div>
    </div>
  ) : (
    <div>
      <div className="flex justify-end">
        <div className="border-2 border-gray-300 w-full max-w-3xl h-auto rounded-lg shadow-lg p-4 bg-white">
          {currentItems.map((item) => (
            <div key={item._id} className="border-b py-4 mb-4 last:border-none last:mb-0">
              <div className="flex space-x-6 items-center">
                <img
                  src={`http://${item.images[0]}`}
                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                  alt={item.name}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-xl text-gray-800">{item.name}</p>
                      <p className="text-lg font-medium text-gray-600">مدل {item.brand}</p>
                    </div>
                    <p className="font-semibold text-lg text-gray-700">{item.price} تومان</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                {editingItemId === item._id ? (
                  <div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditedQuantity((prevQuantity) => Math.max(1, prevQuantity - 1))}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={editedQuantity}
                        onChange={(e) => setEditedQuantity(Math.max(1, Number(e.target.value)))}
                        className="border border-gray-300 p-2 w-16 text-center rounded-lg"
                      />
                      <button
                        onClick={() => setEditedQuantity((prevQuantity) => prevQuantity + 1)}
                        className="bg-green-500 text-white px-3 py-2 rounded-lg"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleSaveEdit(item)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                      >
                        ذخیره
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                      >
                        لغو
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="font-medium text-lg text-gray-900">
                    تعداد: {item.quantity}
                  </div>
                )}
                <p className="font-semibold text-lg text-gray-700">
                  {item.price * item.quantity} تومان
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="flex justify-center items-center text-gray-600 hover:text-gray-800"
                  >
                    <img src="imgs/site-icons/edit.png" className="w-8 h-8 hover:scale-110 transition-transform" alt="Edit" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="flex justify-center items-center text-gray-600 hover:text-red-600"
                  >
                    <img src="imgs/site-icons/remove.png" className="w-8 h-8 hover:scale-110 transition-transform" alt="Delete" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(Math.ceil(cartItems.length / itemsPerPage)).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ease-in-out ${currentPage === number + 1
              ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
          >
            {number + 1}
          </button>
        ))}
      </div>

      <div className="border shadow-lg shadow-gray-300 w-full max-w-lg p-6 rounded-xl bg-white absolute top-10 left-5 mt-48">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-1 text-gray-700">
            <p className="text-xl font-bold">{totalPrice}</p>
            <p className="text-sm font-semibold text-gray-500">تومان</p>
          </div>
          <p className="text-lg font-semibold">جمع کل</p>
        </div>
        <button
          onClick={handleFinalizeOrder}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg mt-6 transition-all duration-300 ease-in-out"
        >
          نهایی کردن سبد خرید
        </button>
      </div>
    </div>
  )}

  {showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-bold mb-4">آیا از حذف این محصول مطمئن هستید؟</p>
        <div className="flex justify-end">
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            بله
          </button>
          <button
            onClick={cancelDelete}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            خیر
          </button>
        </div>
      </div>
    </div>
  )}

  {isFinalizeModalOpen && (
    <OrderConfirmationModal
      onClose={() => setIsFinalizeModalOpen(false)}
      onConfirm={finalizeOrder}
    />
  )}
</div>
  


    //   {/* کادر قیمت کل و دکمه نهایی کردن سبد خرید */}
    //   <div className="w-1/3 pr-4">
    //     <div className="border shadow-lg rounded-xl p-6 bg-white">
    //       <div className="flex items-center justify-between">
    //         <div className="flex items-baseline space-x-1 text-gray-700">
    //           <p className="text-xl font-bold">{totalPrice}</p>
    //           <p className="text-sm font-semibold text-gray-500">تومان</p>
    //         </div>
    //         <p className="text-lg font-semibold">جمع کل</p>
    //       </div>
    //       <button
    //         onClick={handleFinalizeOrder}
    //         className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg mt-6 transition-all duration-300 ease-in-out"
    //       >
    //         نهایی کردن سبد خرید
    //       </button>
    //     </div>
    //   </div>

    //   {/* محصولات سبد خرید */}
    //   <div className="flex-1">
    //     <h1 className="text-3xl font-semibold mb-6">سبد خرید شما</h1>
    //     {currentItems.length === 0 ? (
    //       <div className='flex justify-center items-center -mt-10'>
    //         <div>
    //           <img src="imgs/site-icons/order.webp" className='w-96' alt="" />
    //           <p className="text-gray-500 mt-10 text-2xl font-semibold">سبد خرید شما خالی است</p>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="border-2 border-gray-300 w-full max-w-3xl h-auto rounded-lg shadow-lg p-4 bg-white">
    //         {currentItems.map((item) => (
    //           <div key={item._id} className="border-b py-4 mb-4 last:border-none last:mb-0">
    //             <div className="flex space-x-6 items-center">
    //               <img
    //                 src={`http://${item.images[0]}`}
    //                 className="w-24 h-24 object-cover rounded-lg shadow-sm"
    //                 alt={item.name}
    //               />
    //               <div className="flex-1">
    //                 <div className="flex justify-between items-center">
    //                   <div>
    //                     <p className="font-bold text-xl text-gray-800">{item.name}</p>
    //                     <p className="text-lg font-medium text-gray-600">مدل {item.brand}</p>
    //                   </div>
    //                   <p className="font-semibold text-lg text-gray-700">{item.price} تومان</p>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="mt-4 flex justify-between items-center">
    //               {editingItemId === item._id ? (
    //                 <div>
    //                   <div className="flex items-center space-x-2">
    //                     <button
    //                       onClick={() => setEditedQuantity((prevQuantity) => Math.max(1, prevQuantity - 1))}
    //                       className="bg-red-500 text-white px-3 py-2 rounded-lg"
    //                     >
    //                       -
    //                     </button>
    //                     <input
    //                       type="number"
    //                       value={editedQuantity}
    //                       onChange={(e) => setEditedQuantity(Math.max(1, Number(e.target.value)))}
    //                       className="border border-gray-300 p-2 w-16 text-center rounded-lg"
    //                     />
    //                     <button
    //                       onClick={() => setEditedQuantity((prevQuantity) => prevQuantity + 1)}
    //                       className="bg-green-500 text-white px-3 py-2 rounded-lg"
    //                     >
    //                       +
    //                     </button>
    //                   </div>
    //                   <div className="flex space-x-2 mt-3">
    //                     <button
    //                       onClick={() => handleSaveEdit(item)}
    //                       className="bg-green-500 text-white px-4 py-2 rounded-lg"
    //                     >
    //                       ذخیره
    //                     </button>
    //                     <button
    //                       onClick={handleCancelEdit}
    //                       className="bg-gray-500 text-white px-4 py-2 rounded-lg"
    //                     >
    //                       لغو
    //                     </button>
    //                   </div>
    //                 </div>
    //               ) : (
    //                 <div className="font-medium text-lg text-gray-900">
    //                   تعداد: {item.quantity}
    //                 </div>
    //               )}
    //               <p className="font-semibold text-lg text-gray-700">
    //                 {item.price * item.quantity} تومان
    //               </p>
    //               <div className="flex space-x-4">
    //                 <button
    //                   onClick={() => handleEditClick(item)}
    //                   className="flex justify-center items-center text-gray-600 hover:text-gray-800"
    //                 >
    //                   <img src="imgs/site-icons/edit.png" className="w-8 h-8 hover:scale-110 transition-transform" alt="Edit" />
    //                 </button>
    //                 <button
    //                   onClick={() => handleDeleteClick(item)}
    //                   className="flex justify-center items-center text-gray-600 hover:text-red-600"
    //                 >
    //                   <img src="imgs/site-icons/remove.png" className="w-8 h-8 hover:scale-110 transition-transform" alt="Delete" />
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>

    //   {showModal && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    //       <div className="bg-white p-6 rounded-lg shadow-lg">
    //         <p className="text-lg font-bold mb-4">آیا از حذف این محصول مطمئن هستید؟</p>
    //         <div className="flex justify-end">
    //           <button
    //             onClick={confirmDelete}
    //             className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
    //           >
    //             بله
    //           </button>
    //           <button
    //             onClick={cancelDelete}
    //             className="bg-gray-500 text-white px-4 py-2 rounded-lg"
    //           >
    //             خیر
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   {isFinalizeModalOpen && (
    //     <OrderConfirmationModal
    //       onClose={() => setIsFinalizeModalOpen(false)}
    //       onConfirm={finalizeOrder}
    //     />
    //   )}
    // </div> 

    // <div className="container mx-auto mt-44 flex">
    //   {/* کادر قیمت کل و دکمه نهایی کردن سبد خرید */}
    //   <div className="w-1/3 pr-4 sticky top-0">
    //     <div className="border shadow-lg rounded-xl p-6 bg-white">
    //       <div className="flex items-center justify-between">
    //         <div className="flex items-baseline space-x-1 text-gray-700">
    //           <p className="text-xl font-bold">{totalPrice}</p>
    //           <p className="text-sm font-semibold text-gray-500">تومان</p>
    //         </div>
    //         <p className="text-lg font-semibold">جمع کل</p>
    //       </div>
    //       <button
    //         onClick={handleFinalizeOrder}
    //         className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg mt-6 transition-all duration-300 ease-in-out"
    //       >
    //         نهایی کردن سبد خرید
    //       </button>
    //     </div>
    //   </div>

    //   {/* محصولات سبد خرید */}
    //   <div className="flex-1 overflow-y-auto h-screen">
    //     <h1 className="text-3xl font-semibold mb-6">سبد خرید شما</h1>
    //     {currentItems.length === 0 ? (
    //       <div className='flex justify-center items-center -mt-10'>
    //         <div>
    //           <img src="imgs/site-icons/order.webp" className='w-96' alt="" />
    //           <p className="text-gray-500 mt-10 text-2xl font-semibold">سبد خرید شما خالی است</p>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="border-2 border-gray-300 w-full max-w-3xl h-auto rounded-lg shadow-lg p-4 bg-white">
    //         {currentItems.map((item) => (
    //           <div key={item._id} className="border-b py-4 mb-4 last:border-none last:mb-0">
    //             <div className="flex space-x-6 items-center">
    //               <img
    //                 src={`http://${item.images[0]}`}
    //                 className="w-24 h-24 object-cover rounded-lg shadow-sm"
    //                 alt={item.name}
    //               />
    //               <div className="flex-1">
    //                 <div className="flex justify-between items-center">
    //                   <div>
    //                     <p className="font-bold text-xl text-gray-800">{item.name}</p>
    //                     <p className="text-lg font-medium text-gray-600">مدل {item.brand}</p>
    //                   </div>
    //                   <p className="font-semibold text-lg text-gray-700">{item.price} تومان</p>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="mt-4 flex justify-between items-center">
    //               {editingItemId === item._id ? (
    //                 <div>
    //                   <div className="flex items-center space-x-2">
    //                     <button
    //                       onClick={() => setEditedQuantity((prevQuantity) => Math.max(1, prevQuantity - 1))}
    //                       className="bg-red-500 text-white px-3 py-2 rounded-lg"
    //                     >
    //                       -
    //                     </button>
    //                     <input
    //                       type="number"
    //                       value={editedQuantity}
    //                       onChange={(e) => setEditedQuantity(Math.max(1, Number(e.target.value)))}
    //                       className="border border-gray-300 p-2 w-16 text-center rounded-lg"
    //                     />
    //                     <button
    //                       onClick={() => setEditedQuantity((prevQuantity) => prevQuantity + 1)}
    //                       className="bg-green-500 text-white px-3 py-2 rounded-lg"
    //                     >
    //                       +
    //                     </button>
    //                   </div>
    //                   <div className="flex space-x-2 mt-3">
    //                     <button
    //                       onClick={() => handleSaveEdit(item)}
    //                       className="bg-green-500 text-white px-4 py-2 rounded-lg"
    //                     >
    //                       ذخیره
    //                     </button>
    //                     <button
    //                       onClick={handleCancelEdit}
    //                       className="bg-gray-500 text-white px-4 py-2 rounded-lg"
    //                     >
    //                       لغو
    //                     </button>
    //                   </div>
    //                 </div>
    //               ) : (
    //                 <div className="font-medium text-lg text-gray-900">
    //                   تعداد: {item.quantity}
    //                 </div>
    //               )}
    //               <p className="font-semibold text-lg text-gray-700">
    //                 {item.price * item.quantity} تومان
    //               </p>
    //               <div className="flex space-x-4">
    //                 <button
    //                   onClick={() => handleEditClick(item)}
    //                   className="flex justify-center items-center text-gray-600 hover:text-gray-800"
    //                 >
    //                   <img src="imgs/site-icons/edit.png" className="w-8 h-8 hover:scale-110 transition-transform" alt="Edit" />
    //                 </button>
    //                 <button
    //                   onClick={() => handleDeleteClick(item)}
    //                   className="flex justify-center items-center text-gray-600 hover:text-red-600"
    //                 >
    //                   <img src="imgs/site-icons/remove.png" className="w-8 h-8 hover:scale-110 transition-transform" alt="Delete" />
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>

    //   {showModal && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    //       <div className="bg-white p-6 rounded-lg shadow-lg">
    //         <p className="text-lg font-bold mb-4">آیا از حذف این محصول مطمئن هستید؟</p>
    //         <div className="flex justify-end">
    //           <button
    //             onClick={confirmDelete}
    //             className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
    //           >
    //             بله
    //           </button>
    //           <button
    //             onClick={cancelDelete}
    //             className="bg-gray-500 text-white px-4 py-2 rounded-lg"
    //           >
    //             خیر
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   {isFinalizeModalOpen && (
    //     <OrderConfirmationModal
    //       onClose={() => setIsFinalizeModalOpen(false)}
    //       onConfirm={finalizeOrder}
    //     />
    //   )}
    // </div>

  );
};

export default Cart;















{/* <div className='flex justify-end'>
            <div className='border-2  border-black w-[820px] h-[450px]'>
              {currentItems.map((item) => (
                <div key={item._id}>

                  <div className='flex'>

                    <img src={`http://${item.images[0]}`} className='w-60 mt-4' alt="" />
                    <div className='flex ml-[300px]'>

                      <p className="font-semibold text-4xl"> {item.name}</p>
                      <p className='font-semibold text-4xl '>مدل{item.brand}</p>

                    </div>
                  </div>

                  <p className="">{item.price} تومان</p>

                  {editingItemId === item._id ? (
                    <div>
                      <div className="flex items-center">
                        <button
                          onClick={() => setEditedQuantity((prevQuantity) => Math.max(1, prevQuantity - 1))}
                          className="bg-red-500 text-white px-2 py-1 rounded-lg"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={editedQuantity}
                          onChange={(e) => setEditedQuantity(Math.max(1, Number(e.target.value)))}
                          className="border p-1 w-16 text-center mx-2"
                        />
                        <button
                          onClick={() => setEditedQuantity((prevQuantity) => prevQuantity + 1)}
                          className="bg-green-500 text-white px-2 py-1 rounded-lg"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleSaveEdit(item)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg ml-2"
                      >
                        ذخیره
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-3 py-1 rounded-lg ml-2"
                      >
                        لغو
                      </button>
                    </div>
                  ) :



                    (
                      <div>
                        {item.quantity}
                      </div>
                    )
                  }

                  <p className="">{item.price * item.quantity} تومان</p>
                  <div className="">
                    <div className='flex justify-center items-center'>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className=" text-white  rounded-lg "
                      >
                        <img src="imgs/site-icons/remove.png" className='w-8 hover:w-9' alt="" />
                      </button>

                      <div>

                        <button
                          onClick={() => handleEditClick(item)}
                          className=" text-white px-2 py-1 rounded-lg ml-2"
                        >

                          <img src="imgs/site-icons/edit.png" className='w-8 hover:w-9' alt="" />
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div> */}

{/* <div className="flex justify-center mt-4">
            {[...Array(Math.ceil(cartItems.length / itemsPerPage)).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`mx-1 px-3 py-2 rounded-lg ${
                  currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {number + 1}
              </button>
            ))}
          </div>   
          <div className='border shadow-sm shadow-gray-500 w-80 h-40 rounded-xl' > 

          <div className='flex ' > 

            <p className='mt-5 ml-1 text-gray-600 font-semibold '>تومان</p>
         
          <p className="mt-5  font-semibold ml-2">{totalPrice} </p>  
          <p colSpan="3" className=" font-semibold text-lg ml-32 mt-5">جمع کل</p>
          </div> 
          <button
            onClick={handleFinalizeOrder}
            className="bg-lightGreen flex justify-center items-center text-white px-4 py-2 rounded-lg mt-8 ml-20"
          > 
          نهایی کردن سبد خرید
          </button>  

          </div> */}
