import { Edit3, Mail, MapPin, Calendar, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProfilePage() {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("John Doe");
    const [username, setUsername] = useState("@john_doe");
    const [email, setEmail] = useState("john@example.com");
    const [location, setLocation] = useState("New York, USA");
    const [bio, setBio] = useState(
        "Passionate developer with a love for creating beautiful and functional web applications."
    );

    return (
        <div className="min-h-screen flex justify-center py-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl w-full max-w-5xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {/* Left Column - Profile Photo & Stats */}
                <div className="flex flex-col items-center">
                    <div className="relative group">
                        <motion.img
                            whileHover={{ scale: 1.02 }}
                            src="https://i.pravatar.cc/150?img=32"
                            alt="Profile"
                            className="w-40 h-40 rounded-full border-4 border-white shadow-md object-cover"
                        />
                        <motion.button
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow transition"
                        >
                            <Camera size={18} />
                        </motion.button>
                    </div>
                    <h2 className="text-2xl font-bold mt-4">{name}</h2>
                    <p className="text-gray-500">{username}</p>

                    {/* Stats */}
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center w-full">
                        {[
                            { label: "Posts", value: 120 },
                            { label: "Followers", value: "4.8k" },
                            { label: "Following", value: 530 },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                                className="bg-gray-50 rounded-xl p-3 shadow-sm hover:bg-white transition cursor-pointer"
                            >
                                <p className="text-lg font-semibold">{stat.value}</p>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Info */}
                <div className="md:col-span-2 space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-4">
                        <h3 className="text-xl font-semibold">Profile Information</h3>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setEditing(!editing)}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white px-4 py-2 rounded-full shadow-lg"
                        >
                            <Edit3 size={18} /> {editing ? "Save" : "Edit"}
                        </motion.button>
                    </div>

                    {/* Info Fields */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-700">
                            <Mail size={18} className="text-blue-600" />
                            {editing ? (
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border rounded px-3 py-1 w-full"
                                />
                            ) : (
                                <span>{email}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <MapPin size={18} className="text-blue-600" />
                            {editing ? (
                                <input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="border rounded px-3 py-1 w-full"
                                />
                            ) : (
                                <span>{location}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <Calendar size={18} className="text-blue-600" /> Joined: Jan 2024
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <h3 className="font-semibold text-lg mb-2">About Me</h3>
                        {editing ? (
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="border rounded px-3 py-2 w-full"
                                rows={4}
                            />
                        ) : (
                            <p className="text-gray-600 leading-relaxed">{bio}</p>
                        )}
                    </div>

                    {/* Password Change */}
                    {editing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="font-semibold text-lg mb-2">Change Password</h3>
                            <input
                                type="password"
                                placeholder="Current Password"
                                className="border rounded px-3 py-2 w-full mb-2"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                className="border rounded px-3 py-2 w-full mb-2"
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                className="border rounded px-3 py-2 w-full"
                            />
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
