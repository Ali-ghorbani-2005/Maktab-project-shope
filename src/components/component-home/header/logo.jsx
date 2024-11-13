import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <>
            <div className="flex items-center ml-4 mt-1">
                <Link to='/home' className="flex items-center">
                    <img className="w-24 h-24 md:w-32 " src="imgs/logo/logo.jpg" alt="SMART TECH Logo" />
                    <p className="ml-2 text-xl font-bold text-blue-800 hidden md:block">SMART TECH</p>
                </Link>
            </div>



        </>
    )
}

