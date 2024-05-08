import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Styles from '../../styles/styles';
import * as Color from '../../styles/colors';
import { useEffect, useRef, useState } from 'react';
import PartRenderItem from './PartRenderListItem';
import { GetPartsByDeviceId } from '../firebase/data';

const PartDeviceRenderItem = ({ item, selectedItem, setSelectedItem }) => {

    const currentItem = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [showChildren, setShowChildren] = useState(false);
    const [selectedItemChild, setSelectedItemChild] = useState();
    const [previousLastItem, setPreviousLastItem] = useState(null);

    const fetchData = () => {
        if (data[data.length - 1] == null || previousLastItem !== data[data.length - 1]) {
            setLoading(true);
            setPreviousLastItem(data[data.length - 1]);
        }
    }

    getDeviceParts = async () => {
        console.log(selectedItem);
        console.log(selectedItem.deviceId);
        if (!showChildren && data.length === 0) {
            parts = await GetPartsByDeviceId(selectedItem.deviceId);
            setData(parts);
        }
        setShowChildren(value => !value);
    }

    return (
        <View>
            <TouchableOpacity onPress={() => {
                setSelectedItem(item);
                getDeviceParts();
            }}>
                <View style={Styles.listItemContainer}>
                    <View>
                        <View style={Styles.listItemHeader}>
                            <Text style={Styles.listItemHeaderText}>{item.name}</Text>
                        </View>
                        <View style={Styles.listItemInfo}>
                            <Text style={Styles.listItemInfoText}>warning if any parts low</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
            {data && showChildren && (
                <FlatList
                    style={{ width: "90%", marginBottom: '20%', borderRadius: 20 }}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    horizontal={false}
                    renderItem={({ item }) => <PartRenderItem item={item} />}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={fetchData}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={loading && <Text style={Styles.textStyle}>Loading...</Text>}
                />
            )}
        </View>
    );
}

export default PartDeviceRenderItem;