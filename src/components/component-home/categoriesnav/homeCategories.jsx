// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchCategories } from '../../../services/CategoriesServices'; // مسیر مناسب را مشخص کنید

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const categoriesData = await fetchCategories();
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     getCategories();
//   }, []);

//   const handleCategoryClick = (categoryId) => {
//     navigate(`/products-categories/${categoryId}`); // هدایت به صفحه محصولات با توجه به آیدی کتگوری
//   };

//   return (
//     <div className="flex flex-wrap justify-center mt-10">
//       {categories.map((category) => (
//         <div
//           key={category._id}
//           className="m-4 p-4 border-2 border-red-500 rounded-full cursor-pointer flex items-center justify-center"
//           onClick={() => handleCategoryClick(category._id)}
//           style={{
//             width: '100px',
//             height: '100px',
//             borderRadius: '50%',
//             backgroundColor: '#fff',
//           }}
//         >
//           <span className="text-center text-lg">{category.name}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Categories; 




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchCategories } from '../../../services/CategoriesServices'; // مسیر مناسب را مشخص کنید

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const categoriesData = await fetchCategories();
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     getCategories();
//   }, []);

//   const handleCategoryClick = (categoryId) => {
//     navigate(`/products-categories/${categoryId}`); // هدایت به صفحه محصولات با توجه به آیدی کتگوری
//   };

//   const categoryImages = {
//     'category1': '/imgs/site-icons/admin.png',
//     'category2': '/imgs/home-Slider/banner_SlideBann-1.webp',
//     'category3': 'path/to/image3.jpg',
//     'category4': 'path/to/image4.jpg',
//   };

//   return (
//     <div className="flex flex-wrap justify-center mt-10">

//       {categories.map((category) => (
//         <div
//           key={category._id}
//           className="m-4 p-4 border-2 border-red-500 rounded-full cursor-pointer flex items-center justify-center"
//           onClick={() => handleCategoryClick(category._id)}
//           style={{
//             width: '100px',
//             height: '100px',
//             borderRadius: '50%',
//             backgroundColor: '#fff',
//             backgroundImage: `url(${categoryImages[category.slugname]})`, // استفاده از تصویر
//             backgroundSize: 'cover', // اندازه تصویر به صورت کامل
//             backgroundPosition: 'center', // مرکز تصویر
//           }}
//         >
//           <span className="text-center text-lg" style={{ color: 'white' }}>{category.name}</span>
//         </div> 

//       ))}
//     </div> 
//   );
// };

// export default Categories; 

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../../services/CategoriesServices'; // مسیر مناسب را مشخص کنید

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        getCategories();
    }, []);

    const handleCategoryClick = (categoryId) => {
        navigate(`/products-categories/${categoryId}`); // هدایت به صفحه محصولات با توجه به آیدی کتگوری
    };

    const categoryImages = {
        'laptop': '/imgs/category-icons/icon-1.webp',
        'mobile-phone': '/imgs/category-icons/icon-4.webp',
        'smart-watch': '/imgs/category-icons/icon-3.webp',
        'headphones-and-handsfree': '/imgs/category-icons/icon-2.webp',
    };

    console.log('Category Images:', categoryImages);

    return (
        <div className="flex flex-wrap justify-center mt-10">
            {categories.map((category) => {
                console.log(`Slugname for category: ${category.slugname}`);

                const imagePath = categoryImages[category.slugname];
                console.log(`Image for ${category.slugname}: ${imagePath}`);

                return (
                    //   <div
                    //     key={category._id}
                    //     className="m-4 p-4 border-2  border-red-500 hover:border-[3px]   rounded-full cursor-pointer flex items-center justify-center"
                    //     onClick={() => handleCategoryClick(category._id)}
                    //     style={{
                    //       width: '100px',
                    //       height: '100px',
                    //       borderRadius: '50%',
                    //       backgroundColor: '#fff',
                    //       backgroundImage: `url(${imagePath})`, // استفاده از تصویر
                    //       backgroundSize: 'cover', // اندازه تصویر به صورت کامل
                    //       backgroundPosition: 'center', // مرکز تصویر
                    //     }}
                    //   >
                    //     <span className="text-center text-lg" style={{ color: 'white' }}>{category.name}</span>
                    //   </div> 

                    <div
                        key={category._id}
                        className="m-4 flex flex-col items-center cursor-pointer"
                        onClick={() => handleCategoryClick(category._id)}
                    >
                        <div
                            className="border-2 border-red-500 hover:border-[3px] rounded-full flex items-center justify-center"
                            style={{
                                width: '150px', // بزرگ‌تر کردن دایره
                                height: '150px',
                                borderRadius: '50%',
                                backgroundColor: '#fff',
                                backgroundImage: `url(${imagePath})`, // استفاده از تصویر
                                backgroundSize: 'cover', // اندازه تصویر به صورت کامل
                                backgroundPosition: 'center', // مرکز تصویر
                            }}
                        >
                        </div>
                        <span className="text-center text-lg mt-2" style={{ color: 'black' }}>
                            {category.name} {/* تغییر رنگ متن به مشکی برای بهتر دیده شدن */}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default Categories;