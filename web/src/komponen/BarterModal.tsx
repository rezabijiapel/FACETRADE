"use client";

export default function BarterModal({ open, onClose }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="font-bold mb-3">Ajukan Tukar</h2>

        <select className="w-full border p-2 mb-4">
          <option>Pilih barang milikmu</option>
          <option>Jam tangan</option>
          <option>Topi</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Batal</button>
          <button className="bg-blue-600 text-white px-4 py-1 rounded">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}