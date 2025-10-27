import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
    return (
        <Drawer screenOptions={{}}>
            <Drawer.Screen
                name="newsfeed"
                options={{
                    headerShown: false
                }}
            />
        </Drawer>
    );
}
