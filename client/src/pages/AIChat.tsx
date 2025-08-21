import { useState } from "react";
import axios from "axios";

const AIChat = () => {
    const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages([...messages, { role: "user", text: input }]);

        const res = await axios.post("http://localhost:3000ChatWidget.tsx/api/chat", { message: input });
        setMessages((prev) => [...prev, { role: "bot", text: res.data.reply }]);

        setInput("");
    };

    return (
        <div className="flex flex-col h-screen max-w-2xl mx-auto border rounded-lg shadow-lg">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`p-2 rounded-lg max-w-xs ${m.role === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black"}`}
                    >
                        {m.text}
                    </div>
                ))}
            </div>
            <div className="p-2 flex gap-2 border-t">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Mesaj yaz..."
                    className="flex-1 border rounded-lg px-3 py-2"
                />
                <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Göndər
                </button>
            </div>
        </div>
    );
};

export default AIChat;
