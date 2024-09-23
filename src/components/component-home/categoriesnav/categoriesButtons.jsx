import React, { useState, useEffect } from "react";
import { fetchCategories, fetchSubcategories } from "../../../services/CategoriesServices";
import { useNavigate } from "react-router-dom"; 

const CategoryButtons = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [isHovered, setIsHovered] = useState(null); // To track hovered category
  const navigate = useNavigate();

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

  const handleCategoryHover = async (categoryId) => {
    try {
      const fetchedSubcategories = await fetchSubcategories(categoryId);
      setSubcategories((prevState) => ({
        ...prevState,
        [categoryId]: fetchedSubcategories.data.subcategories || [],
      }));
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
    setIsHovered(categoryId); // Set hovered category
  };

  const handleSubcategoryClick = (subcategoryId) => {
    navigate(`/subcategoryProduct/${subcategoryId}`);
  };

  return (
    <div className="flex flex-wrap justify-center mt-5">
      {categories.map((category) => (
        <div 
          key={category._id} 
          className="relative mx-4" 
          onMouseEnter={() => handleCategoryHover(category._id)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            {category.name}
          </button>
          
          {isHovered === category._id && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
              {subcategories[category._id]?.length > 0 ? (
                subcategories[category._id].map((subcategory) => (
                  <button 
                    key={subcategory._id}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSubcategoryClick(subcategory._id)}
                  >
                    {subcategory.name}
                  </button>
                ))
              ) : (
                <p className="px-4 py-2">No subcategories</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryButtons;
