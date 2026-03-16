"use client";

import { useState, useRef, useEffect } from "react";

export default function Chatbot() {

  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {

    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setChat((prev) => [...prev, userMsg]);

    setInput("");
    setIsTyping(true);

    setTimeout(() => {

      const reply = getBotReply(input);

      setChat((prev) => [
        ...prev,
        { sender: "bot", text: reply }
      ]);

      setIsTyping(false);

    }, 1000);
  };

  const getBotReply = (msg) => {

    msg = msg.toLowerCase();

    if (msg.includes("hello")) return "Hello 👋 How can I help?";
    if (msg.includes("price")) return "Please visit our pricing page.";
    if (msg.includes("contact")) return "You can contact us at support@email.com";

    return "Sorry, I didn't understand.";
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="btn btn-primary rounded-circle"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          fontSize: "24px"
        }}
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="card shadow"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "350px"
          }}
        >
          <div className="card-header bg-primary text-white">
            AI Assistant
          </div>

          <div
            className="card-body overflow-auto"
            style={{ height: "300px" }}
          >
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`d-flex mb-2 ${
                  msg.sender === "user"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded ${
                    msg.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-secondary text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && <div>AI typing...</div>}

            <div ref={chatEndRef}></div>
          </div>

          <div className="card-footer d-flex">

            <input
              className="form-control me-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              className="btn btn-primary"
              onClick={sendMessage}
            >
              Send
            </button>

          </div>
        </div>
      )}
    </>
  );
}