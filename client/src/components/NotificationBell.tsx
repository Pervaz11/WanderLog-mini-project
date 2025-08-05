import { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import NotificationDropdown from './NotificationDropdown';

const NotificationBell = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
                <FaBell className="text-2xl text-gray-700" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-600 rounded-full">
                    3
                </span>
            </button>

            {open && <NotificationDropdown />}
        </div>
    );
};

export default NotificationBell;
