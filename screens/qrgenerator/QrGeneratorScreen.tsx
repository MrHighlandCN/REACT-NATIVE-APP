import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const QrGeneratorScreen: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [qrText, setQrText] = useState('');
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();


    const qrCodeRef = useRef<any>(null);


    useEffect(() => {
        if (!permissionResponse?.granted) {
            requestPermission();
        }
    }, [permissionResponse?.granted, requestPermission]);


    const handleGenerate = () => {
        setQrText(inputText.trim());
    };

    const handleCaptureQR = async () => {
        if (!qrCodeRef.current) {
            Alert.alert("Vui lòng tạo mã QR trước");
            return;
        }

        try {
            qrCodeRef.current.toDataURL(async (data: string) => {
                // const base64Data = `data:image/png;base64,${data}`;

                const fileUri = FileSystem.documentDirectory + "qr-code.png";
                await FileSystem.writeAsStringAsync(fileUri, data, {
                    encoding: FileSystem.EncodingType.Base64,
                });


                const asset = await MediaLibrary.createAssetAsync(fileUri);

                // Kiểm tra xem album "QR Codes" đã tồn tại chưa
                const albums = await MediaLibrary.getAlbumsAsync();
                const qrAlbum = albums.find(album => album.title === "QR Codes");

                if (qrAlbum) {
                    //Album tồn tại → thêm ảnh vào album
                    await MediaLibrary.addAssetsToAlbumAsync([asset], qrAlbum, false);
                } else {
                    //Album chưa có → tạo album mới
                    await MediaLibrary.createAlbumAsync("QR Codes", asset, false);
                }

                Alert.alert("Đã lưu mã QR vào thư viện!");
            });
        } catch (error) {
            console.error("Lỗi khi tạo ảnh QR:", error);
            Alert.alert("Lỗi", "Không thể tạo ảnh QR");
        }
    };

    return (
        <SafeAreaView className='flex-1'>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex justify-center items-center h-screen bg-gray-200"
            >
                <View className="flex flex-row p-5 gap-2 mb-5">
                    <TextInput
                        className="h-18 flex-1 border border-gray-400 p-2 bg-white rounded-md"
                        placeholder="Nhập..."
                        placeholderTextColor="#808080"
                        value={inputText}
                        onChangeText={setInputText}
                    />

                    <Pressable
                        onPress={handleGenerate}
                        className="bg-blue-500 rounded-md justify-center items-center px-4"
                        android_ripple={{ color: '#ffffff30' }}
                    >
                        <Text className="text-white font-semibold">Tạo mã</Text>
                    </Pressable>
                </View>

                <View className="h-64 w-64 border border-1 rounded-lg border-white bg-white flex justify-center items-center p-2">
                    {qrText !== "" ? (
                        <QRCode
                            value={qrText}
                            size={200}
                            getRef={(c) => (qrCodeRef.current = c)}
                        />
                    ) : (
                        <Text className="text-gray-500">Mã được hiển thị ở đây</Text>
                    )}
                </View>

                <Pressable
                    onPress={handleCaptureQR}
                    className="mt-5 bg-green-500 px-4 py-2 rounded-md"
                >
                    <Text className="text-white font-semibold">Lưu mã QR</Text>
                </Pressable>
                {/* 
                {capturedUri && (
                    <Image
                        source={{ uri: capturedUri }}
                        style={{ width: 200, height: 200, marginTop: 20 }}
                        resizeMode="contain"
                    />
                )} */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default QrGeneratorScreen;
