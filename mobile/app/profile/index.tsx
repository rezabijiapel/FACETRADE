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

interface User {
  id: number;
  nama: string;
  email: string;
  foto?: string;
}

export default function ProfileScreen() {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(API),
      axios.get("/api/user"),
    ])
      .then(([barangRes, userRes]) => {
        setBarang(barangRes.data);
        setUser(userRes.data);
      })
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
    <Link href={`/barang/${item.id}`} asChild>
      <TouchableOpacity style={styles.card}>
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
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Profil */}
      <View style={styles.profileHeader}>
        <View style={styles.profileTop}>
          {user?.foto ? (
            <Image source={{ uri: user.foto }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={90} color="#fff" />
          )}
          <ThemedText type="title" style={styles.profileName}>{user?.nama}</ThemedText>
          <ThemedText style={styles.profileEmail}>{user?.email}</ThemedText>
        </View>

        {/* Statistik */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <ThemedText style={styles.statNumber}>{barang.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Barang</ThemedText>
          </View>
          <View style={styles.statBox}>
            <ThemedText style={styles.statNumber}>Rp {barang.reduce((a,b)=>a+b.harga,0).toLocaleString("id-ID")}</ThemedText>
            <ThemedText style={styles.statLabel}>Total Harga</ThemedText>
          </View>
        </View>

        {/* Tombol Edit Profil */}
        <Link href="/profile/edit" asChild>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color="#fff" />
            <ThemedText style={{ color: "#fff", marginLeft: 6 }}>Edit Profil</ThemedText>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Daftar Barang User */}
      <FlatList
        data={barang}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ThemedText style={styles.headerTitle}>Barang Saya</ThemedText>
        }
      />

      {/* Floating Add Button */}
      <Link href="/add" asChild>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },

  profileHeader: {
    backgroundColor: "#00A8E8",
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  profileTop: { alignItems: "center" },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 8,
  },
  profileName: { fontSize: 22, fontWeight: "700", color: "#fff" },
  profileEmail: { fontSize: 14, color: "#e0f7fa", marginBottom: 12 },

  statsRow: { flexDirection: "row", justifyContent: "space-around", width: "100%", marginBottom: 12 },
  statBox: { alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "700", color: "#fff" },
  statLabel: { fontSize: 12, color: "#e0f7fa" },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0077b6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },

  headerTitle: { fontSize: 22, fontWeight: "700", marginBottom: 12 },

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
  foto: { width: "100%", height: 180 },
  noImage: {
    height: 180,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: { color: "#9CA3AF", fontSize: 16 },
  cardBody: { padding: 12 },
  nama: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  meta: { color: "#6B7280" },
  harga: { fontSize: 18, fontWeight: "700", color: "#00A8E8", marginTop: 6 },

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