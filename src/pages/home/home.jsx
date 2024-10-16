import { useContext, useEffect } from "react";
import AdvertisingProduct from "../../components/component-home/Advertising poster/AdvertisingPhone";
import HeaderHome from "../../components/component-home/header/headerHome";
import PopularProducts from "../../components/product/popularProducts";
import ProductByIds from "../../components/product/productsOnSale";
import LaptopsPreview from "../productPages/laptopsPreview";
import PhonePreview from "../productPages/phonePreview";
import { CartContext } from "../../services/cartContext";
import Categories from "../../components/component-home/categoriesnav/homeCategories";
import Banner from "../../components/component-home/Advertising poster/banner";


export default function Home() { 
  const { cartItems, clearCart } = useContext(CartContext); 


  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get('status');
    
    if (status === 'success') {
      // پاک کردن سبد خرید در صورت موفقیت آمیز بودن سفارش
      clearCart();
    
    }
  }, [clearCart]);


  return (
    <div>



      <div className="mt-20">
        <HeaderHome />
      </div>  


      <div className="mt-10">

        <Categories/>
       </div>


      <div className="mt-10">

        <ProductByIds/>
      </div>  

      <div className="mt-10">
        <AdvertisingProduct/>
      </div> 
      
      <div className="mt-8">
        <PopularProducts/>
      </div> 
      

       <div className="mt-10">
        <Banner/>
       </div>
      
       <div className="mt-5">
       <LaptopsPreview/>
       </div>
        

        <div className="mt-10">
          <PhonePreview/>
        </div> 

       
       
      

    </div>

  )
}
