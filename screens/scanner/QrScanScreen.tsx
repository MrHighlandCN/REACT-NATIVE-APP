import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState, useRef, useCallback } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Overlay } from './Overlay';
import { useRouter, useFocusEffect } from 'expo-router';

export default function QrScanScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [isScanned, setIsScanned] = useState(false);
    const scannedRef = useRef(false); // 💡 dùng để ngăn scan nhiều lần tức thì

    const router = useRouter();

    const handleScan = (result: BarcodeScanningResult): void => {
        if (!scannedRef.current) {
            scannedRef.current = true;
            setIsScanned(true); // trigger UI update

            Alert.alert('Kết quả scan', result.data);

            router.push({
                pathname: '/orderdisplay/orderdisplay',
                params: {
                    data: encodeURIComponent(result.data),
                },
            });
        }
    };

    const handleScanAgainBtn = (): void => {
        scannedRef.current = false;
        setIsScanned(false);
    };

    // Reset khi quay lại màn hình
    useFocusEffect(
        useCallback(() => {
            scannedRef.current = false;
            setIsScanned(false);
        }, [])
    );

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Cần cấp quyền sử dụng camera</Text>
                <Button onPress={requestPermission} title="Bấm để đồng ý" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.cameraWrapper}>
                <CameraView
                    style={StyleSheet.absoluteFill}
                    facing="back"
                    onBarcodeScanned={scannedRef.current ? undefined : handleScan}
                />
                <Overlay />
            </View>

            {isScanned && (
                <View style={styles.buttonWrapper}>
                    <Button title="Quét lại" onPress={handleScanAgainBtn} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    cameraWrapper: {
        flex: 1,
        position: 'relative',
    },
    buttonWrapper: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#D8D8D8',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
});
