import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState, useRef, useCallback } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Overlay } from './Overlay';
import { useRouter, useFocusEffect } from 'expo-router';

const QrScanScreen: React.FC = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [isScanned, setIsScanned] = useState<boolean>(false);
    const scannedRef = useRef(false); // 💡 avoid multiple scan in short time

    const router = useRouter();

    // Handle scan 
    const handleScan = (result: BarcodeScanningResult): void => {
        if (!scannedRef.current) {
            scannedRef.current = true;
            setIsScanned(true); // trigger UI update
            router.push({
                pathname: '/orderdisplay/orderdisplay',
                params: {
                    data: encodeURIComponent(result.data),
                },
            });
        }
    };

    // const handleScanAgainBtn = (): void => {
    //     scannedRef.current = false;
    //     setIsScanned(false);
    // };

    // Reset khi quay lại màn hình
    useFocusEffect(
        useCallback(() => {
            scannedRef.current = false;
            setIsScanned(false);
        }, [])
    );

    // If permission hasn't load
    if (!permission) {
        return <View />;
    }

    // If permission hasn't granted
    if (!permission.granted) {
        return (
            <View style={styles.container1}>
                <Text style={styles.message}>Cần cấp quyền sử dụng camera</Text>
                <Button onPress={requestPermission} title="Bấm để đồng ý" />
            </View>
        );
    }

    // Else
    return (
        <View style={styles.container2}>
            <View style={styles.cameraWrapper}>
                <CameraView
                    style={StyleSheet.absoluteFill}
                    facing="back"
                    onBarcodeScanned={scannedRef.current ? undefined : handleScan}
                />
                <Overlay />
            </View>

            {/* {isScanned && (
                <View style={styles.buttonWrapper}>
                    <Button title="Quét lại" onPress={handleScanAgainBtn} />
                </View>
            )} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: '#fafafa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
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

export default QrScanScreen;
