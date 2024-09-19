import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lod from "../../components/loding/lod";

export default function Loding() {
  const navigate = useNavigate();

  useEffect(() => {
    // بعد از ۳ ثانیه به صفحه اصلی (Home) ریدایرکت می‌شویم
    const timer = setTimeout(() => {
      navigate("/home"); // ریدایرکت به صفحه Home
    }, 3000);

    // تمیز کردن تایمر
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <Lod />
    </div>
  );
} 
