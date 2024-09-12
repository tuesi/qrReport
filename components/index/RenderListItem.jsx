import { View, Text, TouchableOpacity } from 'react-native';
import DateStringParser from '../../utils/dateStringParser';
import GlobalStyles from '../../styles/styles';
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
            <View style={GlobalStyles.listItemContainer}>
                <View style={{ flex: 10 }}>
                    <View style={GlobalStyles.listItemHeader}>
                        <Text style={GlobalStyles.listItemHeaderText}>{item.name}</Text>
                    </View>
                    <View style={GlobalStyles.listItemInfo}>
                        <Text style={GlobalStyles.listItemInfoText}>{item.message}</Text>
                    </View>
                    <View style={GlobalStyles.listItemLocation}>
                        <Text style={GlobalStyles.listItemLocationText}>{item.location}</Text>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                }}>
                    {dateCompleted && (
                        <View style={[GlobalStyles.dateRowContainer, { marginBottom: 5 }]}>
                            <Text style={GlobalStyles.labelStyle}>Įvykdymo data</Text>
                            <ReportDate date={dateCreated} color={Color.REPORT_DATE_COMPLETE_COLOR}></ReportDate>
                        </View>
                    )}
                    <View style={GlobalStyles.dateRowContainer}>
                        <Text style={GlobalStyles.labelStyle}>Gedimo Data</Text>
                        <ReportDate date={dateCreated} color={Color.REPORT_DATE_NEW_COLOR} completed={!!dateCompleted} maxLateDays={5}></ReportDate>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    );
}

export default RenderItem;