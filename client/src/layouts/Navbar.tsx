import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaUserPlus } from "react-icons/fa";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="w-full px-4 py-3 md:px-6 md:py-4 z-10 flex justify-between items-center shadow-sm bg-white"
        >
            {/* Logo */}
            <div className='flex items-center gap-4'>
                <Link to={"/"} className='flex items-center gap-2 text-gray-800 text-2xl font-bold'>
                    <img
                        className='w-8 hover:scale-105 transition-transform duration-500 ease-in-out'
                        src="/vite.svg"
                        alt="navbar logo"
                    />
                    <h3>WanderLog</h3>
                </Link>
            </div>

            {/* Desktop Links */}
            <ul className='hidden md:flex gap-4 font-medium uppercase text-sm tracking-wide'>
                <li>
                    <Link to="/" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300  dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-7">Home</Link>
                </li>
                <li>
                    <Link to="/Apartments" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300  dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-10">Apartments</Link>
                </li>
                <li>
                    <Link to="/About" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300  dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-7">About</Link>
                </li>
                <li>
                    <Link to="/Contact" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300  dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-9">Contact</Link>
                </li>
            </ul>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
                <button
                    type="button"
                    className="relative p-2 rounded-full hover:bg-gray-200 transition"
                >
                    <FaBell className="text-2xl text-gray-700" />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                        3
                    </span>
                </button>
                <Link
                    to="/auth/login"
                    className="inline-flex uppercase items-center gap-2 rounded-md border border-slate-700 py-1.5 px-4 text-slate-700 font-semibold hover:bg-slate-800 hover:text-white transition"
                >
                    <FaUserPlus className='text-lg' />Login
                </Link>
                <Link
                    to="/create"
                    className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 py-1.5 px-4 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition"
                >
                    + Create
                </Link>
            </div>

            
        </nav>
    );
};

export default Navbar;
