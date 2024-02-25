import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';

const Home = () => {

    const data = [
        { id: 1, name: 'Item 1', value: 'Value 1' },
        { id: 2, name: 'Item 2', value: 'Value 2' },
        { id: 3, name: 'Item 3', value: 'Value 3' },
        // Add more items as needed
    ];

    const renderItem = ({ item }) => (
        <View style={{ padding: 16 }}>
            <Text>ID: {item.id}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Value: {item.value}</Text>
        </View>
    );

    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#91a8bd" }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "#91a8bd" },
                    headerShadowVisible: false,
                    headerTitle: ''
                }}
            />
            <View style={{
                flex: 1
            }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

export default Home;