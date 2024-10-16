

export default function SearchBox() {
  return (
    <>

      {/* <div>

    <div className="ml-[460px] flex mt-4 bg-slate-100 w-[650px] h-14 rounded-xl ">

    
        <div>
        <input type="text" className="w-[570px] ml-10 mt-1  h-12 bg-slate-100 text-right outline-none focus:ring-0 " placeholder="محصول , برند یا دسته مورد نظر تانرا جستجو کنید" />  
        </div> 
        <img src="imgs/site-icons/icons-search.png" className="w-10 h-10 mt-1.5 "  alt="...///" />  

    </div>  

    
   </div> */}

      <div className="flex justify-center mt-4 md:ml-[450px]">
        <div className="flex flex-wrap bg-slate-100 w-full sm:w-[350px] md:w-[700px] md:-ml-8 sm:ml-56 h-14 rounded-xl">
          <input
            type="text"
            className="flex-grow ml-2 sm:ml-10 h-12 bg-slate-100 text-right outline-none focus:ring-0"
            placeholder="محصول , برند یا دسته مورد نظر تانرا جستجو کنید"
          />
          <img
            src="imgs/site-icons/icons-search.png"
            className="w-10 h-10 mt-1.5 mr-2 sm:mr-0"
            alt="search icon"
          />
        </div>
      </div>



    </>
  )
}
