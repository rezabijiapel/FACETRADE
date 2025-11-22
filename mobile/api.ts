import axios from "axios";
import { API } from "./config";

// Simpel URL API
axios.get(API);
// Interface untuk tipe data Barang
export interface Barang {
  id: number;
  userId: number;
  nama: string;
  kategori: string;
  kondisi: string;
  harga: number;
  foto?: string;
  createdAt: string;
}

// Fungsi untuk ambil semua barang
export const getBarang = async (): Promise<Barang[]> => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    console.error("Error fetching barang:", error);
    return [];
  }
};

// Fungsi untuk tambah barang
export const tambahBarang = async (data: Partial<Barang>): Promise<Barang | null> => {
  try {
    const res = await axios.post(API, data);
    return res.data;
  } catch (error) {
    console.error("Error adding barang:", error);
    return null;
  }
};

// Fungsi untuk update barang
export const updateBarang = async (data: Partial<Barang> & { id: number }): Promise<Barang | null> => {
  try {
    const res = await axios.put(API, data);
    return res.data;
  } catch (error) {
    console.error("Error updating barang:", error);
    return null;
  }
};

// Fungsi untuk hapus barang
export const hapusBarang = async (id: number): Promise<Barang | null> => {
  try {
    const res = await axios.delete(API, { data: { id } });
    return res.data;
  } catch (error) {
    console.error("Error deleting barang:", error);
    return null;
  }
};
