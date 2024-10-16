import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './success.css'; // فایل CSS را وارد کنید


export default function CancelPurchase() {   

    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        if (countdown === 0) {
          navigate('/home');
        } else {
          const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
          }, 1000);
          return () => clearInterval(timer);
        }
      }, [countdown, navigate]); 

   

  return (
    <>
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"> {/* تغییر padding */}
                <div className="-mt-2 flex justify-center items-center">
                    <p className="text-4xl font-extrabold text-red-600">خرید لغو شد</p>
                </div>

                <div className="mt-4 relative">
                    <div className="countdown-container2">
                        <div className="countdown-circle2">
                            <p className="countdown-text2">{countdown}</p>
                        </div>
                    </div>
                    <div className="text-3xl font-semibold text-center -mt-2"> {/* کاهش فاصله */}
                        <p>در حال انتقال به سایت پذیرنده</p>
                    </div>
                    <img src="imgs/CheckoutOrder/optOut.jpg" className="w-[500px] mt-4" alt="" /> {/* کاهش فاصله */}
                </div>
            </div>
        </div>
    
    </>
  )
}
