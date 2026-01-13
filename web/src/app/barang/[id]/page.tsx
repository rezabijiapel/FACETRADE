"use client";

import { useState } from "react";
import BarterModal from "@/src/komponen/BarterModal";

export default function DetailBarangPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Detail Barang</h1>

      <button
        onClick={() => setOpen(true)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Ajukan Tukar
      </button>

      <BarterModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}