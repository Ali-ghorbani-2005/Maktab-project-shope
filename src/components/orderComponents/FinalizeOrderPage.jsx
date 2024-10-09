import React, { useEffect } from 'react';
import { finalizeOrder } from '../../services/orderServices';

const FinalizeOrderPage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const confirmed = queryParams.get('confirmed'); // وضعیت تایید یا انصراف
  const userId = queryParams.get('user');
  const orderData = JSON.parse(queryParams.get('orderData'));

  useEffect(() => {
    const handleFinalize = async () => {
      // فقط در صورتی که کاربر تایید کرده باشد، سفارش را ارسال کن
      if (confirmed === 'true') {
        try {
          await finalizeOrder(orderData); // ارسال سفارش به سرور
          alert('سفارش با موفقیت ثبت شد');
        } catch (error) {
          alert('خطایی در نهایی کردن سفارش رخ داد.');
          console.error('Error finalizing order:', error);
        }
      } else {
        // در صورت انصراف، فقط پیام لغو را نمایش بده
        alert('سفارش لغو شد.');
      }
    };

    handleFinalize(); // فراخوانی تابع نهایی کردن
  }, [confirmed, orderData]); // وابستگی‌ها

  return <div>در حال پردازش...</div>;
};

export default FinalizeOrderPage;

