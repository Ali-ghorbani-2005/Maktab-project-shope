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


// export const updateProduct = async (editProductId, updatedPrice, updatedQuantity) => {
//     try {
//         // Log the product ID, price, and quantity before making the request
//         console.log("Updating product with ID:", editProductId);
//         console.log("Updated Price:", updatedPrice);
//         console.log("Updated Quantity:", updatedQuantity);

//         const updatedProduct = {
//             price: updatedPrice,
//             quantity: updatedQuantity,
//         };

//         // Send PUT request to update product
//         const response = await axios.put(`http://localhost:8000/api/products/${editProductId}`, updatedProduct, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`, // Make sure the token is correct
//             },
//         });

//         // Log success response
//         console.log("Product updated successfully:", response.data);
//     } catch (error) {
//         // Log error for debugging
//         console.error("Error updating product:", error);

//         if (error.response) {
//             console.error("Response data:", error.response.data);
//             console.error("Response status:", error.response.status);
//             console.error("Response headers:", error.response.headers);
//         } else if (error.request) {
//             console.error("No response received:", error.request);
//         } else {
//             console.error("Error message:", error.message);
//         }
//     }
// }; 






// export const updateProduct = async (editProductId, updatedFields) => {
//   try {
//     // چاپ اطلاعات برای بررسی درخواست
//     console.log("Updating product with ID:", editProductId);
//     console.log("Updated Fields:", updatedFields);

//     // فیلتر کردن فیلدهایی که تغییر کرده‌اند
//     const updatedProduct = {};

//     if (updatedFields.price !== undefined) {
//       updatedProduct.price = updatedFields.price;
//     }
//     if (updatedFields.quantity !== undefined) {
//       updatedProduct.quantity = updatedFields.quantity;
//     }

//     // بررسی اینکه حداقل یک فیلد تغییر کرده باشد
//     if (Object.keys(updatedProduct).length === 0) {
//       console.log("No fields have been updated.");
//       return;
//     }

//     // درخواست PATCH برای به‌روزرسانی محصول
//     const response = await axios.patch(`http://localhost:8000/api/products/${editProductId}`, updatedProduct, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`, // بررسی صحت توکن
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//     });

//     // پاسخ موفقیت‌آمیز درخواست
//     console.log("Product updated successfully:", response.data);

//     // ذخیره تغییرات در localStorage
//     localStorage.setItem(`product_${editProductId}_changes, JSON.stringify(updatedProduct)`);

//   } catch (error) {
//     // مدیریت خطاها و چاپ پیام‌های مرتبط
//     console.error("Error updating product:", error);

//     if (error.response) {
//       console.error("Response data:", error.response.data);
//       console.error("Response status:", error.response.status);
//       console.error("Response headers:", error.response.headers);
//     } else if (error.request) {
//       console.error("No response received:", error.request);
//     } else {
//       console.error("Error message:", error.message);
//     }
//   }
// };



export const updateProduct = async (editProductId, updatedFields) => {
  try {
    console.log("Updating product with ID:", editProductId);
    console.log("Updated Fields:", updatedFields);

    const updatedProduct = {};

    // تبدیل مقدار quantity به عدد صحیح
    if (updatedFields.quantity !== undefined) {
      updatedProduct.quantity = updatedFields.quantity === '' ? 0 : parseInt(updatedFields.quantity, 10);
    }

    // تبدیل مقدار price به عدد اعشاری
    if (updatedFields.price !== undefined) {
      updatedProduct.price = updatedFields.price === '' ? 0 : parseFloat(updatedFields.price);
    }

    // بررسی اینکه حداقل یک فیلد تغییر کرده باشد
    if (Object.keys(updatedProduct).length === 0) {
      console.log("No fields have been updated.");
      return;
    }

    // درخواست PATCH برای به‌روزرسانی محصول
    const response = await axios.patch(`http://localhost:8000/api/products/${editProductId}`, updatedProduct, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log("Product updated successfully:", response.data);

    // ذخیره تغییرات در localStorage
    localStorage.setItem(`product_${editProductId}_changes, JSON.stringify(updatedProduct)`);

  } catch (error) {
    console.error("Error updating product:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
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


