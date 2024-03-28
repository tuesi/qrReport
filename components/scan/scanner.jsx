import { Stack } from 'expo-router';
import { View, SafeAreaView, Alert } from "react-native";
import Styles from '../../styles/styles';
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
        <SafeAreaView style={{ flex: 1, backgroundColor: "#91a8bd" }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "#91a8bd" },
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
        </SafeAreaView>
    )
}

export default Scanner;