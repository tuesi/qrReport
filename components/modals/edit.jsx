import Styles from '../../styles/styles';
import { Text, View } from 'react-native';
import React, { useMemo, useRef, useEffect } from 'react';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import DateStringParser from '../../utils/dateStringParser';
import { UpdateReport } from '../firebase/data';
import * as Color from '../../styles/colors';
import Button from "../common/button";

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
            <BottomSheetView style={Styles.editModalContainer}>
                <View style={Styles.deviceNameModalContainer}>
                    <Text style={{ ...Styles.listItemHeaderText, fontSize: 28 }}>{selectedItem?.name}</Text>
                </View>
                <View style={Styles.deviceInfoModalContainer}>
                    <Text style={{ ...Styles.notesTextColor, fontSize: 16 }}>{selectedItem?.notes}</Text>
                </View>

                <View style={Styles.reportInfoContainer}>
                    <Text style={{ ...Styles.listItemHeaderText, fontSize: 20 }}>Gedimo informacija</Text>
                    <Text style={Styles.secondaryText}>{selectedItem?.message}</Text>
                </View>

                <View style={Styles.deviceLocationContainer}>
                    <Text style={{ ...Styles.listItemHeaderText, fontSize: 18 }}>Įrangos vieta</Text>
                    <Text style={Styles.secondaryText}>{selectedItem?.location}</Text>
                </View>

                <View style={{ ...Styles.dateRowContainer, width: '70%', marginBottom: '5%' }}>
                    <Text style={{ ...Styles.listItemHeaderText, fontSize: 16 }}>Gedimo Data</Text>
                    <Text style={{ ...Styles.dateTextStyle, fontSize: 16 }}>{dateCreated}</Text>
                </View>
                {dateCompleted && (
                    <View style={{ ...Styles.dateRowContainer, width: '70%' }}>
                        <Text style={{ ...Styles.listItemHeaderText, fontSize: 16 }}>Įvykdymo data</Text>
                        <Text style={{ ...Styles.dateTextStyle, fontSize: 16 }}>{dateCompleted}</Text>
                    </View>
                )}
                {!selectedItem.dateCompleted && (
                    <View style={Styles.editModalButtonContainer}>
                        <Button
                            onPress={onPressHandler}
                            text="Pažymėti atlikta"
                            color={Color.BUTTON_GREEN_BACKGROUND_COLOR}
                        />
                    </View>
                )}
            </BottomSheetView>
        </BottomSheet >
    )
}

export default Edit;