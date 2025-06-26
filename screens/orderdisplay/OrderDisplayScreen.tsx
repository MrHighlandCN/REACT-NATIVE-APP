import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert, Pressable, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import ImageSelector from '@/components/ImageSelector';
import ImageOptionModal from '@/components/ImageOptionModel';

type order = {
    ma_don_hang: string;
    ngay_dat_hang: string;
    ten_khach_hang: string;
    san_pham: string;
    so_luong: number;
    don_gia: number;
    thanh_tien: number;
    trang_thai: string;
};

export default function OrderDisplayScreen() {
    const searchParams = useLocalSearchParams();
    const data = searchParams.data as string;
    // const PlaceholderImage = require('@/assets/images/placeholder.jpg');

    const [orderData, setorder] = useState<order | null>(null);
    const [selectedImages, setSelectedImages] = useState<(string | undefined)[]>([undefined, undefined, undefined]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);


    const handlePickImage = async (index: number) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const newImages = [...selectedImages];
            newImages[index] = result.assets[0].uri;
            setSelectedImages(newImages);
        } else {
            Alert.alert("Bạn chưa chọn ảnh nào");
        }
    };
    const handleTakeImage = async (index: number) => {
        try {
            await ImagePicker.requestCameraPermissionsAsync();
            const result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.back,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                const newImages = [...selectedImages];
                newImages[index] = result.assets[0].uri;
                setSelectedImages(newImages);
            } else {
                Alert.alert("Không thể chụp ảnh");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = [...selectedImages];
        newImages[index] = undefined;
        setSelectedImages(newImages);
    };

    useEffect(() => {
        if (typeof data === 'string') {
            try {
                const parsed: order = JSON.parse(data);
                setorder(parsed);
                console.log('Parsed order:', parsed);
            } catch (error) {
                console.error('Không thể parse dữ liệu đơn hàng:', error);
            }
        }
    }, [data]);

    if (!orderData) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Không có dữ liệu đơn hàng hợp lệ.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Chi tiết đơn hàng</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Mã đơn hàng:</Text>
                    <Text style={styles.value}>{orderData.ma_don_hang}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Ngày đặt hàng:</Text>
                    <Text style={styles.value}>{orderData.ngay_dat_hang}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Tên khách hàng:</Text>
                    <Text style={styles.value}>{orderData.ten_khach_hang}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Sản phẩm:</Text>
                    <Text style={styles.value}>{orderData.san_pham}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Số lượng:</Text>
                    <Text style={styles.value}>{orderData.so_luong}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Đơn giá:</Text>
                    <Text style={styles.value}>
                        {typeof orderData.don_gia === 'number'
                            ? orderData.don_gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                            : 'N/A'}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Thành tiền:</Text>
                    <Text style={styles.value}>
                        {typeof orderData.thanh_tien === 'number'
                            ? orderData.thanh_tien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                            : 'N/A'}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Trạng thái:</Text>
                    <Text
                        style={[
                            styles.value,
                            orderData.trang_thai === 'Đã giao hàng' ? styles.statusDelivered : styles.statusPending,
                        ]}
                    >
                        {orderData.trang_thai}
                    </Text>
                </View>


            </ScrollView>

            <View className='flex-row justify-center gap-3 my-4'>
                {selectedImages.map((uri, index) => (
                    <ImageSelector
                        key={index}
                        imageUri={uri}
                        handlePressed={() => {
                            setActiveIndex(index);
                            setModalVisible(true);
                        }}
                    />
                ))}
            </View>

            {/* Modal */}
            <ImageOptionModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onPickImage={async () => {
                    if (activeIndex !== null) await handlePickImage(activeIndex);
                    setModalVisible(false);
                }}
                onTakeImage={async () => {
                    if (activeIndex !== null) await handleTakeImage(activeIndex);
                    setModalVisible(false);
                }}
                onRemoveImage={() => {
                    if (activeIndex !== null) handleRemoveImage(activeIndex);
                    setModalVisible(false);
                }}
            />

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column'
    },
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    label: {
        flex: 1,
        fontWeight: '600',
        color: '#555',
    },
    value: {
        flex: 1,
        color: '#000',
    },
    statusDelivered: {
        color: 'green',
        fontWeight: '700',
    },
    statusPending: {
        color: 'orange',
        fontWeight: '700',
    },
});
