import { View, TextInput, TouchableWithoutFeedback, ScrollView, Text, Keyboard, Alert } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import GlobalStyles from '../../styles/styles';
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
import { PART_TYPE } from "../../constants";
import GenerateSubString from "../../utils/generateSubString";
import TextInputWithLabel from "../common/textInputWithLabel";

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
                const nameSubString = GenerateSubString(name);
                const newPart = new PartDataModel(deviceData.id, name, notes, location, fileName, amount, minAmount, nameSubString);
                const part = await UpdatePartInfo(docRef.doc().id, newPart.toPlainObject(), deviceData);
                setDocRef(part);
                if (docRef.doc().image !== fileName) {
                    await DeleteImage(docRef.doc().image);
                    await SaveImage(image);
                }
                Alert.alert('Success', 'Sėkmaingai atnaujinta');
            } else {
                Keyboard.dismiss();
                const fileName = ImageFileNameGetter(image);
                const nameSubString = GenerateSubString(name);
                const newPart = new PartDataModel(deviceData.id, name, notes, location, fileName, amount, minAmount, nameSubString);
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
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: '50%', alignItems: 'center', justifyContent: 'start' }} style={{ width: '100%' }}>
                <View style={createStyles.createInputContainer}>
                    <View style={{ marginBottom: '5%' }}>
                        <DropDown
                            data={devices}
                            getSelected={
                                (value) => {
                                    setDeviceData(value);
                                }
                            }
                            valuePlaceholder="Prietaiso pavadinimas"
                            searchPlaceholder="Parisinkite preitaisą"
                            addNew={false}
                            labelText="Prietaiso pavadinimas"
                        />
                    </View>
                    <TextInputWithLabel
                        style={GlobalStyles.input}
                        placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                        labelText="Atsarginės dalies pavadinimas"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <TextInputWithLabel
                        style={GlobalStyles.input_large}
                        labelText="Įrangos vieta"
                        value={location}
                        onChangeText={text => setLocation(text)}
                        multiline={true}
                        textAlignVertical='top'
                    />
                    <TextInputWithLabel
                        style={GlobalStyles.input_large}
                        placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                        labelText="Papildoma informacija"
                        value={notes}
                        multiline={true}
                        textAlignVertical='top'
                        onChangeText={text => setNotes(text)}
                    />
                    <View style={{ flex: 1, height: image ? "25%" : 0, marginTop: '5%' }}>
                        <ImageViewModal uri={image} />
                    </View>
                    <View style={{ flex: 1, width: '80%', marginTop: '5%', marginBottom: '5%' }}>
                        <SetImage image={image} setImage={setImage}></SetImage>
                    </View>
                    <View>
                        <AmountInput name={'Likutis'} value={amount} getValue={setAmount}></AmountInput>
                    </View>
                    <View style={{ marginTop: '5%' }}>
                        <AmountInput name={'Minimalus likutis'} value={minAmount} getValue={setMinAmout}></AmountInput>
                    </View>
                    <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'end', marginTop: '5%' }}>
                        <Button text={docRef ? updateText : createText} color={Color.BUTTON_GREEN_BACKGROUND_COLOR} onPress={saveNewPart} />
                    </View>
                    {docRef && (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'end' }}>
                            <QR name={name} id={docRef.id} type={PART_TYPE}></QR>
                            <Button text={"KURTI NAUJĄ"} color={Color.BUTTON_RED_BACKGROUND_COLOR} onPress={clear}></Button>
                        </View>
                    )}
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default CreatePart;