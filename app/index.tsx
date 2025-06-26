import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-blue-500 font-bold">Welcome!</Text>
      <View className="mt-4 flex gap-3 w-full px-5">
        <Link href="/auth/signin" className="bg-cyan-500 text-white p-2 w-full text-center rounded-md">Đăng nhập</Link>
        <Link href="/scanner/scanner" className="bg-cyan-500 text-white p-2 w-full text-center rounded-md">Quét Qr</Link>
        <Link href="/qrgenerator/qrgenerator" className="bg-cyan-500 text-white p-2 w-full text-center rounded-md">Tạo mã</Link>

      </View>
    </View>
  );
}
