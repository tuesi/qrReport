import React, { useState } from "react";
import { ScrollView, Linking, TouchableWithoutFeedback, Keyboard, SafeAreaView } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import Styles from '../styles/styles';
import QR from "../components/create/QR";
import CreateInput from "../components/create/createInput";
import { LinearGradient } from 'expo-linear-gradient';

const Create = () => {

    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');

    const handleCameraPermission = async () => {
        if (permissionResponse && !permissionResponse.canAskAgain) {
            Linking.openSettings();
        } else {
            requestPermission();
        }
    }

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}>
                <SafeAreaView style={Styles.safeAreaStyle}>
                    <CreateInput name={name} notes={notes} setName={setName} setNotes={setNotes}></CreateInput>
                    <QR name={name} notes={notes} setName={setName} setNotes={setNotes}></QR>
                </SafeAreaView>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default Create;