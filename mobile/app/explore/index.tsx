"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBarang() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const res = await axios.get(`/api/barang?search=${query}`);
    setResults(res.data);
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>Cari Barang</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari barang..."
      />
      <button onClick={handleSearch}>Cari</button>

      <div>
        {results.map((item) => (
          <div key={item.id}>
            <h3>{item.nama}</h3>
            <p>Rp {item.harga}</p>
          </div>
        ))}
      </div>
    </main>
  );
}