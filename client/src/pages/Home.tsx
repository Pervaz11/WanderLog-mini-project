import React from "react";
import { motion } from "framer-motion";
import StatCard from "../components/StatCard";
import { MapPin, Star, Users, Calendar } from "lucide-react";

const stats = [
    {
        icon: MapPin,
        label: "Total Destinations",
        value: 26,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-100",
    },
    {
        icon: Star,
        label: "Completed",
        value: 11,
        iconColor: "text-green-500",
        bgColor: "bg-green-100",
    },
    {
        icon: Users,
        label: "Collaborators",
        value: 8,
        iconColor: "text-purple-500",
        bgColor: "bg-purple-100",
    },
    {
        icon: Calendar,
        label: "This Year",
        value: 5,
        iconColor: "text-orange-500",
        bgColor: "bg-orange-100",
    },
];

const Home: React.FC = () => {
    return (
        <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                        Welcome back, John! 👋
                    </h1>
                    <p className="text-gray-600 mt-1">Ready for your next adventure?</p>
                </div>
                <button className="px-5 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:opacity-90 transition">
                    + Create New List
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
        </motion.div>
    );
};

export default Home;
