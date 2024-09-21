import { Outlet, Link , NavLink } from 'react-router-dom'; 
import './admin.css'

export default function AdminLayout() {
  return (
    <>    
    <div className='bg-slate-200 h-[800px]'>
      
       <div className='flex gap-32 justify-center items-center  bg-slate-300 h-14'>  

       
        

          <div>
          <NavLink to="/admin-order"  >
           <button className='text-slate-600 ' >سفارش ها </button>
          </NavLink>    

          </div>  


          <div>
          <NavLink to="/admin-inventory"  >
           <button className='text-slate-600 '>موجودی و قیمت ها</button>
          </NavLink>     

          </div>  


          <div >
          <NavLink to="/admin-product"  >
           <button className='text-slate-600 '>کالا ها </button>
          </NavLink>    

          </div>   

          <div  >
          <NavLink to="/Admin"  >
           <button className='text-slate-600 '> پروفایل </button>
          </NavLink>    

          </div>    

          

          <div className='flex justify-end '>
            <p className=' font-bold text-blue-400 text-xl '>پنل مدیریت فروشگاه</p>
          </div> 

          </div> 

          

      <main className='mt-5 ml-16'>
       
        <Outlet />
      </main> 
      </div>
    </>
  );
}