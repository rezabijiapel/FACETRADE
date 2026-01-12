import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { API } from "@/config";
import * as ImagePicker from "expo-image-picker";

export default function AddBarang() {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [harga, setHarga] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      // contoh: kirim foto sebagai base64 atau multipart form-data
      await axios.post(API, {
        userId: 1, // sementara hardcode userId
        nama,
        kategori,
        kondisi,
        harga: Number(harga),
        foto, // sementara kirim URI, backend perlu dukungan upload
      });
      Alert.alert("Berhasil", "Barang berhasil ditambahkan!");
      setNama(""); setKategori(""); setKondisi(""); setHarga(""); setFoto(null);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal menambahkan barang");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
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
          style={styles.input}
          keyboardType="numeric"
        />

        {/* Upload Foto */}
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadText}>
            {foto ? "Ganti Foto" : "Pilih Foto"}
          </Text>
        </TouchableOpacity>

        {foto && (
          <Image source={{ uri: foto }} style={styles.preview} />
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Tambah Barang</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F7FA" },
  scroll: { padding: 16 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  uploadButton: {
    backgroundColor: "#00A8E8",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  uploadText: { color: "#fff", fontWeight: "bold" },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#0077B6",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});