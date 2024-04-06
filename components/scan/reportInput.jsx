import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, SafeAreaView, Alert, TouchableWithoutFeedback, TextInput, Keyboard, TouchableOpacity, Text } from "react-native";
import Styles from '../../styles/styles';
import * as Color from '../../styles/colors';
import { FormDataModel } from './FormDataModel';
import { useNavigation } from '@react-navigation/native';
import { AddNewReport } from '../firebase/data';
import Button from '../common/button';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateStringParser from '../../utils/dateStringParser';

const ReportInput = ({ setScanned, formData, setFormData }) => {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const navigation = useNavigation();

    const onChange = (date) => {
        setDate(date);
        setShow(false);
    };

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const handleAddReport = async () => {
        try {
            await AddNewReport(formData);
            setScanned(false);
            Alert.alert('Success', 'Report has beeen issued!');
            setFormData(new FormDataModel());
            navigation.navigate('index')
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <SafeAreaView style={Styles.safeAreaStyle}>
                <View style={Styles.scanInputContainer}>
                    <TextInput
                        style={Styles.input_disabled}
                        placeholder="Name"
                        value={formData.name}
                        editable={false}
                    />
                    <TextInput
                        style={Styles.input_disabled_large}
                        placeholder="Notes"
                        value={formData.notes}
                        editable={false}
                        multiline={true}
                        textAlignVertical='top'
                    />
                    <TouchableOpacity onPress={() => setShow(true)} style={Styles.date_input}>
                        <Text style={Styles.textStyle}>Reported on: {DateStringParser(date)}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={show}
                        mode="date"
                        onConfirm={onChange}
                        date={new Date()}
                        onCancel={() => setShow(false)}
                        themeVariant="light"
                    />
                    <TextInput
                        style={Styles.input_large}
                        placeholder="Device location"
                        value={formData.message}
                        onChangeText={(text) => setFormData({ ...formData, message: text })}
                        multiline={true}
                        textAlignVertical='top'
                    />
                    <TextInput
                        style={Styles.input_large}
                        placeholder="Damage info"
                        value={formData.message}
                        onChangeText={(text) => setFormData({ ...formData, message: text })}
                        multiline={true}
                        textAlignVertical='top'
                    />
                    <Button text={'Report'} color={Color.BUTTON_GREEN_BACKGROUND_COLOR} onPress={() => handleAddReport()} />
                    <Button text={'Scan again'} color={Color.BUTTON_BLUE_BACKGROUND_COLOR} onPress={() => setScanned(false)} />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default ReportInput;