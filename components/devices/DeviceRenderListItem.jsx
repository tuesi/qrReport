import { View, Text, TouchableOpacity } from 'react-native';
import DateStringParser from '../../utils/dateStringParser';
import GlobalStyles from '../../styles/styles';
import * as Color from '../../styles/colors';

const DeviceRenderItem = ({ item, setSelectedItem, setModalVisible }) => {

    const dateCreated = DateStringParser(item.created);

    return (
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
                        <Text style={GlobalStyles.listItemInfoText}>{item.notes}</Text>
                    </View>
                    <View style={GlobalStyles.dateRowContainer}>
                        <Text style={GlobalStyles.listItemInfoText}>Sukurta</Text>
                        <Text style={GlobalStyles.listItemInfoText}>{dateCreated}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    );
}

export default DeviceRenderItem;