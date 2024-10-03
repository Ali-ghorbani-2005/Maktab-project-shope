import axios from "axios";

export const deleteProduct = async (productId) => { 
    const token = localStorage.getItem('token')
    try {
        const response = await axios.delete(`http://localhost:8000/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // اضافه کردن کنسول لاگ برای بررسی پاسخ API
        console.log('API Response:', response.data);
        
        return response.data;
      }  catch (error) {
    throw new Error("Error deleting product");
  }
}; 






