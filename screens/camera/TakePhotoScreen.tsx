import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function TakePhotoScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    requestPermission();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      // Trả ảnh về màn hình trước (OrderDetailScreen) qua params
      router.replace({
        pathname: '/orderdisplay/orderdisplay',
        params: { photoUri: photo.uri },
      });
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text>Không có quyền sử dụng camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        onCameraReady={() => setIsCameraReady(true)}
      />
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>📸 Chụp ảnh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  camera: { flex: 1 },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontSize: 18 },
});
