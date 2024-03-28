import Styles from '../../styles/styles';
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Button } from 'react-native';
import React, { useMemo, useRef, useEffect } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const Edit = ({ setModalVisible, selectedItem }) => {

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['80%'], []);

    const handleSheetChanges = (index) => {
        if (index === -1) {
            setModalVisible(false);
        }
    };

    const onPressHandler = async () => {
        const itemRef = doc(FIRESTORE_DB, 'reports', selectedItem.id);
        try {
            await updateDoc(itemRef, {
                dateCompleted: new Date() // Set 'completed' to current date and time
            });
            bottomSheetRef.current.close()
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }

    const dateCreated = selectedItem.dateCreated?.toDate();

    // Format the date as a string for rendering
    // You can adjust the formatting according to your needs
    const dateString = dateCreated?.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
        >
            <BottomSheetView style={{ flex: 1, alignItems: 'center' }}>
                <Text>Date: {dateString}</Text>
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
        </BottomSheet>
    )
}

export default Edit;