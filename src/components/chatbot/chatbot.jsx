import React, { useState } from "react";
import axios from "axios";
const Chatbot = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_API_KEY}`,
                {
                    contents: [
                        {
                            parts: [{ text: input }]
                        }
                    ]
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            const rawContent = response.data.candidates[0].content.parts
                .map(part => {
                    return part.text
                        .split('\n')  // Split at each newline character
                        .map(segment => {
                            // Replace *...* with <b>...</b> and ```...``` with <pre>...</pre>
                            return segment.trim()
                                .replace(/```(.*?)```/gs, '<pre>$1</pre>')  // For code blocks
                                .replace(/\*(.*?)\*/g, '<b>$1</b>');       // For bold text
                        })
                        .join('\n');  // Join the segments back with newline characters
                })
                .join(' ');  // Join all parts with spaces

            // Simulate word-by-word typing effect
            const words = rawContent.split(' ');
            let index = 0;

            // Initialize with an empty message
            const initialMessage = { role: "model", content: '' };
            setMessages([...newMessages, initialMessage]);

            const typingInterval = setInterval(() => {
                if (index < words.length) {
                    setMessages(prevMessages => {
                        const lastMessage = prevMessages[prevMessages.length - 1];
                        return [
                            ...prevMessages.slice(0, -1),
                            { ...lastMessage, content: lastMessage.content + ' ' + words[index] }
                        ];
                    });
                    index++;
                } else {
                    clearInterval(typingInterval);  // Stop when all words have been displayed
                }
            }, 100);  // Adjust delay as needed (e.g., 100 ms per word)

        } catch (error) {
            console.error("Error fetching data from Gemini API:", error);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="relative w-5/6 flex flex-col justify-center p-6 bg-white bg-opacity-90 rounded-lg shadow-md min-h-[90vh] max-h-[110vh]">
                <div className="bg-red-600 flex justify-center font-bold text-2xl">Welcome to the chatbot</div>
                <div className="flex-1 overflow-y-auto mb-4">
                    <div className="messages space-y-2">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg ${msg.role === "user"
                                    ? "bg-blue-300 text-left"
                                    : "bg-green-300 text-left"
                                    }`}
                                // Use dangerouslySetInnerHTML to render HTML content
                                dangerouslySetInnerHTML={{ __html: msg.content }}
                            />
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="relative flex mt-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-l-lg"
                    />
                    <button
                        type="submit"
                        className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
