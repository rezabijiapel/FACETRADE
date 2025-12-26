import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";      // ✅ gunakan index.tsx
import ProfileScreen from "../app/(tabs)/profile"; // ✅ gunakan index.tsx
import AddScreen from "../app/(tabs)/add";         // ✅ gunakan index.tsx

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen 
        name="profile" 
        component={ProfileScreen} 
        options={{ title: "Profil Pengguna" }}
      />
      <Stack.Screen 
        name="add" 
        component={AddScreen} 
        options={{ title: "Tambah Barang" }}
      />
    </Stack.Navigator>
  );
}