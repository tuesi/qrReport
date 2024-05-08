import { View, Text, TouchableOpacity } from 'react-native';
import DateStringParser from '../../utils/dateStringParser';
import Styles from '../../styles/styles';
import * as Color from '../../styles/colors';
import { useState } from 'react';

const PartRenderItem = ({ item }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState();

    return (
        <View>
            <TouchableOpacity onPress={() => {
                setSelectedItem(item);
                setModalVisible(true);
            }}>
                <View style={Styles.listItemContainer}>
                    <View>
                        <View style={Styles.listItemHeader}>
                            <Text style={Styles.listItemHeaderText}>{item.name}</Text>
                        </View>
                        <View style={Styles.listItemInfo}>
                            <Text style={Styles.listItemInfoText}>Amount</Text>
                        </View>
                        <View style={Styles.listItemInfo}>
                            <Text style={Styles.listItemInfoText}>Warning</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
            {/* TODO change to part info and put this part inside the part and not devices of parts */}
            {modalVisible && (
                <DeviceInfo
                    setModalVisible={setModalVisible}
                    selectedItem={selectedItem}
                ></DeviceInfo>
            )}
        </View>
    );
}

export default PartRenderItem;