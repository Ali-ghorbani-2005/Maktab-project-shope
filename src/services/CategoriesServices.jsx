// import {LOGIN_URL} from '../constants/url' 



import axios from "axios";

// Fetch categories
export const fetchCategories = async () => {
  // const token = ""; 
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get("http://localhost:8000/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`, // اصلاح سینتکس Authorization
      },
    });
    return response.data.data.categories; // بازگشت categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
// Fetch subcategories based on category ID
export const fetchSubcategories = async (categoryId) => {
  // const token = ""; 
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`http://localhost:8000/api/subcategories?category=${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetched subcategories:", response.data); // بررسی پاسخ در کنسول
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};