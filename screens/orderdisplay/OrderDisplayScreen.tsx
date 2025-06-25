import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type DonHang = {
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

    const [donHang, setDonHang] = useState<DonHang | null>(null);

    useEffect(() => {
        if (typeof data === 'string') {
            try {
                const parsed: DonHang = JSON.parse(data);
                setDonHang(parsed);
                console.log('Parsed donHang:', parsed);
            } catch (error) {
                console.error('Không thể parse dữ liệu đơn hàng:', error);
            }
        }
    }, [data]);

    if (!donHang) {
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
                    <Text style={styles.value}>{donHang.ma_don_hang}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Ngày đặt hàng:</Text>
                    <Text style={styles.value}>{donHang.ngay_dat_hang}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Tên khách hàng:</Text>
                    <Text style={styles.value}>{donHang.ten_khach_hang}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Sản phẩm:</Text>
                    <Text style={styles.value}>{donHang.san_pham}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Số lượng:</Text>
                    <Text style={styles.value}>{donHang.so_luong}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Đơn giá:</Text>
                    <Text style={styles.value}>
                        {typeof donHang.don_gia === 'number'
                            ? donHang.don_gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                            : 'N/A'}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Thành tiền:</Text>
                    <Text style={styles.value}>
                        {typeof donHang.thanh_tien === 'number'
                            ? donHang.thanh_tien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                            : 'N/A'}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Trạng thái:</Text>
                    <Text
                        style={[
                            styles.value,
                            donHang.trang_thai === 'Đã giao hàng' ? styles.statusDelivered : styles.statusPending,
                        ]}
                    >
                        {donHang.trang_thai}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
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
