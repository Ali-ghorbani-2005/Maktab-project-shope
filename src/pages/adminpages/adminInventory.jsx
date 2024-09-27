import React, { useEffect, useState } from "react";
import { fetchProducts, updateProduct } from "../../services/adminProduct";
import Lod from "../../components/loding/lod";

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [editProductId, setEditProductId] = useState(null); // شناسه محصول در حال ویرایش
  const [editField, setEditField] = useState(null); // فیلدی که در حال ویرایش است
  const [editedValues, setEditedValues] = useState({ quantity: '', price: '' }); // مقادیر ویرایش‌شده

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

    getProducts();
  }, [currentPage]);

  // شروع ویرایش موجودی یا قیمت
  const handleEditClick = (productId, field) => {
    setEditProductId(productId); // ذخیره شناسه محصول در حال ویرایش
    setEditField(field); // مشخص کردن اینکه کدام فیلد در حال ویرایش است (quantity یا price)
    const product = products.find((product) => product._id === productId);
    setEditedValues({ quantity: product.quantity, price: product.price }); // مقادیر اولیه برای ویرایش
  };

  // ذخیره مقادیر ورودی جدید
  const handleInputChange = (e) => {
    setEditedValues({ ...editedValues, [editField]: e.target.value });
  };

  // ذخیره تغییرات
  const handleSave = async () => {
    const updatedProduct = {
      ...products.find((product) => product._id === editProductId),
      [editField]: editedValues[editField],
    };
    try {
      await updateProduct(editProductId, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === editProductId ? updatedProduct : product
        )
      );
      setEditProductId(null);
      setEditField(null);
    } catch (error) {
      console.error("خطا در ذخیره تغییرات:", error);
    }
  };

  if (loading) return <Lod />;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-white w-[900px] rounded-2xl">
        <div>
          <p className="text-3xl ml-2 font-bold border-b-2 border-gray-400">Product inventory</p>
        </div>
        <table className="w-[870px] ml-3">
          <thead className="h-10">
            <tr className="border-b border-gray-400">
              <th className="border-b border-gray-400 text-gray-300 text-xl">موجودی</th>
              <th className="border-b border-gray-400 text-gray-300 text-xl">قیمت</th>
              <th className="border-b border-gray-400 text-gray-300 text-xl">نام محصول</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="text-center border-b border-gray-400 ">
                  {editProductId === product._id && editField === "quantity" ? (
                    <input
                      type="text"
                      value={editedValues.quantity}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded p-1"
                    />
                  ) : (
                    <span onClick={() => handleEditClick(product._id, "quantity")}>
                      {product.quantity}
                    </span>
                  )}
                </td>
                <td className="text-center border-b border-gray-400 ">
                  {editProductId === product._id && editField === "price" ? (
                    <input
                      type="text"
                      value={editedValues.price}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded p-1"
                    />
                  ) : (
                    <span onClick={() => handleEditClick(product._id, "price")}>
                      {product.price}
                    </span>
                  )}
                </td>
                <td className="text-right border-b border-gray-400 text-xl">{product.name}</td>
              </tr>
            ))}

            
          </tbody>
        </table> 
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

      {/* دکمه ذخیره که بیرون از جدول نمایش داده می‌شود */}
      {editProductId && (
        <div className="mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            ذخیره
          </button>
        </div>
      )}
    </div>
  );
}
