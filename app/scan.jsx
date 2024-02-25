import React, { useState } from "react";
import { View, Text, Button, Linking, StyleSheet, TextInput } from "react-native";
import { Camera, CameraView, useCameraPermissions, CameraType } from "expo-camera/next";
import { useRealm } from '@realm/react';
import { Report } from '../schemas/report';

const Create = () => {

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [formData, setFormData] = useState(new FormDataModel());

    const realm = useRealm();


    const handleCameraPermission = () => {
        if (!permission.canAskAgain) {
            Linking.openSettings();
        } else {
            requestPermission();
        }
    }

    const handleAddReport = () => {
        realm.write(() => {
            realm.create('Report', Report.generate(formData.id, formData.name, formData.value, false));
        });
    };

    const handleBarCodeScanned = ({ data }) => {
        const parsedData = JSON.parse(data);
        setFormData(parsedData);
        setScanned(true);
        console.log(formData);
    };

    const saveReport = () => {
        console.log("data saved");
    }

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
            <View style={styles.cameraViewContainer}>
                <CameraView style={styles.cameraView}
                    facing='back'
                    onBarcodeScanned={handleBarCodeScanned}
                    barCodeScannerSettings={{
                        barCodeTypes: ["qr"]
                    }} />
            </View>
        )
    } else {
        return <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="ID"
                value={formData.id}
                keyboardType="numeric"
                editable={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={formData.name}
                editable={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Value"
                value={formData.value}
                editable={false}
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
    }
}

const styles = StyleSheet.create({
    cameraViewContainer: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
    },
    cameraView: {
        height: '100%',
        width: '100%',
    },
    overlay: {
        position: 'absolute',
        top: '10%', // Position the overlay at the vertical center of the screen
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
        borderWidth: 1,
        borderColor: 'white', // White border
    },
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

export class FormDataModel {
    constructor(id, name, value) {
        this.id = id;
        this.name = name;
        this.value = value;
    }
}

export default Create;