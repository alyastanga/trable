import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedSafeAreaView } from "@/components/themed-view";
import { AuthContextProvider } from "@/features/(auth)/AuthContext";
import useAuth from "@/features/(auth)/use-auth";
import { useColorScheme } from "@/hooks/use-color-scheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded, error] = useFonts({
        Montserrat: require("@assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf"),
        MontserratItalic: require("@assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf"),
        ...FontAwesome.font
    });

    useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <SafeAreaProvider>
                <AuthContextProvider>
                    <RootLayoutContents />
                </AuthContextProvider>
                <StatusBar style="auto" />
            </SafeAreaProvider>
        </ThemeProvider>
    );
}

function RootLayoutContents() {
    const { user, isLoading, error } = useAuth();

    if (isLoading) {
        return null;
    }

    if (error) {
        return (
            <ThemedSafeAreaView>
                <ThemedText>{error.message}</ThemedText>
            </ThemedSafeAreaView>
        );
    }

    return (
        <Stack initialRouteName="(auth)">
            <Stack.Protected guard={user !== null}>
                <Stack.Screen
                    name="(drawer)"
                    options={{ headerShown: false }}
                />
            </Stack.Protected>
            <Stack.Protected guard={user === null}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack.Protected>
        </Stack>
    );
}

export { ErrorBoundary } from "expo-router";
