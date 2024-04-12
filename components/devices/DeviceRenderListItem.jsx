import { View, Text, TouchableOpacity } from 'react-native';
import DateStringParser from '../../utils/dateStringParser';
import Styles from '../../styles/styles';
import * as Color from '../../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';

const DeviceRenderItem = ({ item, setSelectedItem, setModalVisible }) => {
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
                </View>
            </View>
        </TouchableOpacity >
    );
}

export default DeviceRenderItem;