"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "expo-router";


export default function EditProfile() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get("/api/user").then((res) => {
      setNama(res.data.nama);
      setEmail(res.data.email);
    });
  }, []);

  const handleSave = async () => {
    await axios.put("/api/user", { nama, email });
    router.push("/profile");
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>Edit Profil</h2>
      <input value={nama} onChange={(e) => setNama(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSave}>Simpan</button>
    </main>
  );
}