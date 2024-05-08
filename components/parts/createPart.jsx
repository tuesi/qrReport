import { View, TextInput, TouchableWithoutFeedback, ScrollView, Text, Keyboard, Alert } from "react-native";
import Styles from '../../styles/styles';
import createStyles from "../create/createStyles";
import * as Color from '../../styles/colors';
import Button from "../common/button";
import { Image } from "react-native";
import ImageViewModal from "../common/imageViewModal";
import DropDown from "../common/dropDown";
import { useEffect, useState } from "react";
import AmountInput from "../common/amountInput";
import SetImage from "../common/setImage";
import { GetAllDevices, AddNewPart } from "../firebase/data";
import { PartDataModel } from "./partDataModel";

const CreatePart = () => {

    useEffect(() => {
        getDeviceNames = async () => {
            const deviceNames = await GetAllDevices();
            setDevices(deviceNames);
        }
        getDeviceNames();
    }, [])

    const [devices, setDevices] = useState([]);
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState(null);
    const [deviceData, setDeviceData] = useState();
    const [amount, setAmount] = useState(0);
    const [minAmount, setMinAmout] = useState(0);

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const saveNewPart = async () => {
        try {
            const newPart = new PartDataModel(deviceData.id, name, notes, image, amount, minAmount);
            await AddNewPart(newPart.toPlainObject(), deviceData);
            Alert.alert('Success', 'Atsarginė dalis sėkmingai išsaugota!');
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
                    <Button text={'SUKURTI'} color={Color.BUTTON_GREEN_BACKGROUND_COLOR} onPress={saveNewPart} />
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default CreatePart;