import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../../services/cartContext';

export default function AdminCartButtons() {
    const { cartItems } = useContext(CartContext);
    return (
        <>
            <div className="flex items-center gap-6 ml-10 -mt-20 sm:-ml-2 md:ml-5">
                {/* دکمه سبد خرید */}
                <div className="relative">
                    {cartItems.length > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">
                            {cartItems.length}
                        </div>
                    )}
                    <Link to='/Orders'>
                        <button className="flex items-center justify-center w-10 h-10 border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">
                            <img className="w-6" src="imgs/site-icons/icons-shopping.png" alt="سبد خرید" />
                        </button>
                    </Link>
                </div>

                {/* دکمه‌های ورود و ثبت‌نام */}
                <div className="flex border-2 border-blue-500 rounded-lg overflow-hidden sm:-ml-4 md:ml-5">
                    <Link to='/register'>
                        <button className="text-blue-500 font-bold py-2 px-4 hover:bg-blue-500 hover:text-white transition duration-300">
                            ثبت نام
                        </button>
                    </Link>
                    <Link to='/admin-login'>
                        <button className="flex items-center text-blue-500 font-bold py-2 px-4 hover:bg-blue-500 hover:text-white transition duration-300">
                            ورود
                            <img src="imgs/site-icons/login-2.png" className="w-6 ml-2" alt="ورود" />
                        </button>
                    </Link>
                </div>
            </div>



        </>
    )
}










