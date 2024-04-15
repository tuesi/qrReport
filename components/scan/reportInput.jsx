import { useState } from 'react';
import { View, SafeAreaView, Alert, TouchableWithoutFeedback, TextInput, Keyboard, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import Styles from '../../styles/styles';
import scanStyles from './scanStyles';
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
        setFormData({ ...formData, dateCreated: new Date(date) })
        setShow(false);
    };

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const handleAddReport = async () => {
        try {
            await AddNewReport(formData);
            setScanned(false);
            Alert.alert('Success', 'Gedimas sėkmingai užregistruotas!');
            setFormData(new FormDataModel());
            navigation.navigate('index')
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={handlePressOutside}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}>
                    <SafeAreaView style={Styles.safeAreaStyle}>
                        <View style={scanStyles.scanInputContainer}>
                            <TextInput
                                style={Styles.input_disabled}
                                placeholder="Įrangos pavadinimas"
                                value={formData.name}
                                editable={false}
                            />
                            <TextInput
                                style={Styles.input_disabled_large}
                                placeholder="Papildoma informacija"
                                value={formData.notes}
                                editable={false}
                                multiline={true}
                                textAlignVertical='top'
                            />
                            <TouchableOpacity onPress={() => setShow(true)} style={Styles.date_input}>
                                <Text style={Styles.textStyle}>Gedimo data: {DateStringParser(date)}</Text>
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
                                placeholder="Įrangos vieta"
                                value={formData.location}
                                onChangeText={(text) => setFormData({ ...formData, location: text })}
                                multiline={true}
                                textAlignVertical='top'
                            />
                            <TextInput
                                style={Styles.input_large}
                                placeholder="Gedimo informacija"
                                value={formData.message}
                                onChangeText={(text) => setFormData({ ...formData, message: text })}
                                multiline={true}
                                textAlignVertical='top'
                            />
                            <Button text={'REGISTRUOTI GEDIMĄ'} color={Color.BUTTON_GREEN_BACKGROUND_COLOR} onPress={() => { ConfirmAction("Ar tikrai norite registruoti gedimą?", handleAddReport) }} />
                            <View>
                                <Button text={'SKENUOTI IŠ NAUJO'} color={Color.BUTTON_GREY_BACKGROUND_COLOR} onPress={() => setScanned(false)} />
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default ReportInput;