
import axios from "axios";


export const fetchCategories = async () => {
  
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get("http://localhost:8000/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data.data.categories; 
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchSubcategories = async (categoryId) => {
 
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`http://localhost:8000/api/subcategories?category=${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetched subcategories:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};