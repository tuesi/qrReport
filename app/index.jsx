import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { realmAppId } from '../realmConfig';
import { useQuery } from '@realm/react';
import { Report } from '../schemas/report';

const app = new Realm.App({ id: realmAppId });

const Home = () => {

    const reports = useQuery(Report);

    useEffect(() => {
        const authenticate = async () => {
            try {
                // Log in anonymously
                const user = await app.logIn(Realm.Credentials.anonymous());
                console.log("Successfully logged in as an anonymous user!", user.id);
                // You can now open a Realm, read and write data, etc.
            } catch (err) {
                console.error("Failed to log in anonymously:", err);
            }
        };

        authenticate();
    }, []);

    const renderItem = ({ item }) => (
        <View style={{ padding: 16 }}>
            <Text>ID: {item.deviceId}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Is Completed: {item.isComplete ? 'Yes' : 'No'}</Text>
            <Text>Value: {item.description}</Text>
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
                    data={reports}
                    renderItem={renderItem}
                    keyExtractor={item => item._id.toHexString()}
                />
            </View>
        </SafeAreaView>
    )
}

export default Home;