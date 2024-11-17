import React, { useState } from "react";
import "../styles/ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    setMessages([...messages, { sender: "user", text: input }]);

    // Mock bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
      ]);
    }, 1000);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Mock bot response
  const getBotResponse = (userInput) => {
    // Hard-coded responses
    const input = userInput.toLowerCase();
    if (input.includes("hello") || input.includes("hi")) {
      return "Hi there! How can I help you with your registration?";
    } else if (input.includes("event")) {
      return "You can view all upcoming events on the Events page.";
    } else if (input.includes("task")) {
      return "To manage your tasks, navigate to the Tasks section.";
    } else {
      return "I'm sorry, I didn't understand that. Could you please rephrase?";
    }
  };

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h4>ChatBot</h4>
            <button className="close-button" onClick={toggleChatBot}>
              &times;
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${
                  msg.sender === "bot" ? "bot" : "user"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      <button className="chatbot-toggle-button" onClick={toggleChatBot}>
        {isOpen ? "Close Chat" : "Open Chat"}
      </button>
    </>
  );
};

export default ChatBot;
