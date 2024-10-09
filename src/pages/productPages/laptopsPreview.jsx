import React, { useEffect, useState } from 'react';
import { fetchLaptops } from '../../services/subcategoriesServices';  // ایمپورت تابع
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const LaptopsPreview = () => {
  const [laptops, setLaptops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLaptops = async () => {
      try {
        const data = await fetchLaptops('66dc7710225ac943fb1693f3');  // دریافت ۴ لپ‌تاپ بر اساس slugname
        setLaptops(data);
      } catch (error) {
        console.error("Error loading laptops:", error);
      }
    };

    loadLaptops();
  }, []);

  const handleViewAll = () => {
    navigate('/all-laptops');  // به صفحه همه لپ‌تاپ‌ها هدایت می‌کند
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Laptops</h2>
        <button
          onClick={handleViewAll}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
         مشاهده همه 
        </button>
      </div>
      {/* <div className="grid grid-cols-4 gap-4 mt-4">
        {laptops.map((laptop) => (
          <div key={laptop._id} className="border p-4 rounded-lg">
            <img src={laptop.thumbnail} alt={laptop.name} className="w-full h-48 object-cover" />
            <h3 className="mt-2 text-lg font-semibold">{laptop.name}</h3>
            <p>{laptop.price} USD</p>
          </div>
        ))}
      </div> */} 

<div className="-mt-20 mr-14">
      {laptops.length > 0 ? (
        <div className="grid grid-cols-4 mt-20 ">
          {laptops.map((laptop) => (
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
  );
};

export default LaptopsPreview;