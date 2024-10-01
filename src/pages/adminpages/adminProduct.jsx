import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/adminProduct";
import Lod from "../../components/loding/lod";
import { deleteProduct } from "../../services/deleteServices"; // اضافه کردن تابع حذف

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // صفحه جاری
  const [totalPages, setTotalPages] = useState(5);  // کل صفحات
  const [showConfirm, setShowConfirm] = useState(false); // نمایش یا عدم نمایش پنجره تأیید
  const [selectedProduct, setSelectedProduct] = useState(null); // ذخیره محصول انتخاب شده برای حذف

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(currentPage); // شماره صفحه
        setProducts(data.data.products); // ذخیره محصولات در state
        setTotalPages(data.total_pages); // ذخیره تعداد کل صفحات
        setLoading(false);
      } catch (err) {
        setError("مشکلی در بارگیری محصولات به وجود آمده");
        setLoading(false);
      }
    };

    getProducts();
  }, [currentPage]); // فراخوانی مجدد هنگام تغییر صفحه

  const handleDeleteClick = (productId) => {
    setSelectedProduct(productId); // ذخیره محصول انتخاب شده
    setShowConfirm(true); // نمایش پنجره تأیید
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(selectedProduct); // حذف محصول
      setProducts(products.filter(product => product._id !== selectedProduct)); // حذف محصول از لیست
      setShowConfirm(false); // بستن پنجره تأیید
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false); // بستن پنجره تأیید
  };

  if (loading) return <Lod />;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white w-[900px] rounded-2xl">
        <div className="flex border-b-2 border-gray-400">
          <p className="text-3xl ml-2 font-bold">Products</p>
          <div className="ml-[700px] mt-1">
            <button className=" bg-blue-400 w-10 h-7 rounded-lg hover:bg-blue-500">
              <img src="imgs/site-icons/addProduct.png" className="w-7 ml-1" alt="" />
            </button>
          </div>
        </div>
        <table className="w-[870px] ml-3">
          <thead className="h-10">
            <tr className="border-b border-gray-400">
              <th className="border-b border-gray-400"></th>
              <th className="text-gray-300 text-xl border-b border-gray-400">دسته بندی</th>
              <th className="text-gray-300 text-xl border-b border-gray-400">نام محصول</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="text-center border-b border-gray-400">
                  <button
                    className="w-7 rounded-lg text-white -ml-5 hover:bg-red-500"
                    onClick={() => handleDeleteClick(product._id)} // اضافه کردن فراخوانی حذف
                  >

                    <img src="imgs/site-icons/remove.png" alt="" className="w-7" />
                  </button>
                  /
                  <button className=" w-7 rounded-lg text-white hover:bg-blue-300">
                    <img src="imgs/site-icons/edit.png" alt="" className="w-7" />
                  </button>
                </td>
                <td className="text-center border-b border-gray-400">
                  {product.category.name}/{product.subcategory.name}
                </td>
                <td className="text-center border-b border-gray-400">{product.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* پنجره تأیید حذف */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p>آیا از حذف این کالا مطمئن هستید؟</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={confirmDelete} // تأیید حذف
                >
                  بله
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                  onClick={cancelDelete} // لغو حذف
                >
                  خیر
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex mt-4 justify-center items-center">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-2 py-1 mx-1 ${currentPage === index + 1 ? "bg-blue-500 rounded-full text-white" : "bg-gray-300"
                } hover:bg-blue-400`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}