import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SearchBox from '../header/searchBox';
import Logo from '../header/logo';
import AdminCartButtons from '../header/adminCartButtons';
import CategoryButtons from '../categoriesnav/categoriesButtons';
import HomeFooter from '../footer/homeFooter';
import Buttons from '../header/buttons';

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
      <div className={`fixed top-0  bg-white shadow-lg z-50 border-b border-gray-400 transition-all duration-300 ${isScrolled ? 'h-20' : 'h-40'}`}>
        <header>
          <div className="flex">
            <SearchBox />
            <Logo />
          </div>  
          <AdminCartButtons />
          <div className={`${isScrolled ? 'hidden' : 'block'}`}>
            
            <CategoryButtons />  

            <div className='mt-14 flex justify-end mr-64'>
          <Buttons/>
          </div>
           
          </div>   

        

        </header> 
      </div>
      <main>
        {/* Outlet برای رندر کردن محتوای صفحات داخلی استفاده می‌شود */}
        <Outlet />
      </main> 

      <div className='mt-10'>
        <HomeFooter/>
      </div> 

      <div className="mt-10">

</div>
    </>
  );
}
