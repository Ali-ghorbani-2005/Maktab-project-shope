import React, { useEffect, useState } from 'react';
import { fetchAllLaptops } from '../../services/subcategoriesServices';  // ایمپورت تابع

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
      <div className="grid grid-cols-4 gap-4 mt-4">
        {laptops.map((laptop) => (
          <div key={laptop._id} className="border p-4 rounded-lg">
            <img src={laptop.thumbnail} alt={laptop.name} className="w-full h-48 object-cover" />
            <h3 className="mt-2 text-lg font-semibold">{laptop.name}</h3>
            <p>{laptop.price} USD</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLaptops;