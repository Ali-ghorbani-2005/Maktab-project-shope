import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { fetchCategories, fetchSubcategories } from '../../services/CategoriesServices'

const AddProductModal = ({ isOpen, onClose, onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // وضعیت پیام موفقیت

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
      setSuccessMessage('محصول با موفقیت اضافه شد!'); // نمایش پیام موفقیت
      onClose(); // بستن مدال پس از ارسال
      setTimeout(() => {
        setSuccessMessage(''); // مخفی کردن پیام بعد از 3 ثانیه
      }, 3000);
    }
  });

  const handleImageChange = (e) => {
    formik.setFieldValue('images', e.target.files[0]);
  };

  const handleCategoryChange = async (categoryId) => {
    formik.setFieldValue('subcategory', '');
    try {
      const data = await fetchSubcategories(categoryId);
      setSubcategories(data.data.subcategories);
    } catch (error) {
      console.error('Failed to fetch subcategories', error);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    getCategories();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">موفقیت!</strong>
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        <div className='flex justify-center mb-6'>
          <img src="imgs/logo/logo.jpg" className='w-44' alt="Logo" />
        </div>
        <h2 className="text-2xl font-semibold mt-20">Add New Product</h2>

        {/* Form Fields */}
        <form onSubmit={formik.handleSubmit}>
          <div className='relative w-full mb-4'>
            <select
              name="category"
              value={formik.values.category}
              onChange={(e) => {
                handleCategoryChange(e.target.value);
                formik.handleChange(e);
              }}
              className="block w-full px-4 py-2 text-sm border rounded-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">انتخاب دسته‌بندی</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
            {formik.errors.category && formik.touched.category && (
              <div className="text-red-500 font-semibold text-xs">{formik.errors.category}</div>
            )}
          </div>

          <div className='relative w-full mb-4'>
            <select
              name="subcategory"
              value={formik.values.subcategory}
              onChange={formik.handleChange}
              className="block w-full px-4 py-2 text-sm border rounded-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">انتخاب زیر دسته‌بندی</option>
              {subcategories.map(subcategory => (
                <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
              ))}
            </select>
            {formik.errors.subcategory && formik.touched.subcategory && (
              <div className="text-red-500 font-semibold text-xs">{formik.errors.subcategory}</div>
            )}
          </div>

          {/* سایر فیلدها */}
          {[
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
                className="absolute left-4 top-2 text-sm text-gray-500 transition-all transform -translate-y-1/2 bg-white px-1"
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






