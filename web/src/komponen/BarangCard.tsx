import Image from "next/image";

export default function BarangCard({ item }) {
  return (
    <div className="border border-neutral-800 rounded-2xl p-4 bg-neutral-900 shadow-sm hover:shadow-lg transition">
      {/* Image */}
      <div className="relative w-full h-40 rounded-xl overflow-hidden bg-neutral-800 mb-4">
        <Image
          src={item.image}
          alt={item.nama}
          fill
          className="object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg">{item.nama}</h3>

      {/* Condition */}
      <span className="inline-block mt-2 text-xs bg-blue-900/40 text-blue-300 px-2 py-1 rounded-full">
        {item.kondisi}
      </span>

      {/* Want */}
      <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
        <p className="text-xs text-yellow-400 font-semibold uppercase">
          Mencari Tukaran
        </p>
        <p className="text-sm text-neutral-200">{item.cari}</p>
      </div>

      {/* Action */}
      <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition">
        Ajukan Barter
      </button>
    </div>
  );
}