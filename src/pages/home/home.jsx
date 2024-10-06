import AdvertisingProduct from "../../components/component-home/Advertising poster/AdvertisingPhone";
import HeaderHome from "../../components/component-home/header/headerHome";
import PopularProducts from "../../components/product/popularProducts";
import ProductByIds from "../../components/product/productsOnSale";
import LaptopsPreview from "../productPages/laptopsPreview";

export default function Home() {
  return (
    <div>


      <div className="mt-20">
        <HeaderHome />
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

      
       <div>
       <LaptopsPreview/>
       </div>
       
      

    </div>

  )
}
