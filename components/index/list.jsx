import { useState } from 'react';
import { View, SafeAreaView, FlatList, Text } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Edit from '../modals/edit';
import RenderItem from './RenderListItem';
import Styles from '../../styles/styles';
import * as Colors from '../../styles/colors';

const List = ({ data, setStartAfter, loading, setLoading }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [previousLastItem, setPreviousLastItem] = useState(null);

    const fetchData = () => {
        if (!previousLastItem && previousLastItem != data[data.length - 1]) {
            setStartAfter(data[data.length - 1].dateCreated);
            setLoading(true);
            setPreviousLastItem(data[data.length - 1]);
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BACKGROUND_COLOR }}>
                <Stack.Screen
                    options={{
                        headerStyle: { backgroundColor: Colors.BACKGROUND_COLOR },
                        headerShadowVisible: false,
                        headerTitle: '',
                        headerBackVisible: false,
                        headerTransparent: true
                    }}
                />
                <View style={Styles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        horizontal={false}
                        renderItem={({ item }) => RenderItem({ item, setSelectedItem, setModalVisible })}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={fetchData}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={loading && <Text style={Styles.textStyle}>Loading...</Text>}
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