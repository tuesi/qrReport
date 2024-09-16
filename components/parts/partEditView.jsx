import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import AmountInput from '../common/amountInput';
import ImageViewModal from '../common/imageViewModal';
import { ConfirmAction } from '../common/confirmAction';
import Button from "../common/button";
import GlobalStyles from '../../styles/styles';
import deviceStyles from '../devices/deviceStyles';
import * as Color from '../../styles/colors';
import { GetImageFromStorage } from '../firebase/storage';
import { DeletePart, UpdatePartInfo } from '../firebase/data';
import SetImage from '../common/setImage';
import { DeleteImage, SaveImage } from '../../utils/saveImage';
import ImageFileNameGetter from '../../utils/imageFileNameGetter';
import TextInputWithLabel from '../common/textInputWithLabel';

const PartEditView = ({ partData, setPartData, bottomSheetRef, selectedItem, setEdit }) => {

    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageUrl = await GetImageFromStorage(selectedItem.imageName);
                setImage(imageUrl);
            } catch (error) {
                // Handle error
                console.error('Error fetching image:', error);
            }
        };

        fetchData();
    }, []);

    const onInfo = () => {
        setEdit(false);
    }

    const onUpdate = async () => {
        const fileName = ImageFileNameGetter(image);
        let updatedPartData = { ...partData };
        if (selectedItem.imageName == '' || !fileName.includes(selectedItem.imageName)) {
            await DeleteImage(selectedItem.imageName);
            await SaveImage(image);
            updatedPartData = { ...updatedPartData, imageName: fileName ? fileName : '' };
            setPartData(updatedPartData);
        }
        await UpdatePartInfo(selectedItem.id, updatedPartData, selectedItem.deviceId);
        Alert.alert('Success', 'Sėkmaingai atnaujinta');
    }

    const deleteDevice = async () => {
        bottomSheetRef.current.close()
        await DeleteImage(image);
        await DeletePart(selectedItem.id);
    }

    return (
        <BottomSheetView style={GlobalStyles.modalContainer}>
            <TextInputWithLabel
                style={GlobalStyles.input}
                placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                labelText="Dalies pavadinimas"
                value={partData?.name}
                onChangeText={(text) => setPartData({ ...partData, name: text })}
            />
            <TextInputWithLabel
                style={GlobalStyles.input_large}
                labelText="Dalies vieta"
                value={partData?.location}
                onChangeText={(text) => setPartData({ ...partData, location: text })}
                multiline={true}
                textAlignVertical='top'
            />
            <TextInputWithLabel
                style={GlobalStyles.input_large}
                placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                labelText="Papildoma informacija"
                value={partData?.notes}
                multiline={true}
                textAlignVertical='top'
                onChangeText={(text) => setPartData({ ...partData, notes: text })}
            />
            <View style={styles.amountInputContainer}>
                <View>
                    <AmountInput name={'Likutis'} value={partData?.amount} getValue={(amount) => setPartData({ ...partData, amount: amount })}></AmountInput>
                </View>
                <View style={{ marginTop: '5%' }}>
                    <AmountInput name={'Minimalus likutis'} value={partData?.minAmount} getValue={(minAmount) => { setPartData({ ...partData, minAmount: minAmount }) }}></AmountInput>
                </View>
            </View>
            <View style={deviceStyles.deviceInfoModalButtonContainer}>
                <View style={{ flex: 1, height: image ? "25%" : 0, marginTop: '5%' }}>
                    <ImageViewModal uri={image} />
                </View>
                <View style={{ flex: 1, width: '80%', marginTop: '5%', marginBottom: '5%' }}>
                    <SetImage image={image} setImage={setImage}></SetImage>
                </View>
                <View style={deviceStyles.deviceButtonsContainer}>
                    <Button
                        onPress={() => { ConfirmAction("Ar tikrai norite išsaugoti pakeitimus?", onUpdate) }}
                        text="IŠSAUGOTI"
                        color={Color.BUTTON_GREEN_BACKGROUND_COLOR}
                    />
                    <View style={{ alignItems: 'center', width: "50%" }}>
                        <Button
                            onPress={() => { ConfirmAction("Ar tikrai norite ištrinti įrangos duomenis?", deleteDevice) }}
                            text="IŠTRINTI"
                            color={Color.BUTTON_RED_BACKGROUND_COLOR}
                        />
                    </View>
                    <Button text={"GRĮŽTI"} onPress={() => { onInfo(); }} color={Color.BUTTON_BLUE_BACKGROUND_COLOR}></Button>
                </View>
            </View>
        </BottomSheetView>
    )
}

const styles = StyleSheet.create({
    amountInputContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PartEditView;