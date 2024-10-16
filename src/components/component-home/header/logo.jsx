import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <>
            {/* <div> 
           
            <div className="w-56  ml-[30px] -mt-1 flex md:mt-1 ">
            <Link to='/home'>     <p className='mt-6 text-xl font-bold text-blue-800  '>SMART TECH</p> </Link>
                <img className="w-24 " src="imgs/logo/logo.jpg" alt="" />
                  
            </div> 
            

             

            </div>  */}


            <div className="flex items-center ml-4 mt-1">
                <Link to='/home' className="flex items-center">
                    <img className="w-24 md:w-32 h-auto" src="imgs/logo/logo.jpg" alt="SMART TECH Logo" />
                    <p className="ml-2 text-xl font-bold text-blue-800 hidden md:block">SMART TECH</p>
                </Link>
            </div>



        </>
    )
}

