// komponen/ProfilButton.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/profil")}
      className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-blue-100 transition"
    >
      <Image
        src="/default-avatar.png" // Ganti dengan path avatar yang sesuai
        alt="Profil"
        width={32}
        height={32}
        className="rounded-full"
      />
      <span className="text-sm font-medium text-gray-700">Profil Saya</span>
    </button>
  );
}