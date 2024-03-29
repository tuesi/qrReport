import { StyleSheet } from "react-native";
import * as Color from "./colors";

const styles = StyleSheet.create({
    cameraViewContainer: {
        height: '100%',
        width: '100%'
    },
    cameraView: {
        height: '105%',
        width: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
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
        fontSize: 15,
        color: Color.PRIMARY_TEXT_COLOR,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    listItemContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 20,
        marginBottom: 15,
        height: '20%',
        width: '100%',
        justifyContent: 'start',
        borderWidth: 1.5
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    labelStyle: {
        fontSize: 15,
        fontWeight: 'bold'
    },
});

export default styles;