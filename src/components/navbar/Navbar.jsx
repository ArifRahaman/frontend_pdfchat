

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';
import Cookies from 'js-cookie';
import { FaBars, FaTimes, FaSignOutAlt, FaUpload, FaUserPlus, FaSignInAlt, FaUser } from 'react-icons/fa';

const Navbar = () => {
    const image = localStorage.getItem("uploadedImageUrl");
    const { authUser, setAuthUser } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarVisible, setSidebarVisible] = useState(false);

    const handleLogout = () => {
        Cookies.remove('jwt');
        localStorage.clear();
        setAuthUser(null);
        navigate('/login');
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="bg-gray-300 text-white">
            <div className="container mx-auto px-5 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">
                        <img src="" className="h-8 w-32" alt="Flowbite Logo" />
                    </h1>
                </div>
                <nav className="hidden md:flex space-x-4 justify-center mt-4">
                    <Link
                        to="/chatbot"
                        className={`relative group flex items-center justify-center px-2 py-1 rounded font-bold ${isActive('/chatbot') ? 'bg-blue-400 text-white' : 'hover:bg-gray-100 text-slate-800'} transition duration-300`}
                    >
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        Chatbot
                    </Link>
                    <Link
                        to="/seeposts"
                        className={`relative group flex items-center justify-center px-4 py-2 rounded font-bold ${isActive('/seeposts') ? 'bg-green-500 text-white' : 'hover:bg-gray-100 text-slate-800'} transition duration-300`}
                    >
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        See Posts
                    </Link>
                    {authUser ? (
                        <>
                            <Link
                                to="/search"
                                className={`relative group flex items-center justify-center px-4 py-2 rounded font-bold ${isActive('/search') ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-slate-800'} transition duration-300`}
                            >
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                Search
                            </Link>
                            <Link
                                to="/postvideo"
                                className={`relative group flex items-center justify-center px-4 py-2 rounded font-bold ${isActive('/search') ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-slate-800'} transition duration-300`}
                            >
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                PostVideo
                            </Link>
                            <Link
                                to="/upload"
                                className={`relative group flex items-center justify-center px-4 py-2 rounded font-bold ${isActive('/upload') ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-slate-800'} transition duration-300`}
                            >
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                Upload
                            </Link>
                            <Link
                                to="/post"
                                className={`relative group flex items-center justify-center px-4 py-2 rounded font-bold ${isActive('/post') ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-slate-800'} transition duration-300`}
                            >
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                Post
                            </Link>
                            <div className="flex items-center space-x-2">
                                <Link
                                    to="/dashboard"
                                    className={`relative group flex items-center justify-center px-4 py-2 rounded  ${isActive('/dashboard') ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-slate-800'} transition duration-300`}
                                >
                                    <img
                                        src={image}
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full border-2 border-blue-500 group-hover:border-blue-700 transition duration-300"
                                    />
                                </Link>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 flex items-center justify-center px-4 py-2 rounded text-white hover:bg-red-700 transition duration-300"
                            >
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/signup"
                                className={`relative group flex items-center justify-center px-4 py-2 rounded ${isActive('/signup') ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-slate-800'} transition duration-300`}
                            >
                                <FaUserPlus className="mr-2" /> Signup
                            </Link>
                            <Link
                                to="/login"
                                className={`relative group flex items-center justify-center px-4 py-2 rounded ${isActive('/login') ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-slate-800'} transition duration-300`}
                            >
                                <FaSignInAlt className="mr-2" /> Login
                            </Link>
                        </>
                    )}
                </nav>
                <button onClick={toggleSidebar} className="md:hidden bg-gray-800 text-white px-2 py-1 rounded">
                    {sidebarVisible ? <FaTimes style={{ fontSize: '1rem' }} /> : <FaBars style={{ fontSize: '1rem' }} />}
                </button>
            </div>
            {sidebarVisible && (
                <nav className="md:hidden bg-gradient-to-br from-red-400 to-gray-500 text-white p-4">
                    <ul className="space-y-4">
                        <li>
                            <Link to="/chatbot" className={`px-3 py-2 rounded block ${isActive('/chatbot') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                Chatbot
                            </Link>
                        </li>
                        <li>
                            <Link to="/seeposts" className={`px-3 py-2 rounded block ${isActive('/seeposts') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                See Posts
                            </Link>
                        </li>
                        {authUser ? (
                            <>
                                <li>
                                    <Link to="/search" className={`px-3 py-2 rounded block ${isActive('/search') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        Search
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/postvideo" className={`px-3 py-2 rounded block ${isActive('/postvideo') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        PostVideo
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/upload" className={`px-3 py-2 rounded block ${isActive('/upload') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        Upload
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/post" className={`px-3 py-2 rounded block ${isActive('/post') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        Post
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link to="/mypost" className={`px-3 py-2 rounded block ${isActive('/mypost') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        Mypost
                                    </Link>
                                </li> */}
                                <li>
                                    <Link to="/dashboard" className={`px-3 py-2 rounded block ${isActive('/dashboard') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        <img src={image} alt="https://www.hdwallpapers.in/download/golden_retriever_dog_in_red_yellow_lights_blur_bokeh_background_4k_hd_dog-3840x2160.jpg" className="h-8 w-8 rounded-full" />
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded flex items-center">
                                        <FaSignOutAlt className="mr-2" /> Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/signup" className={`px-3 py-2 rounded block ${isActive('/signup') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        <FaUserPlus className="mr-2" /> Signup
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className={`px-3 py-2 rounded block  ${isActive('/login') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        <FaSignInAlt className="mr-6" /> Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Navbar;
