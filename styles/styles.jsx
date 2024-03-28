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
        justifyContent: 'center'
    },
    createInputContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center'
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'left',
    },
});

export default styles;