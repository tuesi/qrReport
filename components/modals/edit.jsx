import Styles from '../../styles/styles';
import { Text, View, ScrollView } from 'react-native';
import React, { useMemo, useRef, useEffect, useState } from 'react';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import DateStringParser from '../../utils/dateStringParser';
import { CompleteReport } from '../firebase/data';
import * as Color from '../../styles/colors';
import Button from "../common/button";
import { ConfirmAction } from '../common/confirmAction';
import ImageViewModal from '../common/imageViewModal';
import { GetImageFromStorage } from '../firebase/storage';

const Edit = ({ setModalVisible, selectedItem }) => {

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['100%'], []);
    const [deviceImage, setDeviceImage] = useState(null);
    const [reportImage, setReportImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deviceImageUrl = await GetImageFromStorage(selectedItem.deviceImageName);
                setDeviceImage(deviceImageUrl);
                const reportImageUrl = await GetImageFromStorage(selectedItem.imageName);
                setReportImage(reportImageUrl);
            } catch (error) {
                // Handle error
                console.error('Error fetching image:', error);
            }
        };

        fetchData();
    }, [])

    const handleSheetChanges = (index) => {
        if (index === -1) {
            setModalVisible(false);
        }
    };

    const onPressHandler = async () => {
        await CompleteReport(selectedItem.id);
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
                    style={{ position: 'absolute', top: -300, width: "100%", height: "200%" }}
                />
            )}
            handleStyle={{ backgroundColor: Color.SECONDARY_BUTTON_COLOR, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: '50%' }}>
                <BottomSheetView style={Styles.modalContainer}>
                    <View style={Styles.deviceNameModalContainer}>
                        <Text style={{ ...Styles.listItemHeaderText, fontSize: 28 }}>{selectedItem?.name}</Text>
                    </View>
                    <View style={Styles.deviceInfoModalContainer}>
                        <Text style={{ ...Styles.notesTextColor, fontSize: 16 }}>{selectedItem?.notes}</Text>
                    </View>
                    <View style={{ marginTop: "5%", marginBottom: "5%", zIndex: 10 }}>
                        <ImageViewModal uri={deviceImage} size={100} />
                    </View>

                    <View style={[Styles.reportInfoContainer, { marginBottom: reportImage ? '3%' : '10%' }]}>
                        <Text style={{ ...Styles.listItemHeaderText, fontSize: 20 }}>Gedimo informacija</Text>
                        <Text style={Styles.secondaryText}>{selectedItem?.message}</Text>
                    </View>
                    <View style={{ height: reportImage ? "25%" : 0, zIndex: 10 }}>
                        <ImageViewModal uri={reportImage} size={100} />
                    </View>

                    <View style={Styles.deviceLocationContainer}>
                        <Text style={{ ...Styles.listItemHeaderText, fontSize: 18 }}>Įrangos vieta</Text>
                        <Text style={Styles.secondaryText}>{selectedItem?.location}</Text>
                    </View>

                    <View style={{ ...Styles.deviceLocationContainer, width: '70%', marginBottom: '5%' }}>
                        <Text style={{ ...Styles.listItemHeaderText, fontSize: 16 }}>Gedimo Data</Text>
                        <Text style={{ ...Styles.secondaryText, fontSize: 16 }}>{dateCreated}</Text>
                    </View>

                    {dateCompleted && (
                        <View style={{ ...Styles.deviceLocationContainer, width: '70%' }}>
                            <Text style={{ ...Styles.listItemHeaderText, fontSize: 16 }}>Įvykdymo data</Text>
                            <Text style={{ ...Styles.secondaryText, fontSize: 16 }}>{dateCompleted}</Text>
                        </View>
                    )}

                    <View style={Styles.deviceLocationContainer}>
                        <Text style={{ ...Styles.listItemHeaderText, fontSize: 16 }}>Sukūrė</Text>
                        <Text style={Styles.secondaryText}>{selectedItem?.createdBy}</Text>
                    </View>

                    {!selectedItem.dateCompleted && (
                        <View style={Styles.editModalButtonContainer}>
                            <Button
                                onPress={() => { ConfirmAction("Ar tikrai norite pažymėti atlikta?", onPressHandler) }}
                                text="Pažymėti atlikta"
                                color={Color.BUTTON_GREEN_BACKGROUND_COLOR}
                            />
                        </View>
                    )}
                </BottomSheetView>
            </ScrollView>
        </BottomSheet>
    )
}

export default Edit;