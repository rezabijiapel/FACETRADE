"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { api_barang } from "../lib/string";

interface Barang {
  id: number;
  nama: string;
  kategori: string;
  kondisi: string;
  harga: number;
  foto?: string;
}

export default function HomePage() {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(api_barang)
      .then((res) => setBarang(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredBarang = barang.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <main style={container}>
      {/* HEADER */}
      <header style={header}>
        <div style={logoWrap}>
          <Image
            src="/logo/logo.png"
            alt="FACETRADE Logo"
            width={40}
            height={40}
          />
          <span style={brand}>FACETRADE</span>
        </div>
      </header>

      <p style={subtitle}>
        Marketplace Jual Beli Barang • {barang.length} item
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Cari barang..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchBox}
      />

      {/* Grid */}
      {filteredBarang.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          Barang tidak ditemukan
        </p>
      ) : (
        <div style={grid}>
          {filteredBarang.map((item) => (
            <div
              key={item.id}
              style={card}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-6px)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)")
              }
            >
              {item.foto ? (
                <Image
                  src={item.foto}
                  alt={item.nama}
                  width={400}
                  height={220}
                  style={image}
                />
              ) : (
                <div style={noImage}>Tidak ada foto</div>
              )}

              <div style={{ padding: 12 }}>
                <h3 style={nama}>{item.nama}</h3>
                <p style={meta}>
                  {item.kategori} • {item.kondisi}
                </p>
                <p style={harga}>
                  Rp {item.harga.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Button */}
      <Link href="/barang/add" style={fab}>
        +
      </Link>
    </main>
  );
}

/* ===== STYLE ===== */

const container = {
  padding: 24,
  maxWidth: 1200,
  margin: "0 auto",
};

const header = {
  display: "flex",
  alignItems: "center",
  marginBottom: 16,
};

const logoWrap = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const brand = {
  fontSize: 22,
  fontWeight: 700,
};

const subtitle = {
  textAlign: "center" as const,
  color: "#6b7280",
  marginBottom: 16,
};

const searchBox = {
  width: "100%",
  maxWidth: 400,
  margin: "0 auto 32px",
  display: "block",
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  outline: "none",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: 24,
};

const card = {
  background: "#fff",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
  transition: "transform 0.2s",
  cursor: "pointer",
};

const image = {
  objectFit: "cover" as const,
  width: "100%",
  height: "220px",
};

const noImage = {
  height: 220,
  background: "#e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#6b7280",
};

const nama = {
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 4,
};

const meta = {
  fontSize: 14,
  color: "#6b7280",
  marginBottom: 8,
};

const harga = {
  fontSize: 16,
  fontWeight: 700,
  color: "#00A8E8",
};

const fab = {
  position: "fixed" as const,
  bottom: 30,
  right: 30,
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: "#00A8E8",
  color: "#fff",
  fontSize: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
};
