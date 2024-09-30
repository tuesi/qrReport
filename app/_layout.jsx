import { Stack } from 'expo-router/stack';
import { Provider } from 'react-redux';
import store from '../store';

const AppLayout = () => {

    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </Provider>
    );
}

export default AppLayout;