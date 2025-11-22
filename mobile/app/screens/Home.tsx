import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { API } from "@/config"; // ✅ ambil dari config.ts

interface Barang {
  id: number;
  userId: number;
  nama: string;
  kategori: string;
  kondisi: string;
  harga: number;
  foto?: string;
  createdAt: string;
}

export default function Home() {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API)
      .then(res => setBarang(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }: { item: Barang }) => (
    <View style={styles.card}>
      {item.foto && <Image source={{ uri: item.foto }} style={styles.foto} />}
      <Text style={styles.nama}>{item.nama}</Text>
      <Text>{item.kategori} - {item.kondisi}</Text>
      <Text>Rp {item.harga.toLocaleString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>FaceTrade</Text>
      </View>

      {/* Judul Utama */}
      <Text style={styles.title}>Marketplace FaceTrade</Text>

      {/* Loading */}
      {loading && <ActivityIndicator size="large" color="#00A8E8" style={{ marginTop: 20 }} />}

      {/* Empty State */}
      {!loading && barang.length === 0 && (
        <Text style={styles.empty}>Belum ada barang yang tersedia.</Text>
      )}

      {/* List Barang */}
      <FlatList
        data={barang}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  logo: { fontSize: 24, fontWeight: "bold", color: "#00A8E8" },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 16 },
  empty: { textAlign: "center", fontSize: 16, color: "#777", marginTop: 20 },
  card: { marginBottom: 16, padding: 16, borderWidth: 1, borderRadius: 8, borderColor: "#ddd" },
  foto: { width: "100%", height: 150, borderRadius: 8, marginBottom: 8 },
  nama: { fontWeight: "bold", fontSize: 16, marginVertical: 4 },
});