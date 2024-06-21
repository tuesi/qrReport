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

const PartInfoView = ({ selectedItem, setEdit }) => {

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

    const changeAmount = async (amount) => {
        const newPartData = setPartData({ ...partData, amount: amount });
        await UpdatePartInfo(selectedItem.id, newPartData, selectedItem.deviceId);
    }

    const onEdit = () => {
        setShowQr(false);
        setEdit(true);
    }

    return (
        <BottomSheetView style={Styles.modalContainer}>
            <TextInput
                style={Styles.input_disabled}
                placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                placeholder="Dalies pavadinimas"
                value={partData?.name}
                editable={false}
            />
            <TextInput
                style={Styles.input_disabled_large}
                placeholder="Dalies vieta"
                value={partData?.location}
                multiline={true}
                editable={false}
                textAlignVertical='top'
            />
            <TextInput
                style={Styles.input_disabled_large}
                placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                placeholder="Papildoma informacija"
                value={partData?.notes}
                multiline={true}
                editable={false}
                textAlignVertical='top'
            />
            <View style={styles.amountInputContainer}>
                <View>
                    <AmountInput name={'Likutis'} value={partData?.amount} getValue={(amount) => changeAmount(amount)}></AmountInput>
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
                    <Button text={"REDAGUOTI"} onPress={() => { onEdit(); }} color={Color.BUTTON_BLUE_BACKGROUND_COLOR}></Button>
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

export default PartInfoView;