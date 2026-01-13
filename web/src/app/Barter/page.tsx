import React from 'react';
import Image from 'next/image';

const BarterPage = () => {
  // Contoh data dummy
  const items = [
    {
      id: 1,
      name: "Keyboard Mekanik RGB",
      condition: "Bekas (90%)",
      want: "Mouse Wireless",
      image: "/placeholder-keyboard.jpg"
    },
    {
      id: 2,
      name: "Buku Pemrograman React",
      condition: "Mulus",
      want: "Buku Desain UI/UX",
      image: "/placeholder-book.jpg"
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">🔄 Barter Mudah</h2>
      <p className="text-gray-600 mb-6">Tukarkan barangmu dengan barang impian tanpa uang tunai.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <div className="bg-gray-200 h-40 rounded-lg mb-3 flex items-center justify-center">
               <span className="text-gray-400">Foto Barang</span>
            </div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {item.condition}
            </span>
            
            <div className="mt-4 p-2 bg-yellow-50 border border-yellow-100 rounded-lg">
              <p className="text-xs text-yellow-700 font-bold uppercase">Mencari Tukaran:</p>
              <p className="text-sm text-gray-800">{item.want}</p>
            </div>

            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              Ajukan Barter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarterPage;