import React, { useEffect, useState } from 'react';
import { fetchAllLaptops } from '../../services/subcategoriesServices';  // ایمپورت تابع 
import { Link } from 'react-router-dom';

const AllLaptops = () => {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    const loadLaptops = async () => {
      try {
        const data = await fetchAllLaptops();  // دریافت تمام لپ‌تاپ‌ها
        setLaptops(data);
      } catch (error) {
        console.error("Error loading all laptops:", error);
      }
    };

    loadLaptops();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">All Laptops</h2>
      <div className="grid grid-cols-4 mr-14 mt-44">
        {/* {laptops.map((laptop) => (
          <div key={laptop._id} className="border p-4 rounded-lg">
            <img src={laptop.thumbnail} alt={laptop.name} className="w-full h-48 object-cover" />
            <h3 className="mt-2 text-lg font-semibold">{laptop.name}</h3>
            <p>{laptop.price} USD</p>
          </div>
        ))}  */}



{laptops.map((laptop) => (
            <div key={laptop._id} className="flex flex-wrap  p-4 ml-5"> 
            <Link to={`/product/${laptop._id}`}>
              <div className=' border h-96 w-72 border-zinc-200  rounded-lg  ml-6 hover:shadow-sm hover:shadow-black '>
                <img src={`http://${laptop.images[0]}`} className='w-52' alt="" />
                <p className='text-2xl mt-3 font-bold'>{laptop.brand}</p>
                <p className='mt-2 text-slate-600 text-lg'>مدل{laptop.name}</p>
                <p className='flex mt-5 text-xl'><p>تومان</p>{laptop.price}</p>

              </div> 
              </Link>

            </div>

          ))}
      </div>
    </div>
  );
};

export default AllLaptops;