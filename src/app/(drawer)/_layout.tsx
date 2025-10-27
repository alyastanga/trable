import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
    return (
        <Drawer initialRouteName="newsfeed">
            <Drawer.Screen
                name="newsfeed"
                options={{
                    headerShown: false
                }}
            />
            <Drawer.Screen
                name="profile"
                options={{
                    headerShown: false
                }}
            />
        </Drawer>
    );
}
