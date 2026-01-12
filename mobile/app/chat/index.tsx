"use client";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>Chat dengan Penjual</h2>
      <div style={{ border: "1px solid #ddd", height: 300, overflowY: "auto", marginBottom: 12 }}>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tulis pesan..."
      />
      <button onClick={sendMessage}>Kirim</button>
    </main>
  );
}