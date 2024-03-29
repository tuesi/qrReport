import Styles from '../../styles/styles';
import { Text, Button, View } from 'react-native';
import React, { useMemo, useRef, useEffect } from 'react';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import DateStringParser from '../../utils/dateStringParser';
import { UpdateReport } from '../firebase/data';
import * as Color from '../../styles/colors';

const Edit = ({ setModalVisible, selectedItem }) => {

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['80%'], []);

    const handleSheetChanges = (index) => {
        if (index === -1) {
            setModalVisible(false);
        }
    };

    const onPressHandler = async () => {
        await UpdateReport(selectedItem.id);
        bottomSheetRef.current.close()
    }

    const dateCreated = DateStringParser(selectedItem.dateCreated);
    const dateCompleted = DateStringParser(selectedItem.dateCompleted);

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
            <BottomSheetView style={{ flex: 1, alignItems: 'center', backgroundColor: Color.SECONDARY_BUTTON_COLOR }}>
                {dateCompleted && (
                    <Text>DateCompleted: {dateCompleted}</Text>
                )}
                <Text>Date: {dateCreated}</Text>
                <Text>ID: {selectedItem?.deviceId}</Text>
                <Text>Name: {selectedItem?.name}</Text>
                <Text>Notes: {selectedItem?.notes}</Text>
                <Text>Message: {selectedItem?.message}</Text>
                {!selectedItem.dateCompleted && (<Button
                    onPress={onPressHandler}
                    title="Pazymeti atlikta"
                    color="#841584" // Optional: Customize the button color
                />)}
            </BottomSheetView>
        </BottomSheet >
    )
}

export default Edit;