import { View, TextInput, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import AmountInput from '../common/amountInput';
import ImageViewModal from '../common/imageViewModal';
import { ConfirmAction } from '../common/confirmAction';
import ShowDeviceQr from "../devices/showDeviceQR";
import Button from "../common/button";
import Styles from '../../styles/styles';
import deviceStyles from '../devices/deviceStyles';
import * as Color from '../../styles/colors';
import { PartDataModel } from '../parts/partDataModel';
import { GetImageFromStorage } from '../firebase/storage';
import { DeletePart, UpdatePartInfo } from '../firebase/data';

const PartEditView = ({ bottomSheetRef, selectedItem, setEdit }) => {

    const [partData, setPartData] = useState(new PartDataModel(selectedItem.deviceId, selectedItem.name, selectedItem.notes, selectedItem.location, selectedItem.imageName, selectedItem.amount, selectedItem.minAmount));
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

    const [showQr, setShowQr] = useState(true);

    const onEdit = () => {
        setShowQr(false);
        setEdit(true);
    }

    const onUpdate = async () => {
        await UpdatePartInfo(selectedItem.id, partData, selectedItem.deviceId);
        setShowQr(false);
        bottomSheetRef.current.close()

    }

    const deleteDevice = async () => {
        setShowQr(false);
        bottomSheetRef.current.close()
        await DeletePart(selectedItem.id);
    }

    return (
        <BottomSheetView style={Styles.modalContainer}>
            <TextInput
                style={Styles.input}
                placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                placeholder="Dalies pavadinimas"
                value={partData?.name}
                onChangeText={(text) => setPartData({ ...partData, name: text })}
            />
            <TextInput
                style={Styles.input_large}
                placeholder="Dalies vieta"
                value={partData?.location}
                onChangeText={(text) => setPartData({ ...partData, location: text })}
                multiline={true}
                textAlignVertical='top'
            />
            <TextInput
                style={Styles.input_large}
                placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                placeholder="Papildoma informacija"
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
            <View style={{ height: 0, zIndex: 10 }}>
                <ImageViewModal uri={image} size={100} />
            </View>
            <View style={deviceStyles.deviceInfoModalButtonContainer}>
                {showQr && (
                    <ShowDeviceQr deviceId={selectedItem?.id} deviceName={partData.name}></ShowDeviceQr>
                )}
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
                    <Button onPress={() => { onEdit(); }}>EDIT</Button>
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