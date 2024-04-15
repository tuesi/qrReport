import { StyleSheet } from "react-native";
import * as Color from "../../styles/colors";

const scanStyles = StyleSheet.create({
    scanInputContainer: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100
    },
    cameraViewContainer: {
        height: '100%',
        width: '100%'
    },
    cameraView: {
        height: '105%',
        width: '100%',
    },
})

export default scanStyles;