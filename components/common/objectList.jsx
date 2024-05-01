import { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import DeviceInfo from '../modals/deviceInfo';
import DeviceRenderItem from '../devices/DeviceRenderListItem';
import Styles from '../../styles/styles';

const ObjectList = ({ data, loading, setLoading }) => {

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
        <View style={Styles.container}>
            <FlatList
                style={{ width: "90%", marginBottom: '20%', borderRadius: 20 }}
                showsVerticalScrollIndicator={false}
                data={data}
                horizontal={false}
                renderItem={({ item }) => DeviceRenderItem({ item, setSelectedItem, setModalVisible })}
                keyExtractor={item => item.id.toString()}
                onEndReached={fetchData}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading && <Text style={Styles.textStyle}>Loading...</Text>}
            />
            {modalVisible && (
                <DeviceInfo
                    setModalVisible={setModalVisible}
                    selectedItem={selectedItem}
                ></DeviceInfo>
            )}
        </View>
    )
}

export default ObjectList;