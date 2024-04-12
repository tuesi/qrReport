import { View, Text, TouchableOpacity } from 'react-native';
import DateStringParser from '../../utils/dateStringParser';
import Styles from '../../styles/styles';
import ReportDate from '../common/reportDate';
import * as Color from '../../styles/colors';

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
                            <ReportDate date={dateCreated} color={Color.REPORT_DATE_COMPLETE_COLOR}></ReportDate>
                        </View>
                    )}
                    <View style={Styles.dateRowContainer}>
                        <Text style={Styles.labelStyle}>Gedimo Data</Text>
                        <ReportDate date={dateCreated} color={Color.REPORT_DATE_NEW_COLOR} completed={!!dateCompleted} maxLateDays={5}></ReportDate>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    );
}

export default RenderItem;