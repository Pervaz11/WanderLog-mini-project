import React, { useState } from "react";

type Props = { onSend: (msg: string) => void };

const ChatInput: React.FC<Props> = ({ onSend }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        onSend(value);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 p-2 border-t">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Sualını yaz..."
                className="flex-1 rounded-lg border px-3 py-2 outline-none"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Göndər
            </button>
        </form>
    );
};

export default ChatInput;
