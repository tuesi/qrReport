import React, { useState, useRef } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert, Linking, TouchableWithoutFeedback, Keyboard } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import Styles from '../styles/styles';
import { FIRESTORE_DB } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const Create = () => {

    const [fileUri, setFileUri] = useState('');

    let logoFromFile = require('../assets/aug.png');

    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    const [deviceId, setDeviceId] = useState('');
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [qrData, setQRData] = useState('');

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

    const shareCode = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            Alert.alert('Error', 'Sharing is not available on this device');
            return;
        }

        if (fileUri) {
            await Sharing.shareAsync(fileUri);
            return;
        }

        this.svg.toDataURL(async (dataURL) => {
            const fileName = 'qrcode.png';
            const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
            await FileSystem.writeAsStringAsync(fileUri, dataURL, {
                encoding: FileSystem.EncodingType.Base64,
            });
            setFileUri(fileUri);
            await Sharing.shareAsync(fileUri);
        });
    }

    const generateQRCode = async () => {
        if (!name || !notes) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            const data = {
                name: name,
                notes: notes
            };

            const docRef = await addDoc(collection(FIRESTORE_DB, "devices"), data);

            const qrData = {
                tag: "GenijausTadoUAB",
                deviceId: docRef.id
            };
            const jsonData = JSON.stringify(qrData);
            setQRData(jsonData);

        } catch (e) {
            console.log(e);
            Alert.alert('Error', 'Error saving data');
        }
    };

    const saveQRCode = async () => {
        if (!qrData) {
            Alert.alert('Error', 'No QR code to save');
            return;
        }

        try {
            await handleCameraPermission();
            this.svg.toDataURL(async (dataURL) => {
                const fileName = 'qrcode.png';
                const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
                await FileSystem.writeAsStringAsync(fileUri, dataURL, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                await MediaLibrary.createAssetAsync(fileUri);
                console.log('QR code saved to camera roll');
                Alert.alert('Success', 'QR code saved to camera roll');
            })
        } catch (error) {
            console.error('Failed to save QR code to gallery', error);
            Alert.alert('Error', 'Failed to save QR code to gallery');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={Styles.container}>
                <TextInput
                    style={Styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Notes"
                    value={notes}
                    onChangeText={text => setNotes(text)}
                />
                <Button title="Generate QR Code" onPress={generateQRCode} />
                {qrData ? (
                    <>
                        <QRCode value={qrData} size={200} logo={logoFromFile} getRef={(c) => (this.svg = c)} />
                        <Button title="Save QR Code" onPress={saveQRCode} />
                        <Button title="Share QR Code" onPress={shareCode} />
                    </>
                ) : null}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Create;