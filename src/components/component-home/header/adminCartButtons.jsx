import { Link } from 'react-router-dom'; 
import { useContext } from 'react'; 
import { CartContext } from '../../../services/cartContext';

export default function AdminCartButtons() { 
    const { cartItems } = useContext(CartContext);
    return (
        <>

            <div>


                <div className="flex gap-7 -mt-16 ml-10   w-48 h-10 rounded-lg">


                    {/* <div className='mt-1 ml-2 border-2 rounded-lg' >
                        <Link to='/Orders'>  <button className="flex text-blue-500 font-bold "><img className="w-8" src="imgs/site-icons/icons-shopping.png" alt="" /></button> </Link> 
                        
                    </div> */}


                    <div className='mt-1 ml-2 relative'>
                        {/* تعداد اقلام سبد خرید */}
                        {cartItems.length > 0 && (
                            <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                                {cartItems.length}
                            </div>
                        )}

                        {/* دکمه سبد خرید */}
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


            </div>


        </>
    )
}










