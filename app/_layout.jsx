import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"
import * as Colors from '../styles/colors';

const Layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.BOTTOM_TAB_SELECT_COLOR,
            tabBarInactiveTintColor: 'black',
            tabBarStyle: {
                backgroundColor: Colors.BOTTOM_TAB_BACKGROUND_COLOR,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                overflow: "visible",
                position: 'absolute',
                height: 100,
                padding: 15,
                borderTopWidth: 0,
                shadowColor: Colors.TEXT_INPUT_SHADOW_COLOR,
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.25,
                shadowRadius: 5,
                elevation: 5
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Pagrindinis',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="home-outline" size={size} color={color} />
                    }
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    title: 'Skenuoti',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="qr-code-outline" size={size} color={color} />
                    }
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Sukurti',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="create-outline" size={size} color={color} />
                    }
                }}
            />
        </Tabs>
    );
}

export default Layout;