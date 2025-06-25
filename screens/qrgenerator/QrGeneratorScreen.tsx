import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import React, { useState } from 'react';

const QrGeneratorScreen = () => {
    const [inputText, setInputText] = useState<string>('');
    const [qrText, setQrText] = useState<string>(''); 

    const handleGenerate = () : void => {
       setQrText(inputText.trim()); 
    }

    return (
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
            <View className='h-64 w-64 border border-1 rounded-lg border-white bg-white flex justify-center items-center p-2'>
                {qrText !== "" ? (<QRCode value={qrText} size={200} />) : (<Text className="text-gray-500">Mã được hiển thị ở đây</Text>)}
                
            </View>
        </KeyboardAvoidingView>
    );
}

export default QrGeneratorScreen

const styles = StyleSheet.create({

})