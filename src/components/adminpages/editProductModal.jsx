// EditProductModal.js
import React from 'react';

const EditProductModal = ({ isOpen, onClose, editForm, onInputChange, onSave, isSaveButtonEnabled, onImageChange, categories, subcategories, onCategoryChange }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                    onClick={onClose}
                >
                    X
                </button>

                <h3 className="text-xl font-bold mb-4">ویرایش محصول</h3>
                <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={onInputChange}
                    placeholder="نام محصول"
                    className="w-full p-2 mb-4 border rounded-lg"
                />

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={onImageChange}
                    className="mb-4"
                />

                <input
                    type="number"
                    name="price"
                    value={editForm.price} // اضافه کردن فیلد قیمت
                    onChange={onInputChange}
                    placeholder="قیمت محصول"
                    className="w-full p-2 mb-4 border rounded-lg"
                />

                <select
                    name="category"
                    value={editForm.category}
                    onChange={(e) => {
                        onCategoryChange(e.target.value); // فراخوانی تابع تغییر کتگوری
                        onInputChange(e); // به‌روزرسانی فیلد کتگوری
                    }}
                    className="w-full p-2 mb-4 border rounded-lg"
                >
                    <option value="">انتخاب دسته‌بندی</option>
                    {Array.isArray(categories) && categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>

                <select
                    name="subcategory"
                    value={editForm.subcategory}
                    onChange={onInputChange}
                    className="w-full p-2 mb-4 border rounded-lg"
                >
                    <option value="">انتخاب ساب‌کتگوری</option>
                    {Array.isArray(subcategories) && subcategories.map(subcategory => (
                        <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                    ))}
                </select>

                <textarea
                    name="description"
                    value={editForm.description}
                    onChange={onInputChange}
                    placeholder="توضیحات"
                    className="w-full p-2 mb-4 border rounded-lg"
                />

                <div className="flex justify-end">
                    <button
                        className={`px-4 py-2 rounded-lg text-white ${isSaveButtonEnabled ? 'bg-green-500' : 'bg-gray-300'} hover:bg-green-600`}
                        disabled={!isSaveButtonEnabled}
                        onClick={onSave}
                    >
                        ذخیره
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;