import axios from "axios";

export const editProduct = async (editProductId, updatedFields) => {
  try {
    console.log("Editing product with ID:", editProductId);
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

    // سایر فیلدهای آپدیت مثل نام، دسته‌بندی و توضیحات
    if (updatedFields.name) {
      updatedProduct.name = updatedFields.name;
    }

    if (updatedFields.category) {
      updatedProduct.category = updatedFields.category;
    }

    if (updatedFields.subcategory) {
      updatedProduct.subcategory = updatedFields.subcategory;
    }

    if (updatedFields.description) {
      updatedProduct.description = updatedFields.description;
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




// services/categoryService.js


export const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/categories', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // برای مدیریت خطاها در کامپوننت
  }
};