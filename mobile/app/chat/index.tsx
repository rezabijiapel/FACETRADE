"use client";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <main
      style={{
        padding: 24,
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#00A8E8" }}>
        Chat dengan Penjual
      </h2>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          backgroundColor: "#fff",
          height: 300,
          overflowY: "auto",
          padding: 12,
          marginBottom: 16,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#00A8E8",
              color: "#fff",
              padding: "10px 14px",
              borderRadius: 16,
              marginBottom: 8,
              maxWidth: "80%",
              alignSelf: "flex-end",
            }}
          >
            {msg}
          </div>
        ))}
        {messages.length === 0 && (
          <p style={{ color: "#9ca3af", textAlign: "center", marginTop: 100 }}>
            Belum ada pesan. Mulai percakapan!
          </p>
        )}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pesan..."
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "12px 20px",
            backgroundColor: "#00A8E8",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Kirim
        </button>
      </div>
    </main>
  );
}