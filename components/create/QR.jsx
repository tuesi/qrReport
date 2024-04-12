import React, { useState, useRef } from "react";
import * as Sharing from 'expo-sharing';
import { View, Alert, TouchableOpacity, Text, Keyboard } from "react-native";
import Styles from '../../styles/styles';
import QRCode from "react-native-qrcode-svg";
import { AddNewDevice, UpdateDeviceInfo } from "../firebase/data";
import { DeviceDataModel } from "./deviceDataModel";
import { QrDataModel } from "./qrDataModel";
import SaveTemporaryFile from "./saveTemporaryFile";
import * as Color from '../../styles/colors';
import Button from "../common/button";
import { QRKEY } from '../../constants';

const QR = ({ name, notes, setName, setNotes }) => {

    const logoFromFile = require('../../assets/aug.png');
    const createText = 'KURTI ĮRENGINĮ';
    const editText = 'SAUGOTI PAKEITIMUS';

    const [qrData, setQRData] = useState('');
    const [fileUri, setFileUri] = useState('');

    const svgRef = useRef();

    const clear = () => {
        setName('');
        setNotes('');
        setQRData('');
        setFileUri('');
    }

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
        //if qr code is shown and item is created EDIT the result instead of creating another one on generateQR pressed
        if (qrData && fileUri) {
            const deviceData = new DeviceDataModel(name, notes).toPlainObject();
            const jsonData = JSON.parse(qrData);
            await UpdateDeviceInfo(jsonData.deviceId, deviceData);
            Alert.alert('Success', 'Sėkmaingai atnaujinta');
        } else {
            if (!name || !notes) {
                Alert.alert('Error', 'Please fill in all fields');
                return;
            }
            try {
                Keyboard.dismiss();
                const deviceData = new DeviceDataModel(name, notes).toPlainObject();
                const docRef = await AddNewDevice(deviceData);

                let newQrData = new QrDataModel(QRKEY, docRef.id);
                const jsonData = JSON.stringify(newQrData);
                setQRData(jsonData);

                SaveTemporaryFile({ svgRef, setFileUri });

            } catch (e) {
                console.log(e);
                Alert.alert('Error', 'Error saving data');
            }
        }
    };

    return (
        <View style={Styles.createQRContainer}>
            <Button text={qrData ? editText : createText} color={Color.BUTTON_GREEN_BACKGROUND_COLOR} onPress={generateQRCode} />
            {qrData && (
                <View style={Styles.showQrContainer}>
                    <QRCode value={qrData} size={150} logo={logoFromFile} getRef={svgRef} />
                    <View style={Styles.topGap}>
                        <Button text={'SAUGOTI QR KODĄ'} color={Color.BUTTON_BLUE_BACKGROUND_COLOR} onPress={shareCode} />
                    </View>
                    <Button text={'KURTI NAUJĄ'} color={Color.BUTTON_GREY_BACKGROUND_COLOR} onPress={clear} />
                </View>
            )}
        </View>
    )
}

export default QR;