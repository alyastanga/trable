import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { db } from "@/drizzle/db";
import migrations from "@/drizzle/migrations/migrations";
import { AuthContextProvider } from "@/features/(auth)/AuthContext";
import useAuth from "@/features/(auth)/use-auth";

import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { success, error } = useMigrations(db, migrations);

    const [loaded, fontError] = useFonts({
        Montserrat: require("@assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf"),
        MontserratItalic: require("@assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf"),
        ...FontAwesome.font
    });

    useEffect(() => {
        if (error) {
            throw error;
        }

        if (fontError) {
            throw fontError;
        }
    }, [error, fontError]);

    useEffect(() => {
        if (loaded && success) {
            SplashScreen.hideAsync();
        }
    }, [loaded, success]);

    if (!loaded || !success) {
        return null;
    }

    return (
        <GluestackUIProvider mode="dark">
            <SafeAreaProvider>
                <AuthContextProvider>
                    <RootLayoutContents />
                </AuthContextProvider>
                <StatusBar style="auto" />
            </SafeAreaProvider>
        </GluestackUIProvider>
    );
}

function RootLayoutContents() {
    const { user, isLoading, error } = useAuth();

    if (isLoading) {
        return null;
    }

    if (error) {
        return (
            <SafeAreaView className="bg-background-900 text-typography-0 dark:bg-background-0 dark:text-typography-900">
                <Text className="text-inherit">{error.message}</Text>
            </SafeAreaView>
        );
    }

    return (
        <Stack initialRouteName="(auth)">
            <Stack.Protected guard={user !== null}>
                <Stack.Screen name="(main)" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Protected guard={user === null}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack.Protected>
        </Stack>
    );
}

export { ErrorBoundary } from "expo-router";
