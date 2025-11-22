import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../app/home/page";       // ✅ gunakan index.tsx
import ProfileScreen from "../app/profile/index"; // ✅ gunakan index.tsx
import AddScreen from "../app/add/index";         // ✅ gunakan index.tsx

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen 
        name="home" 
        component={HomeScreen} 
        options={{ title: "FaceTrade" }}
      />
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