import { Alert } from "react-native"

export const ConfirmAction = (message, onConfirm) => {
    Alert.alert(
        "Patvirtinimas",
        message,
        [
            {
                text: "Atšaukti",
                onPress: () => { },
                style: "cancel"
            },
            {
                text: "Patvirtinti",
                onPress: onConfirm
            }
        ]
    )
}