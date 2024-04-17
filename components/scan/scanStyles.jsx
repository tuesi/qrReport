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
    reportContainerSmall: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    reportContainerLarge: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 20
    }
})

export default scanStyles;