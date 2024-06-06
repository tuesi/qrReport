import React, { useState, useRef, useEffect } from "react";
import * as Sharing from 'expo-sharing';
import { View, Alert, Keyboard } from "react-native";
import Styles from '../../styles/styles';
import QRCode from "react-native-qrcode-svg";
import { QrDataModel } from "./qrDataModel";
import SaveTemporaryFile from "../../utils/saveTemporaryFile";
import * as Color from '../../styles/colors';
import Button from "../common/button";
import { QRKEY, LOGO_NAME } from '../../constants';
import HiddenQr from "../common/hiddenQr";

const QR = ({ name, id }) => {

    const createText = 'GENERUOTI QR KODĄ';

    const [qrData, setQRData] = useState('');
    const [fileUri, setFileUri] = useState('');

    const svgRef = useRef();

    useEffect(() => {
        if (id) {
            setQRData('');
            setFileUri('');
        }
    }, [])

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
        if (!name || !id) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        try {
            Keyboard.dismiss();
            let newQrData = new QrDataModel(QRKEY, id);
            const jsonData = JSON.stringify(newQrData);
            setQRData(jsonData);
            const newFileUri = await SaveTemporaryFile({ svgRef, name });
            setFileUri(newFileUri);
        } catch (e) {
            console.log(e);
            Alert.alert('Error', 'Error saving data');
        }
    };

    return (
        <View style={Styles.createQRContainer}>
            {qrData ? (
                <View style={Styles.showQrContainer}>
                    <QRCode value={qrData} size={150} logoSize={35} logo={LOGO_NAME} />
                    {fileUri && (
                        <View style={Styles.topGap}>
                            <Button text={'SAUGOTI QR KODĄ'} color={Color.BUTTON_BLUE_BACKGROUND_COLOR} onPress={shareCode} />
                        </View>
                    )}
                    <HiddenQr qrData={qrData} svgRef={svgRef}></HiddenQr>
                </View>
            )
                :
                (
                    <Button text={createText} color={Color.BUTTON_GREEN_BACKGROUND_COLOR} onPress={generateQRCode} />
                )
            }
        </View>
    )
}

export default QR;