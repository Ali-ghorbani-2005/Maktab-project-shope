import React, { useEffect, useState } from "react";
import { fetchOrders, fetchOrderDetails } from "../../services/adminProduct"; // تابع دریافت سفارش‌ها و جزئیات سفارش
import Lod from "../../components/loding/lod"; // کامپوننت بارگذاری


export default function AdminOrder() {
  const [orders, setOrders] = useState([]); // ذخیره سفارش‌ها
  const [loading, setLoading] = useState(true); // وضعیت بارگذاری
  const [error, setError] = useState(null); // ذخیره خطاها
  const [currentPage, setCurrentPage] = useState(1); // شماره صفحه جاری
  const [totalPages, setTotalPages] = useState(5);  // تعداد کل صفحات (به صورت پیش‌فرض)
  const [filters, setFilters] = useState({
    allOrders: true,  // فیلتر برای همه سفارش‌ها (پیش‌فرض)
    delivered: false, // چک‌باکس برای سفارش‌های تحویل داده شده
    pending: false,   // چک‌باکس برای سفارش‌های در انتظار تحویل
  });

  const [selectedOrder, setSelectedOrder] = useState(null); // ذخیره جزئیات سفارش انتخاب‌شده
  const [showModal, setShowModal] = useState(false); // کنترل نمایش مودال

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchOrders(currentPage, filters); // درخواست سفارش‌ها بر اساس صفحه و فیلترها
        setOrders(data.data.orders); // ذخیره سفارش‌ها
        setTotalPages(data.total_pages); // ذخیره تعداد کل صفحات
        setLoading(false); // پایان بارگذاری
      } catch (err) {
        setError("مشکلی در بارگیری سفارش‌ها به وجود آمده");
        setLoading(false);
      }
    };

    getOrders(); // فراخوانی تابع
  }, [currentPage, filters]); // درخواست مجدد هنگام تغییر صفحه یا فیلترها

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;

    if (name === "allOrders" && checked) {
      setFilters({
        allOrders: true,
        delivered: false,
        pending: false,
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: checked,
        allOrders: false,
      }));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOrderDetails = async (orderId) => {
    try {
      const details = await fetchOrderDetails(orderId); // گرفتن جزئیات سفارش
      setSelectedOrder(details.data.order); // ذخیره جزئیات سفارش انتخاب‌شده
      setShowModal(true); // نمایش مودال
    } catch (error) {
      console.error("خطا در دریافت جزئیات سفارش:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // بستن مودال
    setSelectedOrder(null); // پاک کردن جزئیات سفارش انتخاب‌شده
  };

  if (loading) return <Lod />; // نمایش حالت بارگذاری
  if (error) return <p>{error}</p>; // نمایش خطاها

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex space-x-4 mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="allOrders"
            checked={filters.allOrders}
            onChange={handleFilterChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>همه سفارش‌ها</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="delivered"
            checked={filters.delivered}
            onChange={handleFilterChange}
            className="form-checkbox h-5 w-5 text-green-600 "
          />
          <span>سفارش‌های تحویل داده شده</span>
        </label>



        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="pending"
            checked={filters.pending}
            onChange={handleFilterChange}
            className="h-5 w-5"
          />
          <span>سفارش‌های در انتظار تحویل</span>
        </label> 



      </div>
      <div className="bg-white w-[900px] rounded-2xl">
        <div>
          <p className="text-3xl ml-2 font-bold border-b-2 border-gray-400">Orders</p>
        </div>
        <table className="w-[870px] ml-3">
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
                  <td className="text-center border-b border-gray-400">
                    <button
                      className="border-2 border-neutral-400 w-36 h-8 rounded-xl bg-red-500 text-white hover:shadow-black hover:shadow-sm"
                      onClick={() => handleOrderDetails(order._id)}
                    >
                      بررسی سفارش
                    </button>
                  </td>
                  <td className="text-center border-b border-gray-400">
                    {order.totalPrice}
                  </td>
                  <td className="text-right text-xl border-b border-gray-400">
                    {order.user?.username || "بدون نام کاربری"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  هیچ سفارشی موجود نیست
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* مودال نمایش جزئیات سفارش */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <h2 className="text-xl font-bold mb-4">جزئیات سفارش</h2>
            {selectedOrder ? (
              <div className="text-right  ">
                <div className="border-2 border-amber-400 rounded-xl h-36">
                  <p className="mt-2 mr-2 text-[18px]" >مجموع مبلغ:   {selectedOrder.totalPrice}</p>
                  <p className="mt-2 mr-2 text-[18px]">نام کاربری: {selectedOrder.user.username}</p>
                  <p className="mt-2 mr-2 text-[18px]">تاریخ تحویل: {new Date(selectedOrder.deliveryDate).toLocaleString()}</p>
                  <p className="flex justify-end mt-2 mr-2 text-[18px]"> {selectedOrder.deliveryStatus ? <div><img src="imgs/site-icons/Ampeross.png" alt="" className="w-6" /></div> : <div><img src="imgs/site-icons/Custom.png" alt="" className="w-6" /></div>}:وضعیت تحویل</p>

                </div>
                <h3 className="mt-4 font-sans text-xl">محصولات</h3>
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">


                      <th className="py-2 px-4 border-b font-sans text-lg text-center">تعداد</th>

                      <th className="py-2 px-4 border-b text-center font-sans text-lg">قیمت</th>
                      <th className="py-2 px-4 border-b text-center font-sans text-lg">نام محصول</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.products.map((item) => {
                      console.log("Product item:", item); // چاپ کردن اطلاعات محصول در کنسول

                      return (
                        <tr key={item._id} className="hover:bg-gray-100">
                          {item.product ? (
                            <>



                              <td className="py-2 px-4 border-b flex justify-center items-center ">{item.count}</td>
                              <td className="py-2 px-4 border-b border border-neutral-300 text-center ">{item.product.price}</td>
                              <td className="py-2 px-4 border-b border border-neutral-300   text-center ">{item.product.name}</td>

                            </>
                          ) : (
                            <td colSpan="3" className="py-2 px-4 border-b text-red-500 text-center">
                              محصول در دسترس نیست
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>


              </div>
            ) : (
              <p>در حال بارگذاری جزئیات سفارش...</p>
            )}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleCloseModal}
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
}















