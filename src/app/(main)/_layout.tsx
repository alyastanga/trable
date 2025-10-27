import { Stack } from "expo-router";

export default function MainLayout() {
    return (
        <Stack initialRouteName="newsfeed">
            <Stack.Screen
                name="newsfeed"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
}
