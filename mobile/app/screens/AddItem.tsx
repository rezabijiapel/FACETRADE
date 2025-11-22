import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { API } from "@/config"; // ✅ ambil dari config.ts

export default function AddItem() {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [harga, setHarga] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(API, {
        userId: 1, // sementara hardcode, nanti bisa ambil dari auth
        nama,
        kategori,
        kondisi,
        harga: Number(harga),
        foto: "https://example.com/foto.jpg", // bisa diganti upload image
      });
      Alert.alert("Sukses", "Barang berhasil ditambahkan!");
      setNama(""); setKategori(""); setKondisi(""); setHarga("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal menambahkan barang");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nama Barang"
        value={nama}
        onChangeText={setNama}
        style={styles.input}
      />
      <TextInput
        placeholder="Kategori"
        value={kategori}
        onChangeText={setKategori}
        style={styles.input}
      />
      <TextInput
        placeholder="Kondisi"
        value={kondisi}
        onChangeText={setKondisi}
        style={styles.input}
      />
      <TextInput
        placeholder="Harga"
        value={harga}
        onChangeText={setHarga}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Tambah Barang" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
  },
});