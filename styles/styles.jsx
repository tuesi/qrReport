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
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    createMainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    createInputContainer: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'start'
    },
    createQRContainer: {
        flex: 2.5,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'start'
    },
    showQrContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'start',
        marginTop: '10%'
    },
    scanInputContainer: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'start'
    },
    input: {
        width: '100%',
        height: 50,
        marginBottom: 20,
        fontSize: 18,
        fontWeight: "bold",
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: Color.TEXT_INPUT_BACKGROUND_COLOR,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5
    },
    date_input: {
        alignItems: 'start',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        marginBottom: 20,
        fontSize: 18,
        fontWeight: "bold",
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: Color.TEXT_INPUT_BACKGROUND_COLOR,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5
    },
    input_large: {
        width: '100%',
        height: 100,
        paddingTop: 10,
        marginBottom: 20,
        fontSize: 18,
        fontWeight: "bold",
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: Color.TEXT_INPUT_BACKGROUND_COLOR,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        textAlignVertical: 'top'
    },
    input_disabled: {
        width: '100%',
        height: 50,
        marginBottom: 20,
        fontSize: 18,
        fontWeight: "bold",
        color: Color.TEXT_DISABLED_COLOR,
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: Color.TEXT_DISABLED_BACKGROUND_COLOR,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5
    },
    input_disabled_large: {
        width: '100%',
        height: 100,
        paddingTop: 10,
        marginBottom: 20,
        fontSize: 18,
        fontWeight: "bold",
        color: Color.TEXT_DISABLED_COLOR,
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: Color.TEXT_DISABLED_BACKGROUND_COLOR,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        textAlignVertical: 'top'
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 50,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "bold",
        paddingHorizontal: 10,
        borderRadius: 15,
        borderColor: Color.BUTTON_BORDER_COLOR,
        borderWidth: 3,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5
    },
    topGap: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        paddingTop: '10%'
    },
    buttonText: {
        color: Color.BUTTON_TEXT_COLOR,
        fontWeight: 'bold',
        fontSize: 16
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
        fontSize: 18,
        color: Color.PRIMARY_TEXT_COLOR,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    dateTextStyle: {
        fontSize: 10,
        color: Color.PRIMARY_TEXT_COLOR,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    listItemHeaderText: {
        fontSize: 24,
        color: Color.PRIMARY_TEXT_COLOR,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    listItemInfoText: {
        fontSize: 16,
        color: Color.PRIMARY_TEXT_COLOR,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    listItemLocationText: {
        fontSize: 14,
        color: Color.TEXT_DISABLED_COLOR,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    listItemContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 20,
        minHeight: 200,
        width: '100%',
        marginBottom: '5%',
        justifyContent: 'center',
        backgroundColor: Color.TEXT_INPUT_BACKGROUND_COLOR,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 5,
        position: 'relative',
    },
    listItemHeader: {
        flex: 2,
    },
    listItemInfo: {
        flex: 1,
    },
    listItemLocation: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    backgroundCircleGreen: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CBE0A8',
        borderRadius: 50,
        height: 25,
        width: 80
    },
    backgroundCircleGray: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BEBEBE',
        borderRadius: 50,
        height: 25,
        width: 80
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    dateRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    labelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Color.TEXT_SECONDARY_COLOR
    },
    safeAreaStyle: {
        marginTop: 100,
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;