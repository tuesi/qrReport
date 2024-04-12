import { View, Text, TouchableOpacity } from 'react-native';
import DateStringParser from '../../utils/dateStringParser';
import Styles from '../../styles/styles';
import * as Color from '../../styles/colors';

const DeviceRenderItem = ({ item, setSelectedItem, setModalVisible }) => {

    const dateCreated = DateStringParser(item.created);

    return (
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
                        <Text style={Styles.listItemInfoText}>{item.notes}</Text>
                    </View>
                    <View style={Styles.dateRowContainer}>
                        <Text style={Styles.listItemInfoText}>Sukurta</Text>
                        <Text style={Styles.listItemInfoText}>{dateCreated}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    );
}

export default DeviceRenderItem;