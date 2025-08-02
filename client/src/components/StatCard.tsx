import React from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: number;
    iconColor: string;
    bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, iconColor, bgColor }) => {
    return (
        <div className="flex items-center gap-4 p-5 rounded-xl shadow-sm bg-white transition hover:shadow-md">
            <div className={`p-2 rounded-md ${bgColor}`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-xl font-semibold text-gray-800">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
