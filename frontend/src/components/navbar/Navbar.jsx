import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
 export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleLogout = () => {
        // Dispatch the logout action
        dispatch(logout());
        navigate('/login');
    };
    return (
        
            <header className="text-gray-100 body-font bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-large items-center text-white mb-4 md:mb-0">
                        
                        <span className="ml-3 text-2xl font-bold">Event managment</span>
                    </a>
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center text-lg font-bold hidden md:flex">
                        <a href="#" className="mr-5 hover:text-indigo-400 transition duration-300 ease-in-out">First Link</a>
                        <a href="#" className="mr-5 hover:text-indigo-400 transition duration-300 ease-in-out">Second Link</a>
                        <a href="#" className="mr-5 hover:text-indigo-400 transition duration-300 ease-in-out">Third Link</a>
                        <a href="#" className="mr-5 hover:text-indigo-400 transition duration-300 ease-in-out">Fourth Link</a>
                    </nav>
                    
                    <button onClick={handleLogout} className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 transition duration-300 ease-in-out rounded text-base mt-4 md:mt-0 text-white">
                        Logout
                    </button>
                    
                    <button className="md:hidden ml-auto flex items-center" onClick={() => setIsOpen(!isOpen)}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
                {isOpen && (
                    <nav className="md:hidden bg-gray-800">
                        <a href="#" className="block py-2 px-4 text-white hover:bg-gray-700">First Link</a>
                        <a href="#" className="block py-2 px-4 text-white hover:bg-gray-700">Second Link</a>
                        <a href="#" className="block py-2 px-4 text-white hover:bg-gray-700">Third Link</a>
                        <a href="#" className="block py-2 px-4 text-white hover:bg-gray-700">Fourth Link</a>
                    </nav>
                )}
            </header>
        
    );
};


