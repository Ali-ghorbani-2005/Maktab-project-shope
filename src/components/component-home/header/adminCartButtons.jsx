import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../../services/cartContext';

export default function AdminCartButtons() {
    const { cartItems } = useContext(CartContext);
    return (
        <>

            {/* <div>


                <div className="flex gap-7 -mt-16 ml-10   w-48 h-10 rounded-lg">


                    {/* <div className='mt-1 ml-2 border-2 rounded-lg' >
                        <Link to='/Orders'>  <button className="flex text-blue-500 font-bold "><img className="w-8" src="imgs/site-icons/icons-shopping.png" alt="" /></button> </Link> 
                        
                    </div> 


                    <div className='mt-1 ml-2 relative'>
                      
                        {cartItems.length > 0 && (
                            <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                                {cartItems.length}
                            </div>
                        )}

                      
                        <div className='border-2 rounded-lg'>
                            <Link to='/Orders'>
                                <button className="flex text-blue-500 font-bold">
                                    <img className="w-8" src="imgs/site-icons/icons-shopping.png" alt="سبد خرید" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className=' w-36  border-2 rounded-lg flex'>
                        <div className='border-r-2 ml-1'>

                            <button className='text-blue-500 font-bold mt-1'>ثبت نام</button>

                        </div>


                        <div className='mt-1 ml-2 '>
                            <Link to='/admin-login'>  <button className='text-blue-500 font-bold flex'>ورود<img src="imgs/site-icons/login-2.png" className='w-7' alt="" /></button> </Link>
                        </div>



                    </div>

                </div>


            </div> */}


            <div className="flex items-center gap-6 -mt-14 ml-10">
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
                <div className="flex border-2 border-blue-500 rounded-lg overflow-hidden">
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










