import { ScrollView, Keyboard, TouchableWithoutFeedback, Text } from 'react-native';
import { useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import * as Color from '../../styles/colors';


const UserInfo = ({ setShowUserInfo }) => {

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
                    <Text>test</Text>
                </ScrollView>
            </TouchableWithoutFeedback>
        </BottomSheet >
    )
}

export default UserInfo;