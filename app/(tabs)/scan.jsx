import React, { useState } from "react";
import { View, Button, Linking } from "react-native";
import { useCameraPermissions } from "expo-camera";
import Scanner from "../../components/scan/scanner";
import ReportInput from "../../components/scan/reportInput";
import { FormDataModel } from '../../components/scan/FormDataModel';

const Create = () => {

    const [permission, requestPermission] = useCameraPermissions();
    const [deviceScanned, setDeviceScanned] = useState(false);
    const [partScanned, setPartScanned] = useState(false);
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    title="Leisti aplikacijai naudoti kamerą"
                    onPress={() => handleCameraPermission()}
                />
            </View>
        );
    }

    if (!deviceScanned && !partScanned) {
        return (
            <Scanner setDeviceScanned={setDeviceScanned} setPartScanned={setPartScanned} setFormData={setFormData} setDeviceImageUrl={setDeviceImageUrl}></Scanner>
        )
    } else if (deviceScanned) {
        return (
            <ReportInput setDeviceScanned={setDeviceScanned} formData={formData} setFormData={setFormData} deviceImageUrl={deviceImageUrl}></ReportInput>
        )
    } else if (partScanned) {
        return (
            //TODO create part info view
            <ReportInput setScanned={setScanned} formData={formData} setFormData={setFormData} deviceImageUrl={deviceImageUrl}></ReportInput>
        )
    }
}

export default Create;