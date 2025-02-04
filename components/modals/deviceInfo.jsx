import GlobalStyles from '../../styles/styles';
import deviceStyles from '../devices/deviceStyles';
import { ScrollView, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import * as Color from '../../styles/colors';
import Button from "../common/button";
import ShowDeviceQr from "../devices/showDeviceQR";
import { DeviceDataModel } from "../create/deviceDataModel";
import { ConfirmAction } from '../common/confirmAction';
import ImageViewModal from '../common/imageViewModal';
import { GetImageFromStorage } from '../firebase/storage';
import TextInputWithLabel from '../common/textInputWithLabel';
import { DEVICE_TYPE } from '../../constants';
import SetImage from '../common/setImage';
import { DeleteImage, SaveImage } from '../../utils/saveImage';
import ImageFileNameGetter from '../../utils/imageFileNameGetter';
import { UpdateDeviceInfo, DeleteDevice } from '../api/devices';

const DeviceInfo = ({ setModalVisible, selectedItem, updateListData }) => {

    const [deviceData, setDeviceData] = useState(new DeviceDataModel(selectedItem.name, selectedItem.notes, selectedItem.imageName));
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageUrl = await GetImageFromStorage(selectedItem.imageName);
                setImage(imageUrl);
            } catch (error) {
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
        const fileName = ImageFileNameGetter(image);
        if (selectedItem.imageName == '' || !fileName.includes(selectedItem.imageName)) {
            await DeleteImage(selectedItem.imageName);
            await SaveImage(image);
            updatedDeviceData = { ...deviceData, imageName: fileName ? fileName : '' };
            setDeviceData(updatedDeviceData);
        }
        await UpdateDeviceInfo(selectedItem._id, updatedDeviceData);
        setShowQr(false);
        updateListData();
        bottomSheetRef.current.close()
        setModalVisible(false);
    }

    const deleteDevice = async () => {
        setShowQr(false);
        bottomSheetRef.current.close()
        await DeleteDevice(selectedItem._id);
        await DeleteImage(image);
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
                    <BottomSheetView style={GlobalStyles.modalContainer}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', marginBottom: '5%', zIndex: 10 }}>
                            <ImageViewModal uri={image} size={100} />
                        </View>
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                            <SetImage image={image} setImage={setImage}></SetImage>
                        </View>
                        <TextInputWithLabel
                            style={GlobalStyles.input}
                            placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                            labelText="Įrangos pavadinimas"
                            value={deviceData?.name}
                            onChangeText={(text) => setDeviceData({ ...deviceData, name: text })}
                        />
                        <TextInputWithLabel
                            style={GlobalStyles.input_large}
                            placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                            labelText="Papildoma informacija"
                            value={deviceData?.notes}
                            multiline={true}
                            textAlignVertical='top'
                            onChangeText={(text) => setDeviceData({ ...deviceData, notes: text })}
                        />
                        <View style={deviceStyles.deviceInfoModalButtonContainer}>
                            {showQr && (
                                <View style={{ flex: 1 }}>
                                    <ShowDeviceQr deviceId={selectedItem?._id} deviceName={deviceData.name} type={DEVICE_TYPE}></ShowDeviceQr>
                                </View>
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

export default DeviceInfo;