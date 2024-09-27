// import { Outlet } from 'react-router-dom';
// import SearchBox from '../header/searchBox';
// import Logo from '../header/logo';
// import AdminCartButtons from '../header/adminCartButtons';
// import CategoryButtons from '../categoriesnav/categoriesButtons';

// export default function HomeLayout() {
//   return (
//     <>   
//     <div className="fixed top-0 h-40  bg-white shadow-lg z-50  border-b-2 border-gray-300">
//       <header className=' '>
//         <div className="flex ">
//           <SearchBox />
//           <Logo />
//         </div> 
//         <AdminCartButtons />
//         <CategoryButtons />
//       </header> 
//       </div>
//       <main>
//         {/* Outlet برای رندر کردن محتوای صفحات داخلی استفاده می‌شود */}
//         <Outlet />
//       </main>
//     </>
//   );
// } 





import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SearchBox from '../header/searchBox';
import Logo from '../header/logo';
import AdminCartButtons from '../header/adminCartButtons';
import CategoryButtons from '../categoriesnav/categoriesButtons';

export default function HomeLayout() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // اگر اسکرول بیشتر از 50 پیکسل بود، هدر کوچک شود
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>   
      <div className={`fixed top-0 h-40 bg-white shadow-lg z-50 border-b-2 border-gray-300 transition-all duration-300 ${isScrolled ? 'h-20' : 'h-40'}`}>
        <header>
          <div className="flex">
            <SearchBox />
            <Logo />
          </div> 
          <div className={`${isScrolled ? 'hidden' : 'block'}`}>
            <AdminCartButtons />
            <CategoryButtons />
          </div>
        </header> 
      </div>
      <main>
        {/* Outlet برای رندر کردن محتوای صفحات داخلی استفاده می‌شود */}
        <Outlet />
      </main>
    </>
  );
}
