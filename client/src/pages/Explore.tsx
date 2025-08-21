import { useState } from "react";
import { ExploreCard } from "../components/ExploreCard";
import { ExploreEmptyState } from "../components/ExploreEmptyState";
import { ExploreFilterBar } from "../components/ExploreFilterBar";
import { motion } from "framer-motion";

import ChatWidget from "./ChatWidget";

const mockData = [
    {
        id: "1",
        type: "list",
        title: "Discover Japan",
        description: "Temples, food and vibrant cities across Japan.",
        tags: ["culture", "asia", "urban"],
        image: "",
        createdAt: "2025-07-01",
        author: "ayxan.dev",
    },
    {
        id: "2",
        type: "journal",
        title: "Sunset in Santorini",
        description: "Watching the sky turn pink over the blue domes.",
        tags: ["romantic", "europe", "beach"],
        image: "",
        createdAt: "2025-06-22",
        author: "sena.writes",
    },
];

export const Explore = () => {
    const [search, setSearch] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const filtered = mockData.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesTags =
            selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag));
        return matchesSearch && matchesTags;
    });

    return (
        <>
            <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="max-w-screen-xl mx-auto px-6 py-10">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-semibold">Explore</h1>
                    </div>

                    <ExploreFilterBar
                        search={search}
                        onSearchChange={setSearch}
                        selectedTags={selectedTags}
                        onTagToggle={(tag) =>
                            setSelectedTags((prev) =>
                                prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                            )
                        }
                        onClearTags={() => setSelectedTags([])}
                    />

                    {filtered.length === 0 ? (
                        <ExploreEmptyState />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {filtered.map((item) => (
                                <ExploreCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </motion.div >
            <ChatWidget />
        </>
    );
};
