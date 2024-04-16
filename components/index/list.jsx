import { useState } from 'react';
import { View, SafeAreaView, FlatList, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Edit from '../modals/edit';
import RenderItem from './RenderListItem';
import Styles from '../../styles/styles';
import * as Colors from '../../styles/colors';
import SearchBar from '../common/searchBar';

const List = ({ data, loading, setLoading, setSearchText }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [previousLastItem, setPreviousLastItem] = useState(null);

    const fetchData = () => {
        if (data[data.length - 1] == null || previousLastItem !== data[data.length - 1]) {
            setLoading(true);
            setPreviousLastItem(data[data.length - 1]);
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[Styles.safeAreaStyle, { marginTop: 60 }]}>
                <View style={{ width: "90%", alignItems: 'flex-end', justifyContent: 'center', marginBottom: '2%' }}>
                    <SearchBar setSearchText={setSearchText} />
                </View>
                <View style={Styles.container}>
                    <FlatList
                        style={{ width: "90%", marginBottom: '10%', borderRadius: 20 }}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        horizontal={false}
                        renderItem={({ item }) => RenderItem({ item, setSelectedItem, setModalVisible })}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={fetchData}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={loading && <Text style={Styles.textStyle}>Loading...</Text>}
                        initialNumToRender={5}
                        maxToRenderPerBatch={5}
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