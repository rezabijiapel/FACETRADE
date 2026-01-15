"use client";
import { useState } from "react";
import axios from "axios";

const kategoriList = ["Semua", "Elektronik", "Pakaian", "Makanan", "Buku"];

export default function SearchBarang() {
  const [query, setQuery] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [results, setResults] = useState<any[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const res = await axios.get(`/api/barang?search=${query}&kategori=${kategori}`);
    setResults(res.data);

    setHistory((prev) => {
      const updated = [query, ...prev.filter((item) => item !== query)];
      return updated.slice(0, 5); // simpan 5 pencarian terakhir
    });
  };

  return (
    <main
      style={{
        padding: "32px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#d6eaf8",
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2
          style={{
            marginBottom: "24px",
            color: "#0099ff",
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
            marginBottom: "16px",
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Masukkan nama barang..."
            style={{
              width: "60%",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "#fff",
            }}
          />
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "#fff",
            }}
          >
            {kategoriList.map((kat) => (
              <option key={kat} value={kat}>
                {kat}
              </option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            style={{
              padding: "12px 20px",
              backgroundColor: "#0099ff",
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

        {history.length > 0 && (
          <div style={{ marginBottom: "24px", textAlign: "center", color: "#555" }}>
            <p style={{ marginBottom: "8px" }}>Riwayat Pencarian:</p>
            {history.map((item, idx) => (
              <span key={idx} style={{ marginRight: "12px" }}>
                {item}
              </span>
            ))}
          </div>
        )}

        <div>
          {results.length === 0 ? (
            <p style={{ color: "#666", textAlign: "center" }}>
              Barang Tidak Ada... {query && `Mungkin maksud Anda: "${query}"`}
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
                <h3 style={{ margin: "0 0 8px", color: "#222" }}>{item.nama}</h3>
                <p style={{ margin: 0, color: "#555" }}>Rp {item.harga}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
