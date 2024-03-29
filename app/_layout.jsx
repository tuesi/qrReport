import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"
import * as Colors from '../styles/colors';

const Layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.BOTTOM_TAB_SELECT_COLOR,
            tabBarInactiveTintColor: Colors.BACKGROUND_COLOR,
            tabBarStyle: {
                backgroundColor: Colors.BOTTOM_TAB_BACKGROUND_COLOR,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                overflow: "hidden",
                position: 'absolute',
                height: 100,
                padding: 15,
                borderTopWidth: 0
            }
        }}>
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
    );
}

export default Layout;