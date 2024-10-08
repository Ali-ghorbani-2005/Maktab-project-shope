export const login = async (username, password) => {
  const API_URL = 'http://localhost:8000/api/auth/login';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.token.accessToken;

      if (accessToken) {
        return { success: true, token: accessToken }; // بازگشت توکن
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