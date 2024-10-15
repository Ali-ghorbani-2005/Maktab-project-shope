// import React, { useEffect, useState } from "react";
// import { fetchProducts } from "../../services/adminProduct";
// import Lod from "../../components/loding/lod";
// import { deleteProduct } from "../../services/deleteServices"; // اضافه کردن تابع حذف
// import { editProduct } from "../../services/editServices"; // اضافه کردن تابع ادیت 
// import AddProductModal from '../../components/adminpages/addProductModal'; // ایمپورت مودال اضافه کردن محصول
// import { addProduct } from '../../services/productService';

// export default function AdminProduct() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1); // صفحه جاری
//   const [totalPages, setTotalPages] = useState(5);  // کل صفحات
//   const [showConfirm, setShowConfirm] = useState(false); // نمایش یا عدم نمایش پنجره تأیید
//   const [selectedProduct, setSelectedProduct] = useState(null); // ذخیره محصول انتخاب شده برای حذف
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // باز کردن کادر ادیت 

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [editForm, setEditForm] = useState({
//     name: '',
//     image: '',
//     category: '',
//     description: ''
//   }); // ذخیره اطلاعات فرم

//   useEffect(() => {
//     const getProducts = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchProducts(currentPage); // شماره صفحه
//         setProducts(data.data.products); // ذخیره محصولات در state
//         setTotalPages(data.total_pages); // ذخیره تعداد کل صفحات
//         setLoading(false);
//       } catch (err) {
//         setError("مشکلی در بارگیری محصولات به وجود آمده");
//         setLoading(false);
//       }
//     };

//     getProducts();
//   }, [currentPage]); // فراخوانی مجدد هنگام تغییر صفحه

//   const handleDeleteClick = (productId) => {
//     setSelectedProduct(productId); // ذخیره محصول انتخاب شده
//     setShowConfirm(true); // نمایش پنجره تأیید
//   };

//   const confirmDelete = async () => {
//     try {
//       await deleteProduct(selectedProduct); // حذف محصول
//       setProducts(products.filter(product => product._id !== selectedProduct)); // حذف محصول از لیست
//       setShowConfirm(false); // بستن پنجره تأیید
//     } catch (error) {
//       console.error("Error deleting product", error);
//     }
//   };

//   const cancelDelete = () => {
//     setShowConfirm(false); // بستن پنجره تأیید
//   };

//   const handleEditClick = (product) => {
//     setSelectedProduct(product._id); // ذخیره محصول انتخاب شده
//     setEditForm({
//       name: product.name,
//       image: product.thumbnail, // فرض بر اینکه آدرس عکس محصول در فیلد thumbnail باشد
//       category: product.category._id, // فرض بر اینکه category یک آبجکت با _id است
//       description: product.description
//     });
//     setIsEditModalOpen(true); // باز کردن کادر ادیت
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm({ ...editForm, [name]: value });
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await editProduct(selectedProduct, editForm); // ذخیره تغییرات
//       setProducts(products.map(product => product._id === selectedProduct ? { ...product, ...editForm } : product)); // بروزرسانی محصول در لیست
//       setIsEditModalOpen(false); // بستن کادر ادیت
//     } catch (error) {
//       console.error("Error editing product", error);
//     }
//   };

//   const isSaveButtonEnabled = Object.values(editForm).every(value => value); // بررسی اینکه آیا همه فیلدها پر هستند





//   // تابع برای هندل کردن ارسال داده‌ها به API
//   const handleAddProduct = async (formData) => {
//     try {
//       await addProduct(formData);
//       console.log('Product added successfully');
//       // اینجا می‌توانید محصول جدید را به لیست محصولات اضافه کنید
//     } catch (error) {
//       console.error('Failed to add product');
//     }
//   }


//   if (loading) return <Lod />;
//   if (error) return <p>{error}</p>;






//   return (







//     <div className="flex flex-col justify-center items-center p-4">
//   <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6">
//     <div className="flex border-b-2 border-gray-400 mb-4">
//       <p className="text-3xl font-bold">محصولات</p>
//       <div className="ml-auto mt-1">
//         <button 
//           onClick={() => setIsModalOpen(true)}  
//           className="bg-blue-400 w-10 h-10 rounded-lg hover:bg-blue-500 flex items-center justify-center"
//         >
//           <img src="imgs/site-icons/addProduct.png" className="w-7" alt="Add Product" />
//         </button>

//         {/* مودال برای اضافه کردن محصول */}
//         <AddProductModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSubmit={handleAddProduct}
//         />
//       </div>
//     </div>

//     <table className="w-full">
//       <thead className="bg-gray-200">
//         <tr className="border-b border-gray-400">
//           <th className="border-b border-gray-400"></th>
//           <th className="text-gray-600 text-xl border-b border-gray-400">دسته بندی</th>
//           <th className="text-gray-600 text-xl border-b border-gray-400">نام محصول</th>
//           <th className="text-gray-600 text-xl border-b border-gray-400">تصویر محصول</th> {/* ستون جدید برای تصویر */}
//         </tr>
//       </thead>
//       <tbody>
//         {products.map((product) => (
//           <tr key={product._id} className="hover:bg-gray-100 transition-colors">
//             <td className="text-center border-b mt-20 border-gray-400 flex justify-center"> 
//               <div className="-mt-14">
//               <button
//                 className="w-7 rounded-lg  text-white bg-red-500 hover:bg-red-600 mx-1"
//                 onClick={() => handleDeleteClick(product._id)}
//               >
//                 <img src="imgs/site-icons/remove.png" alt="Delete" className="w-7" />
//               </button>
//               <button
//                 className="w-7 rounded-lg text-white bg-blue-300 hover:bg-blue-400 mx-1"
//                 onClick={() => handleEditClick(product)}
//               >
//                 <img src="imgs/site-icons/edit.png" alt="Edit" className="w-7" />
//               </button> 
//               </div>
//             </td>
//             <td className="text-center border-b border-gray-400">
//               {product.category.name}/{product.subcategory.name}
//             </td>
//             <td className="text-center border-b border-gray-400">{product.name}</td>
//             <td className="text-center border-b border-gray-400">
//               <img src={`http://${product.images[0]}`} alt={product.name} className="w-16 h-16 object-cover mx-auto" /> {/* نمایش تصویر محصول */}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     {/* پنجره تأیید حذف */}
//     {showConfirm && (
//       <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <p>آیا از حذف این کالا مطمئن هستید؟</p>
//           <div className="flex justify-between mt-4">
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//               onClick={confirmDelete}
//             >
//               بله
//             </button>
//             <button
//               className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
//               onClick={cancelDelete}
//             >
//               خیر
//             </button>
//           </div>
//         </div>
//       </div>
//     )}

//     {/* کادر ادیت */}
//     {isEditModalOpen && (
//       <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
//           <button
//             className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
//             onClick={() => setIsEditModalOpen(false)}
//           >
//             X
//           </button>

//           <h3 className="text-xl font-bold mb-4">ویرایش محصول</h3>
//           <input
//             type="text"
//             name="name"
//             value={editForm.name}
//             onChange={handleInputChange}
//             placeholder="نام محصول"
//             className="w-full p-2 mb-4 border rounded-lg"
//           />
//           <input
//             type="text"
//             name="image"
//             value={editForm.image}
//             onChange={handleInputChange}
//             placeholder="آدرس عکس"
//             className="w-full p-2 mb-4 border rounded-lg"
//           />
//           <select
//             name="category"
//             value={editForm.category}
//             onChange={handleInputChange}
//             className="w-full p-2 mb-4 border rounded-lg"
//           >
//             <option value="">انتخاب دسته‌بندی</option>
//             <option value="category1">دسته ۱</option>
//             <option value="category2">دسته ۲</option>
//             {/* دیگر دسته‌بندی‌ها */}
//           </select>
//           <textarea
//             name="description"
//             value={editForm.description}
//             onChange={handleInputChange}
//             placeholder="توضیحات"
//             className="w-full p-2 mb-4 border rounded-lg"
//           />

//           <div className="flex justify-end">
//             <button
//               className={`px-4 py-2 rounded-lg text-white ${isSaveButtonEnabled ? 'bg-green-500' : 'bg-gray-300'} hover:bg-green-600`}
//               disabled={!isSaveButtonEnabled}
//               onClick={handleSaveEdit}
//             >
//               ذخیره
//             </button>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>

//   <div className="flex mt-4 justify-center items-center">
//     {[...Array(totalPages)].map((_, index) => (
//       <button
//         key={index + 1}
//         onClick={() => setCurrentPage(index + 1)}
//         className={`px-2 py-1 mx-1 ${currentPage === index + 1 ? "bg-blue-500 rounded-full text-white" : "bg-gray-300"} hover:bg-blue-400`}
//       >
//         {index + 1}
//       </button>
//     ))}
//   </div>
// </div>


//   );
// }





// import React, { useEffect, useState } from "react";
// import { fetchProducts } from "../../services/adminProduct";
// import { fetchCategories, fetchSubcategories } from "../../services/CategoriesServices";
// import Lod from "../../components/loding/lod";
// import { deleteProduct } from "../../services/deleteServices";
// import { editProduct } from "../../services/editServices";
// import AddProductModal from '../../components/adminpages/addProductModal';
// import { addProduct } from '../../services/productService';
// import EditProductModal from '../../components/adminpages/editProductModal';

// export default function AdminProduct() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(5);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editForm, setEditForm] = useState({
//     name: '',
//     image: '',
//     category: '',
//     subcategory: '',
//     description: ''
//   });

//   useEffect(() => {
//     const getProducts = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchProducts(currentPage);
//         setProducts(data.data.products);
//         setTotalPages(data.total_pages);
//         setLoading(false);
//       } catch (err) {
//         setError("مشکلی در بارگیری محصولات به وجود آمده");
//         setLoading(false);
//       }
//     };

//     const getCategories = async () => {
//       try {
//         const data = await fetchCategories();
//         setCategories(data);
//       } catch (err) {
//         console.error("Failed to fetch categories", err);
//       }
//     };

//     getProducts();
//     getCategories();
//   }, [currentPage]);

//   const handleCategoryChange = async (categoryId) => {
//     setEditForm({ ...editForm, category: categoryId, subcategory: '' });
//     try {
//       const data = await fetchSubcategories(categoryId);
//       setSubcategories(data.data.subcategories);
//     } catch (err) {
//       console.error("Failed to fetch subcategories", err);
//     }
//   };

//   const handleDeleteClick = (productId) => {
//     setSelectedProduct(productId);
//     setShowConfirm(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await deleteProduct(selectedProduct);
//       setProducts(products.filter(product => product._id !== selectedProduct));
//       setShowConfirm(false);
//     } catch (error) {
//       console.error("Error deleting product", error);
//     }
//   };

//   const cancelDelete = () => {
//     setShowConfirm(false);
//   };

//     const handleEditClick = (product) => {
//     setSelectedProduct(product._id); // ذخیره محصول انتخاب شده
//     setEditForm({
//       name: product.name,
//       image: product.thumbnail, // فرض بر اینکه آدرس عکس محصول در فیلد thumbnail باشد
//       category: product.category._id, // فرض بر اینکه category یک آبجکت با _id است
//       description: product.description , 
//       price: product.price
//     });
//     setIsEditModalOpen(true); // باز کردن کادر ادیت
//   };



//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm({ ...editForm, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setEditForm({ ...editForm, image: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await editProduct(selectedProduct, editForm);
//       setProducts(products.map(product => product._id === selectedProduct ? { ...product, ...editForm } : product));
//       setIsEditModalOpen(false);
//     } catch (error) {
//       console.error("Error editing product", error);
//     }
//   };

//   const isSaveButtonEnabled = Object.values(editForm).every(value => value);

//   const handleAddProduct = async (formData) => {
//     try {
//       await addProduct(formData);
//       console.log('Product added successfully');
//     } catch (error) {
//       console.error('Failed to add product');
//     }
//   };

//   if (loading) return <Lod />;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="flex flex-col justify-center items-center p-4">
//       <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6">
//         <div className="flex border-b-2 border-gray-400 mb-4">
//           <p className="text-3xl font-bold">محصولات</p>
//           <div className="ml-auto mt-1">
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-blue-400 w-10 h-10 rounded-lg hover:bg-blue-500 flex items-center justify-center"
//             >
//               <img src="imgs/site-icons/addProduct.png" className="w-7" alt="Add Product" />
//             </button>

//             <AddProductModal
//               isOpen={isModalOpen}
//               onClose={() => setIsModalOpen(false)}
//               onSubmit={handleAddProduct}
//             />
//           </div>
//         </div>

//         <table className="w-full">
//           <thead className="bg-gray-200">
//             <tr className="border-b border-gray-400">
//               <th className="border-b border-gray-400"></th>
//               <th className="text-gray-600 text-xl border-b border-gray-400">دسته بندی</th>
//               <th className="text-gray-600 text-xl border-b border-gray-400">نام محصول</th>
//               <th className="text-gray-600 text-xl border-b border-gray-400">تصویر محصول</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id} className="hover:bg-gray-100 transition-colors">
//                 <td className="text-center border-b border-gray-400 flex justify-center">
//                   <div>
//                     <button
//                       className="w-7 rounded-lg text-white bg-red-500 hover:bg-red-600 mx-1"
//                       onClick={() => handleDeleteClick(product._id)}
//                     >
//                       <img src="imgs/site-icons/remove.png" alt="Delete" className="w-7" />
//                     </button>
//                     <button
//                       className="w-7 rounded-lg text-white bg-blue-300 hover:bg-blue-400 mx-1"
//                       onClick={() => handleEditClick(product)} // اطمینان از اینکه اینجا صحیح باشد
//                     >
//                       <img src="imgs/site-icons/edit.png" alt="Edit" className="w-7" />
//                     </button>
//                   </div>
//                 </td>
//                 <td className="text-center border-b border-gray-400">
//                   {product.category.name}/{product.subcategory.name}
//                 </td>
//                 <td className="text-center border-b border-gray-400">{product.name}</td>
//                 <td className="text-center border-b border-gray-400">
//                   <img src={`http://${product.images[0]}`} alt={product.name} className="w-16 h-16 object-cover mx-auto" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {showConfirm && (
//           <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <p>آیا از حذف این کالا مطمئن هستید؟</p>
//               <div className="flex justify-between mt-4">
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                   onClick={confirmDelete}
//                 >
//                   بله
//                 </button>
//                 <button
//                   className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
//                   onClick={cancelDelete}
//                 >
//                   خیر
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <EditProductModal
//           isOpen={isEditModalOpen}
//           onClose={() => setIsEditModalOpen(false)}
//           editForm={editForm}
//           onInputChange={handleInputChange}
//           onImageChange={handleImageChange}
//           onSave={handleSaveEdit}
//           isSaveButtonEnabled={isSaveButtonEnabled}
//           categories={categories}
//           subcategories={subcategories}
//           onCategoryChange={handleCategoryChange} // ارسال تابع تغییر کتگوری
//         />
//       </div>

//       <div className="flex mt-4 justify-center items-center">
//         {[...Array(totalPages)].map((_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => setCurrentPage(index + 1)}
//             className={`px-2 py-1 mx-1 ${currentPage === index + 1 ? "bg-blue-500 rounded-full text-white" : "bg-gray-300"} hover:bg-blue-400`}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }







import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/adminProduct";
import { fetchCategories, fetchSubcategories } from "../../services/CategoriesServices";
import Lod from "../../components/loding/lod";
import { deleteProduct } from "../../services/deleteServices";
import { editProduct } from "../../services/editServices";
import AddProductModal from '../../components/adminpages/addProductModal';
import { addProduct } from '../../services/productService';
import EditProductModal from '../../components/adminpages/editProductModal';

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    image: '',
    category: '',
    subcategory: '',
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState(''); // وضعیت پیام موفقیت

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(currentPage);
        setProducts(data.data.products);
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (err) {
        setError("مشکلی در بارگیری محصولات به وجود آمده");
        setLoading(false);
      }
    };

    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    getProducts();
    getCategories();
  }, [currentPage]);

  const handleCategoryChange = async (categoryId) => {
    setEditForm({ ...editForm, category: categoryId, subcategory: '' });
    try {
      const data = await fetchSubcategories(categoryId);
      setSubcategories(data.data.subcategories);
    } catch (err) {
      console.error("Failed to fetch subcategories", err);
    }
  };

  const handleDeleteClick = (productId) => {
    setSelectedProduct(productId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(selectedProduct);
      setProducts(products.filter(product => product._id !== selectedProduct));
      setShowConfirm(false);
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product._id);
    setEditForm({
      name: product.name,
      image: product.thumbnail,
      category: product.category._id,
      description: product.description,
      price: product.price
    });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await editProduct(selectedProduct, editForm);
      setProducts(products.map(product => product._id === selectedProduct ? { ...product, ...editForm } : product));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error editing product", error);
    }
  };

  const isSaveButtonEnabled = Object.values(editForm).every(value => value);

  const handleAddProduct = async (formData) => {
    try {
      await addProduct(formData);
      setSuccessMessage('محصول با موفقیت اضافه شد!'); // نمایش پیام موفقیت
      setProducts([...products, formData]);  // اضافه کردن محصول به لیست
      setTimeout(() => {
        setSuccessMessage(''); // مخفی کردن پیام بعد از 3 ثانیه
      }, 3000);
    } catch (error) {
      console.error('Failed to add product');
    }
  }; 


  // const handleAddProduct = async (formData) => {
  //   try {
  //     await addProduct(formData);
  //     setSuccessMessage('محصول با موفقیت اضافه شد!'); // نمایش پیام موفقیت
  //     setProducts([...products, formData]); // اضافه کردن محصول به لیست
  //     setModalOpen(false); // بستن مودال
  //     // خالی کردن فیلدهای فرم
  //     setEditForm({
  //       name: '',
  //       image: '',
  //       category: '',
  //       subcategory: '',
  //       description: ''
  //     });
  //     setTimeout(() => {
  //       setSuccessMessage(''); // مخفی کردن پیام بعد از 3 ثانیه
  //     }, 3000);
  //   } catch (error) {
  //     console.error('Failed to add product');
  //   }
  // };

  if (loading) return <Lod />;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6">

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">موفقیت!</strong>
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <div className="flex border-b-2 border-gray-400 mb-4">
          <p className="text-3xl font-bold">محصولات</p>
          <div className="ml-auto mt-1">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-400 w-10 h-10 rounded-lg hover:bg-blue-500 flex items-center justify-center"
            >
              <img src="imgs/site-icons/addProduct.png" className="w-7" alt="Add Product" />
            </button>
            <AddProductModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleAddProduct}
            />
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-200">
            <tr className="border-b border-gray-400">
              <th className="border-b border-gray-400"></th>
              <th className="text-gray-600 text-xl border-b border-gray-400">دسته بندی</th>
              <th className="text-gray-600 text-xl border-b border-gray-400">نام محصول</th>
              <th className="text-gray-600 text-xl border-b border-gray-400">تصویر محصول</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100 transition-colors">
                <td className="text-center border-b border-gray-400 flex justify-center">
                  <div className="mt-14">
                    <button
                      className="w-7  rounded-lg text-white bg-red-500 hover:bg-red-600 mx-1"
                      onClick={() => handleDeleteClick(product._id)}
                    >
                      <img src="imgs/site-icons/remove.png" alt="Delete" className="w-7" />
                    </button>
                    <button
                      className="w-7 rounded-lg text-white bg-blue-300 hover:bg-blue-400 mx-1"
                      onClick={() => handleEditClick(product)}
                    >
                      <img src="imgs/site-icons/edit.png" alt="Edit" className="w-7" />
                    </button>
                  </div>
                </td>
                <td className="text-center border-b border-gray-400">
                  {product.category.name}/{product.subcategory.name}
                </td>
                <td className="text-center border-b border-gray-400">{product.name}</td>
                <td className="text-center border-b border-gray-400">
                  <img src={`http://${product.images[0]}`} alt={product.name} className="w-16 h-16 object-cover mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p>آیا از حذف این کالا مطمئن هستید؟</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={confirmDelete}
                >
                  بله
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={cancelDelete}
                >
                  خیر
                </button>
              </div>
            </div>
          </div>
        )}

        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          editForm={editForm}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange}
          onSave={handleSaveEdit}
          isSaveButtonEnabled={isSaveButtonEnabled}
          categories={categories}
          subcategories={subcategories}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="flex mt-4 justify-center items-center">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-2 py-1 mx-1 ${currentPage === index + 1 ? "bg-blue-500 rounded-full text-white" : "bg-gray-300"} hover:bg-blue-400`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}







// <div className="flex flex-col justify-center items-center p-4">
//   <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6">
//     <div className="flex border-b-2 border-gray-400 mb-4">
//       <p className="text-3xl font-bold">محصولات</p>
//       <div className="ml-auto mt-1">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-400 w-10 h-10 rounded-lg hover:bg-blue-500 flex items-center justify-center"
//         >
//           <img src="imgs/site-icons/addProduct.png" className="w-7" alt="Add Product" />
//         </button>

//         {/* مودال برای اضافه کردن محصول */}
//         <AddProductModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSubmit={handleAddProduct}
//         />
//       </div>
//     </div>

//     <table className="w-full">
//       <thead className="bg-gray-200">
//         <tr className="border-b border-gray-400">
//           <th className="border-b border-gray-400"></th>
//           <th className="text-gray-600 text-xl border-b border-gray-400">دسته بندی</th>
//           <th className="text-gray-600 text-xl border-b border-gray-400">نام محصول</th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map((product) => (
//           <tr key={product._id} className="hover:bg-gray-100 transition-colors">
//             <td className="text-center border-b border-gray-400 flex justify-center">
//               <button
//                 className="w-7 rounded-lg text-white bg-red-500 hover:bg-red-600 mx-1"
//                 onClick={() => handleDeleteClick(product._id)}
//               >
//                 <img src="imgs/site-icons/remove.png" alt="Delete" className="w-7" />
//               </button>
//               <button
//                 className="w-7 rounded-lg text-white bg-blue-300 hover:bg-blue-400 mx-1"
//                 onClick={() => handleEditClick(product)}
//               >
//                 <img src="imgs/site-icons/edit.png" alt="Edit" className="w-7" />
//               </button>
//             </td>
//             <td className="text-center border-b border-gray-400">
//               {product.category.name}/{product.subcategory.name}
//             </td>
//             <td className="text-center border-b border-gray-400">{product.name}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     {/* پنجره تأیید حذف */}
//     {showConfirm && (
//       <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <p>آیا از حذف این کالا مطمئن هستید؟</p>
//           <div className="flex justify-between mt-4">
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//               onClick={confirmDelete}
//             >
//               بله
//             </button>
//             <button
//               className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
//               onClick={cancelDelete}
//             >
//               خیر
//             </button>
//           </div>
//         </div>
//       </div>
//     )}

//     {/* کادر ادیت */}
//     {isEditModalOpen && (
//       <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
//           <button
//             className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
//             onClick={() => setIsEditModalOpen(false)}
//           >
//             X
//           </button>

//           <h3 className="text-xl font-bold mb-4">ویرایش محصول</h3>
//           <input
//             type="text"
//             name="name"
//             value={editForm.name}
//             onChange={handleInputChange}
//             placeholder="نام محصول"
//             className="w-full p-2 mb-4 border rounded-lg"
//           />
//           <input
//             type="text"
//             name="image"
//             value={editForm.image}
//             onChange={handleInputChange}
//             placeholder="آدرس عکس"
//             className="w-full p-2 mb-4 border rounded-lg"
//           />
//           <select
//             name="category"
//             value={editForm.category}
//             onChange={handleInputChange}
//             className="w-full p-2 mb-4 border rounded-lg"
//           >
//             <option value="">انتخاب دسته‌بندی</option>
//             <option value="category1">دسته ۱</option>
//             <option value="category2">دسته ۲</option>
//             {/* دیگر دسته‌بندی‌ها */}
//           </select>
//           <textarea
//             name="description"
//             value={editForm.description}
//             onChange={handleInputChange}
//             placeholder="توضیحات"
//             className="w-full p-2 mb-4 border rounded-lg"
//           />

//           <div className="flex justify-end">
//             <button
//               className={`px-4 py-2 rounded-lg text-white ${isSaveButtonEnabled ? 'bg-green-500' : 'bg-gray-300'} hover:bg-green-600`}
//               disabled={!isSaveButtonEnabled}
//               onClick={handleSaveEdit}
//             >
//               ذخیره
//             </button>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>

//   <div className="flex mt-4 justify-center items-center">
//     {[...Array(totalPages)].map((_, index) => (
//       <button
//         key={index + 1}
//         onClick={() => setCurrentPage(index + 1)}
//         className={`px-2 py-1 mx-1 ${currentPage === index + 1 ? "bg-blue-500 rounded-full text-white" : "bg-gray-300"} hover:bg-blue-400`}
//       >
//         {index + 1}
//       </button>
//     ))}
//   </div>
// </div> 







