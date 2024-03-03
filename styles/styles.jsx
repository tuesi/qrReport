import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cameraViewContainer: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
    },
    cameraView: {
        height: '100%',
        width: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    input_large: {
        width: '80%',
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
    },
});

export default styles;