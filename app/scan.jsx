import React, { useState } from "react";
import { View, Text, Button, Linking, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Camera, CameraView, useCameraPermissions, CameraType } from "expo-camera/next";
import { FIRESTORE_DB } from '../firebaseConfig';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Styles from '../styles/styles';

const Create = () => {

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [formData, setFormData] = useState(new FormDataModel());

    const navigation = useNavigation();

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const handleCameraPermission = () => {
        if (!permission.canAskAgain) {
            Linking.openSettings();
        } else {
            requestPermission();
        }
    }

    const handleAddReport = async () => {
        try {
            console.log(formData);
            console.log(formData);
            const docRef = await addDoc(collection(FIRESTORE_DB, "reports"), formData);
            console.log("Document written with ID: ", docRef.id);
            setScanned(false);
            Alert.alert('Success', 'Report has beeen issued!');
            setFormData(new FormDataModel());
            navigation.navigate('index')
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const handleBarCodeScanned = async ({ data }) => {
        try {
            setScanned(true);
            const parsedData = JSON.parse(data);

            console.log(parsedData.deviceId);

            const deviceDocRef = doc(FIRESTORE_DB, "devices", parsedData.deviceId);
            const docSnapshot = await getDoc(deviceDocRef);

            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                console.log("snaphot", docSnapshot.data());
                const formDataInstance = new FormDataModel(parsedData.deviceId, data.name, data.notes);
                setFormData(formDataInstance);
                console.log(formData);
            } else {
                Alert.alert('Error', 'Scanned QR code does not contain a valid device');
            }
        } catch (error) {
            console.log('error parsing');
            setScanned(true);
        }
    };

    if (permission && !permission.granted) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>No access to camera</Text>
                <Button
                    title="Request Permission"
                    onPress={() => handleCameraPermission()}
                />
            </View>
        );
    }

    if (!scanned) {
        return (
            <View style={Styles.cameraViewContainer}>
                <CameraView style={Styles.cameraView}
                    facing='back'
                    onBarcodeScanned={handleBarCodeScanned}
                    barCodeScannerSettings={{
                        barCodeTypes: ["qr"]
                    }} />
            </View>
        )
    } else {
        return (
            <TouchableWithoutFeedback onPress={handlePressOutside}>
                <View style={Styles.container}>
                    <TextInput
                        style={Styles.input}
                        placeholder="Name"
                        value={formData.name}
                        editable={false}
                    />
                    <TextInput
                        style={Styles.input}
                        placeholder="Notes"
                        value={formData.notes}
                        editable={false}
                    />
                    <TextInput
                        style={Styles.input_large}
                        placeholder="Message"
                        value={formData.message}
                        onChangeText={(text) => setFormData({ ...formData, message: text })}
                        multiline={true}
                    />
                    <Button
                        title="Report"
                        onPress={() => handleAddReport()}
                    />
                    <Button
                        title="Scan again"
                        onPress={() => setScanned(false)}
                    />
                </View>
            </TouchableWithoutFeedback>)
    }
}

export class FormDataModel {
    constructor(deviceId, name, notes, message = '') {
        this.deviceId = deviceId;
        this.name = name;
        this.notes = notes;
        this.message = message;
        this.dateCreated = new Date();
        this.dateCompleted = null;
    }
}

export default Create;