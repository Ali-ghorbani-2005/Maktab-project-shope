

export default function AdvertisingProduct() {
  return (
    <>

      {/* <div className="flex justify-center items-center gap-24">

    <div className=" w-72  " >
       <button> <img src="imgs/Advertising/Advertising-1.png" className="rounded-2xl hover:shadow-lg hover:shadow-black " alt="" /> </button>
    </div>  

    <div className=" w-72" >
      <button> <img src="imgs/Advertising/Advertising-2.png" className="rounded-2xl hover:shadow-lg hover:shadow-black" alt="" /> </button> 
    </div> 

    <div className=" w-72" >
      <button> <img src="imgs/Advertising/Advertising-3.png" className="rounded-2xl hover:shadow-lg hover:shadow-black" alt="" /> </button> 
    </div>
    
    </div> */}


      <div className="flex justify-center items-center gap-6 flex-wrap mt-52">
        <div className="w-72">
          <button>
            <img src="imgs/Advertising/Advertising-1.png" className="rounded-2xl hover:shadow-lg hover:shadow-black transition duration-300" alt="Advertising 1" />
          </button>
        </div>

        <div className="w-72">
          <button>
            <img src="imgs/Advertising/Advertising-2.png" className="rounded-2xl hover:shadow-lg hover:shadow-black transition duration-300" alt="Advertising 2" />
          </button>
        </div>

        <div className="w-72">
          <button>
            <img src="imgs/Advertising/Advertising-3.png" className="rounded-2xl hover:shadow-lg hover:shadow-black transition duration-300" alt="Advertising 3" />
          </button>
        </div>
      </div>

    </>
  )
}
