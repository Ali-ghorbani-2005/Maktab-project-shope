// import React, { useEffect, useState } from "react";
// import { fetchCategories, fetchSubcategories } from "../../../services/CategoriesServices";

// const CategoryButtons = () => {
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState({});
//   const [hoveredCategory, setHoveredCategory] = useState(null);

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const data = await fetchCategories();
//         setCategories(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getCategories();
//   }, []);

//   const handleMouseEnter = async (categoryId) => {
//     setHoveredCategory(categoryId);
//     if (!subcategories[categoryId]) {
//       try {
//         const data = await fetchSubcategories(categoryId);
//         setSubcategories((prev) => ({ ...prev, [categoryId]: data }));
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const handleMouseLeave = () => {
//     setHoveredCategory(null);
//   };


//   return (
//     <div>
//       {Array.isArray(categories) && categories.length > 0 ? (
//         categories.map((category) => (
//           <div
//             key={category._id}
//             onMouseEnter={() => handleMouseEnter(category._id)}
//             onMouseLeave={handleMouseLeave}
//             className="relative"
//           >
//             <button className="category-button">{category.name}</button>
//             {hoveredCategory === category._id && Array.isArray(subcategories[category._id]) && (
//               <div className="absolute bg-white shadow-lg mt-2 p-2">
//                 {subcategories[category._id].map((subcategory) => (
//                   <button key={subcategory._id} className="subcategory-button">
//                     {subcategory.name}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>Loading categories...</p>
//       )}
//     </div>
//   );
// };

// export default CategoryButtons; 



import React, { useState, useEffect } from "react";
import { fetchCategories, fetchSubcategories } from "../../../services/CategoriesServices";

const CategoryButtons = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId); // ست کردن دسته انتخاب شده

    try {
      const fetchedSubcategories = await fetchSubcategories(categoryId);
      if (fetchedSubcategories?.data?.subcategories) {
        setSubcategories(fetchedSubcategories.data.subcategories);
      } else {
        setSubcategories([]);
        console.log("No subcategories found");
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Categories</h1>
      <div className="flex space-x-2">
        {categories.map((category) => (
          <button
            key={category._id}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleCategoryClick(category._id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Subcategories for {selectedCategory}</h2>
          {subcategories.length > 0 ? (
            <div className="flex space-x-2">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory._id}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          ) : (
            <p>No subcategories available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryButtons;

