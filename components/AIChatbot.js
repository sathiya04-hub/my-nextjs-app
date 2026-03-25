"use client";

import { useState, useEffect, useRef } from "react";

export default function AIChatbot() {

  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const message = input; // ✅ store before clearing
    const userMsg = { sender: "user", text: message };

    setChat((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true); // ✅ start loading

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      const botMsg = {
        sender: "bot",
        text: data.reply || "No response",
      };

      setChat((prev) => [...prev, botMsg]);

    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to server" },
      ]);
    } finally {
      setLoading(false); // ✅ stop loading (VERY IMPORTANT)
    }
  };

  return (
    <div className="box shadow mt-3"> 
      <div className="card-header p-3 bg-primary text-white">
        Open AI API
      </div>
      <div className="box shadow p-4 mt-3"> 
        <div style={{height:300,overflowY:"auto"}} className="form-control mb-3">
          {chat.map((msg,i)=>(
            <p key={i}>
              <b>{msg.sender}:</b> {msg.text}
            </p>
          ))}
          {loading && <p>Bot is typing...</p>}
          <div ref={chatEndRef} />

        </div>

        <input
          value={input} className="form-control mb-3"
          onChange={(e)=>setInput(e.target.value)}
        />

        <button 
          className="btn btn-primary" 
          onClick={sendMessage}
          disabled={!input.trim()}
        >
          Send
        </button>

      </div>
    </div>
  );
}