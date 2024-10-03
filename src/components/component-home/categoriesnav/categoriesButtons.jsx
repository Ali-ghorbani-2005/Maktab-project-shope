import React, { useState, useEffect } from "react";
import { fetchCategories, fetchSubcategories } from "../../../services/CategoriesServices";
import { useNavigate } from "react-router-dom"; 

const CategoryButtons = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [isHovered, setIsHovered] = useState(null); // To track hovered category
  const [isPanelOpen, setIsPanelOpen] = useState(false); // To track if panel is open
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
    <div className="relative">
      {/* Button to open the panel */}
      {!isPanelOpen && (
        <button 
          className=" text-gray-400 flex font-bold px-4 py-2 rounded fixed right-4 top-4 mt-20 z-50"
          onClick={() => setIsPanelOpen(true)}
        >
          دسته‌بندی محصولات
          <img src="imgs/site-icons/category.png" className="w-7" alt="" />
        </button>
      )}

      {/* Slide-out panel */}
      <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg shadow-black  transform ${isPanelOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-700 z-40`}>
        <div className="p-4">
          {/* Close button */}
          <button 
            className="text-gray-500 hover:text-gray-700 absolute top-2 right-2"
            onClick={() => setIsPanelOpen(false)}
          >
            &times;
          </button>
          
          <h2 className="text-xl font-bold mb-4">دسته‌بندی محصولات</h2>
          {categories.map((category) => (
            <div 
              key={category._id} 
              className="relative my-2" 
              onMouseEnter={() => handleCategoryHover(category._id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <button className="text-blue-500 hover:text-blue-700 px-4 py-2 w-full text-right">
                {category.name}
              </button>
              
              {/* Subcategories - slide from the left */}
              {isHovered === category._id && (
                <div className="absolute right-full top-0 w-64 bg-gray-100 h-56 mr-4 shadow-lg ">
                  {subcategories[category._id]?.length > 0 ? (
                    subcategories[category._id].map((subcategory) => (
                      <button 
                        key={subcategory._id}
                        className="block text-left w-64 px-4 py-2 hover:bg-gray-300"
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
      </div>

      {/* Overlay when panel is open */}
      {isPanelOpen && <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={() => setIsPanelOpen(false)}></div>}
    </div>
  );
};

export default CategoryButtons;
