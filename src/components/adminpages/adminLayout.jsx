import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#f8f9fa', padding: '10px', zIndex: 1000 }}>
        <nav>
          <Link to="/AdminProduct"  >
           <button>کالا ها </button>
          </Link>  

        </nav>
      </header>
      <main style={{ marginTop: '60px' }}>
       
        <Outlet />
      </main>
    </>
  );
}