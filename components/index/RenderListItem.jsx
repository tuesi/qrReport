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
            <View style={Styles.listItemContainer}>
                <View style={{ flex: 10 }}>
                    <View style={Styles.listItemHeader}>
                        <Text style={Styles.listItemHeaderText}>{item.name}</Text>
                    </View>
                    <View style={Styles.listItemInfo}>
                        <Text style={Styles.listItemInfoText}>{item.message}</Text>
                    </View>
                    <View style={Styles.listItemLocation}>
                        <Text style={Styles.listItemLocationText}>{item.location}</Text>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                }}>
                    {dateCompleted && (
                        <View style={[Styles.dateRowContainer, { marginBottom: 5 }]}>
                            <Text style={Styles.labelStyle}>Įvykdymo data</Text>
                            <View style={Styles.backgroundCircleGreen}>
                                <Text style={Styles.dateTextStyle}>{dateCompleted}</Text>
                            </View>
                        </View>
                    )}
                    <View style={Styles.dateRowContainer}>
                        <Text style={Styles.labelStyle}>Gedimo Data</Text>
                        <View style={Styles.backgroundCircleGray}>
                            <Text style={Styles.dateTextStyle}>{dateCreated}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    );
}

export default RenderItem;