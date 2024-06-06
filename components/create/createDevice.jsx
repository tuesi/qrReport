import { useState } from "react";
import { View, TextInput, TouchableWithoutFeedback, ScrollView, Keyboard, Alert } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import Styles from '../../styles/styles';
import createStyles from "./createStyles";
import * as Color from '../../styles/colors';
import ImageViewModal from "../common/imageViewModal";
import { DeviceDataModel } from "./deviceDataModel";
import { AddNewDevice } from "../firebase/data";
import { DeleteImage, SaveImage } from "../../utils/saveImage";
import SetImage from "../common/setImage";
import Button from "../common/button";
import ImageFileNameGetter from "../../utils/imageFileNameGetter";
import QR from "../common/QR";

const CreateDevice = ({ }) => {

    const createText = 'SUKURTI';
    const updateText = 'ATNAUJINTI';

    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState(null);
    const [docRef, setDocRef] = useState(null);

    const handleCameraPermission = async () => {
        if (permissionResponse && !permissionResponse.canAskAgain) {
            Linking.openSettings();
        } else {
            requestPermission();
        }
    }

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const clear = () => {
        setName('');
        setNotes('');
        setImage(null);
        setDocRef(null);
    }

    const saveNewDevice = async () => {
        try {
            if (docRef) {
                const fileName = ImageFileNameGetter(image);
                const deviceData = new DeviceDataModel(name, notes, fileName).toPlainObject();
                const device = await UpdateDeviceInfo(docRef.doc().id, deviceData);
                setDocRef(device);
                if (docRef.doc().image !== fileName) {
                    await DeleteImage(image);
                    await SaveImage(image);
                }
                Alert.alert('Success', 'Sėkmaingai atnaujinta');
            } else {
                Keyboard.dismiss();
                const fileName = ImageFileNameGetter(image);
                const deviceData = new DeviceDataModel(name, notes, fileName).toPlainObject();
                const device = await AddNewDevice(deviceData);
                setDocRef(device);
                await SaveImage(image);
                Alert.alert('Success', 'Sėkmingai sukurta!');
            }
        } catch (e) {
            console.log(e);
            Alert.alert('Error', 'Error saving data');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 150, alignItems: 'center', justifyContent: 'center' }} style={{ width: '100%' }}>
                <View style={createStyles.createInputContainer}>
                    <TextInput
                        style={Styles.input}
                        placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                        placeholder="Įrangos pavadinimas"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <TextInput
                        style={Styles.input_large}
                        placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                        placeholder="Papildoma informacija"
                        value={notes}
                        multiline={true}
                        textAlignVertical='top'
                        onChangeText={text => setNotes(text)}
                    />
                    <View style={{ height: image ? "25%" : 0, marginTop: '5%' }}>
                        <ImageViewModal uri={image} />
                    </View>
                    <View style={{ flex: 1, width: '80%' }}>
                        <SetImage image={image} setImage={setImage}></SetImage>
                    </View>
                    <Button text={docRef ? updateText : createText} color={Color.BUTTON_GREEN_BACKGROUND_COLOR} onPress={saveNewDevice} />
                    {docRef && (
                        <View style={{ flex: 1 }}>
                            <QR name={name} id={docRef.id}></QR>
                            <Button text={"KURTI NAUJĄ"} color={Color.BUTTON_RED_BACKGROUND_COLOR} onPress={clear}></Button>
                        </View>
                    )}
                </View>
            </ScrollView>
        </TouchableWithoutFeedback >
    )
}

export default CreateDevice;