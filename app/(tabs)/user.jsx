import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Color from "../../styles/colors";
import { logOut, getUser } from "../../utils/getMemoryObjects";
import { DeleteUser } from "../../components/firebase/data";
import Button from "../../components/common/button";
import { ConfirmAction } from "../../components/common/confirmAction";
import { router } from "expo-router";

const User = () => {

    const [name, setName] = useState('');

    useEffect(() => {
        const fetchName = async () => {
            const storedName = await getUser();
            if (storedName) {
                setName(storedName);
            }
        };

        fetchName();
    }, [])

    logoutUser = async () => {
        await logOut();
        router.replace("/");
    }

    deleteCurrentUser = async () => {
        await DeleteUser(name);
        await logOut();
        router.replace("/");
    }

    return (
        <View style={styles.container}>
            <View style={styles.usernameContainer}>
                <Text style={styles.username}>{name}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button text={"ATSIJUNGTI"} color={Color.BUTTON_BLUE_BACKGROUND_COLOR} onPress={logoutUser}></Button>
                <View style={styles.deleteButton}>
                    <Button
                        text={"IŠTRINTI"}
                        color={Color.BUTTON_RED_BACKGROUND_COLOR}
                        onPress={() => { ConfirmAction("Ar tikrai norite ištrinti vartotoją?", deleteCurrentUser) }}>
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    username: {
        fontSize: '25',
        fontWeight: "bold"
    },
    usernameContainer: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: '50%'
    },
    deleteButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%'
    }
})

export default User;