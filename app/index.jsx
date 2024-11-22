import { View, Keyboard, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useState, useEffect, useCallback } from "react";
import Button from "../components/common/button";
import { AddNewUser, GetUsers } from "../components/firebase/data";
import { UserDataModel } from "../components/login/userDataModel";
import DropDown from "../components/common/dropDown";
import { getUser, setUser } from "../utils/getMemoryObjects";
import { router } from "expo-router";

const Login = () => {

    const [selected, setSelected] = useState("");
    const [isNew, setIsNew] = useState(false);
    const [nameListData, setNameListData] = useState([]);

    useEffect(() => {
        const fetchNames = async () => {
            const storedName = await getUser();
            if (storedName) {
                router.replace("/home");
            } else {
                const users = await GetUsers();
                setNameListData(users);
            }
        };
        fetchNames();
    }, []);

    const handlePressOutside = () => {
        Keyboard.dismiss();
    };

    const handleAddItem = (newValue) => {
        const newItem = { label: newValue, value: newValue };
        setNameListData(prevData => [...prevData, newItem]);
        setIsNew(true);
    };

    const onLogIn = async () => {
        if (selected !== "") {
            //save in memory
            await setUser(selected);
            if (isNew) {
                const userData = new UserDataModel(selected);
                await AddNewUser(userData.toPlainObject(), selected);
            }
            setIsNew(false);
            router.replace("/home");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center', marginBottom: '5%' }}>
                    <DropDown
                        data={nameListData}
                        getSelected={
                            (value) => {
                                setSelected(value);
                            }
                        }
                        newValue={(value) => {
                            handleAddItem(value);
                        }}
                        addNew={true}
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