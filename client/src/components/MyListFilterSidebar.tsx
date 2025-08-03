import { useState } from "react";
import { motion } from "framer-motion";
import { FunnelPlus, X } from "lucide-react";

export type Filters = {
    tags: string[];
    completedOnly: boolean;
    minCollaborators: number;
    createdAfter: string;
    createdBefore: string;
};

type Props = {
    onApply: (filters: Filters) => void;
    onClear: () => void;
};

const allTags = [
    "culture", "history", "food", "roadtrip",
    "coastal", "adventure", "winter", "northernlights", "nature"
];

const MyListsFilterSidebar = ({ onApply, onClear }: Props) => {
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
            tags: prev.tags.includes(tag)
                ? prev.tags.filter((t) => t !== tag)
                : [...prev.tags, tag],
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
        closeWithAnimation();
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
                className="px-4 flex items-center gap-2 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition font-medium text-gray-800"
            >
                <FunnelPlus className="w-5 h-5" />
                Filter
            </button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={animateClose ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 p-6 overflow-y-auto rounded-l-xl border-l border-gray-200"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                        <button
                            onClick={closeWithAnimation}
                            className="hover:bg-gray-100 p-1.5 rounded-full transition"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Tags */}
                        <div>
                            <p className="font-medium text-gray-700 mb-2">Tags</p>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-1.5 rounded-full text-sm border transition ${filters.tags.includes(tag)
                                            ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                                            : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                                            }`}
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Completion */}
                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.completedOnly}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            completedOnly: e.target.checked,
                                        }))
                                    }
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                />
                                <span className="text-sm text-gray-700">Only show completed</span>
                            </label>
                        </div>

                        {/* Collaborators (Placeholder) */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Minimum collaborators
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={filters.minCollaborators}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        minCollaborators: parseInt(e.target.value),
                                    }))
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>

                        {/* Date range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Created after
                            </label>
                            <input
                                type="date"
                                value={filters.createdAfter}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        createdAfter: e.target.value,
                                    }))
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4"
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Created before
                            </label>
                            <input
                                type="date"
                                value={filters.createdBefore}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        createdBefore: e.target.value,
                                    }))
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex justify-between">
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                        >
                            Clear
                        </button>
                        <button
                            onClick={applyFilters}
                            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Apply Filters
                        </button>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default MyListsFilterSidebar;
