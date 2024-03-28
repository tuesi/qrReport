import { View, Text, TouchableOpacity } from 'react-native';
import DateStringParser from '../../utils/dateStringParser';

const RenderItem = ({ item }) => {
    const dateCreated = DateStringParser(item.dateCreated);
    const dateCompleted = DateStringParser(item.dateCompleted);
    return (
        <TouchableOpacity onPress={() => {
            setSelectedItem(item);
            setModalVisible(true);
        }}>
            <View style={{ padding: 16 }}>
                {dateCompleted && (
                    <Text>DateCompleted: {dateCompleted}</Text>
                )}
                <Text>Date: {dateCreated}</Text>
                <Text>ID: {item.deviceId}</Text>
                <Text>Name: {item.name}</Text>
                <Text>Notes: {item.notes}</Text>
                <Text>Message: {item.message}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default RenderItem;