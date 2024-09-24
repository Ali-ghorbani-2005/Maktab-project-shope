import HeaderHome from "../../components/component-home/header/headerHome";
import ProductByIds from "../../components/product/productsOnSale";

export default function Home() {
  return (
    <div>


      <div className="mt-20">
        <HeaderHome />
      </div> 


      <div className="mt-10">

        <ProductByIds/>
      </div>

    </div>

  )
}
