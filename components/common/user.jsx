import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import GetInitials from "../../utils/getInitials";
import { useNavigation } from '@react-navigation/native';
import * as Color from '../../styles/colors';

const User = () => {

    const navigation = useNavigation();

    const [name, setName] = useState('');

    const onPress = async () => {
        await ReactNativeAsyncStorage.setItem('userName', '');
        navigation.navigate('index');
    }

    useEffect(() => {
        const fetchName = async () => {
            const storedName = await ReactNativeAsyncStorage.getItem('userName');
            if (storedName) {
                setName(GetInitials(storedName));
            }
        };

        fetchName();
    }, []);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: Color.BACKGROUND_COLOR,
        shadowColor: Color.TEXT_INPUT_SHADOW_COLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 1.5,
        elevation: 5,
        position: 'absolute',
        left: 20,
        top: 50,
        zIndex: 1
    },
    name: {
        fontWeight: 'bold',
    }
});

export default User;