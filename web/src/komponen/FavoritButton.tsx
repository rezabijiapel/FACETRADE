"use client";

import { useState } from "react";

export default function FavoriteButton({ id }: { id: number }) {
  const [fav, setFav] = useState(false);

  return (
    <button onClick={() => setFav(!fav)}>
      {fav ? "❤️ Favorit" : "🤍 Favorit"}
    </button>
  );
}