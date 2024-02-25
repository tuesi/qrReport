import React, { useState, useRef } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert, Linking, TouchableWithoutFeedback, Keyboard } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Realm } from '@realm/react';

const Create = () => {

    let logoFromFile = require('../assets/aug.png');

    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
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

    const generateQRCode = () => {
        if (!id || !name || !value) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const data = {
            id: id,
            name: name,
            value: value
        };
        const jsonData = JSON.stringify(data);
        setQRData(jsonData);
    };

    const saveQRCode = async () => {
        if (!qrData) {
            Alert.alert('Error', 'No QR code to save');
            return;
        }

        try {
            await handleCameraPermission();
            this.svg.toDataURL(async (dataURL) => {
                const fileName = 'qrcode.png'; // Set desired file name
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
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="ID"
                    value={id}
                    onChangeText={text => setId(text)}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Value"
                    value={value}
                    onChangeText={text => setValue(text)}
                />
                <Button title="Generate QR Code" onPress={generateQRCode} />
                {qrData ? (
                    <>
                        <QRCode value={qrData} size={200} logo={logoFromFile} getRef={(c) => (this.svg = c)} />
                        <Button title="Save QR Code" onPress={saveQRCode} />
                    </>
                ) : null}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

class Report extends Realm.Object {
    static schema = {
        name: 'Report',
        properties: {
            id: { type: 'int', indexed: true },
            name: 'string',
            value: 'string'
        },
    };
}

export default Create;