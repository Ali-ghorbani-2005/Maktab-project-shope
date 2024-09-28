import { Link } from 'react-router-dom';

export default function AdminCartButtons() {
    return (
        <>

            <div>


                <div className="flex gap-7 -mt-16 ml-10   w-48 h-10 rounded-lg">


                    <div className='mt-1 ml-2 border-2 rounded-lg' >
                        <Link to='/Orders'>  <button className="flex text-blue-500 font-bold "><img className="w-8" src="imgs/site-icons/icons-shopping.png" alt="" /></button> </Link>
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
