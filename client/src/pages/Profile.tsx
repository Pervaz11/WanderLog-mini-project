import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const ProfilePage: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setProfileImage(parsedUser.profileImage || null);
        }
    }, []);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview
        setProfileImage(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            const res = await fetch("http://localhost:5000/api/user/upload", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await res.json();
            if (res.ok && data.user) {
                const newImageUrl = `http://localhost:5000${data.user.profileImage}`;
                setProfileImage(newImageUrl);

                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    parsedUser.profileImage = newImageUrl;
                    localStorage.setItem("user", JSON.stringify(parsedUser));
                }

                window.dispatchEvent(new Event("storage"));
            }
        } catch (err) {
            console.error("Image upload error:", err);
        }
    };

    if (!user) return <p className="text-center mt-10">Loading profile...</p>;

    return (
        <section className="relative flex p-10 justify-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl p-8 w-full max-w-lg"
            >
                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative group">
                        <img
                            src={profileImage || "/default-avatar.png"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md transition-transform duration-300 group-hover:scale-105"
                        />
                        <label
                            htmlFor="profile-upload"
                            className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-700 transition"
                        >
                            <Camera size={18} />
                        </label>
                        <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.fullName}</h2>
                    <p className="text-gray-500">@{user.username}</p>
                </div>

                {/* User Info */}
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition flex justify-between">
                        <span className="font-medium text-gray-600">Email</span>
                        <span className="text-gray-800">{user.email}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition flex justify-between">
                        <span className="font-medium text-gray-600">Created At</span>
                        <span className="text-gray-800">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    {user.lastLogin && (
                        <div className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition flex justify-between">
                            <span className="font-medium text-gray-600">Last Login</span>
                            <span className="text-gray-800">
                                {new Date(user.lastLogin).toLocaleString()}
                            </span>
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    );
};

export default ProfilePage;
