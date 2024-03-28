import { View, Text, TouchableOpacity } from 'react-native';
import DateStringParser from '../../utils/dateStringParser';
import Styles from '../../styles/styles';

const RenderItem = ({ item, setSelectedItem, setModalVisible }) => {
    const dateCreated = DateStringParser(item.dateCreated);
    const dateCompleted = DateStringParser(item.dateCompleted);
    return (
        <TouchableOpacity onPress={() => {
            setSelectedItem(item);
            setModalVisible(true);
        }}>
            <View style={{ padding: 16 }}>
                {dateCompleted && (
                    <Text style={Styles.textStyle}>DateCompleted: {dateCompleted}</Text>
                )}
                <Text style={Styles.textStyle}>Date: {dateCreated}</Text>
                <Text style={Styles.textStyle}>ID: {item.deviceId}</Text>
                <Text style={Styles.textStyle}>Name: {item.name}</Text>
                <Text style={Styles.textStyle}>Notes: {item.notes}</Text>
                <Text style={Styles.textStyle}>Message: {item.message}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default RenderItem;