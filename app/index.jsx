import { View, TextInput, Keyboard, TouchableWithoutFeedback, StyleSheet, Alert } from "react-native";
import styles from "../styles/styles";
import { useState, useEffect, useCallback } from "react";
import Button from "../components/common/button";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { AddNewUser, getUsers } from "../components/firebase/data";
import { UserDataModel } from "../components/login/userDataModel";
import SetNotifications from "../components/notifications/setNotifications";
import { Auth } from "../components/firebase/auth";
import DropDown from "../components/common/dropDown";

const Login = () => {

    const navigation = useNavigation();

    const [selected, setSelected] = useState("");
    const [defaultUser, setDefaultUser] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [data, setData] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchNames = async () => {
                const users = await getUsers();
                setData(users);
            }
            fetchNames();
        }, [])
    );

    useEffect(() => {
        console.log('use effect');
        const fetchNames = async () => {
            //TODO perkelti auth atgal i home kad authentikuotu tik ivedus varda. Ir ten kazkur padaryti ir del notificationu
            await Auth();
            const storedName = await ReactNativeAsyncStorage.getItem('userName');
            if (storedName) {
                navigation.navigate('(tabs)', {
                    screen: 'home'
                });
            } else {
                const users = await getUsers();
                setData(users);
            }
        };
        fetchNames();
    }, []);

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const handleAddItem = (newValue) => {
        const newItem = { label: newValue, value: newValue };
        setData(prevData => [...prevData, newItem]);
        setIsNew(true);
        setDefaultUser(newItem);
    };

    const onLogIn = async () => {
        if (selected !== "") {
            await ReactNativeAsyncStorage.setItem('userName', selected);
            if (isNew) {
                const userData = new UserDataModel(selected);
                await AddNewUser(userData.toPlainObject(), selected);
            }
            setIsNew(false);
            navigation.navigate('(tabs)', {
                screen: 'home'
            });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <SetNotifications></SetNotifications>
                <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center', marginBottom: '5%' }}>
                    <DropDown
                        data={data}
                        getSelected={
                            (value) => {
                                setSelected(value);
                            }
                        }
                        newValue={(value) => {
                            handleAddItem(value);
                        }}
                    ></DropDown>
                </View>
                <Button text={'PRISIJUNGTI'} onPress={onLogIn}></Button>
            </View>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
})

export default Login;