import axios from "axios";

export const fetchProductsBySubcategory = async (subcategoryId, page = 1) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`http://localhost:8000/api/products?subcategory=${subcategoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // نمایش اطلاعات کامل پاسخ سرور در کنسول
    console.log("Response from server:", response);

    // بررسی ساختار response و برگرداندن محصولات
    if (response.data && response.data.data && response.data.data.products) {
      return response.data.data.products;
    } else {
      console.log("No products found for subcategory or page:", subcategoryId, page);
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};