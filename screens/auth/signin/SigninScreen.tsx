import { View, Text, TextInput, Button, Alert, KeyboardAvoidingView, Platform, Pressable, ImageSourcePropType, Image } from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";


const SigninScreen = () => {
    // username, password declaretion
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //face id icon
    const faceIdIcon: ImageSourcePropType = require('@/assets/images/faceid-icon.png');

    // LOGO
    const logo: ImageSourcePropType = require('@/assets/images/logo.png');

    // User profile place holder
    const userPlaceHolder: ImageSourcePropType = require('@/assets/images/user-profile-placeholder.png');
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
        <SafeAreaView className='flex-1 flex items-center bg-[#F5F7FA]'>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} enabled={true}
                className="mt-[32] justify-center items-center flex gap-5">
                <View className='h-12 flex justify-center items-center '>
                    <Image
                        source={logo}
                        className="h-12"
                        resizeMode="contain"
                    />
                </View>
                <View className='mt-2'>
                    <Image source={userPlaceHolder} className='h-32 w-32' />
                </View>
                <TextInput
                    className="w-80 p-3 text-black-500 shadow-md bg-white"
                    placeholder="Username"
                    onChangeText={newUsername => setUsername(newUsername)}
                    placeholderTextColor="#808080"
                />
                <TextInput
                    className="w-80 p-3 text-black-500 shadow-md bg-white"
                    placeholder="Password"
                    onChangeText={newPassword => setPassword(newPassword)}
                    secureTextEntry
                    placeholderTextColor="#808080"

                />
                <Pressable className='w-80 bg-[#316ff6] p-3 shadow-md justify-center items-center flex mt-5'>
                    <Text className='text-white font-bold text-lg'>Đăng nhập</Text>
                </Pressable>


                <Link href='/auth/signin' className='text-cyan-600'>Quên mật khẩu?</Link>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SigninScreen