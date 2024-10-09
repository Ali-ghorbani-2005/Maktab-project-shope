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












import React, { useState, useContext } from 'react';
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
    alert('سفارش شما با موفقیت ثبت شد.');
  }; 

  const cancelDelete = () => {
        setShowModal(false);
      };

  const paginate = (pageNumber) => setCurrentPage(pageNumber); 

  return (
    <div className="container mx-auto mt-44">
      <h1 className="text-3xl font-bold mb-6">سبد خرید</h1>
      {currentItems.length === 0 ? (
        <p className="text-gray-500">سبد خرید شما خالی است</p>
      ) : (
        <div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200">محصول</th>
                <th className="py-2 px-4 bg-gray-200">قیمت</th>
                <th className="py-2 px-4 bg-gray-200">تعداد</th>
                <th className="py-2 px-4 bg-gray-200">قیمت کل</th>
                <th className="py-2 px-4 bg-gray-200">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.price} تومان</td>
                  <td className="border px-4 py-2">
                    {editingItemId === item._id ? (
                      <div>
                        <input
                          type="number"
                          value={editedQuantity}
                          onChange={(e) => setEditedQuantity(Number(e.target.value))}
                          className="border p-1 w-16"
                        />
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
                  </td>
                  <td className="border px-4 py-2">{item.price * item.quantity} تومان</td>
                  <td className="border px-4 py-2"> 
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
                         <img src="imgs/site-icons/edit.png" className='w-8 hover:w-9'  alt="" />
                        </button>
                      </div> 

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
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
          <button
            onClick={handleFinalizeOrder}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          > 
          نهایی کردن سبد خرید
          </button>
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
  );
};

export default Cart;
