import { View, Text, TouchableOpacity } from 'react-native';
import DateStringParser from '../../utils/dateStringParser';
import Styles from '../../styles/styles';
import * as Color from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';

const PartRenderItem = ({ item, setSelectedItem, setModalVisible }) => {
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
                            <Text style={Styles.listItemInfoText}>{item.amount}</Text>
                        </View>
                        {item.amount < item.minAmount ? (
                            <Ionicons name="warning-outline" size={24} color="red" />
                        ) : (
                            <Text style={Styles.listItemInfoText}></Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity >
        </View>
    );
}

export default PartRenderItem;