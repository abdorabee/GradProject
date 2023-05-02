import "tailwindcss/tailwind.css";
import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleMessageSubmit = async () => {
    if (inputValue.trim() === "") {
      return;
    }

    const message = inputValue.trim();
    setInputValue("");
    setMessages((prevMessages) => [...prevMessages, message]);

    try {
      const response = await axios.post("/api/chatbot.ts", { message });
      const botResponse = response.data.response;
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg">
      <div className="overflow-y-auto max-h-60">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 ${index % 2 === 0 ? "bg-gray-200" : "bg-blue-200"}`}
          >
            {message}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 border rounded-l-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={handleMessageSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
