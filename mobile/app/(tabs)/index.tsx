import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import axios from "axios";
import { ThemedText } from "@/components/themed-text";
import { API } from "@/config";

// Interface barang
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

// Ganti dengan IP server API-mu
axios.get(API)  // sebelumnya

export default function HomeScreen() {
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
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00A8E8" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={barang}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.card}>
            {item.foto && <Image source={{ uri: item.foto }} style={styles.foto} />}
            <ThemedText type="title">{item.nama}</ThemedText>
            <ThemedText>{item.kategori} - {item.kondisi}</ThemedText>
            <ThemedText>Rp {item.harga}</ThemedText>
          </ThemedView>
        )}
        ListHeaderComponent={
          <ThemedView style={styles.header}>
            <ThemedText type="title">FaceTrade</ThemedText>
            <Link href="./profile">
              <ThemedText type="subtitle" style={styles.link}>Profile</ThemedText>
            </Link>
            <Link href="./add">
              <ThemedText type="subtitle" style={styles.link}>Tambah Barang</ThemedText>
            </Link>
          </ThemedView>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  foto: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  link: {
    color: "#00A8E8",
    marginTop: 4,
  },
});
