import React, { useState } from "react";
import { View, Text, Button, Linking } from "react-native";
import { useCameraPermissions } from "expo-camera/next";
import Scanner from "../../components/scan/scanner";
import ReportInput from "../../components/scan/reportInput";
import { FormDataModel } from '../../components/scan/FormDataModel';

const Create = () => {

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [formData, setFormData] = useState(new FormDataModel());
    const [deviceImageUrl, setDeviceImageUrl] = useState(null);

    const handleCameraPermission = () => {
        if (!permission.canAskAgain) {
            Linking.openSettings();
        } else {
            requestPermission();
        }
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
            <Scanner setScanned={setScanned} setFormData={setFormData} setDeviceImageUrl={setDeviceImageUrl}></Scanner>
        )
    } else {
        return (
            <ReportInput setScanned={setScanned} formData={formData} setFormData={setFormData} deviceImageUrl={deviceImageUrl}></ReportInput>
        )
    }
}

export default Create;