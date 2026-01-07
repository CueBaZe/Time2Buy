import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { fetch } from 'expo/fetch';

export default function Login() {

    const [isChecked, setChecked] = useState(false);
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    
    const HandleLogin = async () =>  {
        try {
            const response = await fetch('http://10.0.2.2:8000/api/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    name: name,
                    password: password
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User is logged in:', data)
            }
            else {
                const errorData = await response.json();
                console.error('Error with logging in:', errorData)
            }
        } catch (error) {
            console.error('Network error:', error)
            setError("Could not connect to the server.");
        }
    }

    return (
        <View className='flex-1 items-center bg-[#1A1A1B]'>
            <View className='mt-[60px]'>
                <Text className='text-[#2D9CDB] font-bold text-6xl'>Time2Buy</Text>
                <Text className='text-white text-lg'>See the clock behind the price tag.</Text>
            </View>

            <View className='mt-[50px] border bg-[#282829] p-2 rounded-2xl invisible' id='errorBox'>
                <Text id='ErrorText' className='text-white text-md'><Ionicons name="information-circle" size={18} color="red" /></Text>
            </View>

            <View className='flex-1 items-center justify-center gap-[50px]'>
                <TextInput className='text-white text-xl text-center w-[250px] border border-2 border-[#BEBEBE] rounded-lg' 
                    placeholder='Username or Email' 
                    id='username'
                    value={name}
                    onChangeText={setName} 
                    placeholderTextColor="#ffffff">
                </TextInput>

                <TextInput className='text-white text-xl text-center w-[250px] border border-2 border-[#BEBEBE] rounded-lg' 
                    placeholder='Password' 
                    id='password' 
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#ffffff">
                </TextInput>

                <View className='flex-2 flex-row gap-3'>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                    />
                    <Text className='text-white'>Remember me</Text>
                </View>

                <Text className='bg-[#8CEB11] text-white text-2xl font-bold rounded-lg p-2' id='loginBtn' onPress={HandleLogin}>Login</Text>

                <View className='items-center gap-2'>
                    <Text className='text-white'>Dont have an account?</Text>
                    <Link href="register" className='text-blue-400 font-bold underline'>Register here</Link>
                </View>

            </View>
        </View>
    );
}