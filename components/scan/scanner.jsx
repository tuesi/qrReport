import { Stack } from 'expo-router';
import { View, Alert } from "react-native";
import scanStyles from './scanStyles';
import * as Colors from '../../styles/colors';
import { CameraView } from "expo-camera";
import { FormDataModel } from './FormDataModel';
import { GetDeviceInfo } from '../firebase/data';
import { QRKEY } from '../../constants';
import { GetImageFromStorage } from '../firebase/storage';

const Scanner = ({ setScanned, setFormData, setDeviceImageUrl }) => {

    const handleBarCodeScanned = async ({ data }) => {
        setScanned(true);
        try {
            const parsedData = JSON.parse(data);
            if (parsedData.tag === QRKEY && parsedData.deviceId) {
                const docSnapshot = await GetDeviceInfo(parsedData.deviceId);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const formDataInstance = new FormDataModel(parsedData.deviceId, data.name, data.notes);
                    formDataInstance.deviceImageName = data.imageName;
                    const deviceImageUrl = await GetImageFromStorage(data.imageName);
                    setDeviceImageUrl(deviceImageUrl);
                    setFormData(formDataInstance);
                } else {
                    Alert.alert('Error', 'Scanned QR code does not contain a valid device', [
                        { text: 'OK', onPress: () => setScanned(false) }
                    ]);
                }
            } else {
                Alert.alert('Error', 'Scanned QR code is not recognised', [
                    { text: 'OK', onPress: () => setScanned(false) }
                ]);
            }
        } catch (error) {
            Alert.alert('Error', 'Error scanning code', [
                { text: 'OK', onPress: () => setScanned(false) }
            ]);
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
            <View style={scanStyles.cameraViewContainer}>
                <CameraView style={scanStyles.cameraView}
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