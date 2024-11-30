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
    images: [],
    category: '',
    brand: '',
    quantity: '',
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
      images: product.images,
      category: product.category._id,
      description: product.description,
      price: product.price,
      brand: product.brand,
      quantity: product.quantity
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
              <th className=""></th>
              <th className="text-gray-600 text-xl ">دسته بندی</th>
              <th className="text-gray-600 text-xl ">نام محصول</th>
              <th className="text-gray-600 text-xl ">تصویر محصول</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100 transition-colors text-center h-24">
                <td className="flex items-center pt-8 ">

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


                </td>
                <td className="">
                  {product.category.name}/{product.subcategory.name}
                </td>
                <td className="">{product.name}</td>
                <td className="">
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







