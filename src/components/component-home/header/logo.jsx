import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <>
             <div> 
           
            <div className="w-56  ml-[30px] -mt-1 flex ">
            <Link to='/home'>     <p className='mt-6 text-xl font-bold text-blue-800'>SMART TECH</p> </Link>
                <img className="w-24 " src="imgs/logo/logo.jpg" alt="" />
                  
            </div> 
            

             

            </div> 


        </>
    )
}
