import { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import DeviceInfo from '../modals/deviceInfo';
import DeviceRenderItem from './DeviceRenderListItem';
import GlobalStyles from '../../styles/styles';

const DeviceList = ({ data, loading, setLoading, updateListData, refreshing, setRefreshing, setLastCreatedDate }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchData = () => {
        if (data.length > 0) {
            setLoading(true);
            setLastCreatedDate(data[data.length - 1].created);
        }
    }

    const handleRefresh = async () => {
        setLastCreatedDate(null);
        setRefreshing(true);
    }

    return (
        <View style={GlobalStyles.container}>
            <FlatList
                style={{ width: "90%", marginBottom: '20%', borderRadius: 20 }}
                showsVerticalScrollIndicator={false}
                data={data}
                horizontal={false}
                renderItem={({ item }) => DeviceRenderItem({ item, setSelectedItem, setModalVisible })}
                keyExtractor={item => item._id.toString()}
                onEndReached={fetchData}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading && <Text style={GlobalStyles.textStyle}>Loading...</Text>}

                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
            {modalVisible && (
                <DeviceInfo
                    setModalVisible={setModalVisible}
                    selectedItem={selectedItem}
                    updateListData={updateListData}
                ></DeviceInfo>
            )}
        </View>
    )
}

export default DeviceList;