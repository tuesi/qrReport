import { useState } from 'react';
import { View, SafeAreaView, Alert, TouchableWithoutFeedback, TextInput, Keyboard, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from "react-native";
import GlobalStyles from '../../styles/styles';
import scanStyles from './scanStyles';
import * as Color from '../../styles/colors';
import { FormDataModel } from './FormDataModel';
import Button from '../common/button';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateStringParser from '../../utils/dateStringParser';
import { ConfirmAction } from '../common/confirmAction';
import SetImage from '../common/setImage';
import ImageViewModal from '../common/imageViewModal';
import { SaveImage } from '../../utils/saveImage';
import { SendPushNotification } from '../notifications/setNotifications';
import { getUser } from '../../utils/getMemoryObjects';
import TextInputWithLabel from '../common/textInputWithLabel';
import { AddNewReport } from '../api/reports';
import { useDispatch } from 'react-redux';
import { reportUpdateAction } from '../../store';
import { router } from "expo-router";

const ReportInput = ({ setDeviceScanned, formData, setFormData, deviceImageUrl }) => {

    const dispatch = useDispatch();

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);

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
            const userName = await getUser();
            const fileName = await SaveImage(image);
            const updatedFormData = { ...formData, imageName: fileName ?? '', createdBy: userName };
            await AddNewReport(updatedFormData);
            //send notification
            SendPushNotification(userName + ' užregistravo naują gedimą!', formData.name);
            Alert.alert('Success', 'Gedimas sėkmingai užregistruotas!', [
                {
                    text: 'OK', onPress: () => {
                        setDeviceScanned(false);
                        setFormData(new FormDataModel());
                        dispatch(reportUpdateAction());
                        router.replace("/home");
                    }
                }
            ]);
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
                    <SafeAreaView style={GlobalStyles.safeAreaStyle}>
                        <View style={scanStyles.scanInputContainer}>
                            <View style={{ marginBottom: '5%' }}>
                                <ImageViewModal uri={deviceImageUrl} size={100} />
                            </View>
                            <View style={{ width: '100%' }}>
                                <TextInputWithLabel
                                    style={GlobalStyles.input_disabled}
                                    labelText="Įrangos pavadinimas"
                                    value={formData.name}
                                    editable={false}
                                />
                                <View>
                                    <TextInputWithLabel
                                        style={GlobalStyles.input_disabled_large}
                                        labelText="Papildoma informacija"
                                        value={formData.notes}
                                        editable={false}
                                        multiline={true}
                                        textAlignVertical='top'
                                    />
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => setShow(true)} style={GlobalStyles.date_input}>
                                <Text style={GlobalStyles.textStyle}>Gedimo data: {DateStringParser(date)}</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={show}
                                mode="date"
                                onConfirm={onChange}
                                date={new Date()}
                                onCancel={() => setShow(false)}
                                themeVariant="light"
                            />
                            <TextInputWithLabel
                                style={GlobalStyles.input_large}
                                labelText="Įrangos vieta"
                                value={formData.location}
                                onChangeText={(text) => setFormData({ ...formData, location: text })}
                                multiline={true}
                                textAlignVertical='top'
                            />
                            <TextInputWithLabel
                                style={GlobalStyles.input_large}
                                labelText="Gedimo informacija"
                                value={formData.message}
                                onChangeText={(text) => setFormData({ ...formData, message: text })}
                                multiline={true}
                                textAlignVertical='top'
                            />
                            <View style={{ height: image ? "20%" : 0 }}>
                                <ImageViewModal uri={image} />
                            </View>
                            <View style={{ width: '80%', marginBottom: '10%' }}>
                                <SetImage image={image} setImage={setImage}></SetImage>
                            </View>
                            <Button text={'REGISTRUOTI GEDIMĄ'} color={Color.BUTTON_GREEN_BACKGROUND_COLOR} onPress={() => { ConfirmAction("Ar tikrai norite registruoti gedimą?", handleAddReport) }} />
                            <View>
                                <Button text={'SKENUOTI IŠ NAUJO'} color={Color.BUTTON_GREY_BACKGROUND_COLOR} onPress={() => setDeviceScanned(false)} />
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default ReportInput;