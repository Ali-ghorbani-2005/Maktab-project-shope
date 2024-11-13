



import React, { useEffect, useState } from 'react';
import { fetchAllPhone } from '../../services/subcategoriesServices';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../utils/dataConverter';

const AllPhone = () => {
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPhones = async (pageNumber) => {
        try {
            const data = await fetchAllPhone(pageNumber);
            setPhones(data.products);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error loading all phones:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhones(page);
    }, [page]);

    return (
        <div className="p-4 mt-40">
            <h2 className="text-2xl flex justify-end font-bold mb-6">گوشی موبایل</h2>
            {loading ? (
                <p className="text-center">در حال بارگذاری...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {phones.length > 0 ? (
                        phones.map((phone) => (
                            <div key={phone._id} className="flex flex-col items-center p-4">
                                <Link to={`/product/${phone._id}`} className='border h-96 w-full border-zinc-200 rounded-lg hover:shadow-md transition-shadow duration-300'>
                                    <img src={`http://${phone.images[0]}`} className='w-full h-48 object-cover rounded-t-lg' alt={phone.name} />
                                    <div className='p-4'>
                                        <p className='text-xl font-bold'>{phone.brand}</p>
                                        <p className='mt-1 text-slate-600 text-base'>مدل {phone.name}</p>
                                        <p className='flex mt-3 text-lg'><span className='pr-2'>تومان</span> {numberWithCommas(phone.price)}</p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full">محصولی برای نمایش موجود نیست.</p>
                    )}
                </div>
            )}
            {/* دکمه‌های صفحه‌بندی */}
            <div className="flex justify-center mt-4 space-x-4">
                <button
                    onClick={() => setPage(1)}
                    className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                    disabled={page === 1}
                >
                    1
                </button>
                <button
                    onClick={() => setPage(2)}
                    className={`px-4 py-2 rounded-lg ${page === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                    disabled={page === 2}
                >
                    2
                </button>
            </div>
            {/* دکمه بارگذاری بیشتر */}
            {page < totalPages && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        بارگذاری بیشتر
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllPhone;