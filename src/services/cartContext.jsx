import React, { createContext, useState, useEffect } from 'react';

// ایجاد Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // دریافت سبد خرید از localStorage هنگام بارگذاری
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  // اضافه کردن محصول به سبد خرید
  const addToCart = (product, quantity) => {
    // بررسی اینکه آیا محصولی با همین آیدی از قبل در سبد موجود است
    const existingProduct = cartItems.find(item => item._id === product._id);

    if (existingProduct) {
      // اگر محصول از قبل موجود باشد، تعداد آن به‌روزرسانی می‌شود
      const updatedCartItems = cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    } else {
      // اگر محصول جدید باشد، به سبد اضافه می‌شود
      const updatedCart = [...cartItems, { ...product, quantity }];
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // حذف محصول از سبد خرید
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id); // اطمینان از استفاده از _id یا id
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // به‌روزرسانی localStorage
  };

  // پاک کردن کل سبد خرید
  const clearCart = () => {
    setCartItems([]); // سبد خرید خالی می‌شود
    localStorage.removeItem('cart'); // پاک کردن localStorage
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};