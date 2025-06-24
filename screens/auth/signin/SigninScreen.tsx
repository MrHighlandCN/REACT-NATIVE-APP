import { View, Text, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react'
import { ResourceSavingView } from '@react-navigation/elements';

const SigninScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = async () => {
        console.log(username);
        console.log(password);
        if (!username.trim() || !password.trim()) {
            Alert.alert('Error', 'username and password must be filled !!');
            return;
        }
        const formData = new FormData();
        formData.append('Username', username);
        formData.append('Password', password);
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
                <Button title="Sign in" onPress={handleSignin} color="#ffffff"/>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SigninScreen