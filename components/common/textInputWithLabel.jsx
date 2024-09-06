import { View, Text, TextInput, StyleSheet } from "react-native";

const TextInputWithLabel = ({ labelText, ...props }) => {

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>{labelText}</Text>
            </View>
            <TextInput
                {...props}
                placeholder={props.placeholder ? props.placeholder : labelText}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        alignItems: "start",
        justifyContent: "center"
    },
    textContainer: {
        margin: "2%"
    },
    textStyle: {
        fontWeight: "bold",
        fontSize: "12px",
        color: "grey"
    }
})

export default TextInputWithLabel;