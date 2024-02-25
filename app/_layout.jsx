import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"
import { RealmProvider } from '@realm/react';
import { realmAppId } from '../realmConfig';
import { Report } from '../schemas/report';

const Layout = () => {

    const appConfig = {
        id: realmAppId, // Replace with your actual Realm App ID
        schema: [Report], // Add all your schemas here
    };

    return (
        <RealmProvider {...appConfig}>
            <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => {
                            return <Ionicons name="home-outline" size={size} color={color} />
                        }
                    }}
                />
                <Tabs.Screen
                    name="scan"
                    options={{
                        title: 'Scan',
                        tabBarIcon: ({ color, size }) => {
                            return <Ionicons name="qr-code-outline" size={size} color={color} />
                        }
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: 'Create',
                        tabBarIcon: ({ color, size }) => {
                            return <Ionicons name="create-outline" size={size} color={color} />
                        }
                    }}
                />
            </Tabs>
        </RealmProvider>
    );
}

export default Layout;