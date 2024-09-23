import { Outlet } from 'react-router-dom';
import SearchBox from '../header/searchBox';
import Logo from '../header/logo';
import AdminCartButtons from '../header/adminCartButtons';
import CategoryButtons from '../categoriesnav/categoriesButtons';

export default function HomeLayout() {
  return (
    <>
      <header>
        <div className="flex">
          <SearchBox />
          <Logo />
        </div> 
        <AdminCartButtons />
        <CategoryButtons />
      </header>

      <main>
        {/* Outlet برای رندر کردن محتوای صفحات داخلی استفاده می‌شود */}
        <Outlet />
      </main>
    </>
  );
}
