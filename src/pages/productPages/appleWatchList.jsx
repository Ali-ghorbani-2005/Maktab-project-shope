// LaptopProducts.jsx
import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../services/subcategoriesServices';
import { fetchLaptopProducts } from '../../services/subcategoriesServices';
import { useNavigate } from 'react-router-dom';

const LaptopProducts = ({ token }) => {
    const [laptopCategory, setLaptopCategory] = useState(null);
    const [laptops, setLaptops] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getLaptops = async () => {
            const categories = await fetchCategories(token);
            const laptop = categories.find(category => category.name === 'Laptop');
            setLaptopCategory(laptop);

            if (laptop) {
                // فقط ۴ محصول اول دسته‌ی لپ‌تاپ را از سرور دریافت می‌کنیم
                const laptopProducts = await fetchLaptopProducts(token, laptop.slugname, 4);
                setLaptops(laptopProducts.slice(0, 4)); // فقط ۴ محصول اول
            }
        };

        getLaptops();
    }, [token]);

    const handleViewAll = () => {
        navigate('/laptops');
    };

    if (!laptopCategory || laptops.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4 bg-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Laptop Products</h2>
                <button 
                    onClick={handleViewAll}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    View All
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {laptops.map((laptop) => (
                    <div key={laptop._id} className="border p-4">
                        <p>{laptop.name}</p>
                        <p>Price: ${laptop.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LaptopProducts;