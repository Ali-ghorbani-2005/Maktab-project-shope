import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/register';

export default function Registration() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: 'USER', // مقدار پیش‌فرض
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      console.log('User registered successfully');
      navigate('/'); // Redirect after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-5">
        <img className="w-56" src="imgs/logo/logo.jpg" alt="Logo" />

        <p className="text-2xl font-bold mt-5">ثبت نام </p>

        <form className="mt-5 w-full max-w-md" onSubmit={handleSubmit}>
          {/* Firstname Input */}
          <div className="relative mt-5">
            <input
              className="peer mt-5 w-full h-12 rounded-xl border border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="text"
              placeholder=" "
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="firstname"
              className="absolute left-2 text-gray-500 transition-all duration-200 ease-in-out transform -translate-y-3 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600 mt-7"
            >
              Firstname
            </label>
          </div>

          {/* Lastname Input */}
          <div className="relative mt-3">
            <input
              className="peer mt-5 w-full h-12 rounded-xl border border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="text"
              placeholder=" "
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="lastname"
              className="absolute left-2 text-gray-500 transition-all duration-200 ease-in-out transform -translate-y-3 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600 mt-7"
            >
              Lastname
            </label>
          </div>

          {/* Username Input */}
          <div className="relative mt-5">
            <input
              className="peer mt-5 w-full h-12 rounded-xl border border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="text"
              placeholder=" "
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="username"
              className="absolute left-2 text-gray-500 transition-all duration-200 ease-in-out transform -translate-y-3 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600 mt-7"
            >
              Username
            </label>
          </div>

          {/* Password Input */}
          <div className="relative mt-5">
            <input
              className="peer mt-5 w-full h-12 rounded-xl border border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="password"
              placeholder=" "
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="password"
              className="absolute left-2 text-gray-500 transition-all duration-200 ease-in-out transform -translate-y-3 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600 mt-7"
            >
              Password
            </label>
          </div>

          {/* Phone Number Input */}
          <div className="relative mt-5">
            <input
              className="peer mt-5 w-full h-12 rounded-xl border border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="tel"
              placeholder=" "
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="phoneNumber"
              className="absolute left-2 text-gray-500 transition-all duration-200 ease-in-out transform -translate-y-3 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600 mt-7"
            >
              Phone Number
            </label>
          </div>

          {/* Address Input */}
          <div className="relative mt-5">
            <input
              className="peer mt-5 w-full h-12 rounded-xl border border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="text"
              placeholder=" "
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="address"
              className="absolute left-2 text-gray-500 transition-all duration-200 ease-in-out transform -translate-y-3 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600 mt-7"
            >
              Address
            </label>
          </div>

          {/* Role Input */}
          <div className="relative mt-5">
            <input
              className="peer mt-5 w-full h-12 rounded-xl border border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="text"
              placeholder=" "
              id="role"
              name="role"
              value={formData.role} // Fixed: should always be 'USER'
              readOnly // Prevent user from changing the role
            />
            <label
              htmlFor="role"
              className="absolute left-2 text-gray-500 transition-all duration-200 ease-in-out transform -translate-y-3 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600 mt-7"
            >
              Role
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-5">
            <button
              type="submit"
              className="bg-blue-500 w-full h-12 rounded-xl text-xl text-white hover:bg-blue-600 transition duration-200"
            >
              ثبت نام
            </button>
          </div>
        </form>

        <div className="flex justify-center items-center mt-5">
          <button
            className="text-blue-500 font-bold hover:text-blue-600 transition duration-200"
            onClick={() => navigate('/home')}
          >
            بازگشت به سایت
          </button>
        </div>
      </div>
    </>
  );
}