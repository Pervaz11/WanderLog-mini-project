// Footer.tsx
import React, { useState } from "react";
import { Facebook, Instagram, Twitter, Mail, Globe, SendHorizonal } from "lucide-react";
import { useNotifications } from "../components/NotificationContext";

const travelTags = ["Adventure", "Culture", "Food", "Nature", "Winter", "Road Trips", "Beach", "Northern Lights", "Cities"];

const Footer: React.FC = () => {
    const [email, setEmail] = useState("");
    const { addNotification } = useNotifications();

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        addNotification("✅ Subscribe", "Thanks for subscribing!");
        setEmail("");
    };

    return (
        <footer className="bg-gray-100 border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-10 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-sm text-gray-700">
                {/* Logo + Description */}
                <div className="col-span-1">
                    <div className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-4">
                        <Globe className="w-6 h-6 text-blue-600" />
                        WanderLog
                    </div>
                    <p className="text-gray-600 mb-6">Plan, explore, and relive your journeys — all in one place.</p>
                    <div className="flex gap-4">
                        <a href="#"><Facebook className="w-5 h-5" /></a>
                        <a href="#"><Instagram className="w-5 h-5" /></a>
                        <a href="#"><Twitter className="w-5 h-5" /></a>
                        <a href="#"><Mail className="w-5 h-5" /></a>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="col-span-1">
                    <h4 className="text-gray-900 font-medium mb-3">Stay in the loop</h4>
                    <p className="text-gray-600 mb-4">Get travel inspiration & updates straight to your inbox.</p>
                    <form onSubmit={handleSubscribe} className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm">
                        <input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 px-3 py-2 text-sm outline-none"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-3 transition">
                            <SendHorizonal className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                {/* Useful Links */}
                <div>
                    <h4 className="text-gray-900 font-medium mb-3">Explore</h4>
                    <ul className="space-y-2">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Destinations</a></li>
                        <li><a href="#">Collaborators</a></li>
                        <li><a href="#">Create Trip</a></li>
                    </ul>
                </div>

                {/* Travel Tags */}
                <div>
                    <h4 className="text-gray-900 font-medium mb-3">Travel Themes</h4>
                    <div className="flex flex-wrap gap-2">
                        {travelTags.map((tag) => (
                            <span key={tag} className="px-3 py-1.5 bg-gray-200 text-gray-800 text-xs rounded-full hover:bg-blue-100 cursor-pointer transition">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center text-xs text-gray-500 py-5 border-t border-gray-200">
                © {new Date().getFullYear()} WanderLog. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
