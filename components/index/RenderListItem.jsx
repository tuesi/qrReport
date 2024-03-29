import { View, Text, TouchableOpacity } from 'react-native';
import DateStringParser from '../../utils/dateStringParser';
import Styles from '../../styles/styles';
import * as Color from '../../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';

const RenderItem = ({ item, setSelectedItem, setModalVisible }) => {
    const dateCreated = DateStringParser(item.dateCreated);
    const dateCompleted = DateStringParser(item.dateCompleted);
    return (
        <TouchableOpacity onPress={() => {
            setSelectedItem(item);
            setModalVisible(true);
        }}>
            <View style={Styles.listItemContainer}>
                {dateCompleted && (
                    <View style={Styles.rowContainer}>
                        <Text style={Styles.labelStyle}>DateCompleted</Text>
                        <Text style={Styles.textStyle}>{dateCompleted}</Text>
                    </View>
                )}
                <View style={Styles.rowContainer}>
                    <Text style={Styles.labelStyle}>Date</Text>
                    <Text style={Styles.textStyle}>{dateCreated}</Text>
                </View>
                <View style={Styles.rowContainer}>
                    <Text style={Styles.labelStyle}>Device</Text>
                    <Text style={Styles.textStyle}>{item.name}</Text>
                </View>
                <View style={Styles.rowContainer}>
                    <Text style={Styles.labelStyle}>Info</Text>
                    <Text style={Styles.textStyle}>{item.message}</Text>
                </View>
            </View>
        </TouchableOpacity >
    );
}

export default RenderItem;