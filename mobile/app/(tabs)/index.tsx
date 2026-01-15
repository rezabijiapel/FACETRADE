import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { API } from "@/config";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const Header: React.FC<{ nama: string; isLoggedIn: boolean }> = ({ nama, isLoggedIn }) => (
  <View style={headerStyles.container}>
    <View style={headerStyles.left}>
      <Image source={require("../../assets/images/logo.png")} style={headerStyles.logo} />
      <ThemedText type="title" style={headerStyles.text}>{nama}</ThemedText>
    </View>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Link href="/explore" asChild>
        <TouchableOpacity style={headerStyles.profileIcon}>
          <Ionicons name="search" size={28} color="#00A8E8" />
        </TouchableOpacity>
      </Link>
      <Link href={isLoggedIn ? "/profile" : "/login"} asChild>
        <TouchableOpacity style={headerStyles.profileIcon}>
          <Ionicons name="person-circle-outline" size={36} color="#00A8E8" />
        </TouchableOpacity>
      </Link>
    </View>
  </View>
);

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

export default function HomeScreen() {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API)
      .then((res) => setBarang(res.data))
      .catch((err) => console.error(err))
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
          <ThemedText type="title" style={styles.nama}>{item.nama}</ThemedText>
          <ThemedText style={styles.meta}>{item.kategori} • {item.kondisi}</ThemedText>
          <ThemedText style={styles.harga}>
            Rp {item.harga.toLocaleString("id-ID")}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </Link>
  );

  const PromoTextOnly = () => (
    <View style={styles.promoWrapper}>
      <ThemedText style={styles.promoTextOnly}>
        Baru! Sekarang kamu bisa tukar barang langsung lewat chat.
      </ThemedText>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={barang}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 120, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Header nama="FaceTrade" isLoggedIn={false} />}
        ListEmptyComponent={<PromoTextOnly />}
      />

      <Link href="/add" asChild>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={32} color="#030303" />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F7FA" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  foto: { width: "100%", height: 200 },
  noImage: {
    height: 200,
    backgroundColor: "#d1d5db",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: { color: "#9CA3AF", fontSize: 16 },
  cardBody: { padding: 12 },
  nama: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  meta: { color: "#6B7280", fontSize: 14 },
  harga: { fontSize: 18, fontWeight: "700", color: "#00A8E8", marginTop: 6 },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#00A8E8",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  promoWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  promoTextOnly: {
    fontSize: 14,
    color: "#00A8E8",
    textAlign: "center",
  },
});

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  left: { flexDirection: "row", alignItems: "center" },
  logo: { width: 100, height: 100, marginRight: 10, resizeMode: "contain" },
  text: { fontSize: 28, fontWeight: "800", color: "#00A8E8" },
  profileIcon: { padding: 4, marginLeft: 8 },
});
