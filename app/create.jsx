import React, { useState } from "react";
import { View, Linking, TouchableWithoutFeedback, Keyboard, SafeAreaView } from "react-native";
import { Stack } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';
import Styles from '../styles/styles';
import * as Colors from '../styles/colors';
import QR from "../components/create/QR";
import CreateInput from "../components/create/createInput";

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
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BACKGROUND_COLOR }}>
                <Stack.Screen
                    options={{
                        headerStyle: { backgroundColor: Colors.BACKGROUND_COLOR },
                        headerShadowVisible: false,
                        headerTitle: ''
                    }}
                />
                <View style={Styles.container}>
                    <CreateInput name={name} notes={notes} setName={setName} setNotes={setNotes}></CreateInput>
                    <QR name={name} notes={notes}></QR>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default Create;