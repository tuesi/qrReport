import { View, TextInput, TouchableWithoutFeedback, ScrollView, Text, Keyboard, Alert } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import Styles from '../../styles/styles';
import createStyles from "../create/createStyles";
import * as Color from '../../styles/colors';
import Button from "../common/button";
import ImageViewModal from "../common/imageViewModal";
import DropDown from "../common/dropDown";
import { useEffect, useState } from "react";
import AmountInput from "../common/amountInput";
import SetImage from "../common/setImage";
import { GetAllDevices, AddNewPart } from "../firebase/data";
import { PartDataModel } from "./partDataModel";
import ImageFileNameGetter from "../../utils/imageFileNameGetter";
import QR from '../common/QR';
import { DeleteImage, SaveImage } from "../../utils/saveImage";

const CreatePart = ({ }) => {

    const createText = 'SUKURTI';
    const updateText = 'ATNAUJINTI';

    useEffect(() => {
        getDeviceNames = async () => {
            const deviceNames = await GetAllDevices();
            setDevices(deviceNames);
        }
        getDeviceNames();
    }, [])

    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [devices, setDevices] = useState([]);
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [deviceData, setDeviceData] = useState(null);
    const [amount, setAmount] = useState(0);
    const [minAmount, setMinAmout] = useState(0);
    const [docRef, setDocRef] = useState(null);

    const clear = () => {
        setName('');
        setNotes('');
        setLocation('');
        setDeviceData(null);
        setAmount(0);
        setMinAmout(0);
        setImage(null);
        setDocRef(null);
    }

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

    const saveNewPart = async () => {
        try {
            if (docRef) {
                const fileName = ImageFileNameGetter(image);
                const newPart = new PartDataModel(deviceData.id, name, notes, location, fileName, amount, minAmount);
                const part = await UpdatePartInfo(docRef.doc().id, newPart.toPlainObject(), deviceData);
                setDocRef(part);
                if (docRef.doc().image !== fileName) {
                    await DeleteImage(image);
                    await SaveImage(image);
                }
            } else {
                const fileName = ImageFileNameGetter(image);
                const newPart = new PartDataModel(deviceData.id, name, notes, location, fileName, amount, minAmount);
                const part = await AddNewPart(newPart.toPlainObject(), deviceData);
                setDocRef(part);
                await SaveImage(image);
                Alert.alert('Success', 'Atsarginė dalis sėkmingai išsaugota!');
            }
        } catch (e) {
            console.log(e);
            Alert.alert('Error', 'Error saving data');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: '100%', alignItems: 'center', justifyContent: 'center' }} style={{ width: '100%' }}>
                <View style={createStyles.createInputContainer}>
                    <DropDown
                        data={devices}
                        getSelected={
                            (value) => {
                                console.log(value);
                                setDeviceData(value);
                            }
                        }
                        valuePlaceholder="Prietaiso pavadinimas"
                        searchPlaceholder="Parisinkite preitaisą"
                        addNew={false}
                    />
                    <TextInput
                        style={Styles.input}
                        placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                        placeholder="Atsarginės dalies pavadinimas"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <TextInput
                        style={Styles.input_large}
                        placeholder="Įrangos vieta"
                        value={location}
                        onChangeText={text => setLocation(text)}
                        multiline={true}
                        textAlignVertical='top'
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
                    <View>
                        <Text>Likutis</Text>
                        <AmountInput value={amount} getValue={setAmount}></AmountInput>
                    </View>
                    <View>
                        <Text>Minimalus likutis</Text>
                        <AmountInput value={minAmount} getValue={setMinAmout}></AmountInput>
                    </View>
                    <Button text={docRef ? updateText : createText} color={Color.BUTTON_GREEN_BACKGROUND_COLOR} onPress={saveNewPart} />
                    {docRef && (
                        <View style={{ flex: 1 }}>
                            <QR name={name} id={docRef.id}></QR>
                            <Button text={"KURTI NAUJĄ"} color={Color.BUTTON_RED_BACKGROUND_COLOR} onPress={clear}></Button>
                        </View>
                    )}
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default CreatePart;