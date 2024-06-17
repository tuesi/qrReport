import Styles from '../../styles/styles';
import deviceStyles from '../devices/deviceStyles';
import { ScrollView, View, TextInput, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import * as Color from '../../styles/colors';
import Button from "../common/button";
import ShowDeviceQr from "../devices/showDeviceQR";
import { PartDataModel } from '../parts/partDataModel';
import { ConfirmAction } from '../common/confirmAction';
import ImageViewModal from '../common/imageViewModal';
import { GetImageFromStorage } from '../firebase/storage';
import { DeletePart, UpdatePartInfo } from '../firebase/data';
import AmountInput from '../common/amountInput';

const PartInfo = ({ setModalVisible, selectedItem }) => {

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
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['90%'], []);

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const handleSheetChanges = (index) => {
        if (index === -1) {
            setShowQr(false);
            setModalVisible(false);
        }
    };

    const onUpdate = async () => {
        await UpdatePartInfo(selectedItem.id, partData, selectedItem.deviceId);
        setShowQr(false);
        bottomSheetRef.current.close()
        setModalVisible(false);
    }

    const deleteDevice = async () => {
        setShowQr(false);
        bottomSheetRef.current.close()
        await DeletePart(selectedItem.id);
        setModalVisible(false);
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
            enableBackdrop={true}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    opacity={0.5}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    style={{ position: 'absolute', top: -200, width: "100%", height: "130%" }}
                />
            )}
            handleStyle={{ backgroundColor: Color.SECONDARY_BUTTON_COLOR, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        >
            <TouchableWithoutFeedback onPress={handlePressOutside}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}>
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
                                <AmountInput name={'Minimalus likutis'} value={partData?.minAmount} getValue={(minAmount) => setPartData({ ...partData, minAmount: minAmount })}></AmountInput>
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
                            </View>
                        </View>
                    </BottomSheetView>
                </ScrollView>
            </TouchableWithoutFeedback>
        </BottomSheet >
    )
}

const styles = StyleSheet.create({
    amountInputContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PartInfo;