import { Text, StyleSheet, TouchableOpacity, View, TextInput } from "react-native";

const AmountInput = ({ value, getValue }) => {

    const increment = () => {
        getValue(prevValue => prevValue + 1);
    };

    const decrement = () => {
        getValue(prevValue => prevValue - 1);
    };

    const handleChange = (text) => {
        const num = Number(text);
        if (!isNaN(num)) {
            getValue(num);
        }
    };

    return (
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
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 30,
        height: 30,
        backgroundColor: '#DDD', // Light gray background
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: 'black',
    },
    input: {
        width: 50,
        height: 30,
        textAlign: 'center',
        marginHorizontal: 10, // Adds space between the buttons and the input
        borderWidth: 1,
        borderColor: '#CCC', // Light gray border
    }
});

export default AmountInput;