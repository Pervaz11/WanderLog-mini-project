import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatCard from "../components/StatCard";
import ListCard from "../components/ListCard";
import { MapPin, Star, Users, Calendar } from "lucide-react";
import FilterSidebar from "../components/FilterSidebar";

// Type for filters
type Filters = {
    tags: string[];
    completedOnly: boolean;
    minCollaborators: number;
    createdAfter: string;
    createdBefore: string;
};  

// Stats section
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

// Lists
const initialMyLists = [
    {
        title: "European Adventure 2024",
        description:
            "Exploring the historic cities and beautiful landscapes of Europe",
        isPublic: true,
        isNew: true,
        completed: 3,
        total: 8,
        tags: ["culture", "history", "food"],
        collaborators: 2,
        createdAt: "1/15/2024",
    },
    {
        title: "European Adventure 2024",
        description:
            "Exploring the historic cities and beautiful landscapes of Europe",
        isPublic: true,
        isNew: true,
        completed: 3,
        total: 8,
        tags: ["culture", "history", "food"],
        collaborators: 2,
        createdAt: "1/15/2024",
    },
];

const initialSharedLists = [
    {
        title: "California Road Trip",
        description: "Epic coastal drive from San Francisco to Los Angeles",
        isPublic: false,
        isNew: true,
        completed: 7,
        total: 10,
        tags: ["roadtrip", "coastal", "adventure"],
        collaborators: 1,
        createdAt: "7/10/2024",
    },
    {
        title: "Nordic Winter Wonderland",
        description: "Chasing Northern Lights in Iceland, Norway, and Finland",
        isPublic: false,
        isNew: false,
        completed: 2,
        total: 8,
        tags: ["winter", "northernlights", "nature"],
        collaborators: 0,
        createdAt: "6/5/2024",
    },
];

const Home: React.FC = () => {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState<"my" | "shared">("my");
    const [filters, setFilters] = useState<Filters | null>(null);

    const applyAllFilters = (list: any) => {
        const passSearch = list.title.toLowerCase().includes(search.toLowerCase());
        const passTags = !filters?.tags?.length || filters.tags.every(tag => list.tags.includes(tag));
        const passCompleted = !filters?.completedOnly || list.completed === list.total;
        const passCollaborators = filters?.minCollaborators == null || list.collaborators >= filters.minCollaborators;
        const passCreatedAfter = !filters?.createdAfter || new Date(list.createdAt) >= new Date(filters.createdAfter);
        const passCreatedBefore = !filters?.createdBefore || new Date(list.createdAt) <= new Date(filters.createdBefore);

        return passSearch && passTags && passCompleted && passCollaborators && passCreatedAfter && passCreatedBefore;
    };

    const filteredLists =
        (activeTab === "my" ? initialMyLists : initialSharedLists).filter(applyAllFilters);

    return (
        <>
            {/* Hero Section */}
            <section>
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
                            <p className="text-gray-600 mt-1">
                                Ready for your next adventure?
                            </p>
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
            </section>

            {/* Cards Section */}
            <section className="px-6 mt-10 mb-20">
                {/* Search + Filter */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search your travel lists..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full shadow border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex-shrink-0">
                        <FilterSidebar
                            onApply={(f) => setFilters(f)}
                            onClear={() => setFilters(null)}
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setActiveTab("my")}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md ${activeTab === "my"
                            ? "bg-black text-white"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        My Lists ({initialMyLists.filter(applyAllFilters).length})
                    </button>
                    <button
                        onClick={() => setActiveTab("shared")}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md ${activeTab === "shared"
                            ? "bg-black text-white"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Shared with Me ({initialSharedLists.filter(applyAllFilters).length})
                    </button>
                </div>


                {/* Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {filteredLists.map((item, idx) => (
                            <ListCard key={idx} {...item} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </section>
        </>
    );
};

export default Home;
