import { Outlet, Link , NavLink } from 'react-router-dom'; 
import './admin.css'

export default function AdminLayout() {
  return (
    <>    
    <div className='bg-slate-100'>
      <div className='flex justify-center items-center '>
            <p className='text-3xl font-bold text-blue-400 '>پنل مدیریت فروشگاه</p>
          </div>
       <div className='flex gap-32 justify-center items-center mt-4 border ml-64 border-slate-400  w-[900px] h-16 rounded-xl'>  

       


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


          <div>
          <NavLink to="/admin-product"  >
           <button className='text-slate-600 '>کالا ها </button>
          </NavLink>    

          </div>   

          <div>
          <NavLink to="/Admin"  >
           <button className='text-slate-600 '> پروفایل </button>
          </NavLink>    

          </div>  

          </div> 

          

      <main style={{ marginTop: '60px' }}>
       
        <Outlet />
      </main> 
      </div>
    </>
  );
}