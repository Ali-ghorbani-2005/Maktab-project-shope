import axios from "axios";

const BASE_URL = "http://localhost:8000/api/products";

// تابعی برای دریافت محصولات با توجه به شماره صفحه
export const fetchProducts = async (page = 1) => { 
    const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${BASE_URL}?page=${page}` , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data; // داده‌های محصولات
  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);
    throw error;
  }
};  







const ORDER_URL = "http://localhost:8000/api/orders";

// تابعی برای دریافت سفارش‌ها با توجه به شماره صفحه
export const fetchOrders = async (page = 1) => { 
    const token = localStorage.getItem('token'); // گرفتن توکن از localStorage
  try {
    const response = await axios.get(`${ORDER_URL}?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // بازگشت داده‌ها شامل سفارش‌ها و اطلاعات pagination
  } catch (error) {
    console.error("خطا در دریافت سفارش‌ها:", error);
    throw error;
  }
};

