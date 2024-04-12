import { useState, useEffect, useRef } from "react";
import * as Sharing from 'expo-sharing';
import { View } from "react-native"
import QRCode from "react-native-qrcode-svg";
import Button from "../common/button";
import SaveTemporaryFile from "../create/saveTemporaryFile";
import Styles from '../../styles/styles';
import * as Color from '../../styles/colors';
import { QrDataModel } from "../create/qrDataModel";

const ShowDeviceQr = ({ deviceId }) => {

    let logoFromFile = require('../../assets/aug.png');

    const [qrData, setQRData] = useState('');
    const [fileUri, setFileUri] = useState('');
    const svgRef = useRef();

    const setQR = () => {
        let newQrData = new QrDataModel("GenijausTadoUAB", deviceId);
        const jsonData = JSON.stringify(newQrData);
        setQRData(jsonData);
    }

    const setSvg = (ref) => {
        if (ref) {
            svgRef.current = ref;
            setTimeout(() => {
                SaveTemporaryFile({ svgRef, setFileUri });
            }, 500)
        }
    }

    useEffect(() => {
        setQR();
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

    return (
        <View style={Styles.deviceInfoQrContainer}>
            {qrData && (
                <View style={Styles.deviceInfoQrContainer}>
                    <QRCode value={qrData} size={80} logo={logoFromFile} getRef={setSvg} />
                    <View style={{ marginTop: "5%", marginBottom: "5%" }}>
                        <Button text={'SAUGOTI QR KODĄ'} color={Color.BUTTON_BLUE_BACKGROUND_COLOR} onPress={shareCode} />
                    </View>
                </View>
            )}
        </View>
    )
}

export default ShowDeviceQr;