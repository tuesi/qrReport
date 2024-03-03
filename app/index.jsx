import { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig';

const Home = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchDataFromFirestore();
    }, [])

    const fetchDataFromFirestore = async () => {
        const reportRef = query(collection(FIRESTORE_DB, "reports"), orderBy("dateCreated", "desc"));
        const subscribe = onSnapshot(reportRef, (querySnapshot) => {
            const items = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            setData(items);
        })
        return () => subscribe();
    };

    const renderItem = ({ item }) => {
        const dateCreated = item.dateCreated?.toDate();

        // Format the date as a string for rendering
        // You can adjust the formatting according to your needs
        const dateString = dateCreated?.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        return (
            <View style={{ padding: 16 }}>
                <Text>Date: {dateString}</Text>
                <Text>ID: {item.deviceId}</Text>
                <Text>Name: {item.name}</Text>
                <Text>Notes: {item.notes}</Text>
                <Text>Message: {item.message}</Text>
            </View>
        );
    }

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