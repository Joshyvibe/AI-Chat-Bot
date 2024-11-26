import React, { useState, useRef, useEffect } from "react";
import { chatAI } from "../api";
import "../styles/ChatAI.css";

const ChatAI = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to the bottom whenever chatHistory changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setChatHistory((prev) => [...prev, userMessage]);

    setMessage(""); // Clear input
    setIsTyping(true); // Show typing indicator

    try {
      const data = { message }; // Format API data
      const response = await chatAI(data);
      const aiMessage = { role: "ai", content: response.response };

      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { role: "ai", content: "Error: Unable to process your message." },
      ]);
    } finally {
      setIsTyping(false); // Hide typing indicator
    }
  };

  return (
    <div className={`chat-container ${darkMode ? "dark" : "light"}`}>
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
      <div className="chat-box">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`chat-bubble ${chat.role === "ai" ? "ai" : "user"}`}
          >
            {chat.content}
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        {/* Reference for auto-scrolling */}
        <div ref={chatEndRef}></div>
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className="send-button" onClick={handleSendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatAI;
