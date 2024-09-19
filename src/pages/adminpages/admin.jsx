
const Admin = () => {
    return (
        <> 
                      
                      <div className="flex justify-center items-center ">
            <div className=" flex justify-center items-center bg-slate-300 w-96  h-96 rounded-2xl ">

                <div className="ml-10 -mt-12">


                    <div className='mt-8 flex justify-center items-center  rounded-full bg-blue-300 w-32 h-32'>
                        <img src="imgs/site-icons/admin.png" className='w-20' alt="" />
                    </div>

                    <div className="flex justify-center items-center mt-3 -ml-3" >
                        <p className="text-2xl font-bold" >name:</p>
                        <p className="text-xl ml-1" >Admin</p>
                    </div>

                    <div className="flex justify-center items-center mt-3">
                        <p className="text-2xl font-bold" >Lastname:</p>
                        <p className="text-xl ml-1" >admin</p>
                    </div>

                </div>

            </div> 

            </div>

        </>
    );
};

export default Admin;