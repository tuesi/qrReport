import React, { useState } from "react";
import { ScrollView, Linking, TouchableWithoutFeedback, Keyboard, SafeAreaView, View } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import Styles from '../../../styles/styles';
import QR from "../../../components/create/QR";
import CreateInput from "../../../components/create/createInput";
import SetImage from "../../../components/common/setImage";
import styles from "../../../styles/styles";

const Create = () => {

    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState(null);

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
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 150, alignItems: 'center', justifyContent: 'center' }} style={{ width: '100%' }}>
                <CreateInput name={name} notes={notes} setName={setName} setNotes={setNotes} image={image}></CreateInput>
                <View style={{ flex: 1, width: '80%' }}>
                    <SetImage image={image} setImage={setImage}></SetImage>
                </View>
                <QR name={name} notes={notes} setName={setName} setNotes={setNotes} image={image}></QR>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default Create;