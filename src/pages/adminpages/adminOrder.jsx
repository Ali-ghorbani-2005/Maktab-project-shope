import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../services/adminProduct"; // تابع دریافت سفارش‌ها
import Lod from "../../components/loding/lod"; // کامپوننت بارگذاری

export default function AdminOrder() { 

  const [orders, setOrders] = useState([]); // ذخیره سفارش‌ها
  const [loading, setLoading] = useState(true); // وضعیت بارگذاری
  const [error, setError] = useState(null); // ذخیره خطاها
  const [currentPage, setCurrentPage] = useState(1); // شماره صفحه جاری
  const [totalPages, setTotalPages] = useState(5);  // تعداد کل صفحات (به صورت پیش‌فرض)

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchOrders(currentPage); // درخواست سفارش‌ها بر اساس صفحه
        setOrders(data.data.orders); // ذخیره سفارش‌ها
        setTotalPages(data.total_pages); // ذخیره تعداد کل صفحات
        setLoading(false); // پایان بارگذاری
      } catch (err) {
        setError("مشکلی در بارگیری سفارش‌ها به وجود آمده");
        setLoading(false);
      }
    };

    getOrders(); // فراخوانی تابع
  }, [currentPage]); // درخواست مجدد هنگام تغییر صفحه

  if (loading) return <Lod />; // نمایش حالت بارگذاری
  if (error) return <p>{error}</p>; // نمایش خطاها

  return (
    <div className="flex flex-col justify-center items-center">
      <table className="border border-orange-400 w-[700px]">
        <thead className="h-10">
          <tr className="border border-orange-400"> 
          <th className="border border-orange-400"></th> 
            <th className="border border-orange-400">مجموع مبلغ</th> 
            <th className="border border-orange-400">نام کاربری</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                  <td className="border border-orange-400 text-center"><button>برسی سفارش</button></td> 
                <td className="border border-orange-400 text-center">{order.totalPrice}</td> 
                <td className="border border-orange-400 text-right text-xl">
                  {order.user?.username || "بدون نام کاربری"}
                </td> 
              
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">هیچ سفارشی وجود ندارد</td>
            </tr>
          )}
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