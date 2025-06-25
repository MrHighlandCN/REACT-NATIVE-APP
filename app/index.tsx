import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-blue-500 font-bold">Welcome!</Text>
      <Link href="/auth/signin">Đăng nhập</Link>
      <Link href="/scanner/scanner">Quét Qr</Link>
      <Link href="/qrgenerator/qrgenerator">Tạo mã</Link>
      <Link href="/orderdisplay/orderdisplay">Xem đơn hàng</Link>
    </View>
  );
}
