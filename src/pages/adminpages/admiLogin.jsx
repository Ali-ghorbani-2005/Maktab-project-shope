import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authServices';

export default function AdminLogin() {
  const [mode, setMode] = useState('admin'); // حالت پیش‌فرض admin است
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(username, password);

    if (result.success) {
      // ذخیره توکن در localStorage
      localStorage.setItem('token', result.token);

      if (mode === 'admin') {
        navigate('/admin-order'); // هدایت به صفحه Admin
      } else {
        navigate('/'); // هدایت به صفحه Home
      }
    } else {
      alert(result.message);
    }
  };

  return (
    <>
      {/* <div className='flex justify-center items-center mt-5'>
        <img className="w-56" src="imgs/logo/logo.jpg" alt="" />
      </div>

      <div className='flex justify-center items-center mt-5'>
        <p className='text-2xl font-bold'>ورود</p>
      </div>

      <div className='mt-14 ml-[484px]'>
       
        <div className="flex justify-center items-center mb-4">
          <label className='mr-4'>
            <input
              type="radio"
              name="mode"
              value="admin"
              checked={mode === 'admin'}
              onChange={() => setMode('admin')}
            />
            Admin
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="user"
              checked={mode === 'user'}
              onChange={() => setMode('user')}
            />
            User
          </label>
        </div>



        <div className="relative mt-5" >
          <input
            className='peer  mt-5 w-96 h-12 rounded-xl border border-slate-400 '
            type="text"
            placeholder=""
            id='phone'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label for="phone" class="absolute left-2  text-gray-500 transition-all duration-200 ease-in-out transform -translate-y-3 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600  mt-7">
            Username
          </label>
        </div>

        <div className="relative mt-5">
          <input
            className='peer  mt-5 w-96 h-12 rounded-xl border border-slate-400'
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="phone" class="absolute left-2  text-gray-500 transition-all duration-200 ease-in-out transform -translate-y-3 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600  mt-7">
            Password
          </label>
        </div>

        <div className='mt-5'>
          <button onClick={handleLogin} className='bg-blue-500 w-96 h-10 rounded-xl text-xl text-white hover:bg-blue-600'>
            Login
          </button>
        </div>
      </div>

      <div className='flex justify-center items-center mt-5'>
        <button className='text-blue-500 font-bold hover:text-blue-600' onClick={() => navigate('/')}>
          بازگشت به سایت
        </button>
      </div> */}






      <div className="flex flex-col items-center mt-5">
        <img className="w-56" src="imgs/logo/logo.jpg" alt="Logo" />

        <p className="text-2xl font-bold mt-5">ورود</p>

        <div className="mt-14 w-full max-w-md">
          {/* User or Admin selection */}
          <div className="flex justify-center mb-4">
            <label className="flex items-center mr-4">
              <input
                type="radio"
                name="mode"
                value="admin"
                checked={mode === 'admin'}
                onChange={() => setMode('admin')}
                className="mr-1"
              />
              Admin
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="mode"
                value="user"
                checked={mode === 'user'}
                onChange={() => setMode('user')}
                className="mr-1"
              />
              User
            </label>
          </div>

          {/* Username Input */}
          <div className="relative mt-5">
            <input
              className="peer mt-5 w-full h-12 rounded-xl border border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="text"
              placeholder=" "
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className="absolute left-2 text-gray-500 transition-all duration-200 ease-in-out transform -translate-y-3 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600 mt-7"
            >
              Password
            </label>
          </div>

          {/* Login Button */}
          <div className="mt-5">
            <button
              onClick={handleLogin}
              className="bg-blue-500 w-full h-12 rounded-xl text-xl text-white hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-5">
          <button
            className="text-blue-500 font-bold hover:text-blue-600 transition duration-200"
            onClick={() => navigate('/')}
          >
            بازگشت به سایت
          </button>
        </div>
      </div>







    </>
  );
}