import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import Styles from '../../styles/styles';
import * as Color from '../../styles/colors';

const ReportDate = ({ date, color, completed, maxLateDays }) => {

    const currentDate = new Date();
    const [newColor, setNewColor] = useState(color);

    useEffect(() => {
        if (completed) {
            setNewColor(Color.REPORT_DATE_AFTER_COMPLETE_COLOR);
        }

        if (maxLateDays) {
            let checkDate = new Date(currentDate);
            checkDate.setDate(currentDate.getDate() - maxLateDays);
            if (checkDate > new Date(date)) {
                setNewColor(Color.REPORT_DATE_LATE_COLOR);
            }
        }
    }, [])

    return (
        <View style={[Styles.backgroundCircle, { backgroundColor: newColor }]}>
            <Text style={Styles.dateTextStyle}>{date}</Text>
        </View>
    )
}

export default ReportDate;