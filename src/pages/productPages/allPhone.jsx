import React, { useEffect, useState } from 'react';
import { fetchAllPhone } from '../../services/subcategoriesServices';  // ایمپورت تابع 
import { Link } from 'react-router-dom';


const AllPhone = () => {
    const [phone, setPhone] = useState([]);   
   
    useEffect(() => {
        const phone = async () => {
            try {
                const data = await fetchAllPhone();  // دریافت تمام لپ‌تاپ‌ها
                setPhone(data);
            } catch (error) {
                console.error("Error loading all phones:", error);
            }
        };

        phone();
    }, []);
    // if (loading) return <Lod />;
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">All Laptops</h2>
            <div className="grid grid-cols-4 mr-14 mt-44">
    
                {phone.map((laptop) => (
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

export default AllPhone;  









// import React, { useEffect, useState } from 'react';
// import { fetchAllPhone } from '../../services/subcategoriesServices';  // ایمپورت تابع 
// import { Link } from 'react-router-dom';
// import Lod from '../../components/loding/lod';

// const AllPhone = () => {
//     const [phone, setPhone] = useState([]);   
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(5); 
//     const [error, setError] = useState(null); // برای مدیریت خطا

//     useEffect(() => {
//         const getProducts = async () => {
//             setLoading(true);
//             try {
//                 const data = await fetchAllPhone(currentPage);  // فراخوانی تابع دریافت اطلاعات
//                 setPhone(data.data.products);  // تنظیم محصولات دریافت شده
//                 setTotalPages(data.total_pages);  // تنظیم تعداد کل صفحات
//                 setLoading(false);
//             } catch (err) {
//                 setError("مشکلی در بارگیری محصولات به وجود آمده");
//                 setLoading(false);
//             }
//         };

//         getProducts();
//     }, [currentPage]);   // وابستگی به صفحه فعلی برای دریافت اطلاعات جدید 

//     useEffect(() => {
//         const phone = async () => {
//             try {
//                 const data = await fetchAllPhone();  // دریافت تمام لپ‌تاپ‌ها
//                 setPhone(data);
//             } catch (error) {
//                 console.error("Error loading all phones:", error);
//             }
//         };

//         phone();
//     }, []);

//     // اگر لودینگ است، نمایش لودینگ
//     if (loading) return <Lod />;

//     // اگر خطا وجود دارد، نمایش پیام خطا
//     if (error) return <div>{error}</div>;

//     return (
//         <div className="p-4">
//             <h2 className="text-xl font-bold">All Phones</h2>
//             <div className="grid grid-cols-4 mr-14 mt-44">
//                 {phone.map((laptop) => (
//                     <div key={laptop._id} className="flex flex-wrap  p-4 ml-5">
//                         <Link to={`/product/${laptop._id}`}>
//                             <div className='border h-96 w-72 border-zinc-200 rounded-lg ml-6 hover:shadow-sm hover:shadow-black'>
//                                 <img src={`http://${laptop.images[0]}`} className='w-52' alt={laptop.name} />
//                                 <p className='text-2xl mt-3 font-bold'>{laptop.brand}</p>
//                                 <p className='mt-2 text-slate-600 text-lg'>مدل {laptop.name}</p>
//                                 <p className='flex mt-5 text-xl'>
//                                     <span>تومان</span> {laptop.price}
//                                 </p>
//                             </div>
//                         </Link>
//                     </div>
//                 ))}
//             </div> 
//             <div className="flex mt-4 justify-center items-center">
//                 {[...Array(totalPages)].map((_, index) => (
//                     <button
//                         key={index + 1}
//                         onClick={() => setCurrentPage(index + 1)}
//                         className={`px-2 py-1 mx-1 ${currentPage === index + 1 ? "bg-blue-500 rounded-full text-white" : "bg-gray-300"} hover:bg-blue-400`}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AllPhone;



         {/* {laptops.map((laptop) => (
          <div key={laptop._id} className="border p-4 rounded-lg">
            <img src={laptop.thumbnail} alt={laptop.name} className="w-full h-48 object-cover" />
            <h3 className="mt-2 text-lg font-semibold">{laptop.name}</h3>
            <p>{laptop.price} USD</p>
          </div>
        ))}  */}