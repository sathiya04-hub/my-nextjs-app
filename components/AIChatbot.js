"use client";

import { useState } from "react";

export default function AIChatbot() {

  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };

    setChat((prev) => [...prev, userMsg]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    let data;

    try {
      data = await res.json();
    } catch {
      data = { reply: "Server error" };
    }

    const botMsg = {
      sender: "bot",
      text: data.reply
    };

    setChat((prev) => [...prev, botMsg]);

    setInput("");
  };

  return (
    <div>

      <div style={{height:300,overflowY:"auto"}}>

        {chat.map((msg,i)=>(
          <p key={i}>
            <b>{msg.sender}:</b> {msg.text}
          </p>
        ))}

      </div>

      <input
        value={input}
        onChange={(e)=>setInput(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

    </div>
  );
}