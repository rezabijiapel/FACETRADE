// components/ItemCard.tsx
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ItemCard({ item }: { item: any }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.foto }} style={styles.image} />
      <Text style={styles.nama}>{item.nama}</Text>
      <Text style={styles.harga}>Rp {item.harga.toLocaleString()}</Text>
      <Text style={styles.kategori}>{item.kategori} • {item.kondisi}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 6,
  },
  nama: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  harga: {
    fontSize: 14,
    color: '#2e7d32',
  },
  kategori: {
    fontSize: 12,
    color: '#777',
  },
});