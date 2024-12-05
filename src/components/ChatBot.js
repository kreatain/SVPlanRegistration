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

  const formatResponse = (response, action) => {
    if (action === "generate") {
      return (
        <pre className="formatted-sql">
          {response.sql_query}
        </pre>
      );
    } else if (action === "execute") {
      if (response.result?.message) {
        // Directly display the message if it exists
        return <div className="formatted-result">{response.result.message}</div>;
      } else if (Array.isArray(response.result) && response.result.length === 0) {
        // Handle empty result array
        return <div className="formatted-result">No data available.</div>;
      }else if (Array.isArray(response.result)) {
        // Transpose the table
        const keys = Object.keys(response.result[0]);
        const values = response.result.map((row) => Object.values(row));
  
        return (
          <div className="formatted-table">
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  {response.result.map((_, index) => (
                    <th key={index}>Data {index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keys.map((key, rowIndex) => (
                  <tr key={rowIndex}>
                    <td><strong>{key}</strong></td>
                    {values.map((row, colIndex) => (
                      <td key={colIndex}>{row[rowIndex]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }
    return "Unexpected response format.";
  };
  const handleSend = (action) => {
    if (input.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);

    const apiCall = action === "generate" ? generateSQL : executeSQL;
    const payload = input; // Send input to the API

    apiCall(payload)
      .then((response) => {
        const botResponse = formatResponse(response.data, action); // Format the response
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", content: botResponse },
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
                  <span>
                    {msg.sender === "bot" && msg.content ? msg.content : msg.text}
                  </span>
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