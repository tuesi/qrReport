import { ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import * as Color from '../../styles/colors';
import PartInfoView from '../parts/partInfoView';
import PartEditView from '../parts/partEditView';
import { PartDataModel } from '../parts/partDataModel';


const PartInfo = ({ setModalVisible, selectedItem }) => {

    const [partData, setPartData] = useState(selectedItem);

    const [edit, setEdit] = useState(false);

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['90%'], []);

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const handleSheetChanges = (index) => {
        if (index === -1) {
            setModalVisible(false);
        }
    };

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
                    {edit ? <PartEditView partData={partData} setPartData={setPartData} bottomSheetRef={bottomSheetRef} selectedItem={partData} setEdit={setEdit}></PartEditView>
                        : <PartInfoView partData={partData} setPartData={setPartData} selectedItem={partData} setEdit={setEdit}></PartInfoView>}
                </ScrollView>
            </TouchableWithoutFeedback>
        </BottomSheet >
    )
}

export default PartInfo;