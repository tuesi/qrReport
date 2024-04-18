import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { getNotificationTokens, saveNotificationToken } from '../firebase/notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
    }),
});

const sendPushNotification = async (tokens, title = 'Original Title', body = 'And here is the body!') => {
    console.log(tokens);
    const message = {
        to: tokens,
        sound: 'default',
        title: title,
        body: body
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

const handleRegistrationError = (errorMessage) => {
    alert(errorMessage);
    throw new Error(errorMessage);
}

const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            handleRegistrationError('Permission not granted to get push token for push notification!');
            return;
        }
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId;
        if (!projectId) {
            handleRegistrationError('Project ID not found');
        }
        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(pushTokenString);
            await saveNotificationToken(pushTokenString);
            return pushTokenString;
        } catch (e) {
            handleRegistrationError(`${e}`);
        }
    } else {
        handleRegistrationError('Must use physical device for push notifications');
    }
}

const SetNotifications = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    //TODO change to i do not get new tokens every reload
    const [tokens, setTokens] = useState(null);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        const getTokens = async () => {
            const currentTokens = await getNotificationTokens();
            setTokens(currentTokens);
        }

        getTokens();


        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'space-around',
                marginBottom: '10%'
            }}>
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
                title="Press to schedule a notification"
                onPress={async () => {
                    await sendPushNotification(tokens, 'Laba Diena', 'Su Vistiena');
                }}
            />
        </View>
    );
}

export default SetNotifications;