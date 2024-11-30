import React, { useEffect, useState } from 'react';
import { fetchLaptops } from '../../services/subcategoriesServices';  // ایمپورت تابع
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../utils/dataConverter';

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
    <div className='border-2 rounded-lg'>
        <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl font-semibold">لپ‌تاپ‌ها</h2>
            <button
                onClick={handleViewAll}
                className="flex items-center text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            >
                <img src="imgs/site-icons/icons-arrow.png" className='w-6 h-6 mr-2' alt="View All" />
                <span>نمایش همه</span>
            </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            {laptops.length > 0 ? (
                laptops.map((laptop) => (
                    <div key={laptop._id} className="flex flex-col items-center">
                        <Link to={`/product/${laptop._id}`}>
                            <div className='border h-96 w-full border-zinc-200 rounded-lg hover:shadow-md  hover:shadow-black transition-shadow duration-300'>
                                <img src={`http://${laptop.images[0]}`} className='w-[200px] h-52 object-cover rounded-t-lg' alt={laptop.name} />
                                <div className='p-4'>
                                    <p className='text-xl font-bold'>{laptop.brand}</p>
                                    <p className='mt-1 text-slate-600 text-base'>مدل {laptop.name}</p>
                                    <p className='flex mt-3 text-lg'><span className='pr-2'>تومان</span> {numberWithCommas(laptop.price)}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <p className="text-center col-span-full">محصولی برای نمایش موجود نیست.</p>
            )}
        </div>
    </div>
</div>
  );
};

export default LaptopsPreview;