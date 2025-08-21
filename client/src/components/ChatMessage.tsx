import React from "react";

type ChatMessageProps = {
    role: "user" | "bot";
    text: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ role, text }) => {
    return (
        <div className={`my-2 flex ${role === "user" ? "justify-end" : "justify-start"}`}>
            <div
                className={`rounded-2xl px-4 py-2 max-w-xs shadow-md ${role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
                    }`}
            >
                {text}
            </div>
        </div>
    );
};

export default ChatMessage;
