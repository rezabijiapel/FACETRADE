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
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#d6eaf8", // warna biru muda
        minHeight: "100vh", // tinggi penuh layar
        width: "100%", // lebar penuh layar
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            marginBottom: "24px",
            color: "#333",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Facetrade
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Masukkan nama barang..."
            style={{
              width: "75%",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "#fff",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "12px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
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
                  marginBottom: "16px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h3 style={{ margin: "0 0 8px", color: "#222" }}>
                  {item.nama}
                </h3>
                <p style={{ margin: 0, color: "#555" }}>Rp {item.harga}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
