import { View, Text, TouchableOpacity } from 'react-native';
import DateStringParser from '../../utils/dateStringParser';
import GlobalStyles from '../../styles/styles';
import * as Color from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';

const PartRenderItem = ({ item, setSelectedItem, setModalVisible }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => {
                setSelectedItem(item);
                setModalVisible(true);
            }}>
                <View style={GlobalStyles.listItemContainer}>
                    <View>
                        <View style={GlobalStyles.listItemHeader}>
                            <Text style={GlobalStyles.listItemHeaderText}>{item.name}</Text>
                        </View>
                        <View style={GlobalStyles.listItemInfo}>
                            <Text style={GlobalStyles.listItemInfoText}>{item.amount}</Text>
                        </View>
                        {item.amount < item.minAmount ? (
                            <Ionicons name="warning-outline" size={24} color="red" />
                        ) : (
                            <Text style={GlobalStyles.listItemInfoText}></Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity >
        </View>
    );
}

export default PartRenderItem;