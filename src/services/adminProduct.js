import axios from "axios";

const BASE_URL = "http://localhost:8000/api/products";

// تابعی برای دریافت محصولات با توجه به شماره صفحه
export const fetchProducts = async (page = 1) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${BASE_URL}?page=${page}`, {
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



// تابع برای به‌روزرسانی محصول
export const updateProduct = async (productId, updatedValues) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(`${BASE_URL}/${productId}`, updatedValues, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("خطا در به‌روزرسانی محصول:", error);
    throw error;
  }
};




// const ORDER_URL = "http://localhost:8000/api/orders";

// // تابعی برای دریافت سفارش‌ها با توجه به شماره صفحه و فیلترها
// export const fetchOrders = async (page = 1, filters = {}) => {
//   const token = localStorage.getItem('token'); // گرفتن توکن از localStorage
//   const { delivered, pending } = filters;

//   let filterQuery = '';
//   if (delivered) {
//     filterQuery += '&deliveryStatus=true';
//   }
//   if (pending) {
//     filterQuery += '&deliveryStatus=false';
//   }

//   try {
//     const response = await axios.get(`${ORDER_URL}?page=${page}${filterQuery}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data; // بازگشت داده‌ها شامل سفارش‌ها و اطلاعات pagination
//   } catch (error) {
//     console.error("خطا در دریافت سفارش‌ها:", error);
//     throw error;
//   }
// }; 





const ORDER_URL = "http://localhost:8000/api/orders";

// تابعی برای دریافت سفارش‌ها با توجه به شماره صفحه و فیلترها
export const fetchOrders = async (page = 1, filters = {}) => {
  const token = localStorage.getItem('token'); // گرفتن توکن از localStorage
  const { allOrders, delivered, pending } = filters;

  let filterQuery = '';
  if (!allOrders) { // فقط زمانی که "همه سفارش‌ها" فعال نباشد فیلترها اعمال می‌شوند
    if (delivered) {
      filterQuery += '&deliveryStatus=true';
    }
    if (pending) {
      filterQuery += '&deliveryStatus=false';
    }
  }

  try {
    const response = await axios.get(`${ORDER_URL}?page=${page}${filterQuery}`, {
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




// تابع دریافت جزئیات یک سفارش



// const ORDER_URL = "http://localhost:8000/api/orders"; // آدرس API سفارش‌ها

export const fetchOrderDetails = async (orderId) => {
  const token = localStorage.getItem('token'); // گرفتن توکن از localStorage
  try {
    const response = await axios.get(`${ORDER_URL}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // بازگشت داده‌ها
  } catch (error) {
    throw error; // در صورت بروز خطا
  }
};


