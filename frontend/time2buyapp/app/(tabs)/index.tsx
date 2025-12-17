import React from 'react';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Dashboard() {
    return (
        <View className='flex-1 items-center justify-center bg-[#C8C8C8]'>
            <Text className='text-3xl text-white'>This is the dashboard</Text>
            <Link className='text-white text-lg underline' href={'/about'}>Click here for About</Link>
        </View>
    );
}