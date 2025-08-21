import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
        { role: "bot", text: "Salam 👋 Mən sənə necə kömək edə bilərəm?" }
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMsg = { role: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        try {
            // Backend endpoint
            const res = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });
            const data = await res.json();

            setMessages((prev) => [...prev, { role: "bot", text: data.reply || "Xəta baş verdi ❌" }]);
        } catch (err) {
            setMessages((prev) => [...prev, { role: "bot", text: "Xəta baş verdi ❌" }]);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white shadow-lg"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>

            {/* Chat Box */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="absolute bottom-16 right-0 w-80 rounded-2xl bg-white shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 text-white font-semibold">
                            🤖 AI Chat Assistant
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-80">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`p-2 rounded-lg max-w-[75%] ${msg.role === "user"
                                            ? "bg-indigo-500 text-white ml-auto"
                                            : "bg-gray-200 text-gray-900"
                                        }`}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Mesaj yaz..."
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg"
                            >
                                Göndər
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
