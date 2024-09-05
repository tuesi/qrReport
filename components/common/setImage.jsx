import { useState } from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import Button from "./button";
import * as ImagePicker from 'expo-image-picker';
import * as Color from '../../styles/colors';

const SetImage = ({ image, setImage }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const takePicture = async () => {
        try {
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.back,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setModalVisible(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setModalVisible(false);
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={styles.container}>
            {image && (
                <Button text={'PAŠALINTI NUOTRAUKĄ'} color={Color.BUTTON_GREY_BACKGROUND_COLOR} onPress={() => { setImage(null) }}></Button>
            )}
            {!image && (
                <Button text={'PRIDĖTI NUOTRAUKĄ'} color={Color.BUTTON_BLUE_BACKGROUND_COLOR} onPress={() => { setModalVisible(true) }}></Button>
            )}
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)}
                >
                    <View style={styles.modalView}>
                        <Button text={'GALERIJA'} color={Color.BUTTON_GREEN_BACKGROUND_COLOR} onPress={pickImage}></Button>
                        <Button text={'KAMERA'} color={Color.BUTTON_BLUE_BACKGROUND_COLOR} onPress={takePicture}></Button>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'start'
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover'
    },
    modalView: {
        width: "80%",
        height: '25%',
        margin: 20,
        backgroundColor: '#B9B9B970',
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }
});

export default SetImage;