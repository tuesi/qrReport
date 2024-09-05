import { StyleSheet } from "react-native";
import * as Color from "../../styles/colors";

const deviceStyles = StyleSheet.create({
    deviceInfoQrContainer: {
        flex: 1,
        width: '80%',
        minHeight: "10%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    deviceInfoModalButtonContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: "5%"
    },
    deviceButtonsContainer: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'start'
    }
})

export default deviceStyles;