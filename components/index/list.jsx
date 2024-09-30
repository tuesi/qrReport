import { useState } from 'react';
import { View, SafeAreaView, FlatList, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Edit from '../modals/edit';
import RenderItem from './RenderListItem';
import GlobalStyles from '../../styles/styles';
import * as Colors from '../../styles/colors';
import SearchBar from '../common/searchBar';

const List = ({ data, loading, setLoading, setSearchText, refreshing, setRefreshing, updateListData }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [previousLastItem, setPreviousLastItem] = useState(null);

    const fetchData = () => {
        if (data[data.length - 1] == null || previousLastItem !== data[data.length - 1]) {
            setLoading(true);
            setPreviousLastItem(data[data.length - 1]);
        }
    }

    const handleRefresh = async () => {
        setRefreshing(true);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[GlobalStyles.safeAreaStyle, { marginTop: '25%' }]}>
                <View style={{ width: "90%", alignItems: 'flex-end', justifyContent: 'center', marginBottom: '2%' }}>
                    <SearchBar setSearchText={setSearchText} />
                </View>
                <View style={GlobalStyles.container}>
                    <FlatList
                        style={{ width: "90%", marginBottom: '10%', borderRadius: 20 }}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        horizontal={false}
                        renderItem={({ item }) => RenderItem({ item, setSelectedItem, setModalVisible })}
                        keyExtractor={item => item._id.toString()}
                        onEndReached={fetchData}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={loading && <Text style={GlobalStyles.textStyle}>Loading...</Text>}
                        initialNumToRender={5}
                        maxToRenderPerBatch={5}

                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                    {modalVisible && (
                        <Edit
                            setModalVisible={setModalVisible}
                            selectedItem={selectedItem}
                            updateListData={updateListData}
                        ></Edit>
                    )}
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default List;