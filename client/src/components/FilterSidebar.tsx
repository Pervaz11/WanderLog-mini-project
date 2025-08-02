import React, { useState } from "react";
import { motion } from "framer-motion";
import { FunnelPlus, X } from "lucide-react";

type FilterSidebarProps = {
    onApply: (filters: Filters) => void;
    onClear: () => void;
};

type Filters = {
    tags: string[];
    completedOnly: boolean;
    minCollaborators: number;
    createdAfter: string;
    createdBefore: string;
};

const allTags = ["culture", "history", "food", "roadtrip", "coastal", "adventure", "winter", "northernlights", "nature"];

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onApply, onClear }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [animateClose, setAnimateClose] = useState(false);

    const [filters, setFilters] = useState<Filters>({
        tags: [],
        completedOnly: false,
        minCollaborators: 0,
        createdAfter: "",
        createdBefore: "",
    });

    const toggleTag = (tag: string) => {
        setFilters((prev) => ({
            ...prev,
            tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
        }));
    };

    const applyFilters = () => {
        onApply(filters);
        closeWithAnimation();
    };

    const clearFilters = () => {
        setFilters({
            tags: [],
            completedOnly: false,
            minCollaborators: 0,
            createdAfter: "",
            createdBefore: "",
        });
        onClear();
        setIsOpen(false); // no animation
    };

    const closeWithAnimation = () => {
        setAnimateClose(true);
        setTimeout(() => {
            setIsOpen(false);
            setAnimateClose(false);
        }, 300);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 flex gap-2 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200 font-semibold text-md text-gray-700 transition duration-300"
            >
                <FunnelPlus className="w-5 text-gray-700" /> Filter
            </button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={animateClose ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 p-6 overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Filters</h2>
                        <button onClick={closeWithAnimation}>
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    <div className="space-y-5">
                        {/* Tags */}
                        <div>
                            <p className="font-medium text-gray-800 mb-2">Tags</p>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-1 rounded-full text-sm border ${filters.tags.includes(tag) ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Completion */}
                        <div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={filters.completedOnly}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            completedOnly: e.target.checked,
                                        }))
                                    }
                                />
                                <span className="text-sm text-gray-700">Only show completed</span>
                            </label>
                        </div>

                        {/* Collaborators */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-800">Minimum collaborators</label>
                            <input
                                type="number"
                                min={0}
                                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                                value={filters.minCollaborators}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        minCollaborators: parseInt(e.target.value),
                                    }))
                                }
                            />
                        </div>

                        {/* Date Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">Created after</label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm mb-3"
                                value={filters.createdAfter}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        createdAfter: e.target.value,
                                    }))
                                }
                            />
                            <label className="block text-sm font-medium text-gray-800 mb-1">Created before</label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                                value={filters.createdBefore}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        createdBefore: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                        >
                            Clear
                        </button>
                        <button
                            onClick={applyFilters}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Apply Filters
                        </button>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default FilterSidebar;
