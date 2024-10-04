import React, { useEffect, useState } from "react";
import { fetchProducts, updateProduct } from "../../services/adminProduct";
import Lod from "../../components/loding/lod";

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [editProductIds, setEditProductIds] = useState([]); // شناسه‌های محصولات در حال ویرایش
  const [editedValues, setEditedValues] = useState({}); // مقادیر ویرایش‌شده برای هر محصول

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

  // شروع ویرایش یک فیلد (موجودی یا قیمت) برای محصول
  const handleEditClick = (productId, field) => {
    if (!editProductIds.includes(productId)) {
      setEditProductIds([...editProductIds, productId]); // افزودن شناسه محصول به لیست در حال ویرایش
    }
    const product = products.find((product) => product._id === productId);
    setEditedValues((prevValues) => ({
      ...prevValues,
      [productId]: { ...prevValues[productId], [field]: product[field] }, // ذخیره مقدار اولیه فقط برای فیلد خاص
    }));
  };

  // ذخیره مقادیر ورودی جدید
  const handleInputChange = (e, productId) => {
    const { name, value } = e.target;
    setEditedValues({
      ...editedValues,
      [productId]: { ...editedValues[productId], [name]: value },
    });
  };

  // ذخیره تغییرات جمعی
  const handleSaveAll = async () => {
    for (const productId of editProductIds) {
      const updatedProduct = {
        ...products.find((product) => product._id === productId),
        ...editedValues[productId],
      };
      try {
        await updateProduct(productId, updatedProduct);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? updatedProduct : product
          )
        );
      } catch (error) {
        console.error("خطا در ذخیره تغییرات:", error);
      }
    }
    setEditProductIds([]); // خالی کردن لیست محصولات در حال ویرایش
    setEditedValues({}); // خالی کردن مقادیر ویرایش‌شده
  };

  // انصراف از ویرایش جمعی
  const handleCancelAll = () => {
    setEditProductIds([]); // خالی کردن لیست محصولات در حال ویرایش
    setEditedValues({}); // خالی کردن مقادیر ویرایش‌شده
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
                <td className="text-center border-b border-gray-400">
                  {editProductIds.includes(product._id) && editedValues[product._id]?.quantity !== undefined ? (
                    <input 
                    type="text"
                      name="quantity"
                      value={editedValues[product._id]?.quantity || ''}
                      onChange={(e) => handleInputChange(e, product._id)}
                      className="border border-gray-300 rounded p-1"
                    />
                  ) : (
                    <span onClick={() => handleEditClick(product._id, 'quantity')}>
                      {product.quantity}
                    </span>
                  )}
                </td>
                <td className="text-center border-b border-gray-400">
                  {editProductIds.includes(product._id) && editedValues[product._id]?.price !== undefined ? (
                    <input
                      type="text"
                      name="price"
                      value={editedValues[product._id]?.price || ''}
                      onChange={(e) => handleInputChange(e, product._id)}
                      className="border border-gray-300 rounded p-1"
                    />
                  ) : (
                    <span onClick={() => handleEditClick(product._id, 'price')}>
                      {product.price}
                    </span>
                  )}
                </td>
                <td className="text-right border-b border-gray-400 text-xl">{product.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {editProductIds.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSaveAll}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
            >
              {editProductIds.length > 1 ? 'ذخیره همه' : 'ذخیره'}
            </button>
            <button
              onClick={handleCancelAll}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              {editProductIds.length > 1 ? 'انصراف همه' : 'انصراف'}
            </button>
          </div>
        )}
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
    </div>
  );
}







