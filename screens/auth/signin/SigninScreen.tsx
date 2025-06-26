import { View, Text, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";


const SigninScreen = () => {
    // username, password declaretion
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Handle signing submit
    const handleSignin = async () => {

        //simple validate for username, password
        if (!username.trim() || !password.trim()) {
            Alert.alert('Error', 'username and password must be filled !!');
            return;
        }

        // Prepare formD data
        const formData = new FormData();
        formData.append('Username', username);
        formData.append('Password', password);

        // Request
        const response = await fetch('http://192.168.1.248:9500/api/auth-service/Auth/login', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            Alert.alert('Success', 'Signin successfully !!');
            return;
        }
        else {
            Alert.alert('Error', 'Wrong username or password !!');
        }
    }
    return (
        <SafeAreaView className='flex-1'>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} enabled={true}
                className="flex-1 justify-center items-center bg-gray">
                <Text className="text-2xl font-bold mb-4">Sign in</Text>
                <TextInput
                    className="w-64 p-3 border border-black rounded-md text-black-500 rounded mb-3"
                    placeholder="Username"
                    onChangeText={newUsername => setUsername(newUsername)}
                    placeholderTextColor="#808080"
                />
                <TextInput
                    className="w-64 p-3 border border-black rounded-md text-black-500 rounded mb-4"
                    placeholder="Password"
                    onChangeText={newPassword => setPassword(newPassword)}
                    secureTextEntry
                    placeholderTextColor="#808080"

                />
                <View className="w-64 bg-[#316ff6] rounded-md">
                    <Button title="Sign in" onPress={handleSignin} color="#ffffff" />
                </View>
                <Link href='/auth/signin' className='mt-2 text-cyan-600'>Quên mật khẩu?</Link>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SigninScreen