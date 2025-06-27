import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type SalaryChangeType = 'none' | 'increase' | 'decrease';
type CurrencyType = 'VND' | 'USD' | 'EUR';

const StaffEvaluationScreen = () => {
    const [rating, setRating] = useState<number>(0);
    const [salary, setSalary] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    // Salary dropdown
    const [salaryChange, setSalaryChange] = useState<SalaryChangeType>('none');
    const [salaryOpen, setSalaryOpen] = useState(false);
    const salaryOptions = [
        { label: 'Không thay đổi', value: 'none' },
        { label: 'Tăng lương', value: 'increase' },
        { label: 'Giảm lương', value: 'decrease' },
    ];

    // Currency dropdown
    const [currency, setCurrency] = useState<CurrencyType>('VND');
    const [currencyOpen, setCurrencyOpen] = useState(false);
    const currencyOptions = [
        { label: 'VND', value: 'VND' },
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
    ];

    const employee = {
        name: 'Nguyễn Văn A',
        id: 'EMP001',
        position: 'Nhân viên kinh doanh',
    };

    const handleSubmit = () => {
        Alert.alert('Đã lưu', `Đánh giá cho ${employee.name} đã được lưu.`);
    };

    useEffect(() => {
        if (currencyOpen) {
            setSalaryOpen(false);
        }

    }, [currencyOpen]);


    useEffect(() => {
        if (salaryOpen) {
            setCurrencyOpen(false);
        }

    }, [salaryOpen]);
    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <FlatList
                    data={[{}]} // chỉ render 1 lần
                    keyExtractor={() => 'form'}
                    contentContainerStyle={{ padding: 20 }}
                    renderItem={() => (
                        <>
                            <Text className="text-2xl font-bold text-center mb-5">Đánh giá Nhân viên</Text>

                            <View className="bg-gray-100 p-4 rounded-lg mb-4">
                                <Text className="text-base font-semibold">
                                    Họ tên: <Text className="font-normal">{employee.name}</Text>
                                </Text>
                                <Text className="text-base font-semibold">
                                    Mã nhân viên: <Text className="font-normal">{employee.id}</Text>
                                </Text>
                                <Text className="text-base font-semibold">
                                    Chức vụ: <Text className="font-normal">{employee.position}</Text>
                                </Text>
                            </View>

                            <Text className="text-base font-semibold mb-2">Đánh giá:</Text>
                            <View className="flex-row mb-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Pressable key={i} onPress={() => setRating(i)}>
                                        <FontAwesome name={i <= rating ? 'star' : 'star-o'} size={32} color="#FFD700" />
                                    </Pressable>
                                ))}
                            </View>
                            <View className='flex flex-row gap-2 mb-4'>
                                <View className='flex flex-1'>
                                    <Text className="text-base font-semibold">Mức lương:</Text>
                                    <TextInput
                                        className="border border-gray-300 rounded-lg p-3 text-base"
                                        keyboardType="numeric"
                                        placeholder="Nhập mức lương"
                                        placeholderTextColor="#808080"
                                        value={salary}
                                        onChangeText={setSalary}
                                        style={{
                                            height: 52
                                        }}
                                    />
                                </View>

                                <View className='flex w-32'>
                                    <Text className="text-base font-semibold ">Đơn vị:</Text>
                                    <DropDownPicker
                                        open={currencyOpen}
                                        value={currency}
                                        items={currencyOptions}
                                        setOpen={setCurrencyOpen}
                                        setValue={setCurrency}
                                        setItems={() => { }}
                                        placeholder="Chọn đơn vị"
                                        style={{
                                            borderColor: '#D1D5DB',
                                            height: 52, // ✅ bằng chiều cao TextInput
                                            paddingHorizontal: 12,
                                            paddingVertical: 10,
                                        }}
                                        containerStyle={{
                                            height: 52, // ✅ đảm bảo khung ngoài cũng cao bằng
                                        }}
                                        zIndex={2000}
                                        zIndexInverse={2000}
                                    />

                                </View>

                            </View>


                            <Text className="text-base font-semibold mb-2">Thay đổi lương:</Text>
                            <DropDownPicker
                                open={salaryOpen}
                                value={salaryChange}
                                items={salaryOptions}
                                setOpen={setSalaryOpen}
                                setValue={setSalaryChange}
                                setItems={() => { }}
                                placeholder="Chọn thay đổi"
                                style={{ borderColor: '#D1D5DB', marginBottom: 16 }}
                                zIndex={1000}
                                zIndexInverse={1000}
                            />



                            <Text className="text-base font-semibold mb-2">Nhận xét:</Text>
                            <TextInput
                                className="border border-gray-300 rounded-lg px-3 py-2 text-base h-24 mb-6"
                                multiline
                                placeholder="Nhận xét về nhân viên"
                                placeholderTextColor="#808080"
                                value={comment}
                                onChangeText={setComment}
                            />

                            <TouchableOpacity
                                onPress={handleSubmit}
                                className="bg-blue-600 py-3 rounded-xl"
                            >
                                <Text className="text-white text-center font-semibold text-base">Lưu đánh giá</Text>
                            </TouchableOpacity>
                        </>
                    )}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default StaffEvaluationScreen;
