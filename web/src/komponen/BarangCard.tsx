import Link from "next/link";

export default function BarangCard({ barang }: any) {
  return (
    <Link href={`/barang/${barang.id}`}>
      <div className="border border-slate-200 rounded-xl p-3 bg-white
                      hover:shadow-lg hover:-translate-y-1
                      transition-all duration-300">

        <img
          src={barang.image || "/placeholder.png"}
          className="h-40 w-full object-cover rounded-lg"
        />

        <h3 className="font-semibold mt-3 text-slate-800">
          {barang.nama}
        </h3>

        <span className="inline-block mt-2 text-xs
                         bg-gradient-to-r from-blue-500 to-indigo-500
                         text-white px-3 py-1 rounded-full">
          {barang.kondisi}
        </span>
      </div>
    </Link>
  );
}