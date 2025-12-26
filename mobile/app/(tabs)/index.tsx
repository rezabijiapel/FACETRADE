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
    <FlatList
      data={barang}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <ThemedText style={styles.headerTitle}>FaceTrade</ThemedText>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.foto ? (
            <Image
              source={{ uri: item.foto }}
              style={styles.foto}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.noImage}>
              <ThemedText style={{ color: "#9CA3AF" }}>
                Tidak ada foto
              </ThemedText>
            </View>
          )}

          <View style={styles.cardBody}>
            <ThemedText type="title">{item.nama || "-"}</ThemedText>
            <ThemedText style={styles.meta}>
              {item.kategori} • {item.kondisi}
            </ThemedText>
            <ThemedText style={styles.harga}>
              Rp {item.harga.toLocaleString("id-ID")}
            </ThemedText>
          </View>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 100 }}
    />

    {/* FLOATING BUTTON */}
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
    paddingHorizontal: 12,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginVertical: 16,
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

  cardBody: {
    padding: 12,
  },

  meta: {
    color: "#6B7280",
    marginVertical: 4,
  },

  harga: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00A8E8",
    marginTop: 6,
  },

  /* FLOATING BUTTON */
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
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