// import { useState } from 'react';

// const AddProductModal = ({ isOpen, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     category: '',
//     subcategory: '',
//     name: '',
//     price: '',
//     quantity: '',
//     brand: '',
//     discount: '',
//     description: '',
//     images: null
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, images: e.target.files[0] });
//   };

//   const handleSubmit = () => {
//     onSubmit(formData);
//     onClose(); // بستن مدال پس از ارسال
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
//       <div className="bg-white p-8 rounded shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

//         {/* Form Fields */}
//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={formData.category}
//           onChange={handleInputChange}
//           className="mb-2 p-2 border"
//         />
//         <input
//           type="text"
//           name="subcategory"
//           placeholder="Subcategory"
//           value={formData.subcategory}
//           onChange={handleInputChange}
//           className="mb-2 p-2 border"
//         />
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleInputChange}
//           className="mb-2 p-2 border"
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleInputChange}
//           className="mb-2 p-2 border"
//         />
//         <input
//           type="number"
//           name="quantity"
//           placeholder="Quantity"
//           value={formData.quantity}
//           onChange={handleInputChange}
//           className="mb-2 p-2 border"
//         />
//         <input
//           type="text"
//           name="brand"
//           placeholder="Brand"
//           value={formData.brand}
//           onChange={handleInputChange}
//           className="mb-2 p-2 border"
//         />
//         <input
//           type="number"
//           name="discount"
//           placeholder="Discount"
//           value={formData.discount}
//           onChange={handleInputChange}
//           className="mb-2 p-2 border"
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleInputChange}
//           className="mb-2 p-2 border"
//         />
//         <input
//           type="file"
//           name="images"
//           onChange={handleImageChange}
//           className="mb-2 p-2 border"
//         />

//         {/* Buttons */}
//         <div className="flex justify-end">
//           <button onClick={onClose} className="mr-4">Cancel</button>
//           <button onClick={handleSubmit} className="bg-blue-500 text-white p-2">Add Product</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductModal; 



// slsklklksl

// // import { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const AddProductModal = ({ isOpen, onClose, onSubmit }) => {
//   if (!isOpen) return null;

//   // تعریف شرایط اعتبارسنجی با Yup
//   const validationSchema = Yup.object().shape({
//     category: Yup.string().required(''),
//     subcategory: Yup.string().required('Subcategory is required'),
//     name: Yup.string().required('Name is required'),
//     price: Yup.number().required('Price is required').positive('Price must be positive'),
//     quantity: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
//     brand: Yup.string().required('Brand is required'),
//     discount: Yup.number().optional().min(0, 'Discount cannot be negative'),
//     description: Yup.string().required('Description is required'),
//     images: Yup.mixed().required('Image is required')
//   });

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
//       <div className="bg-white p-8 rounded shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

