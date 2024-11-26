import React, { useState } from "react";
import Draggable from "react-draggable";
import { generateSQL, executeSQL } from "../apiService";
import "../styles/ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = (action) => {
    if (input.trim() === "") return;

    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);

    // Determine the API to call based on the action
    const apiCall = action === "generate" ? generateSQL : executeSQL;

    // Call the API
    apiCall({ user_input: input })
      .then((response) => {
        const botResponse =
          action === "generate"
            ? response.data.sql_query // For generateSQL, use the SQL query
            : JSON.stringify(response.data.result, null, 2); // For executeSQL, display the result

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: botResponse },
        ]);
      })
      .catch((error) => {
        console.error("API Error:", error);
        const errorMessage =
          error.response?.data?.error ||
          "Sorry, something went wrong. Please try again.";
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: errorMessage },
        ]);
      });

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend("generate");
    }
  };

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <Draggable handle=".chatbot-header">
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
                  <span>{msg.text}</span>
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
              <button onClick={() => handleSend("generate")}>Generate</button>
              <button onClick={() => handleSend("execute")}>Execute</button>
            </div>
          </div>
        </Draggable>
      )}
      <button className="chatbot-toggle-button" onClick={toggleChatBot}>
        {isOpen ? "Close Chat" : "Open Chat"}
      </button>
    </>
  );
};

export default ChatBot;