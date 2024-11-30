

// export default function SuccessPurchase() {
//   return (
//    <>

//    <div className="flex justify-center items-center">
//     <div>
//    <div className="mt-5 flex justify-center items-center">
//     <p className="text-4xl font-extrabold">خرید موفق</p>  

//    </div> 

//    <div className="mt-4"> 
//    <div className="text-5xl font-semibold">
//     <p>سفارش شما با موفقیت ثبت شد </p> 
//     </div>
//     <img src="imgs/CheckoutOrder/successful.jpg" className="w-[700px] mt-6" alt="" />
//    </div> 

//    {/* <div className="flex justify-center items-center -mt-5">
//     <button className="bg-green-500 text-xl w-72 h-14 rounded-lg flex justify-center items-center font-semibold hover:text-white" >  <p className="">بازگشت به خانه</p>  <img src="imgs/CheckoutOrder/home.png" className="w-8" alt="" /> </button>
//    </div>  */}


//  .
//    </div>

//    </div>


//    </>
//   )
// } 




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function SuccessPurchase() {
//   const [countdown, setCountdown] = useState(5);
//   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (countdown === 0) {
// //       // وقتی شمارش به صفر رسید، به صفحه خانه بروید
// //       navigate('/home');
// //     } else {
// //       // هر ثانیه شمارش معکوس را کاهش دهید
// //       const timer = setInterval(() => {
// //         setCountdown(prevCountdown => prevCountdown - 1);
// //       }, 1000);

// //       // تمیز کردن تایمر بعد از اتمام شمارش
// //       return () => clearInterval(timer);
// //     }
// //   }, [countdown, navigate]);

//   return (
//     <>
//       <div className="flex justify-center items-center">
//         <div>
//           <div className="mt-5 flex justify-center items-center">
//             <p className="text-4xl font-extrabold">خرید موفق</p>
//           </div>

//           <div className="mt-4">
//             <div className="text-5xl font-semibold">
//               <p>سفارش شما با موفقیت ثبت شد</p>
//               <p className="text-2xl mt-2">شمارش معکوس: {countdown}</p>
//             </div>
//             <img src="imgs/CheckoutOrder/successful.jpg" className="w-[700px] mt-6" alt="" />
//           </div>

//           {/* <div className="flex justify-center items-center -mt-5">
//             <button className="bg-green-500 text-xl w-72 h-14 rounded-lg flex justify-center items-center font-semibold hover:text-white">
//               <p className="">بازگشت به خانه</p>
//               <img src="imgs/CheckoutOrder/home.png" className="w-8" alt="" />
//             </button>
//           </div> */}
//         </div>
//       </div>
//     </>
//   );
// } 



import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './success.css'; // فایل CSS را وارد کنید
import { CartContext } from "../../services/cartContext";

export default function SuccessPurchase() { 

    const { cartItems, clearCart } = useContext(CartContext); 

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


    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const status = queryParams.get('status');
        
        if (status === 'success') {
          // پاک کردن سبد خرید در صورت موفقیت آمیز بودن سفارش
          clearCart();
        
        }
      }, [clearCart]);

    return (
      
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"> {/* تغییر padding */}
                <div className="-mt-2 flex justify-center items-center">
                    <p className="text-4xl font-extrabold text-green-600">خرید موفق</p>
                </div>

                <div className="mt-4 relative">
                    <div className="countdown-container">
                        <div className="countdown-circle">
                            <p className="countdown-text">{countdown}</p>
                        </div>
                    </div>
                    <div className="text-3xl font-semibold text-center -mt-2"> {/* کاهش فاصله */}
                        <p>در حال انتقال به سایت پذیرنده</p>
                    </div>
                    <img src="imgs/CheckoutOrder/successful.jpg" className="w-[500px] mt-4" alt="" /> {/* کاهش فاصله */}
                </div>
            </div>
        </div>
    );
}

 



 // <div className="flex justify-center items-center">
        //   <div>
        //     <div className="mt-5 flex justify-center items-center">
        //       <p className="text-4xl font-extrabold">خرید موفق</p>
        //     </div>

        //     <div className="mt-4">
        //       <div className="countdown-container">
        //         <div className="countdown-circle">
        //           <p className="countdown-text">{countdown}</p>
        //         </div>
        //       </div>
        //       <div className="text-3xl font-semibold ml-36 mt-4">
        //         <p>در حال انتقال به سایت پذیرنده </p>
        //       </div>
        //       <img src="imgs/CheckoutOrder/successful.jpg" className="w-[600px] " alt="" />
        //     </div>
        //   </div>
        // </div> 

        // <div className="flex justify-center items-center min-h-screen bg-gray-100">
        //     <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        //         <div className="mt-5 flex justify-center items-center">
        //             <p className="text-4xl font-extrabold">خرید موفق</p>
        //         </div>

        //         <div className="mt-4 relative">
        //             <div className="countdown-container">
        //                 <div className="countdown-circle">
        //                     <p className="countdown-text">{countdown}</p>
        //                 </div>
        //             </div>
        //             <div className="text-3xl font-semibold text-center mt-4">
        //                 <p>در حال انتقال به سایت پذیرنده</p>
        //             </div>
        //             <img src="imgs/CheckoutOrder/successful.jpg" className="w-[600px] mt-6" alt="" />
        //         </div>
        //     </div>
        // </div> 
