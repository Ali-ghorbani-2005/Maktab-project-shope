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
     <div className="bg-white w-[900px] rounded-2xl">  
     <div>
      <p className="text-3xl ml-2 font-bold border-b-2 border-gray-400">Products</p>  
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
              <td className="text-center border-b border-gray-400"><button>حذف</button> / <button>ویرایش</button></td> 
              <td className="text-center border-b border-gray-400 ">{product.category.name}/{product.subcategory.name}</td>
              <td className="text-center border-b border-gray-400 ">{product.name}</td>
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
    </div>
  );
}
