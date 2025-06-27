import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import './globals.css';

export default function RootLayout() {
  return (
    <>
      {/* Set màu thanh trạng thái cho toàn app */}
      <StatusBar
        barStyle="dark-content"   // màu icon: trắng/đen
      />

      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
