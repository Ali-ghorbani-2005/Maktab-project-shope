import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../services/productService';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetchProductById(id);
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        setError('خطا در دریافت اطلاعات محصول');
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-lg text-gray-700">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-10 text-gray-500">محصول یافت نشد</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="  mt-48">
      {/* اطلاعات محصول */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 "> 
        
          
      <div className='mt-5 w-[400px] h-[410px] rounded-xl shadow-md shadow-gray-700'>
                
                <div className='flex justify-center items-center '>
            <div className=' bg-white w-[350px] mt-5 rounded-lg shadow-sm shadow-gray-700  h-28 '> 
              <div>
              <p className='flex justify-end text-sm font-semibold text-gray-700 '> خرید بیمه برای محصول</p> 
              <div className='flex justify-end mt-5 mr-4'>   
              <button className=' w-32 h-8 rounded-lg border-2 border-blue-500 text-blue-500 text-sm flex'><p className='text-[30px] ml-3'>+</p><p className='ml-3'> بیمه میخواهم </p></button> 
              </div>
                <p className='flex text-sm text-gray-700 font-semibold ml-5 '><p className='text-xs mt-0.5'>تومان</p>  170000 </p> 
                </div>
            </div> 
  
            </div> 
  
            <div className='flex justify-center items-center '>
                
               
  
             <div className=' bg-white w-[350px] mt-5 rounded-lg shadow-sm shadow-gray-700  h-32'> 
             <div >
                  <p className='text-end mt-2 text-sm text-darkGold font-semibold mr-5'>موجود در انبار فروشنده ارسال 1 روز کاری</p>
                </div>
            <p className='text-sm flex justify-end font-semibold mt-5 mr-5'>  <p className='text-green-500'>عالی</p>:<p className='text-gray-700'>ارزیابی عملکرد</p>  </p> 
            <div className='flex justify-end mt-5'>
              <p className='flex font-semibold text-sm mr-5 text-gray-700'> ماه گارانتی شرکتی  <p>18</p></p>
             </div>
             </div> 
            
  
            </div>
  
            <div className=' flex mt-5 ml-4'>
            <p className=" mb-2 flex"> <p className=' text-gray-700 font-semibold mt-1'>تومان</p> <p className=' font-semibold text-[22px]'>{product.price} </p> </p> 
            <p className="text-red-500 font-semibold text-sm flex ml-20">     عدد در انبار باقی مانده <p> {product.quantity} </p> </p>
            </div> 
  
  
            <div className=" flex justify-center">
          <button className="bg-lightGreen font-semibold  text-white py-3 px-28 rounded-lg hover:bg-green-500 transition duration-300">
            افزودن به سبد خرید
          </button>
        </div>
              
             
            </div>




        {/* اسلایدر تصاویر */}
         <div className="relative "> 
        <h1 className="text-3xl font-bold flex justify-end mr-5 text-gray-900 mb-4">{product.name} مدل<p> {product.brand}</p></h1> 
        
          <div className="relative  h-96 rounded-lg  mr-72  ">
            <img
              src={`http://${product.images[currentImageIndex]}`}
              alt={`${product.name} - تصویر ${currentImageIndex + 1}`}
              className=" w-72   object-cover"
            />
          
          </div>
          
          <button
            onClick={prevImage}
            className="absolute top-1/2 -left-12 bg-gray-800  text-white p-2 rounded-full hover:bg-opacity-75"
          >
            ◀
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-80  bg-gray-800  text-white p-2 rounded-full hover:bg-opacity-75"
          >
            ▶
          </button>
         
          <div className=" bottom-4 left-1/2 ml-32 -mt-10 flex space-x-2 ">
            {product.images.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-slate-400' : 'bg-gray-500'
                  }`}
              ></span>
            ))}
          </div>
        </div> 
        
        <div>
          .
        </div>

        <div className=" rounded-xl  border-2 border-darkGold   h-48"> 

          <p className="text-gray-700 mb-4 flex justify-end text-lg font-bold">:توضیحات</p>  

          <p className="font-semibold flex justify-end  ">{product.description}</p>

          

          </div> 


        <div>

          

         
        </div>


      </div>


      
    </div>
  );
};

export default Product;