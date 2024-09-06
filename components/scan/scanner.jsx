import { Stack } from 'expo-router';
import { View, Alert } from "react-native";
import scanStyles from './scanStyles';
import * as Colors from '../../styles/colors';
import { CameraView } from "expo-camera";
import { FormDataModel } from './FormDataModel';
import { GetDeviceInfo, GetPartInfo } from '../firebase/data';
import { QRKEY } from '../../constants';
import { GetImageFromStorage } from '../firebase/storage';
import { DEVICE_TYPE, PART_TYPE } from '../../constants';

const Scanner = ({ setDeviceScanned, setPartScanned, setFormData, setDeviceImageUrl, setPartImageUrl }) => {


    const getDeviceInfo = async (parsedData) => {
        setDeviceScanned(true);
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
                { text: 'OK', onPress: () => { setDeviceScanned(false); setPartScanned(false); } }
            ]);
        }
    }

    const getPartInfo = async (parsedData) => {
        setPartScanned(true);
        const partDocSnapshot = await GetPartInfo(parsedData.deviceId);
        if (partDocSnapshot.exists()) {
            const data = partDocSnapshot.data();
            const deviceDocSnapshot = await GetDeviceInfo(data.deviceId);
            if (deviceDocSnapshot.exists()) {
                const deviceData = deviceDocSnapshot.data();
                const formDataInstance = new FormDataModel(parsedData.deviceId, data.name, data.notes);
                formDataInstance.deviceImageName = data.imageName;
                formDataInstance.partDeviceName = deviceData.name;
                formDataInstance.partDeviceNotes = deviceData.notes;
                formDataInstance.partDeviceImageName = deviceData.imageName;
                const partImageUrl = await GetImageFromStorage(data.imageName);
                const deviceImageUrl = await GetImageFromStorage(data.partDeviceImageName);
                setPartImageUrl(partImageUrl);
                setDeviceImageUrl(deviceImageUrl);
                setFormData(formDataInstance);
            } else {
                Alert.alert('Error', 'Part does not have valid device!', [
                    { text: 'OK', onPress: () => { setDeviceScanned(false); setPartScanned(false); } }
                ]);
            }
        } else {
            Alert.alert('Error', 'Scanned QR code does not contain a valid part', [
                { text: 'OK', onPress: () => { setDeviceScanned(false); setPartScanned(false); } }
            ]);
        }
    }

    const handleBarCodeScanned = async ({ data }) => {
        try {
            const parsedData = JSON.parse(data);
            if (parsedData.tag === QRKEY && parsedData.deviceId) {
                switch (parsedData.type) {
                    case DEVICE_TYPE:
                        getDeviceInfo(parsedData);
                        break;
                    case PART_TYPE:
                        getPartInfo(parsedData);
                        break;
                    default:
                        setDeviceScanned(true);
                        setPartScanned(true);
                        Alert.alert('Error', 'Scanned QR code is not recognised', [
                            { text: 'OK', onPress: () => { setDeviceScanned(false); setPartScanned(false); } }
                        ]);
                        break;
                }
            } else {
                setDeviceScanned(true);
                setPartScanned(true);
                Alert.alert('Error', 'Scanned QR code is not recognised', [
                    { text: 'OK', onPress: () => { setDeviceScanned(false); setPartScanned(false); } }
                ]);
            }
        } catch (error) {
            setDeviceScanned(true);
            setPartScanned(true);
            Alert.alert('Error', 'Error scanning code', [
                { text: 'OK', onPress: () => { setDeviceScanned(false); setPartScanned(false); } }
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