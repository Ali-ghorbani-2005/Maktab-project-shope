
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const AddProductModal = ({ isOpen, onClose, onSubmit }) => {

  // const handelRefresh = () =>{ 
  //   // onClose() ; 
  //   setTimeout(()=>{
  //     window.location.reload
  //   } , 3000)

  // }


  const formik = useFormik({
    initialValues: {
      category: '',
      subcategory: '',
      name: '',
      price: '',
      quantity: '',
      brand: '',
      discount: '',
      description: '',
      images: null
    },
    validationSchema: Yup.object({
      category: Yup.string().required('وارد کردن مجموعه الزامی است'),
      subcategory: Yup.string().required('وارد کردن زیر مجموعه الزامی است'),
      name: Yup.string('مقدار فیلد درست نیست').required('وارد کردن نام کالا الزامی است'),
      price: Yup.number().required('وارد کردن قیمت الزامی است').positive('Price must be positive'),
      quantity: Yup.number().required('وارد کردن تعداد الزامی است').min(1, 'Quantity must be at least 1'),
      brand: Yup.string().required('وارد کردن برند الزامی است'),
      discount: Yup.number().min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100%'),
      description: Yup.string().required('وارد کردن توضیحات الزامی است'),
      images: Yup.mixed().required('بار گزاری عکس الزامی است')
    }),
    onSubmit: (values) => {
      onSubmit(values);
      onClose(); // بستن مدال پس از ارسال
    }
  });

  const handleImageChange = (e) => {
    formik.setFieldValue('images', e.target.files[0]);
  };

  if (!isOpen) return null;

  return (
    // <div className="fixed inset-0 flex items-center justify-center  bg-gray-600 bg-opacity-50 overflow-y-auto">
    //   <div className=" bg-white p-7   rounded shadow-lg">
    //     <div className='flex justify-center items-center'>
    //       <img src="imgs/logo/logo.jpg" className='w-44 mt-96  ' alt="" />
    //     </div>
    //     <h2 className="text-xl font-semibold mb-4 ">Add New Product</h2>
    //     <div className=''>
    //       {/* Form Fields */}
    //       <form onSubmit={formik.handleSubmit}>

    //         <div class="relative w-96  mb-4">
    //           <input
    //             type="text"
    //             name="category"
    //             placeholder=" "
    //             value={formik.values.category}
    //             onChange={formik.handleChange}
    //             className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
    //           />
    //           <label
    //             for="category"
    //             className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
    //           >
    //             Category
    //           </label>
    //           {formik.errors.category && formik.touched.category ? (
    //             <div className="text-red-500 font-semibold text-xs">{formik.errors.category}</div>
    //           ) : null}
    //         </div>

    //         <div className='relative w-96  mb-4'>

    //           <input
    //             type="text"
    //             name="subcategory"
    //             placeholder=""
    //             value={formik.values.subcategory}
    //             onChange={formik.handleChange}
    //             className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
    //           />

    //           <label
    //             for="subcategory"
    //             className=" -mt-5 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
    //           >
    //             Subcategory
    //           </label>

    //           {formik.errors.subcategory && formik.touched.subcategory ? (
    //             <div className="text-red-500 font-semibold text-xs">{formik.errors.subcategory}</div>
    //           ) : null}

    //         </div>

    //         <div className='relative w-96  mb-4'>

    //           <input
    //             type="text"
    //             name="name"
    //             placeholder=""
    //             value={formik.values.name}
    //             onChange={formik.handleChange}
    //             className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
    //           />

    //           <label
    //             for="name"
    //             className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
    //           >
    //             Name
    //           </label>

    //           {formik.errors.name && formik.touched.name ? (
    //             <div className="text-red-500 font-semibold text-xs">{formik.errors.name}</div>
    //           ) : null}

    //         </div>

    //         <div className='relative w-96  mb-4'>

    //           <input
    //             type="number"
    //             name="price"
    //             placeholder=""
    //             value={formik.values.price}
    //             onChange={formik.handleChange}
    //             className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
    //           />

    //           <label
    //             for="price"
    //             className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
    //           >
    //             Price
    //           </label>

    //           {formik.errors.price && formik.touched.price ? (
    //             <div className="text-red-500 font-semibold text-xs">{formik.errors.price}</div>
    //           ) : null}

    //         </div>

    //         <div className='relative w-96  mb-4'>

    //           <input
    //             type="number"
    //             name="quantity"
    //             placeholder=""
    //             value={formik.values.quantity}
    //             onChange={formik.handleChange}
    //             className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
    //           />

    //           <label
    //             for="quantity"
    //             className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
    //           >
    //             Quantity
    //           </label>

    //           {formik.errors.quantity && formik.touched.quantity ? (
    //             <div className="text-red-500 font-semibold text-xs">{formik.errors.quantity}</div>
    //           ) : null}

    //         </div>

    //         <div className='relative w-96  mb-4'>

    //           <input
    //             type="text"
    //             name="brand"
    //             placeholder=""
    //             value={formik.values.brand}
    //             onChange={formik.handleChange}
    //             className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
    //           />

    //           <label
    //             for="brand"
    //             className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
    //           >
    //             Brand
    //           </label>

    //           {formik.errors.brand && formik.touched.brand ? (
    //             <div className="text-red-500 font-semibold text-xs">{formik.errors.brand}</div>
    //           ) : null}
    //         </div>
    //         <div className='relative w-96  mb-4'>
    //           <input
    //             type="number"
    //             name="discount"
    //             placeholder=""
    //             value={formik.values.discount}
    //             onChange={formik.handleChange}
    //             className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
    //           />

    //           <label
    //             for="discount"
    //             className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
    //           >
    //             Discount
    //           </label>


    //           {formik.errors.discount && formik.touched.discount ? (
    //             <div className="text-red-500 font-semibold text-xs">{formik.errors.discount}</div>
    //           ) : null}
    //         </div>

    //         {/* <div className='relative w-96  mb-4'>

    //         <textarea
    //           name="description"
    //           placeholder=""
    //           value={formik.values.description}
    //           onChange={formik.handleChange}
    //           className="block w-full mt-5  px-4 py-2 text-sm border rounded-2xl h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
    //         />

    //         <label
    //           for="description"
    //           className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
    //         >
    //           Description
    //         </label>

    //         {formik.errors.description && formik.touched.description ? (
    //           <div className="text-red-500 font-semibold text-xs">{formik.errors.description}</div>
    //         ) : null}

    //       </div> */}


    //         {/* block w-full mt-5  px-4 py-2 text-sm border rounded-2xl h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 peer */}

    //         <div className='relative  '>
    //           <ReactQuill
    //             value={formik.values.description}
    //             onChange={(value) => formik.setFieldValue('description', value)}
    //             className="block w-full  mt-5 p-3 text-sm   rounded-full h-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //           />

    //           <label
    //             htmlFor="description"
    //             className="absolute left-4 top-2 text-sm text-gray-500 transition-all transform -translate-y-1/2 bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-500"
    //           >
    //             Description
    //           </label>

    //           {formik.errors.description && formik.touched.description ? (
    //             <div className="text-red-500 font-semibold text-xs mt-9">{formik.errors.description}</div>
    //           ) : null}
    //         </div>




    //         <div className='mt-10'>

    //           <input
    //             type="file"
    //             name="images"
    //             multiple
    //             onChange={handleImageChange}
    //             className="block w-full mt-5  px-4 py-2 text-sm border rounded-2xl h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
    //           />
    //           {formik.errors.images && formik.touched.images ? (
    //             <div className="text-red-500 font-semibold text-xs">{formik.errors.images}</div>
    //           ) : null}
    //         </div>

    //         {/* Buttons */}
    //         <div className="flex justify-end mt-5">
    //           <button type="button" onClick={onClose} className="mr-4">
    //             Cancel
    //           </button>
    //           <button type="submit" className="bg-blue-500 text-white p-2">
    //             Add Product
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div> 


    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className='flex justify-center mb-6'>
          <img src="imgs/logo/logo.jpg" className='w-44' alt="Logo" />
        </div>
        <h2 className="text-2xl font-semibold mt-20">Add New Product</h2>

        {/* Form Fields */}
        <form onSubmit={formik.handleSubmit}>
          {[
            { name: "category", label: "Category", type: "text" },
            { name: "subcategory", label: "Subcategory", type: "text" },
            { name: "name", label: "Name", type: "text" },
            { name: "price", label: "Price", type: "number" },
            { name: "quantity", label: "Quantity", type: "number" },
            { name: "brand", label: "Brand", type: "text" },
            { name: "discount", label: "Discount", type: "number" },
          ].map(({ name, label, type }) => (
            <div className='relative w-full mb-4' key={name}>
              <input
                type={type}
                name={name}
                placeholder=" "
                value={formik.values[name]}
                onChange={formik.handleChange}
                className="block w-full px-4 py-2 text-sm border rounded-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor={name}
                className="absolute left-4 top-2 text-sm text-gray-500 transition-all transform -translate-y-1/2 bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
              >
                {label}
              </label>
              {formik.errors[name] && formik.touched[name] && (
                <div className="text-red-500 font-semibold text-xs">{formik.errors[name]}</div>
              )}
            </div>
          ))}

          {/* Description Field */}
          <div className='relative w-full mb-4'>
            <ReactQuill
              value={formik.values.description}
              onChange={(value) => formik.setFieldValue('description', value)}
              className="block w-full p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="description"
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all transform -translate-y-1/2 bg-white px-1"
            >
              Description
            </label>
            {formik.errors.description && formik.touched.description && (
              <div className="text-red-500 font-semibold text-xs">{formik.errors.description}</div>
            )}
          </div>

          {/* Image Upload */}
          <div className='relative w-full mb-4'>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
              className="block w-full px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.images && formik.touched.images && (
              <div className="text-red-500 font-semibold text-xs">{formik.errors.images}</div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-5">
            <button type="button" onClick={onClose} className="mr-4 text-gray-600 hover:text-gray-800">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>


  );
};

