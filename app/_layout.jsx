import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"

const Layout = () => {


    return (
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
    );
}

export default Layout;