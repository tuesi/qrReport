import { useState, useEffect, useRef } from "react";
import * as Sharing from 'expo-sharing';
import { View } from "react-native"
import QRCode from "react-native-qrcode-svg";
import Button from "../common/button";
import SaveTemporaryFile from "../../utils/saveTemporaryFile";
import deviceStyles from "./deviceStyles";
import * as Color from '../../styles/colors';
import { QrDataModel } from "../common/qrDataModel";
import HiddenQr from "../common/hiddenQr";
import { QRKEY, LOGO_NAME } from '../../constants';

const ShowDeviceQr = ({ deviceId, deviceName, type }) => {

    const [qrData, setQRData] = useState('');
    const [fileUri, setFileUri] = useState('');
    const svgRef = useRef();

    const setQR = () => {
        let newQrData = new QrDataModel(QRKEY, deviceId, type);
        const jsonData = JSON.stringify(newQrData);
        setQRData(jsonData);
    }

    const setSvg = async (ref) => {
        if (ref && ref !== svgRef.current) {
            svgRef.current = ref;
            setTimeout(async () => {
                const newFileUri = await SaveTemporaryFile({ svgRef, name: deviceName });
                setFileUri(newFileUri);
            }, 1000)
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
        <View style={deviceStyles.deviceInfoQrContainer}>
            {qrData && (
                <View style={deviceStyles.deviceInfoQrContainer}>
                    <QRCode value={qrData} size={100} logoSize={25} logo={LOGO_NAME} />
                    {fileUri && (
                        <View style={{ marginTop: "5%", marginBottom: "5%" }}>
                            <Button text={'SAUGOTI QR KODĄ'} color={Color.BUTTON_BLUE_BACKGROUND_COLOR} onPress={shareCode} />
                        </View>
                    )}
                    <HiddenQr qrData={qrData} svgRef={setSvg}></HiddenQr>
                </View>
            )}
        </View>
    )
}

export default ShowDeviceQr;