export default AddProductModal;





// import { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const AddProductModal = ({ isOpen, onClose, onSubmit }) => {
//   const formik = useFormik({
//     initialValues: {
//       category: '',
//       subcategory: '',
//       name: '',
//       price: '',
//       quantity: '',
//       brand: '',
//       discount: '',
//       description: '',
//       images: []
//     },
//     validationSchema: Yup.object({
//       category: Yup.string().required('Category is required'),
//       subcategory: Yup.string().required('Subcategory is required'),
//       name: Yup.string().required('Name is required'),
//       price: Yup.number().required('Price is required').positive('Price must be positive'),
//       quantity: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
//       brand: Yup.string().required('Brand is required'),
//       discount: Yup.number().min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100%'),
//       description: Yup.string().required('Description is required'),
//       images: Yup.array().required("jhlh")
//     }),
//     onSubmit: (values) => {
//       onSubmit(values);
//       onClose(); // بستن مدال پس از ارسال
//     }
//   });

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     formik.setFieldValue('images', files);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
//       <div className="bg-white p-8 rounded shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

//         {/* Form Fields */}
//         <form onSubmit={formik.handleSubmit}>
//           <input
//             type="text"
//             name="category"
//             placeholder="Category"
//             value={formik.values.category}
//             onChange={formik.handleChange}
//             className="mb-2 p-2 border"
//           />
//           {formik.errors.category && formik.touched.category ? (
//             <div className="text-red-500">{formik.errors.category}</div>
//           ) : null}

