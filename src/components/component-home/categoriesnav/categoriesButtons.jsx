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
    setSelectedCategory(categoryId);

    try {
      const fetchedSubcategories = await fetchSubcategories(categoryId);
      if (fetchedSubcategories && fetchedSubcategories.data && fetchedSubcategories.data.subcategories) {
        setSubcategories(fetchedSubcategories.data.subcategories);
      } else {
        setSubcategories([]);
        console.log("No subcategories found for category:", categoryId);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  return (
    <div>

      <div className="flex space-x-2 mt-5">
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

          {subcategories.length > 0 ? (
            <div className="flex flex-wrap space-x-2">
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

