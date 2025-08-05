import { useState } from "react";
import {
    Lock,
    Globe,
    UploadCloud,
    Plus,
    ArrowLeft,
    Users,
    X,
} from "lucide-react";

const CreateListForm = () => {
    const [isPrivate, setIsPrivate] = useState(true);
    const [tagInput, setTagInput] = useState("");

    const [tags, setTags] = useState<string[]>([]);

    const handleAddTag = () => {
        const newTag = tagInput.trim();
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </button>

            <h1 className="text-3xl font-bold text-gray-800 mb-1">Create New Travel List</h1>
            <p className="text-gray-500 mb-8">Start planning your next adventure</p>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-300 px-6 py-8 space-y-6">
                {/* Cover Upload */}
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Cover Image</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl py-10 px-6 text-center bg-gray-50 hover:bg-gray-100 transition">
                        <UploadCloud className="mx-auto text-blue-500 mb-3 w-8 h-8" />
                        <p className="text-gray-600 font-medium">Upload a cover image</p>
                        <p className="text-sm text-gray-400 mb-3">PNG, JPG up to 10MB</p>
                        <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition">
                            Choose File
                        </button>
                    </div>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        List Title *
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. European Adventure 2024"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        rows={3}
                        placeholder="Describe your travel plans and what makes this trip special..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                </div>

                {/* Tags */}
                {/* Tags Section */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Tags
                    </label>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="flex items-center bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full shadow-sm"
                            >
                                <span className="mr-2">#{tag}</span>
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    className="hover:text-red-500 transition"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        ))}
                    </div>

                    {/* Input and Add button */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="Add a tag (e.g. adventure, culture, food)"
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-1 text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Add
                        </button>
                    </div>
                </div>

                {/* ... Privacy, Collaborators, Buttons ... */}

                {/* Privacy */}
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Privacy Settings</h3>
                    <div
                        onClick={() => setIsPrivate(!isPrivate)}
                        className="flex items-start gap-4 p-4 border border-gray-300 rounded-lg cursor-pointer transition hover:bg-gray-50"
                    >
                        <div className="mt-1">
                            {isPrivate ? (
                                <Lock className="text-gray-600 w-5 h-5" />
                            ) : (
                                <Globe className="text-green-600 w-5 h-5" />
                            )}
                        </div>
                        <div>
                            <p className="font-medium text-sm text-gray-800">
                                {isPrivate ? "Private List" : "Public List"}
                            </p>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {isPrivate
                                    ? "Only you and invited collaborators can view this list"
                                    : "Anyone can view this list and your public journal entries"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Collaborators */}
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Invite Collaborators</h3>
                    <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        Add friends to help plan and contribute to this list
                    </p>
                    <input
                        type="text"
                        placeholder="Enter email addresses (comma separated)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                        You can invite more people after creating the list
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium">
                        Cancel
                    </button>
                    <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 shadow-md transition">
                        Create List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateListForm;
