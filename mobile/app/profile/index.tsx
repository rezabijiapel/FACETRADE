import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { API } from "@/config";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

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

export default function ProfileScreen() {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API)
      .then(res => setBarang(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00A8E8" />
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }: { item: Barang }) => (
    <View style={styles.card}>
      {item.foto ? (
        <Image source={{ uri: item.foto }} style={styles.foto} resizeMode="cover" />
      ) : (
        <View style={styles.noImage}>
          <ThemedText style={styles.noImageText}>Tidak ada foto</ThemedText>
        </View>
      )}

      <View style={styles.cardBody}>
        <ThemedText type="title" style={styles.nama}>{item.nama || "-"}</ThemedText>
        <ThemedText style={styles.meta}>
          {item.kategori} • {item.kondisi}
        </ThemedText>
        <ThemedText style={styles.harga}>
          Rp {item.harga.toLocaleString("id-ID")}
        </ThemedText>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={barang}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ThemedText style={styles.headerTitle}>FaceTrade</ThemedText>
        }
      />

      {/* Floating Add Button */}
      <Link href="./add" asChild>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  foto: {
    width: "100%",
    height: 180,
  },
  noImage: {
    height: 180,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  cardBody: {
    padding: 12,
  },
  nama: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  meta: {
    color: "#6B7280",
  },
  harga: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00A8E8",
    marginTop: 6,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#00A8E8",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
});
