import './loding.css'

export default function Lod() {
  return (
   <>
    
    <div className='flex justify-center items-center mt-2' > 
         <div> 

        <div>
        <img className="w-72" src="imgs/logo/logo.jpg" alt="" />
        </div> 

        <div>
        <p className='mt-6 text-xl font-bold text-blue-800'>...درحال انتقال به سایت مورد نظر</p>
        </div>


   <div className='ml-20 mt-10'>
    <span className='spinner'></span>
   </div> 


   </div>

   </div>
   
   </>
  )
}
