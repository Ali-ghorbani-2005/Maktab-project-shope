// import React, { useEffect, useState } from 'react';
// import { fetchAllLaptops } from '../../services/subcategoriesServices';  // ایمپورت تابع 
// import { Link } from 'react-router-dom';

// const AllLaptops = () => {
//   const [laptops, setLaptops] = useState([]);

//   useEffect(() => {
//     const loadLaptops = async () => {
//       try {
//         const data = await fetchAllLaptops();  // دریافت تمام لپ‌تاپ‌ها
//         setLaptops(data);
//       } catch (error) {
//         console.error("Error loading all laptops:", error);
//       }
//     };

//     loadLaptops();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">All Laptops</h2>
//       <div className="grid grid-cols-4 mr-14 mt-44">




//         {laptops.map((laptop) => (
//           <div key={laptop._id} className="flex flex-wrap  p-4 ml-5">
//             <Link to={`/product/${laptop._id}`}>
//               <div className=' border h-96 w-72 border-zinc-200  rounded-lg  ml-6 hover:shadow-sm hover:shadow-black '>
//                 <img src={`http://${laptop.images[0]}`} className='w-52' alt="" />
//                 <p className='text-2xl mt-3 font-bold'>{laptop.brand}</p>
//                 <p className='mt-2 text-slate-600 text-lg'>مدل{laptop.name}</p>
//                 <p className='flex mt-5 text-xl'><p>تومان</p>{laptop.price}</p>

//               </div>
//             </Link>

//           </div>

//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllLaptops;  







import React, { useEffect, useState } from 'react';
import { fetchAllLaptops } from '../../services/subcategoriesServices';  // ایمپورت تابع 
import { Link } from 'react-router-dom';

const AllLaptops = () => {
  const [laptops, setLaptops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // صفحه جاری
  const productsPerPage = 4; // تعداد محصولات در هر صفحه

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

  // محاسبه محصولات قابل نمایش در صفحه جاری
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = laptops.slice(indexOfFirstProduct, indexOfLastProduct);

  // تغییر صفحه
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    // <div className="p-4">
    //   <h2 className="text-xl font-bold">All Laptops</h2>
    //   <div className="grid grid-cols-4 mr-14 mt-44">
    //     {currentProducts.map((laptop) => (
    //       <div key={laptop._id} className="flex flex-wrap p-4 ml-5">
    //         <Link to={`/product/${laptop._id}`}>
    //           <div className='border h-96 w-72 border-zinc-200 rounded-lg ml-6 hover:shadow-sm hover:shadow-black'>
    //             <img src={`http://${laptop.images[0]}`} className='w-52' alt="" />
    //             <p className='text-2xl mt-3 font-bold'>{laptop.brand}</p>
    //             <p className='mt-2 text-slate-600 text-lg'>مدل {laptop.name}</p>
    //             <p className='flex mt-5 text-xl'><span>تومان</span>{laptop.price}</p>
    //           </div>
    //         </Link>
    //       </div>
    //     ))}
    //   </div>

    //   {/* ناوبری صفحات */}
    //   <div className="flex justify-center mt-10">
    //     {Array.from({ length: Math.ceil(laptops.length / productsPerPage) }, (_, index) => (
    //       <button
    //         key={index}
    //         onClick={() => paginate(index + 1)}
    //         className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    //       >
    //         {index + 1}
    //       </button>
    //     ))}
    //   </div>
    // </div> 
    <div className="p-4 mt-40">
    <h2 className="text-2xl font-bold mb-6">تمام لپ‌تاپ‌ها</h2>
    
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {currentProducts.length > 0 ? (
            currentProducts.map((laptop) => (
                <div key={laptop._id} className="flex flex-col items-center">
                    <Link to={`/product/${laptop._id}`}>
                        <div className='border h-96 w-full border-zinc-200 rounded-lg hover:shadow-md transition-shadow duration-300'>
                            <img src={`http://${laptop.images[0]}`} className='w-full h-48 object-cover rounded-t-lg' alt={laptop.name} />
                            <div className='p-4'>
                                <p className='text-xl font-bold'>{laptop.brand}</p>
                                <p className='mt-1 text-slate-600 text-base'>مدل {laptop.name}</p>
                                <p className='flex mt-3 text-lg'><span>تومان</span> {laptop.price}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))
        ) : (
            <p className="text-center col-span-full">محصولی برای نمایش موجود نیست.</p>
        )}
    </div>

    {/* ناوبری صفحات */}
    <div className="flex justify-center mt-10">
        {Array.from({ length: Math.ceil(laptops.length / productsPerPage) }, (_, index) => (
            <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
                {index + 1}
            </button>
        ))}
    </div>
</div>
  );
};

export default AllLaptops;