import { View, TextInput } from "react-native";
import styles from "../styles/styles";
import { useState, useEffect } from "react";
import Button from "../components/common/button";
import { useNavigation } from '@react-navigation/native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

    const navigation = useNavigation();

    const [name, setName] = useState('');

    useEffect(() => {
        const fetchName = async () => {
            const storedName = await ReactNativeAsyncStorage.getItem('userName');
            if (storedName) {
                navigation.navigate('(tabs)', {
                    screen: 'home'
                });
            }
        };

        fetchName();
    }, []);

    const onLogIn = async () => {
        await ReactNativeAsyncStorage.setItem('userName', name);
        setName('');
        navigation.navigate('(tabs)', {
            screen: 'home'
        });
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
                placeholder="Naudotojo vardas"
                styles={styles.input}
                value={name}
                onChangeText={text => setName(text)}
            />
            <Button onPress={onLogIn}></Button>
        </View>
    );
}

export default Login;