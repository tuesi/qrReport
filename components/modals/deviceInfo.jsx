import Styles from '../../styles/styles';
import { ScrollView, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { UpdateDeviceInfo, DeleteDevice } from '../firebase/data';
import * as Color from '../../styles/colors';
import Button from "../common/button";
import ShowDeviceQr from "../devices/showDeviceQR";
import { DeviceDataModel } from "../create/deviceDataModel";
import { ConfirmAction } from '../common/confirmAction';

const DeviceInfo = ({ setModalVisible, selectedItem }) => {

    const [deviceData, setDeviceData] = useState(new DeviceDataModel(selectedItem.name, selectedItem.notes));

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
        await UpdateDeviceInfo(selectedItem.id, deviceData);
        setShowQr(false);
        bottomSheetRef.current.close()
        setModalVisible(false);
    }

    const deleteDevice = async () => {
        setShowQr(false);
        await DeleteDevice(selectedItem.id);
        bottomSheetRef.current.close()
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
                    style={{ position: 'absolute', top: -200, width: "100%", height: "100%" }}
                />
            )}
            handleStyle={{ backgroundColor: Color.SECONDARY_BUTTON_COLOR, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        >
            <TouchableWithoutFeedback onPress={handlePressOutside}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, height: '100%' }}>
                    <BottomSheetView style={Styles.editModalContainer}>

                        <TextInput
                            style={Styles.input}
                            placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                            placeholder="Įrangos pavadinimas"
                            value={deviceData?.name}
                            onChangeText={(text) => setDeviceData({ ...deviceData, name: text })}
                        />
                        <TextInput
                            style={Styles.input_large}
                            placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                            placeholder="Papildoma informacija"
                            value={deviceData?.notes}
                            multiline={true}
                            textAlignVertical='top'
                            onChangeText={(text) => setDeviceData({ ...deviceData, notes: text })}
                        />
                        <View style={Styles.deviceInfoModalButtonContainer}>
                            {showQr && (
                                <ShowDeviceQr deviceId={selectedItem?.id}></ShowDeviceQr>
                            )}
                            <View style={Styles.deviceButtonsContainer}>
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

export default DeviceInfo;