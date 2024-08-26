import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import * as Color from '../../styles/colors';

const ImageViewModal = ({ uri, size }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const images = [{
        url: uri
    }];

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                {uri && (
                    <Image
                        source={{ uri }}
                        style={[styles.image, size ? { width: size, height: size } : {}]}
                    />
                )}
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <ImageViewer
                    imageUrls={images}
                    onSwipeDown={() => setModalVisible(false)}
                    enableSwipeDown={true}
                    swipeDownThreshold={50}
                    saveToLocalByLongPress={false}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 100
    }
});

export default ImageViewModal;