import { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../firebaseConfig';
import { signInAnonymously } from 'firebase/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Edit from '../components/Edit/edit';

const Home = () => {

    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchDataFromFirestore();
    }, [])

    const fetchDataFromFirestore = async () => {
        await signInAnonymously(FIREBASE_AUTH);
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
        const dateCompleted = item.dateCompleted?.toDate();

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

        const dateStringCompleted = dateCompleted?.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        return (

            <TouchableOpacity onPress={() => {
                setSelectedItem(item);
                setModalVisible(true);
            }}>
                <View style={{ padding: 16 }}>
                    {dateStringCompleted && (
                        <Text>DateCompleted: {dateStringCompleted}</Text>
                    )}
                    <Text>Date: {dateString}</Text>
                    <Text>ID: {item.deviceId}</Text>
                    <Text>Name: {item.name}</Text>
                    <Text>Notes: {item.notes}</Text>
                    <Text>Message: {item.message}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const router = useRouter();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
                    {modalVisible && (
                        <Edit
                            setModalVisible={setModalVisible}
                            selectedItem={selectedItem}
                        ></Edit>
                    )}
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default Home;