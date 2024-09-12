import { View, Text, TextInput, StyleSheet } from "react-native";
import GlobalStyles from "../../styles/styles";

const TextInputWithLabel = ({ labelText, ...props }) => {

    return (
        <View style={styles.container}>
            <View style={GlobalStyles.textContainer}>
                <Text style={GlobalStyles.textStyle}>{labelText}</Text>
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
    }
})

export default TextInputWithLabel;