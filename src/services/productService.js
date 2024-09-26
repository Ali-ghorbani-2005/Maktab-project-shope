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





export const fetchProductsByIds = async (productIds) => { 
  const token = localStorage.getItem('token');
  try {
      const promises = productIds.map(async (id) => {
          const response = await axios.get(`http://localhost:8000/api/products/${id}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          return response.data; // returning the full data structure
      });

      const results = await Promise.all(promises);
      return results;
  } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
  }
}; 













export const fetchProductById = async (productId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:8000/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // اضافه کردن کنسول لاگ برای بررسی پاسخ API
    console.log('API Response:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw new Error('Failed to fetch product data');
  }
};






