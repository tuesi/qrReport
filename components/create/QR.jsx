import React, { useState, useRef } from "react";
import * as Sharing from 'expo-sharing';
import { View, Button, Alert } from "react-native";
import Styles from '../../styles/styles';
import QRCode from "react-native-qrcode-svg";
import { AddNewDevice } from "../firebase/data";
import { DeviceDataModel } from "./deviceDataModel";
import { QrDataModel } from "./qrDataMode";
import SaveTemporaryFile from "./saveTemporaryFile";

const QR = ({ name, notes }) => {

    let logoFromFile = require('../../assets/aug.png');

    const [qrData, setQRData] = useState('');
    const [fileUri, setFileUri] = useState('');

    const svgRef = useRef();

    const shareCode = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            Alert.alert('Error', 'Sharing is not available on this device');
            return;
        }

        if (fileUri) {
            await Sharing.shareAsync(fileUri);
            return;
        }
    }

    const generateQRCode = async () => {
        if (!name || !notes) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            const deviceData = new DeviceDataModel(name, notes).toPlainObject();
            const docRef = await AddNewDevice(deviceData);

            let newQrData = new QrDataModel("GenijausTadoUAB", docRef.id);
            const jsonData = JSON.stringify(newQrData);
            setQRData(jsonData);

            SaveTemporaryFile({ svgRef, setFileUri });

        } catch (e) {
            console.log(e);
            Alert.alert('Error', 'Error saving data');
        }
    };

    return (
        <View>
            <Button title="Generate QR Code" onPress={generateQRCode} />
            {qrData && (
                <View>
                    <QRCode value={qrData} size={200} logo={logoFromFile} getRef={svgRef} />
                    <Button title="Save QR Code" onPress={shareCode} />
                </View>
            )}
        </View>
    )
}

export default QR;