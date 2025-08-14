import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatCard from "../components/StatCard";
import ListCard from "../components/ListCard";
import { MapPin, Star, Users, Calendar } from "lucide-react";
import FilterSidebar from "../components/FilterSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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

const Home: React.FC = () => {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState<"my" | "shared">("my");
    const [filters, setFilters] = useState<Filters | null>(null);
    const [myLists, setMyLists] = useState<any[]>([]);
    const [sharedLists, setSharedLists] = useState<any[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // 🔹 LocalStorage-dan user məlumatını oxumaq
    const userData = localStorage.getItem("user");
    const userId = userData ? JSON.parse(userData)._id : null;
    const username = userData ? JSON.parse(userData).username : "Guest";

    // Backend-dən travel listləri çəkmək
    useEffect(() => {
        const fetchLists = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/lists");
                const allLists = res.data.travelLists;

                if (userId) {
                    setMyLists(allLists.filter((list: any) => list.owner === userId));
                    setSharedLists(allLists.filter((list: any) => list.collaborators?.includes(userId)));
                } else {
                    setMyLists([]);
                    setSharedLists([]);
                }
            } catch (err) {
                console.error("Error fetching travel lists:", err);
            }
        };
        fetchLists();
    }, [userId]);

    const applyAllFilters = (list: any) => {
        const passSearch = list.title.toLowerCase().includes(search.toLowerCase());
        const passTags =
            !filters?.tags?.length || filters.tags.every(tag => list.tags.includes(tag));
        const passCompleted =
            !filters?.completedOnly || list.completed === list.destinations.length;
        const passCollaborators =
            filters?.minCollaborators == null || (list.collaborators?.length || 0) >= filters.minCollaborators;
        const passCreatedAfter =
            !filters?.createdAfter || new Date(list.createdAt) >= new Date(filters.createdAfter);
        const passCreatedBefore =
            !filters?.createdBefore || new Date(list.createdAt) <= new Date(filters.createdBefore);

        return (
            passSearch &&
            passTags &&
            passCompleted &&
            passCollaborators &&
            passCreatedAfter &&
            passCreatedBefore
        );
    };

    const filteredLists =
        (activeTab === "my" ? myLists : sharedLists).filter(applyAllFilters);

    const handleCreateClick = () => {
        if (!userId) {
            navigate("/auth/login", { state: { from: { pathname: "/create" } } });
        } else {
            navigate("/create");
        }
    };

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
                                Welcome back, {username}! 👋
                            </h1>
                            <p className="text-gray-600 mt-1">Ready for your next adventure?</p>
                        </div>
                        <button
                            onClick={handleCreateClick}
                            className="px-5 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:opacity-90 transition"
                        >
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
                        My Lists ({myLists.filter(applyAllFilters).length})
                    </button>
                    <button
                        onClick={() => setActiveTab("shared")}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md ${activeTab === "shared"
                                ? "bg-black text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Shared with Me ({sharedLists.filter(applyAllFilters).length})
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
                        {filteredLists.map((item) => (
                            <ListCard key={item._id} {...item} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </section>
        </>
    );
};

export default Home;
