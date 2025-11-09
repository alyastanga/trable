import { Stack } from "expo-router";

export default function BarangayLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="[barangayName]"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
