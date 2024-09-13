
import CategoryButtons from "../../components/component-home/categoriesnav/categoriesButtons";
import AdminCartButtons from "../../components/component-home/header/adminCartButtons";
import HeaderHome from "../../components/component-home/header/headerHome";
import Logo from "../../components/component-home/header/logo";


export default function Home() {
  return (
    <div>
      <div>

        <Logo />


        <AdminCartButtons />

         <CategoryButtons /> 

        <div className="mt-20">
          <HeaderHome />
        </div>

      </div>
    </div>
  )
}
