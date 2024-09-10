// authServices.jsx
export const login = async (username, password) => {
  const API_URL = 'http://localhost:8000/api/auth/login';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // ارسال داده‌های لاگین
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Full server response:', data); // چاپ کامل پاسخ سرور

      // دسترسی به token و سپس accessToken
      const accessToken = data.token.accessToken;

      if (accessToken) {
        localStorage.setItem('token', accessToken); // ذخیره توکن در localStorage
        return { success: true };
      } else {
        return { success: false, message: 'No access token found.' };
      }
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'Login failed' };
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
    return { success: false, message: 'An error occurred during login.' };
  }
};