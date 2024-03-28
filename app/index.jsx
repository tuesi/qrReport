import { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../firebaseConfig';
import { signInAnonymously } from 'firebase/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Edit from '../components/modals/edit';
import RenderItem from '../components/index/listItem';

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
                        renderItem={RenderItem}
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