//         <Formik
//           initialValues={{
//             category: '',
//             subcategory: '',
//             name: '',
//             price: '',
//             quantity: '',
//             brand: '',
//             discount: '',
//             description: '',
//             images: []
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values) => { 
//             console.log(values);
//             onSubmit(values);
//             onClose();
//           }}
//         >
//           {({ setFieldValue }) => (
//             <Form>
//               {/* فیلدهای فرم */}
//               <div>
//                 <Field type="text" name="category" placeholder="Category" className="mb-2 p-2 border" />
//                 <ErrorMessage name="category" component="div" className="text-red-500" />
//               </div>
//               <div>
//                 <Field type="text" name="subcategory" placeholder="Subcategory" className="mb-2 p-2 border" />
//                 <ErrorMessage name="subcategory" component="div" className="text-red-500" />
//               </div>
//               <div>
//                 <Field type="text" name="name" placeholder="Name" className="mb-2 p-2 border" />
//                 <ErrorMessage name="name" component="div" className="text-red-500" />
//               </div>
//               <div>
//                 <Field type="number" name="price" placeholder="Price" className="mb-2 p-2 border" />
//                 <ErrorMessage name="price" component="div" className="text-red-500" />
//               </div>
//               <div>
//                 <Field type="number" name="quantity" placeholder="Quantity" className="mb-2 p-2 border" />
//                 <ErrorMessage name="quantity" component="div" className="text-red-500" />
//               </div>
//               <div>
//                 <Field type="text" name="brand" placeholder="Brand" className="mb-2 p-2 border" />
//                 <ErrorMessage name="brand" component="div" className="text-red-500" />
//               </div>
//               <div>
//                 <Field type="number" name="discount" placeholder="Discount" className="mb-2 p-2 border" />
//                 <ErrorMessage name="discount" component="div" className="text-red-500" />
//               </div>
//               <div>
//                 <Field as="textarea" name="description" placeholder="Description" className="mb-2 p-2 border" />
//                 <ErrorMessage name="description" component="div" className="text-red-500" />
//               </div>
//               <div>
//                 <input
//                   type="file"
//                   name="images" 
//                   multiple
//                   onChange={(event) => {
//                     setFieldValue("images", event.currentTarget.files);
//                   }}
//                   className="mb-2 p-2 border"
//                 />
//                 <ErrorMessage name="images" component="div" className="text-red-500" />
//               </div> 
//               {/* دکمه‌ها */}
//               <div className="flex justify-end">
//                 <button type="button" onClick={onClose} className="mr-4">Cancel</button>
//                 <button type="submit" className="bg-blue-500 text-white p-2">Add Product</button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default AddProductModal; 











// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';

// // Helper function to convert form data to FormData
// const createFormData = (values) => {
//   const formData = new FormData();
//   formData.append('categoryId', values.categoryId);
//   formData.append('subcategoryId', values.subcategoryId);
//   formData.append('name', values.name);
//   formData.append('price', values.price);
//   formData.append('quantity', values.quantity);
//   formData.append('brand', values.brand);
//   formData.append('discount', values.discount);
//   formData.append('description', values.description);

//   // Append multiple images files
//   values.images.forEach((image) => {
//     formData.append('images', image);
//   });

//   // Append thumbnail image
//   if (values.thumbnail) {
//     formData.append('thumbnail', values.thumbnail);
//   }

//   return formData;
// };

// const AddProductModal = ({ isOpen, onClose, onSubmit }) => { 
//     if (!isOpen) return null;
//   // Formik setup
//   const formik = useFormik({
//     initialValues: {
//       categoryId: '',
//       subcategoryId: '',
//       name: '',
//       price: '',
//       quantity: '',
//       brand: '',
//       discount: '',
//       description: '',
//       images: [],
//       thumbnail: null,
//     },
//     validationSchema: Yup.object({
//       categoryId: Yup.string().required('Category ID is required'),
//       subcategoryId: Yup.string().required('Subcategory ID is required'),
//       name: Yup.string().required('Product name is required'),
//       price: Yup.number().required('Price is required').positive('Price must be positive'),
//       quantity: Yup.number().required('Quantity is required').min(1, 'At least 1 item required'),
//       brand: Yup.string().required('Brand is required'),
//       discount: Yup.number().min(0).max(100, 'Discount must be between 0 and 100'),
//       description: Yup.string().required('Description is required'),
//       images: Yup.mixed().required('Images are required'),
//       thumbnail: Yup.mixed().required('Thumbnail is required'),
//     }),
//     onSubmit: (values) => {
//       const formData = createFormData(values);
//       // Submit formData to backend
//     //   console.log('FormData ready to submit:', formData); 
//     submitData(formData)
//       // You can now send formData using any HTTP library like axios or fetch
//     },
//   });
//       async function submitData(data){
//         axios.post(
//             'http://localhost:8000/api/products', 
//             data
//         )
//       }
//   // Handle file input changes for images and thumbnail
//   const handleImageChange = (e) => {
//     if (e.target.files) {
//       const filesArray = Array.from(e.target.files);
//       formik.setFieldValue('images', filesArray);
//     }
//   };

//   const handleThumbnailChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       formik.setFieldValue('thumbnail', e.target.files[0]);
//     }
//   };
// //  
//   return (
//     <div className=' fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50'> 
//      <div className="bg-white p-8 rounded shadow-lg">
//         <form onSubmit={formik.handleSubmit} className="">
//       {/* Category ID */}
//       <div>
//         <label htmlFor="categoryId" className="block font-medium text-gray-700">
//           Category ID
//         </label>
//         <input
//           id="categoryId"
//           name="categoryId"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.categoryId}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         />
//         {formik.touched.categoryId && formik.errors.categoryId ? (
//           <div className="text-red-500">{formik.errors.categoryId}</div>
//         ) : null}
//       </div>

//       {/* Subcategory ID */}
//       <div>
//         <label htmlFor="subcategoryId" className="block font-medium text-gray-700">
//           Subcategory ID
//         </label>
//         <input
//           id="subcategoryId"
//           name="subcategoryId"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.subcategoryId}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         />
//         {formik.touched.subcategoryId && formik.errors.subcategoryId ? (
//           <div className="text-red-500">{formik.errors.subcategoryId}</div>
//         ) : null}
//       </div>

//       {/* Name */}
//       <div>
//         <label htmlFor="name" className="block font-medium text-gray-700">
//           Name
//         </label>
//         <input
//           id="name"
//           name="name"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.name}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         />
//         {formik.touched.name && formik.errors.name ? (
//           <div className="text-red-500">{formik.errors.name}</div>
//         ) : null}
//       </div>

//       {/* Price */}
//       <div>
//         <label htmlFor="price" className="block font-medium text-gray-700">
//           Price
//         </label>
//         <input
//           id="price"
//           name="price"
//           type="number"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.price}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         />
//         {formik.touched.price && formik.errors.price ? (
//           <div className="text-red-500">{formik.errors.price}</div>
//         ) : null}
//       </div>

//       {/* Quantity */}
//       <div>
//         <label htmlFor="quantity" className="block font-medium text-gray-700">
//           Quantity
//         </label>
//         <input
//           id="quantity"
//           name="quantity"
//           type="number"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.quantity}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         />
//         {formik.touched.quantity && formik.errors.quantity ? (
//           <div className="text-red-500">{formik.errors.quantity}</div>
//         ) : null}
//       </div>

//       {/* Brand */}
//       <div>
//         <label htmlFor="brand" className="block font-medium text-gray-700">
//           Brand
//         </label>
//         <input
//           id="brand"
//           name="brand"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.brand}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         />
//         {formik.touched.brand && formik.errors.brand ? (
//           <div className="text-red-500">{formik.errors.brand}</div>
//         ) : null}
//       </div>

//       {/* Discount */}
//       <div>
//         <label htmlFor="discount" className="block font-medium text-gray-700">
//           Discount (%)
//         </label>
//         <input
//           id="discount"
//           name="discount"
//           type="number"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.discount}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         />
//         {formik.touched.discount && formik.errors.discount ? (
//           <div className="text-red-500">{formik.errors.discount}</div>
//         ) : null}
//       </div>

//       {/* Description */}
//       <div>
//         <label htmlFor="description" className="block font-medium text-gray-700">
//           Description
//         </label>
//         <textarea
//           id="description"
//           name="description"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.description}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//         />
//         {formik.touched.description && formik.errors.description ? (
//           <div className="text-red-500">{formik.errors.description}</div>
//         ) : null}
//       </div>

//       {/* Images */}
//       <div>
//         <label htmlFor="images" className="block font-medium text-gray-700">
//           Images
//         </label>
//         <input
//           id="images"
//           name="images"
//           type="file"
//           onChange={handleImageChange}
//           accept="image/*"
//           multiple
//           className="mt-1 block w-full"
//         />
//         {formik.touched.images && formik.errors.images ? (
//           <div className="text-red-500">{formik.errors.images}</div>
//         ) : null}
//       </div>

//       {/* Thumbnail */}
//       <div>
//         <label htmlFor="thumbnail" className="block font-medium text-gray-700">
//           Thumbnail
//         </label>
//         <input
//           id="thumbnail"
//           name="thumbnail"
//           type="file"
//           onChange={handleThumbnailChange}
//           accept="image/*"
//           className="mt-1 block w-full"
//         />
//         {formik.touched.thumbnail && formik.errors.thumbnail ? (
//           <div className="text-red-500">{formik.errors.thumbnail}</div>
//         ) : null}
//       </div>

//       {/* Submit button */}
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
//       >
//         Submit
//       </button>
//     </form> 
//     </div>
//     </div>
//   );
// };

// export default AddProductModal; 















import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
    <div className="fixed inset-0 flex items-center justify-center  bg-gray-600 bg-opacity-50 overflow-y-auto">
      <div className=" bg-white p-7   rounded shadow-lg"> 
         <div className='flex justify-center items-center'>
          <img src="imgs/logo/logo.jpg" className='w-44 mt-96  ' alt="" />
        </div> 
        <h2 className="text-xl font-semibold mb-4 ">Add New Product</h2>
            <div className=''>
        {/* Form Fields */}
        <form onSubmit={formik.handleSubmit}>
          {/* <div className='mt-28'>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formik.values.category}
              onChange={formik.handleChange}
              className="mb-2 p-2 border w-96 rounded-full h-8"
            /> 
            
           

          </div> */}

          <div class="relative w-96  mb-4">
            <input
              type="text"
              name="category"
              placeholder=" "
              value={formik.values.category}
              onChange={formik.handleChange}
              className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            <label
              for="category"
              className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
            >
              Category
            </label>
            {formik.errors.category && formik.touched.category ? (
              <div className="text-red-500 font-semibold text-xs">{formik.errors.category}</div>
            ) : null}
          </div>

          <div className='relative w-96  mb-4'>

            <input
              type="text"
              name="subcategory"
              placeholder=""
              value={formik.values.subcategory}
              onChange={formik.handleChange}
              className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />

            <label
              for="subcategory"
              className=" -mt-5 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
            >
              Subcategory
            </label>

            {formik.errors.subcategory && formik.touched.subcategory ? (
              <div className="text-red-500 font-semibold text-xs">{formik.errors.subcategory}</div>
            ) : null}

          </div>

          <div className='relative w-96  mb-4'>

            <input
              type="text"
              name="name"
              placeholder=""
              value={formik.values.name}
              onChange={formik.handleChange}
              className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />

            <label
              for="name"
              className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
            >
              Name
            </label>

            {formik.errors.name && formik.touched.name ? (
              <div className="text-red-500 font-semibold text-xs">{formik.errors.name}</div>
            ) : null}

          </div>

          <div className='relative w-96  mb-4'>

            <input
              type="number"
              name="price"
              placeholder=""
              value={formik.values.price}
              onChange={formik.handleChange}
              className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />

            <label
              for="price"
              className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
            >
              Price
            </label>

            {formik.errors.price && formik.touched.price ? (
              <div className="text-red-500 font-semibold text-xs">{formik.errors.price}</div>
            ) : null}

          </div>

          <div className='relative w-96  mb-4'>

            <input
              type="number"
              name="quantity"
              placeholder=""
              value={formik.values.quantity}
              onChange={formik.handleChange}
              className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />

            <label
              for="quantity"
              className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
            >
              Quantity
            </label>

            {formik.errors.quantity && formik.touched.quantity ? (
              <div className="text-red-500 font-semibold text-xs">{formik.errors.quantity}</div>
            ) : null}

          </div>

          <div className='relative w-96  mb-4'>

            <input
              type="text"
              name="brand"
              placeholder=""
              value={formik.values.brand}
              onChange={formik.handleChange}
              className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />

            <label
              for="brand"
              className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
            >
              Brand
            </label>

            {formik.errors.brand && formik.touched.brand ? (
              <div className="text-red-500 font-semibold text-xs">{formik.errors.brand}</div>
            ) : null}
          </div>
          <div className='relative w-96  mb-4'>
            <input
              type="number"
              name="discount"
              placeholder=""
              value={formik.values.discount}
              onChange={formik.handleChange}
              className="block w-full mt-5  px-4 py-2 text-sm border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />

            <label
              for="discount"
              className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
            >
              Discount
            </label>


            {formik.errors.discount && formik.touched.discount ? (
              <div className="text-red-500 font-semibold text-xs">{formik.errors.discount}</div>
            ) : null}
          </div>

          <div className='relative w-96  mb-4'>

            <textarea
              name="description"
              placeholder=""
              value={formik.values.description}
              onChange={formik.handleChange}
              className="block w-full mt-5  px-4 py-2 text-sm border rounded-2xl h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />

            <label
              for="description"
              className=" -mt-6 absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
            >
              Description
            </label>

            {formik.errors.description && formik.touched.description ? (
              <div className="text-red-500 font-semibold text-xs">{formik.errors.description}</div>
            ) : null}

          </div>
          <div>

            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
              className="block w-full mt-5  px-4 py-2 text-sm border rounded-2xl h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
            />
            {formik.errors.images && formik.touched.images ? (
              <div className="text-red-500 font-semibold text-xs">{formik.errors.images}</div>
            ) : null}
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-5">
            <button type="button" onClick={onClose} className="mr-4">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2">
              Add Product
            </button>
          </div>
        </form> 
        </div>
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