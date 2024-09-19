import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/adminProduct";
import Lod from "../../components/loding/lod";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // صفحه جاری
  const [totalPages, setTotalPages] = useState(5);  // کل صفحات

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

  if (loading) return <Lod />;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      <table className="border border-orange-400 w-[700px]">
        <thead className="h-10">
          <tr className="border border-orange-400">
            <th className="border border-orange-400"></th> 
            <th className="border border-orange-400">دسته بندی</th>
            <th className="border border-orange-400">نام محصول</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-orange-400"><button>حذف</button> / <button>ویرایش</button></td> 
              <td className="border border-orange-400">{product.category.name}/{product.subcategory.name}</td>
              <td className="border border-orange-400 text-right text-xl">{product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? "bg-orange-400 rounded-full text-white" : "bg-gray-300"} hover:bg-orange-500`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
