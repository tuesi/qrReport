import { Text, StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import * as Color from '../../styles/colors';

const AmountInput = ({ name, value, getValue }) => {

    const increment = () => {
        const newValue = value + 1;
        getValue(newValue);
    };

    const decrement = () => {
        const newValue = value > 0 ? value - 1 : 0;
        getValue(newValue);
    };

    const handleChange = (text) => {
        const num = Number(text);
        if (!isNaN(num)) {
            if (num < 0) {
                getValue(0);
            } else {
                getValue(num);
            }
        }
    };

    return (
        <View>
            <Text style={styles.nameText}>{name}</Text>
            <View style={styles.container}>
                <TouchableOpacity onPress={decrement} style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                    value={String(value)}
                    onChangeText={handleChange}
                    keyboardType="numeric"
                    style={styles.input}
                />
                <TouchableOpacity onPress={increment} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: "bold",
        borderRadius: 20,
        borderColor: Color.BUTTON_BORDER_COLOR,
        borderWidth: 3,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        margin: '3%'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        fontWeight: "bold",
    },
    input: {
        width: 70,
        height: 35,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: Color.TEXT_INPUT_BACKGROUND_COLOR,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5
    },
    nameText: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "bold",
    }
});

export default AmountInput;