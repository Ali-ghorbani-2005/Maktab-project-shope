// import {LOGIN_URL} from '../constants/url' 



import axios from "axios";

// Fetch categories
export const fetchCategories = async () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDk5MGQ3NTIwMjhiZDM3ZjUwYzVjMiIsImlhdCI6MTcyNjQyNzQyMiwiZXhwIjoxNzI2NTM1NDIyfQ.zYSwsI9W5EXTHOGhA-qR-yRLrWLlnt5w8CYfXYPc7kU";
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
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDk5MGQ3NTIwMjhiZDM3ZjUwYzVjMiIsImlhdCI6MTcyNjQyNzQyMiwiZXhwIjoxNzI2NTM1NDIyfQ.zYSwsI9W5EXTHOGhA-qR-yRLrWLlnt5w8CYfXYPc7kU";
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