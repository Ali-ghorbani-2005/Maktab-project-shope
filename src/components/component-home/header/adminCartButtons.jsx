import {Link} from 'react-router-dom';

export default function AdminCartButtons() {
    return (
        <>

            <div>


                <div className="flex gap-7 -mt-16 ml-10 border border-orange-400 w-48 h-10 rounded-lg">


                    <div className='mt-1 ml-2' >
                        <Link to='/Orders'>  <button className="flex text-blue-500 font-bold ">سبد خرید <img className="w-6" src="imgs/site-icons/icons-shopping.png" alt="" /></button> </Link>
                    </div>

                    <div className='mt-1'>
                        <Link to='/AdmiLogin'>  <button className='text-blue-500 font-bold'>مدیریت</button> </Link>
                    </div>

                </div>


            </div>


        </>
    )
}
