import React, { useEffect, useState } from 'react';
import { fetchPhone } from '../../services/subcategoriesServices';  // ایمپورت تابع
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const PhonePreview = () => {
  const [phone, setPhone] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const phone = async () => {
      try {
        const data = await fetchPhone('66e1da1577b825705a3770f5');  // دریافت ۴ لپ‌تاپ بر اساس slugname
        setPhone(data);
      } catch (error) {
        console.error("Error loading phones:", error);
      }
    };

    phone();
  }, []);

  const handleViewAll = () => {
    navigate('/all-phone');  // به صفحه همه لپ‌تاپ‌ها هدایت می‌کند
  };

  return (
    <div className="p-4"> 
  <div className='border-2 rounded-lg'> 
  <div className="flex justify-between items-center">
      
        <button
          onClick={handleViewAll}
          className=" ml-10 mt-5 flex text-white px-4 py-2 rounded"
        >
           <img src="imgs/site-icons/icons-arrow.png" className='w-10' alt="" /> 
        </button>  
        <h2 className="text-2xl mr-10 font-semibold">لپ‌تاپ‌ها </h2>

      </div>
<div className="-mt-10  mr-10">
      {phone.length > 0 ? (
        <div className="grid grid-cols-4 mt-20 ">
          {phone.map((laptop) => (
            <div key={laptop._id} className="flex flex-wrap  p-4 ml-5"> 
            <Link to={`/product/${laptop._id}`}>
              <div className=' border h-96 w-72 border-zinc-200  rounded-lg ml-6 hover:shadow-md hover:shadow-black '>
                <img src={`http://${laptop.images[0]}`} className='w-52' alt="" />
                <p className='text-2xl mt-3 font-bold'>{laptop.brand}</p>
                <p className='mt-2 text-slate-600 text-lg'>مدل{laptop.name}</p>
                <p className='flex mt-5 text-xl'><p>تومان</p>{laptop.price}</p>

              </div> 
              </Link>

            </div>

          ))}

        </div>
      ) : (
        <p>No products available for this subcategory</p>
      )}
    </div> 
    </div>
    </div>
  );
};

export default PhonePreview;