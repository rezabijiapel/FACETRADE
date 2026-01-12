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

  useEffect(() => {
    axios
      .get(api_barang)
      .then((res) => setBarang(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main style={{ padding: 24 }}>
      <h1>FaceTrade</h1>

      <div style={{ display: "grid", gap: 20 }}>
        {barang.map((item) => (
          <div key={item.id} style={cardStyle}>
            {item.foto ? (
              <Image
                src={item.foto}
                alt={item.nama}
                width={400}
                height={200}
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            ) : (
              <div style={noImage}>Tidak ada foto</div>
            )}

            <h3>{item.nama}</h3>
            <p>
              {item.kategori} • {item.kondisi}
            </p>
            <strong>Rp {item.harga.toLocaleString("id-ID")}</strong>
          </div>
        ))}
      </div>

      {/* Floating Button */}
      <Link href="/barang/add" style={fab}>
        +
      </Link>
    </main>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: 12,
  padding: 12,
  background: "#fff",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

const noImage = {
  height: 200,
  background: "#e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
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
  fontSize: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
};