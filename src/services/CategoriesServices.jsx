// import {LOGIN_URL} from '../constants/url' 



import axios from "axios";

// Fetch categories
export const fetchCategories = async () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDk5MGQ3NTIwMjhiZDM3ZjUwYzVjMiIsImlhdCI6MTcyNjIxMzM4NiwiZXhwIjoxNzI2MjE0Mjg2fQ.2Dpq0bWYaONJulnpwkyO5-j6bUIcAwcvy7_XutSUL1k";
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

// Fetch subcategories


// Fetch subcategories based on category ID
export const fetchSubcategories = async (categoryId) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDk5MGQ3NTIwMjhiZDM3ZjUwYzVjMiIsImlhdCI6MTcyNjIxMzM4NiwiZXhwIjoxNzI2MjE0Mjg2fQ.2Dpq0bWYaONJulnpwkyO5-j6bUIcAwcvy7_XutSUL1k"; // توکن را در اینجا قرار بده
  try {
    const response = await axios.get(`http://localhost:8000/api/subcategories?categoryId=${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // توکن را به عنوان هدر اضافه کن
      },
    });
    // بررسی ساختار داده
    if (response.data && response.data.data && response.data.data.subcategories) {
      return response.data.data.subcategories; // آرایه زیرمجموعه‌ها را برگردان
    } else {
      return []; // در صورت نداشتن داده، یک آرایه خالی برگردان
    }
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};