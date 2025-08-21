import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa";
import { Globe } from 'lucide-react';
import NotificationBell from '../components/NotificationBell';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));

        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem("user");
            setUser(updatedUser ? JSON.parse(updatedUser) : null);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/auth/login");
    };

    return (
        <>
            <nav className="w-full px-4 py-3 md:px-6 md:py-4 z-10 flex justify-between items-center shadow-sm bg-white">
                {/* Logo */}
                <div className='flex items-center gap-4 hover:scale-105 transition-transform duration-500 ease-in-out'>
                    <Link to={"/"} className='flex items-center gap-2 text-gray-800 text-2xl font-bold'>
                        <Globe className="w-7 h-6.5 text-blue-600" />
                        <h3>WanderLog</h3>
                    </Link>
                </div>


                {/* Desktop Links */}
                <ul className='hidden md:flex gap-4 font-medium uppercase text-sm tracking-wide'>
                    <li>
                        <Link to="/" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300 before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black before:transition-all text-sm hover:before:w-10">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/my-lists" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300 before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black before:transition-all text-sm hover:before:w-8">
                            My Lists
                        </Link>
                    </li>
                    <li>
                        <Link to="/journal" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300 before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black before:transition-all text-sm hover:before:w-7">
                            Journal
                        </Link>
                    </li>
                    <li>
                        <Link to="/explore" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300 before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black before:transition-all text-sm hover:before:w-7">
                            Explore
                        </Link>
                    </li>
                </ul>


                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <NotificationBell />

                    {/* Login olmamışsa Login düyməsi, login olmuşsa profil şəkli */}
                    {!user ? (
                        <Link
                            to="/auth/login"
                            className="inline-flex uppercase items-center gap-2 rounded-md border border-slate-700 py-1.5 px-4 text-slate-700 font-semibold hover:bg-slate-800 hover:text-white transition"
                        >
                            <FaUserPlus className='text-lg' />Login
                        </Link>
                    ) : (
                        <div className="relative group">
                            <img
                                src={user.profileImage || "/default-avatar.png"}
                                alt="Profile"
                                className="w-10 h-10 rounded-full cursor-pointer border"
                            />
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}

                    <Link
                        to="./create"
                        className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 py-1.5 px-4 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition"
                    >
                        + Create
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='md:hidden text-3xl p-1'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5" stroke="currentColor"
                        className={`w-8 h-8 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>

                {/* Mobile Dropdown */}
                <div
                    className={`absolute top-16 left-0 w-full bg-white shadow-md md:hidden transition-all duration-500 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <ul className="flex flex-col gap-1 px-4 py-4">
                        <li>
                            <Link to="/" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Home</Link>
                        </li>
                        <li>
                            <Link to="/Apartments" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Apartments</Link>
                        </li>
                        <li>
                            <Link to="/About" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">About</Link>
                        </li>
                        <li>
                            <Link to="/Contact" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Contact</Link>
                        </li>
                    </ul>
                    <div className="flex flex-col gap-2 border-t border-gray-200 px-4 py-3">
                        {!user ? (
                            <Link
                                to="/auth/login"
                                className="w-full inline-flex items-center uppercase gap-2 justify-center rounded-md border border-slate-700 py-2 text-slate-700 font-semibold hover:bg-slate-800 hover:text-white transition"
                            >
                                <FaUserPlus className='text-lg' />Login
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/profile"
                                    className="w-full inline-flex items-center gap-2 justify-center rounded-md border border-slate-700 py-2 text-slate-700 font-semibold hover:bg-slate-800 hover:text-white transition"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full inline-flex items-center uppercase gap-2 justify-center rounded-md border border-red-500 text-red-500 py-2 font-semibold hover:bg-red-500 hover:text-white transition"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        <Link
                            to="/create"
                            className="w-full inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 py-2 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition"
                        >
                            + Create
                        </Link>
                    </div>
                </div>
            </nav >
        </>
    );
};

export default Navbar;
