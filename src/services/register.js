export const registerUser = async (formData) => { 
    const token = localStorage.getItem('token');
    try {
      // داده‌ها را پیش از ارسال کنسول می‌کنیم تا مطمئن شویم که به‌درستی ارسال می‌شوند.
      console.log('Sending data:', JSON.stringify(formData));

      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // تنظیم هدر Content-Type برای JSON
        },
        body: JSON.stringify(formData), // تبدیل داده‌ها به JSON
      });
      
      if (!response.ok) {
        throw new Error(`Registration failed: ${response.status} ${response.statusText}`);
      }

      console.log('Response received:', response); // بررسی وضعیت پاسخ

      return await response.json(); // بازگرداندن پاسخ JSON در صورت نیاز
    } catch (error) {
      console.error('Error:', error);
      throw error; // بازگرداندن خطا برای مدیریت در کد فراخوان
    }
};





// export const registerUser = async (formData) => { 
//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch('http://localhost:8000/api/users', {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ 
//           data: {
//             firstname: formData.firstname,
//             lastname: formData.lastname,
//             username: formData.username,
//             phoneNumber: formData.phoneNumber,
//             address: formData.address,
//             role: formData.role
//           }
//         }), // Wrap formData in a data object
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Registration failed'); // Use server's error message if available
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Error:', error);
//       throw error;
//     }
//   };