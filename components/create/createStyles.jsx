import { StyleSheet } from "react-native";
import * as Color from "../../styles/colors";

const createStyles = StyleSheet.create({
    createInputContainer: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'start'
    },
    createQRContainer: {
        flex: 1,
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
    topGap: {
        width: '100%',
        alignItems: 'center',
        paddingTop: '5%',
        marginBottom: '5%'
    },
});

export default createStyles;