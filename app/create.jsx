import { View, Text, Button } from "react-native";
import { Link, useNavigation, useRouter } from "expo-router";

const Create = () => {

    const router = useRouter();
    const navigation = useNavigation();

    return (
        <View>
            <Text>Create screen</Text>

            <Link href="/home">Go back to Home</Link>

            <Button
                title="Go to Create... again"
                onPress={() => router.push("/create")}
            />
            <Button title="Go back" onPress={() => router.back()} />
            <Button
                title="Go back to first screen in stack"
                onPress={() => navigation.popToTop()}
            />
        </View>
    )

}

export default Create;