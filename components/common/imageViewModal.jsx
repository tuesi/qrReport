import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ImageViewModal = ({ uri }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const images = [{
        url: uri,
        // You can pass props such as width, height here
    }];

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                    source={{ uri }}
                    style={styles.image}
                />
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover'
    }
});

export default ImageViewModal;