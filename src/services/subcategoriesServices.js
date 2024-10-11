import axios from "axios";

export const fetchLaptops = async (categorySlug = '66dc7710225ac943fb1693f3') => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:8000/api/products?category=${categorySlug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.products.slice(0, 4);  // نمایش فقط ۴ محصول
  } catch (error) {
    console.error("Error fetching laptops:", error);
    throw error;
  }
};

export const fetchAllLaptops = async (categorySlug = '66dc7710225ac943fb1693f3') => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:8000/api/products?category=${categorySlug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.products;  // دریافت تمام محصولات لپ‌تاپ
  } catch (error) {
    console.error("Error fetching all laptops:", error);
    throw error;
  }
}; 









export const fetchPhone = async (categorySlug = '66dc7710225ac943fb1693f3') => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:8000/api/products?category=${categorySlug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.products.slice(0, 4);  // نمایش فقط ۴ محصول
  } catch (error) {
    console.error("Error fetching laptops:", error);
    throw error;
  }
};

export const fetchAllPhone = async (categorySlug = '66dc7710225ac943fb1693f3') => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:8000/api/products?category=${categorySlug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.products;  // دریافت تمام محصولات لپ‌تاپ
  } catch (error) {
    console.error("Error fetching all laptops:", error);
    throw error;
  }
};