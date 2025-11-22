import React, { useState } from "react";
import { SafeAreaView, View, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios, { Axios } from "axios";
import { API } from "@/config";

axios.get(API)// ganti IP server

export default function AddBarang() {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [harga, setHarga] = useState("");
  const [foto, setFoto] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(API, {
        userId: 1, // sementara hardcode userId
        nama,
        kategori,
        kondisi,
        harga: Number(harga),
        foto,
      });
      Alert.alert("Berhasil", "Barang berhasil ditambahkan!");
      setNama(""); setKategori(""); setKondisi(""); setHarga(""); setFoto("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal menambahkan barang");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput placeholder="Nama Barang" value={nama} onChangeText={setNama} style={styles.input} />
      <TextInput placeholder="Kategori" value={kategori} onChangeText={setKategori} style={styles.input} />
      <TextInput placeholder="Kondisi" value={kondisi} onChangeText={setKondisi} style={styles.input} />
      <TextInput placeholder="Harga" value={harga} onChangeText={setHarga} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="URL Foto" value={foto} onChangeText={setFoto} style={styles.input} />
      <Button title="Tambah Barang" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6, marginBottom: 10 },
});
