import React, { useState } from "react";
import { ScrollView, Linking, TouchableWithoutFeedback, Keyboard, SafeAreaView } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import Styles from '../styles/styles';
import QR from "../components/create/QR";
import CreateInput from "../components/create/createInput";
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

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

    const takePicture = async () => {
        try {
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.back,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const pickImage = async () => {
        try {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {

        }
    };

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}>
                <SafeAreaView style={Styles.safeAreaStyle}>
                    <CreateInput name={name} notes={notes} setName={setName} setNotes={setNotes} image={image} pickImage={pickImage} takePicture={takePicture}></CreateInput>
                    <QR name={name} notes={notes} setName={setName} setNotes={setNotes}></QR>
                </SafeAreaView>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default Create;