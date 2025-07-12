import React, { useState } from "react";
import "./ChatBot.css";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m MediBot. How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSend = () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: userInput }]);
    setUserInput("");

    //  Fake bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, I'm just a demo for now 😊" },
      ]);
    }, 800);
  };

  return (
    <>
      <div className={`chatbot-box ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <span>MediBot 🤖</span>
          <button onClick={() => setIsOpen(false)}>✖</button>
        </div>

        <div className="chatbot-body">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.from}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>

      
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </>
  );
}
