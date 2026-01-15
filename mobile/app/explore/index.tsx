"use client";
import { useState } from "react";
import axios from "axios";

export default function SearchBarang() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const res = await axios.get(`/api/barang?search=${query}`);
    setResults(res.data);
  };

  return (
    <main
      style={{
        padding: "32px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "16px", color: "#333", textAlign: "center" }}>
        Cari Barang
      </h2>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Masukkan nama barang..."
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Cari
        </button>
      </div>

      <div>
        {results.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center" }}>
            Tidak ada hasil ditemukan.
          </p>
        ) : (
          results.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "12px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3 style={{ margin: "0 0 8px", color: "#222" }}>{item.nama}</h3>
              <p style={{ margin: 0, color: "#555" }}>Rp {item.harga}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
