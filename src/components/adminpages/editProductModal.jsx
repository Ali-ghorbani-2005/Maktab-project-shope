// // EditProductModal.js
// import React from 'react'; 
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const EditProductModal = ({ isOpen, onClose, editForm, onInputChange, onSave, isSaveButtonEnabled, onImageChange, categories, subcategories, onCategoryChange }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
//                 <button
//                     className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
//                     onClick={onClose}
//                 >
//                     X
//                 </button>

//                 <h3 className="text-xl font-bold mb-4">ویرایش محصول</h3>
//                 <input
//                     type="text"
//                     name="name"
//                     value={editForm.name}
//                     onChange={onInputChange}
//                     placeholder="نام محصول"
//                     className="w-full p-2 mb-4 border rounded-lg"
//                 />

//                 <input
//                     type="file"
//                     name="image"
//                     accept="image/*"
//                     onChange={onImageChange}
//                     className="mb-4"
//                 />

//                 <input
//                     type="number"
//                     name="price"
//                     value={editForm.price} // اضافه کردن فیلد قیمت
//                     onChange={onInputChange}
//                     placeholder="قیمت محصول"
//                     className="w-full p-2 mb-4 border rounded-lg"
//                 />

//                 <select
//                     name="category"
//                     value={editForm.category}
//                     onChange={(e) => {
//                         onCategoryChange(e.target.value); // فراخوانی تابع تغییر کتگوری
//                         onInputChange(e); // به‌روزرسانی فیلد کتگوری
//                     }}
//                     className="w-full p-2 mb-4 border rounded-lg"
//                 >
//                     <option value="">انتخاب دسته‌بندی</option>
//                     {Array.isArray(categories) && categories.map(category => (
//                         <option key={category._id} value={category._id}>{category.name}</option>
//                     ))}
//                 </select>

//                 <select
//                     name="subcategory"
//                     value={editForm.subcategory}
//                     onChange={onInputChange}
//                     className="w-full p-2 mb-4 border rounded-lg"
//                 >
//                     <option value="">انتخاب ساب‌کتگوری</option>
//                     {Array.isArray(subcategories) && subcategories.map(subcategory => (
//                         <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
//                     ))}
//                 </select>

//                <textarea 
//                     name="description"
//                     value={editForm.description}
//                     onChange={onInputChange}
//                     placeholder="توضیحات"
//                     className="w-full p-2 mb-4 border rounded-lg"
//                 />

//                 <div className="flex justify-end">
//                     <button
//                         className={`px-4 py-2 rounded-lg text-white ${isSaveButtonEnabled ? 'bg-green-500' : 'bg-gray-300'} hover:bg-green-600`}
//                         disabled={!isSaveButtonEnabled}
//                         onClick={onSave}
//                     >
//                         ذخیره
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditProductModal;   





// import React from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const EditProductModal = ({ isOpen, onClose, editForm, onInputChange, onSave, isSaveButtonEnabled, onImageChange, categories, subcategories, onCategoryChange }) => {
//     if (!isOpen) return null;

//     const handleDescriptionChange = (value) => {
//         onInputChange({ target: { name: 'description', value } });
//     };

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
//                 <button
//                     className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
//                     onClick={onClose}
//                 >
//                     X
//                 </button>

//                 <h3 className="text-xl font-bold mb-4">ویرایش محصول</h3>
//                 <input
//                     type="text"
//                     name="name"
//                     value={editForm.name}
//                     onChange={onInputChange}
//                     placeholder="نام محصول"
//                     className="w-full p-2 mb-4 border rounded-lg"
//                 />

//                 <input
//                     type="file"
//                     name="image"
//                     accept="image/*"
//                     onChange={onImageChange}
//                     className="mb-4"
//                 />

//                 <input
//                     type="number"
//                     name="price"
//                     value={editForm.price}
//                     onChange={onInputChange}
//                     placeholder="قیمت محصول"
//                     className="w-full p-2 mb-4 border rounded-lg"
//                 />

//                 <select
//                     name="category"
//                     value={editForm.category}
//                     onChange={(e) => {
//                         onCategoryChange(e.target.value);
//                         onInputChange(e);
//                     }}
//                     className="w-full p-2 mb-4 border rounded-lg"
//                 >
//                     <option value="">انتخاب دسته‌بندی</option>
//                     {Array.isArray(categories) && categories.map(category => (
//                         <option key={category._id} value={category._id}>{category.name}</option>
//                     ))}
//                 </select>

//                 <select
//                     name="subcategory"
//                     value={editForm.subcategory}
//                     onChange={onInputChange}
//                     className="w-full p-2 mb-4 border rounded-lg"
//                 >
//                     <option value="">انتخاب ساب‌کتگوری</option>
//                     {Array.isArray(subcategories) && subcategories.map(subcategory => (
//                         <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
//                     ))}
//                 </select>

//                 {/* بخش توضیحات با ReactQuill */}
//                 <div className="mb-4">
//                     <ReactQuill
//                         value={editForm.description}
//                         onChange={handleDescriptionChange}
//                         placeholder="توضیحات"
//                         className="border rounded-lg"
//                     />
//                 </div>

//                 <div className="flex justify-end">
//                     <button
//                         className={`px-4 py-2 rounded-lg text-white ${isSaveButtonEnabled ? 'bg-green-500' : 'bg-gray-300'} hover:bg-green-600`}
//                         disabled={!isSaveButtonEnabled}
//                         onClick={onSave}
//                     >
//                         ذخیره
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditProductModal;




import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditProductModal = ({ isOpen, onClose, editForm, onInputChange, onSave, isSaveButtonEnabled, onImageChange, categories, subcategories, onCategoryChange }) => {
    if (!isOpen) return null;

    const handleDescriptionChange = (value) => {
        onInputChange({ target: { name: 'description', value } });
    };

    return (
        // <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
        //     <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        //         <button
        //             className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
        //             onClick={onClose}
        //         >
        //             X
        //         </button>

        //         <h3 className="text-xl font-bold mb-4">ویرایش محصول</h3>
        //         <input
        //             type="text"
        //             name="name"
        //             value={editForm.name}
        //             onChange={onInputChange}
        //             placeholder="نام محصول"
        //             className="w-full p-2 mb-4 border rounded-lg"
        //         />

        //         {/* فیلد نام برند */}
        //         <input
        //             type="text"
        //             name="brand"
        //             value={editForm.brand} // اضافه کردن فیلد نام برند
        //             onChange={onInputChange}
        //             placeholder="نام برند"
        //             className="w-full p-2 mb-4 border rounded-lg"
        //         />

        //         {/* فیلد تعداد محصول */}
        //         <input
        //             type="number"
        //             name="quantity"
        //             value={editForm.quantity} // اضافه کردن فیلد تعداد
        //             onChange={onInputChange}
        //             placeholder="تعداد محصول"
        //             className="w-full p-2 mb-4 border rounded-lg"
        //         />

        //         <input
        //             type="file"
        //             name="image"
        //             accept="image/*"
        //             onChange={onImageChange}
        //             className="mb-4"
        //         />

        //         <input
        //             type="number"
        //             name="price"
        //             value={editForm.price}
        //             onChange={onInputChange}
        //             placeholder="قیمت محصول"
        //             className="w-full p-2 mb-4 border rounded-lg"
        //         />

        //         <select
        //             name="category"
        //             value={editForm.category}
        //             onChange={(e) => {
        //                 onCategoryChange(e.target.value);
        //                 onInputChange(e);
        //             }}
        //             className="w-full p-2 mb-4 border rounded-lg"
        //         >
        //             <option value="">انتخاب دسته‌بندی</option>
        //             {Array.isArray(categories) && categories.map(category => (
        //                 <option key={category._id} value={category._id}>{category.name}</option>
        //             ))}
        //         </select>

        //         <select
        //             name="subcategory"
        //             value={editForm.subcategory}
        //             onChange={onInputChange}
        //             className="w-full p-2 mb-4 border rounded-lg"
        //         >
        //             <option value="">انتخاب ساب‌کتگوری</option>
        //             {Array.isArray(subcategories) && subcategories.map(subcategory => (
        //                 <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
        //             ))}
        //         </select>

        //         {/* بخش توضیحات با ReactQuill */}
        //         <div className="mb-4">
        //             <ReactQuill
        //                 value={editForm.description}
        //                 onChange={handleDescriptionChange}
        //                 placeholder="توضیحات"
        //                 className="border rounded-lg"
        //             />
        //         </div>

        //         <div className="flex justify-end">
        //             <button
        //                 className={`px-4 py-2 rounded-lg text-white ${isSaveButtonEnabled ? 'bg-green-500' : 'bg-gray-300'} hover:bg-green-600`}
        //                 disabled={!isSaveButtonEnabled}
        //                 onClick={onSave}
        //             >
        //                 ذخیره
        //             </button>
        //         </div>
        //     </div>
        // </div> 

        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-600 focus:outline-none"
                    onClick={onClose}
                >
                    X
                </button>

                <h3 className="text-xl font-bold mb-4">ویرایش محصول</h3>

                <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={onInputChange}
                    placeholder="نام محصول"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                    type="text"
                    name="brand"
                    value={editForm.brand}
                    onChange={onInputChange}
                    placeholder="نام برند"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                    type="number"
                    name="quantity"
                    value={editForm.quantity}
                    onChange={onInputChange}
                    placeholder="تعداد محصول"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={onImageChange}
                    className="mb-4"
                />

                <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={onInputChange}
                    placeholder="قیمت محصول"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <select
                    name="category"
                    value={editForm.category}
                    onChange={(e) => {
                        onCategoryChange(e.target.value);
                        onInputChange(e);
                    }}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="">انتخاب دسته‌بندی</option>
                    {Array.isArray(categories) && categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>

                <select
                    name="subcategory"
                    value={editForm.subcategory}
                    onChange={onInputChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="">انتخاب ساب‌کتگوری</option>
                    {Array.isArray(subcategories) && subcategories.map(subcategory => (
                        <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                    ))}
                </select>

                {/* بخش توضیحات با ReactQuill */}
                <div className="mb-4">
                    <ReactQuill
                        value={editForm.description}
                        onChange={handleDescriptionChange}
                        placeholder="توضیحات"
                        className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        className={`px-4 py-2 rounded-lg text-white ${isSaveButtonEnabled ? 'bg-green-500' : 'bg-gray-300'} hover:bg-green-600 focus:outline-none`}
                        disabled={!isSaveButtonEnabled}
                        onClick={onSave}
                    >
                        ذخیره
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;




{/* <textarea 
                    name="description"
                    value={editForm.description}
                    onChange={onInputChange}
                    placeholder="توضیحات"
                    className="w-full p-2 mb-4 border rounded-lg"
                /> */}