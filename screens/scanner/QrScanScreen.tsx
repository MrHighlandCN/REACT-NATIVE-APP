import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState, useRef } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Overlay } from './Overlay';


export default function QrScanScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    // const [isScanned, setScanned] = useState<boolean>(false);
    const isScanned = useRef<boolean>(false);
    const [scanData, setScanData] = useState<string | null>(null);

    const handleScan = (result: BarcodeScanningResult): void => {
        if (!isScanned.current) {
            isScanned.current = true;
            setScanData(result.data);
            Alert.alert(`Kết quả scan: ${result.data}`)
        }
    }

    const handleScanAgainBtn = (): void => {
        isScanned.current = false;
        setScanData(null);
    }

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
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
                    onBarcodeScanned={isScanned.current ? undefined : handleScan}
                />
                <Overlay />
            </View>

            {isScanned.current && (
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
        position: 'relative', // Để Overlay (absolute) hoạt động đúng
    },
    camera: {
        flex: 1,
    },
    buttonWrapper: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#D8D8D8', // tuỳ ý
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
});
