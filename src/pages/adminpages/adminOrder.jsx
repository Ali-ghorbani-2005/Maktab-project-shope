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

    <div className="bg-white w-[900px] rounded-2xl">  
      <div>
      <p className="text-3xl ml-2 font-bold border-b-2 border-gray-400">Orders</p>  
      </div>
      <table className=" w-[870px] ml-3">
        <thead className="h-10">
          <tr className="border-b border-gray-400"> 
          <th className="border-b border-gray-400"></th> 
            <th className="text-gray-300 text-xl border-b border-gray-400">مجموع مبلغ</th> 
            <th className="text-gray-300 text-xl border-b border-gray-400">نام کاربری</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                  <td className=" text-center border-b border-gray-400"><button className="border-2 border-neutral-400 w-36 h-8 rounded-xl bg-red-500 text-white hover:text-slate-500  ">برسی سفارش</button></td> 
                <td className=" text-center border-b border-gray-400 ">{order.totalPrice}</td> 
                <td className=" text-right text-xl border-b border-gray-400">
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

      <div className="flex mt-4 justify-center items-center">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-2 py-1 mx-1 ${currentPage === index + 1 ? "bg-blue-500 rounded-full text-white" : "bg-gray-300"} hover:bg-blue-400 `}
          >
            {index + 1}
          </button>
        ))}
      </div> 
      </div>
    </div>
  );
}