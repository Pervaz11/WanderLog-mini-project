interface NotificationItemProps {
    type: string;
    message: string;
    time: string;
}

const NotificationItem = ({ type, message, time }: NotificationItemProps) => {
    return (
        <div className="px-5 py-3 hover:bg-gray-50 transition-all duration-200 cursor-pointer">
            <p className="text-sm font-semibold text-gray-800">{type}</p>
            <p className="text-sm text-gray-600">{message}</p>
            <p className="text-xs text-gray-400 mt-1">{time}</p>
        </div>
    );
};

export default NotificationItem;
