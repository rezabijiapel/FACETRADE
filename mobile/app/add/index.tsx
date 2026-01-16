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
import { Picker } from "@react-native-picker/picker";

export default function AddBarang() {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("Elektronik");
  const [kondisi, setKondisi] = useState("Baru");
  const [harga, setHarga] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  // pilih gambar dari galeri
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  // submit data barang ke API
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
      // reset form
      setNama("");
      setKategori("Elektronik");
      setKondisi("Baru");
      setHarga("");
      setFoto(null);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal menambahkan barang");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Nama Barang */}
        <TextInput
          placeholder="Nama Barang"
          value={nama}
          onChangeText={setNama}
          style={styles.input}
        />

        {/* Kategori */}
        <Text style={styles.label}>Kategori</Text>
        <Picker
          selectedValue={kategori}
          onValueChange={(value) => setKategori(value)}
          style={styles.picker}
        >
          <Picker.Item label="Elektronik" value="Elektronik" />
          <Picker.Item label="Pakaian" value="Pakaian" />
          <Picker.Item label="Buku" value="Buku" />
          <Picker.Item label="Lainnya" value="Lainnya" />
        </Picker>

        {/* Kondisi */}
        <Text style={styles.label}>Kondisi</Text>
        <Picker
          selectedValue={kondisi}
          onValueChange={(value) => setKondisi(value)}
          style={styles.picker}
        >
          <Picker.Item label="Baru" value="Baru" />
          <Picker.Item label="Bekas" value="Bekas" />
        </Picker>

        {/* Harga */}
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

        {foto && <Image source={{ uri: foto }} style={styles.preview} />}

        {/* Submit */}
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
  label: {
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 12,
    color: "#333",
  },
  picker: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    height: 50,              // ✅ lebih tinggi
    paddingHorizontal: 12,   // ✅ beri ruang kiri-kanan
    justifyContent: "center" // ✅ teks lebih rata
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
    backgroundColor: "#00A8E8",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },


});