import { motion, AnimatePresence } from 'framer-motion';
import NotificationItem from './NotificationItem';

const NotificationDropdown = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute right-0 mt-2 w-80 bg-white shadow-2xl border border-gray-200 rounded-2xl z-50 overflow-hidden"
            >
                <div className="px-5 py-3 border-b border-gray-100">
                    <h3 className="text-[15px] font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                    <NotificationItem
                        type="🎉 New collaborator"
                        message='Sarah joined "European Adventure 2024"'
                        time="2 hours ago"
                    />
                    <NotificationItem
                        type="📌 Trip reminder"
                        message="Barcelona trip is in 5 days!"
                        time="1 day ago"
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NotificationDropdown;
