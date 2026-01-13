import Link from "next/link";

export default function BarangCard({ barang }: any) {
  return (
    <Link href={`/barang/${barang.id}`}>
      <div className="border rounded-lg p-3 hover:shadow">
        <img
          src={barang.image || "/placeholder.png"}
          className="h-40 w-full object-cover rounded"
        />

        <h3 className="font-semibold mt-2">{barang.nama}</h3>

        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
          {barang.kondisi}
        </span>
      </div>
    </Link>
  );
}