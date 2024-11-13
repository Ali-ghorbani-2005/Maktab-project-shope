import React, { useState } from 'react';
import { login } from '../../services/authServices'; // فرض کنید authService.js شامل تابع login است
import { useNavigate } from 'react-router-dom'; // برای هدایت به صفحه دیگر

const OrderConfirmationModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // استفاده از useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    const { success, token, message } = await login(username, password);

    if (success) {
      localStorage.setItem('token', token);
      onClose(); // بستن کامپوننت لاگین
      navigate('/user-info'); // هدایت به صفحه اطلاعات کاربر
    } else {
      setError(message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">ورود به حساب کاربری</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <label className="block text-sm font-medium text-gray-700 mb-2">نام کاربری:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 text-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-150 ease-in-out"
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 text-gray-900 focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-150 ease-in-out"
          />
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out mr-2"
            >
              بستن
            </button>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
            >
              ورود
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
