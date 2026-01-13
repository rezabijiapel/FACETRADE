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

      {/* ================= HEADER (PALING ATAS) ================= */}
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

      {/* ================= FITUR ================= */}
      <section style={fiturGrid}>
        <div style={fiturCard}>🔁 Barter Mudah</div>
        <div style={fiturCard}>📦 Barang Layak Pakai</div>
        <div style={fiturCard}>🤝 Transparan</div>
      </section>

      {/* ================= PREVIEW BARANG ================= */}
      <section style={{ marginBottom: 48 }}>
        <div style={previewHeader}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Barang Terbaru</h2>
          <Link href="/barang" style={{ color: "#2563eb", fontSize: 14 }}>
            Lihat Semua →
          </Link>
        </div>

        <div style={previewGrid}>
          {barang.slice(0, 4).map((item) => (
            <div key={item.id} style={previewCard}>
              {item.foto ? (
                <Image
                  src={item.foto}
                  alt={item.nama}
                  width={300}
                  height={160}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
              ) : (
                <div style={noImage}>Tidak ada foto</div>
              )}
              <p style={{ fontWeight: 600, marginTop: 8 }}>{item.nama}</p>
              <p style={{ fontSize: 12, color: "#6b7280" }}>
                {item.kondisi}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SEARCH ================= */}
      <p style={subtitle}>
        Marketplace Jual Beli Barang • {barang.length} item
      </p>

      <input
        type="text"
        placeholder="Cari barang..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchBox}
      />

      {/* ================= GRID BARANG ================= */}
      {filteredBarang.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          Barang tidak ditemukan
        </p>
      ) : (
        <div style={grid}>
          {filteredBarang.map((item) => (
            <div key={item.id} style={card}>
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

      {/* ================= CTA ================= */}
      <section style={cta}>
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>
          Siap Menukar Barang?
        </h2>
        <Link href="/barang/add">
          <button style={ctaBtn}>Mulai Barter</button>
        </Link>
      </section>

      {/* ================= FLOATING BUTTON ================= */}
      <Link href="/barang/add" style={fab}>
        +
      </Link>

    </main>
  );
}

/* ===== STYLE TAMBAHAN ===== */

const hero = {
  textAlign: "center" as const,
  marginBottom: 48,
};

const heroTitle = {
  fontSize: 40,
  fontWeight: 800,
};

const heroDesc = {
  maxWidth: 600,
  margin: "12px auto",
  color: "#6b7280",
};

const fiturGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: 16,
  marginBottom: 48,
};

const fiturCard = {
  border: "1px solid #e5e7eb",
  padding: 20,
  borderRadius: 12,
  textAlign: "center" as const,
};

const previewHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

const previewGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
  gap: 16,
};

const previewCard = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 10,
};

const cta = {
  marginTop: 64,
  padding: 40,
  background: "#f3f4f6",
  textAlign: "center" as const,
  borderRadius: 16,
};

const ctaBtn = {
  marginTop: 16,
  padding: "12px 24px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
};

/* ===== STYLE ASLI ===== */

const container = {
  padding: 24,
  maxWidth: 1200,
  margin: "0 auto",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "16px 24px",
  background: "#f3f4f6",
  borderRadius: 12,
  marginBottom: 32,
};

const logoWrap = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const brand = {
  fontSize: 24,
  fontWeight: 700,
  color: "#1E3A8A",
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
};

const image = {
  objectFit: "cover" as const,
  width: "100%",
  height: "220px",
};

const noImage = {
  height: 160,
  background: "#e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const nama = {
  fontSize: 18,
  fontWeight: 600,
};

const meta = {
  fontSize: 14,
  color: "#6b7280",
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
};