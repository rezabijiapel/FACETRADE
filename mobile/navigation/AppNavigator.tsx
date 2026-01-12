import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";    
import LoginScreen from "../app/login"; 
import AddScreen from "../app/add/index";      
import HomeScreen from "../app/(tabs)"; 
import ProfileScreen from "@/app/profile";  

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen 
        name="login" 
        component={LoginScreen} 
        options={{ title: "Login" }}
      />
      <Stack.Screen 
        name="add" 
        component={AddScreen} 
        options={{ title: "Tambah Barang" }}
      />
      <Stack.Screen
        name="home" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile" 
        component={ProfileScreen} 
        options={{ title: "Profil" }}
      />
    </Stack.Navigator>
  );
}