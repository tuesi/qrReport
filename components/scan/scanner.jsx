import { Stack } from 'expo-router';
import { View, SafeAreaView, Alert } from "react-native";
import Styles from '../../styles/styles';
import * as Colors from '../../styles/colors';
import { CameraView } from "expo-camera/next";
import { FormDataModel } from './FormDataModel';
import { GetDeviceInfo } from '../firebase/data';

const Scanner = ({ setScanned, setFormData }) => {

    const handleBarCodeScanned = async ({ data }) => {
        try {
            setScanned(true);
            const parsedData = JSON.parse(data);
            const docSnapshot = await GetDeviceInfo(parsedData.deviceId);

            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                const formDataInstance = new FormDataModel(parsedData.deviceId, data.name, data.notes);
                setFormData(formDataInstance);
            } else {
                Alert.alert('Error', 'Scanned QR code does not contain a valid device');
            }
        } catch (error) {
            console.log('error parsing');
            setScanned(true);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.BACKGROUND_COLOR, bottom: 100 }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: 'black', opacity: 0.0 },
                    headerShadowVisible: false,
                    headerTitle: ''
                }}
            />
            <View style={Styles.cameraViewContainer}>
                <CameraView style={Styles.cameraView}
                    facing='back'
                    onBarcodeScanned={handleBarCodeScanned}
                    barCodeScannerSettings={{
                        barCodeTypes: ["qr"]
                    }} />
            </View>
        </View>
    )
}

export default Scanner;