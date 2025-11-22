import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { API } from "@/config";

// Interface Barang
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

export default function HomeScreen({ navigation }: any) {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API)
      .then(res => setBarang(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>FaceTrade</Text>
        <View style={styles.links}>
          <TouchableOpacity onPress={() => navigation.navigate("home")}>
            <Text style={styles.link}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("add")}>
            <Text style={styles.link}>Tambah Barang</Text>
          </TouchableOpacity>
        </View>
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
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.foto && <Image source={{ uri: item.foto }} style={styles.foto} />}
            <Text style={styles.nama}>{item.nama}</Text>
            <Text>{item.kategori} - {item.kondisi}</Text>
            <Text>Rp {item.harga.toLocaleString()}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  logo: { fontSize: 24, fontWeight: "bold", color: "#00A8E8" },
  links: { flexDirection: "row", gap: 16 },
  link: { fontWeight: "bold", color: "#00A8E8" },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 16 },
  empty: { textAlign: "center", fontSize: 16, color: "#777", marginTop: 20 },
  card: { backgroundColor: "#f0f0f0", padding: 12, borderRadius: 10, marginBottom: 10 },
  foto: { width: "100%", height: 150, borderRadius: 8, marginBottom: 8 },
  nama: { fontWeight: "bold", fontSize: 16 },
});