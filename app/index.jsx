import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';

const Home = () => {

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    flex: 1,
                    padding: 16
                }}>
                    <Text>hello</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;