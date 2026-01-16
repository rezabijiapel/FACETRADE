import React from "react";
import Image from "next/image";
import BarangCard from "@/src/komponen/BarangCard";
import EmptyState from "@/src/komponen/EmptyState";

const BarterPage = () => {
  // Data dummy (gabungan dari kode pertama & kedua)
  const items = [
    {
      id: 1,
      nama: "Keyboard Mekanik RGB",
      kondisi: "Bekas (90%)",
      cari: "Mouse Wireless",
      image: "/keyboard.jpg",
    },
    {
      id: 2,
      nama: "Buku Pemrograman React",
      kondisi: "Mulus",
      cari: "Buku UI/UX",
      image: "/react-book.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-white px-6 py-10">
      {/* Header */}
      <section className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          🔄 Barter Mudah
        </h1>
        <p className="text-neutral-400 mt-2">
          Tukarkan barangmu dengan barang impian tanpa uang tunai.
        </p>
      </section>

      {/* Grid / Empty */}
      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <section className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <BarangCard key={item.id} item={item} />
          ))}
        </section>
      )}
    </main>
  );
};

export default BarterPage;
