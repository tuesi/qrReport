import { View, TextInput, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import AmountInput from '../common/amountInput';
import ImageViewModal from '../common/imageViewModal';
import ShowDeviceQr from "../devices/showDeviceQR";
import Button from "../common/button";
import Styles from '../../styles/styles';
import deviceStyles from '../devices/deviceStyles';
import * as Color from '../../styles/colors';
import { GetImageFromStorage } from '../firebase/storage';
import { UpdatePartInfo } from '../firebase/data';
import TextInputWithLabel from '../common/textInputWithLabel';
import { PART_TYPE } from '../../constants';

const PartInfoView = ({ partData, setPartData, selectedItem, setEdit }) => {

    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageUrl = await GetImageFromStorage(partData.imageName);
                setImage(imageUrl);
            } catch (error) {
                // Handle error
                console.error('Error fetching image:', error);
            }
        };

        fetchData();
    }, []);

    const changeAmount = async (amount) => {
        let newPartData = { ...partData, amount: amount };
        await UpdatePartInfo(selectedItem.id, newPartData, selectedItem.deviceId);
        setPartData(newPartData);
    }

    const onEdit = () => {
        setEdit(true);
    }

    return (
        <BottomSheetView style={Styles.modalContainer}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', marginBottom: '5%', zIndex: 10 }}>
                <ImageViewModal uri={image} size={100} />
            </View>
            <TextInputWithLabel
                style={Styles.input_disabled}
                placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                labelText="Dalies pavadinimas"
                value={partData?.name}
                editable={false}
            />
            <TextInputWithLabel
                style={Styles.input_disabled_large}
                labelText="Dalies vieta"
                value={partData?.location}
                multiline={true}
                editable={false}
                textAlignVertical='top'
            />
            <TextInputWithLabel
                style={Styles.input_disabled_large}
                placeholderTextColor={Color.TEXT_INPUT_HINT_COLOR}
                labelText="Papildoma informacija"
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
            <View style={deviceStyles.deviceInfoModalButtonContainer}>
                <ShowDeviceQr deviceId={selectedItem?.id} deviceName={partData.name} type={PART_TYPE}></ShowDeviceQr>
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