
export default function HomeFooter() { 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // برای انیمیشن نرم
    });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-blue-600 w-full max-w-screen-xl p-10 rounded-3xl">

          <div className="border-b border-white pb-5 mb-5">
            <div className="flex justify-between items-center">
              <img src="imgs/logo/logo.jpg" className="w-20 rounded-2xl" alt="logo" />
              <button onClick={scrollToTop} className="bg-white w-48 h-10 rounded-lg font-bold text-xl">بازگشت به بالا</button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white w-72 h-14 rounded-xl flex justify-around items-center mt-5">
              <button> <img src="imgs/site-icons/youtube.png" className="w-10" alt="youtube" /> </button>
              <button> <img src="imgs/site-icons/instagram.png" className="w-10" alt="instagram" /> </button>
              <button> <img src="imgs/site-icons/telegram.png" className="w-10" alt="telegram" /> </button>
              <p className="mt-2 text-lg font-bold">شبکه های اجتماعی</p>
            </div>
          </div>

          <div className="flex flex-col items-end mt-10">
            <p className="text-xl text-white font-semibold">تلفن: 09912329973</p>
            <p className="text-xl text-white font-semibold">
              ایمیل: <span>ali.ghorbani.khrowshahi@gmail.com</span>
            </p>
          </div>

          <div className="mt-5 text-white">
            <p className="text-center">
              A safe online shopping experience requires a store that delivers diverse, high-quality,
              and reasonably priced goods promptly while also offering a return guarantee. SMART TECH
              has been committed to these features for years and has cultivated a loyal customer base.
              One of the primary concerns for users of SMART TECH or any online store is the delivery
              time for purchased products. SMART TECH offers various shipping methods based on the seller,
              destination, and product type.
            </p>
          </div>

          <div className="flex justify-center gap-10 mt-10">
            <img src="imgs/site-icons/c4.webp" className="w-16 rounded-xl" alt="brand logo" />
            <img src="imgs/site-icons/c5.webp" className="w-16 rounded-xl" alt="brand logo" />
            <img src="imgs/site-icons/logo-1.png" className="w-16 bg-white rounded-xl" alt="brand logo" />
          </div>

          <div className="bg-blue-900 mt-10 h-20 rounded-b-3xl flex items-center justify-center">
            <p className="text-xl text-center text-white">تمامی حقوق مادی و معنوی این سایت متعلق به فناوی هوشمند می‌باشد.</p>
          </div>

        </div>
      </div>

    </>
  )
}
