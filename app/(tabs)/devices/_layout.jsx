import { Stack } from 'expo-router/stack';

const AppLayout = () => {

    return (
        <Stack>
            <Stack.Screen name="main" options={{ headerShown: false }} />
        </Stack>
    );
}

export default AppLayout;