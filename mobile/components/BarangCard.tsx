import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Barang } from "../api";

interface Props {
  item: Barang;
}

const BarangCard: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.card}>
      {item.foto && <Image source={{ uri: item.foto }} style={styles.image} />}
      <Text style={styles.nama}>{item.nama}</Text>
      <Text>Kategori: {item.kategori}</Text>
      <Text>Kondisi: {item.kondisi}</Text>
      <Text>Harga: Rp {item.harga}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  nama: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
});

export default BarangCard;