//           <input
//             type="text"
//             name="subcategory"
//             placeholder="Subcategory"
//             value={formik.values.subcategory}
//             onChange={formik.handleChange}
//             className="mb-2 p-2 border"
//           />
//           {formik.errors.subcategory && formik.touched.subcategory ? (
//             <div className="text-red-500">{formik.errors.subcategory}</div>
//           ) : null}

//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formik.values.name}
//             onChange={formik.handleChange}
//             className="mb-2 p-2 border"
//           />
//           {formik.errors.name && formik.touched.name ? (
//             <div className="text-red-500">{formik.errors.name}</div>
//           ) : null}

//           <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={formik.values.price}
//             onChange={formik.handleChange}
//             className="mb-2 p-2 border"
//           />
//           {formik.errors.price && formik.touched.price ? (
//             <div className="text-red-500">{formik.errors.price}</div>
//           ) : null}

//           <input
//             type="number"
//             name="quantity"
//             placeholder="Quantity"
//             value={formik.values.quantity}
//             onChange={formik.handleChange}
//             className="mb-2 p-2 border"
//           />
//           {formik.errors.quantity && formik.touched.quantity ? (
//             <div className="text-red-500">{formik.errors.quantity}</div>
//           ) : null}

//           <input
//             type="text"
//             name="brand"
//             placeholder="Brand"
//             value={formik.values.brand}
//             onChange={formik.handleChange}
//             className="mb-2 p-2 border"
//           />
//           {formik.errors.brand && formik.touched.brand ? (
//             <div className="text-red-500">{formik.errors.brand}</div>
//           ) : null}
//           <input
//             type="number"
//             name="discount"
//             placeholder="Discount"
//             value={formik.values.discount}
//             onChange={formik.handleChange}
//             className="mb-2 p-2 border"
//           />
//           {formik.errors.discount && formik.touched.discount ? (
//             <div className="text-red-500">{formik.errors.discount}</div>
//           ) : null}

//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formik.values.description}
//             onChange={formik.handleChange}
//             className="mb-2 p-2 border"
//           />
//           {formik.errors.description && formik.touched.description ? (
//             <div className="text-red-500">{formik.errors.description}</div>
//           ) : null}

//           <input
//             type="file"
//             name="images"
//             multiple
//             onChange={handleImageChange}
//             className="mb-2 p-2 border"
//           />
//           {formik.errors.images && formik.touched.images ? (
//             <div className="text-red-500">{formik.errors.images}</div>
//           ) : null}

//           {/* Buttons */}
//           <div className="flex justify-end">
//             <button type="button" onClick={onClose} className="mr-4">
//               Cancel
//             </button>
//             <button type="submit" className="bg-blue-500 text-white p-2">
//               Add Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProductModal;