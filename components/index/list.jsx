import { useState } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Edit from '../modals/edit';
import RenderItem from './RenderListItem';
import Styles from '../../styles/styles';

const List = ({ data, setStartAfter }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchData = () => {
        setStartAfter(data[data.length - 1].dateCreated);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#1e232e" }}>
                <Stack.Screen
                    options={{
                        headerStyle: { backgroundColor: "#1e232e" },
                        headerShadowVisible: false,
                        headerTitle: ''
                    }}
                />
                <View style={Styles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item }) => RenderItem({ item, setSelectedItem, setModalVisible })}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={fetchData}
                        onEndReachedThreshold={0.1}
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

export default List;