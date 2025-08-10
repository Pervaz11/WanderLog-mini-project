// NotificationDropdown.tsx
import { motion, AnimatePresence } from "framer-motion";
import NotificationItem from "./NotificationItem";
import { useNotifications } from "../components/NotificationContext";

const NotificationDropdown = () => {
    const { notifications } = useNotifications();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-80 bg-white shadow-2xl border border-gray-200 rounded-2xl z-50 overflow-hidden"
            >
                <div className="px-5 py-3 border-b border-gray-100">
                    <h3 className="text-[15px] font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                    {notifications.map((n) => (
                        <NotificationItem
                            key={n.id}
                            type={n.type}
                            message={n.message}
                            time={n.time}
                        />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NotificationDropdown;
