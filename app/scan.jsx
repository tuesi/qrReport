import React, { useState } from "react";
import { View, Text, Button, Linking, StyleSheet, Dimensions } from "react-native";
import { Camera, CameraView, useCameraPermissions, CameraType } from "expo-camera/next";

const Create = () => {

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);


    const handleCameraPermission = () => {
        if (!permission.canAskAgain) {
            Linking.openSettings();
        } else {
            requestPermission();
        }
    }

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        console.log(scanned);
        console.log('scan');
        console.log(data);
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
        return <View>
            <Text>data scanned</Text>
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
});

export default Create;