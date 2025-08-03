import { useState, type SetStateAction } from "react";
import { JournalCard } from "../components/JournalCard";
import { JournalEmptyState } from "../components/JournalEmptyState";
import JournalFilterSidebar, { type Filters } from "../components/JournalFilterSidebar";
import { motion } from "framer-motion";

const mockJournals = [
    {
        id: "1",
        title: "Paris Morning Walk",
        excerpt: "I explored the streets around the Seine and had a croissant.",
        createdAt: "2025-08-01",
        tags: ["food", "urban"],
        image: "",
    },
    {
        id: "2",
        title: "Alpine Hiking",
        excerpt: "Mountains were breathtaking. Cold wind, clear sky.",
        createdAt: "2025-07-20",
        tags: ["mountains", "nature"],
        image: "",
    },
];

export const Journal = () => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<{ tags: string[]; from: string; to: string } | null>(null);

    const filtered = mockJournals.filter((j) => {
        const matchTitle = j.title.toLowerCase().includes(search.toLowerCase());
        const matchTags =
            !filters?.tags.length || filters.tags.every((tag) => j.tags.includes(tag));
        const matchDate =
            (!filters?.from || new Date(j.createdAt) >= new Date(filters.from)) &&
            (!filters?.to || new Date(j.createdAt) <= new Date(filters.to));

        return matchTitle && matchTags && matchDate;
    });

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-semibold">Journal</h1>
                <button className="px-5 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md hover:opacity-90 transition">
                    + Create New List
                </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search your journal..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg shadow-sm text-sm"
                />
                <JournalFilterSidebar
                    onApply={(f: SetStateAction<Filters | null>) => setFilters(f)}
                    onClear={() => setFilters(null)}
                />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
            >

                {filtered.length === 0 ? (
                    <JournalEmptyState />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((journal) => (
                            <JournalCard key={journal.id} journal={journal} />
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};
