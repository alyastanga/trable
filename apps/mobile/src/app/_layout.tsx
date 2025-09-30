import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router/build/layouts/Stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Fragment, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
    anchor: "(tabs)"
};

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
                <RootLayoutNav />
            </SafeAreaProvider>
        </ThemeProvider>
    );
}

function RootLayoutNav() {
    return (
        <Fragment>
            <Stack>
                <Stack.Protected guard={false}>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="modal"
                        options={{
                            presentation: "modal",
                            title: "Modal",
                            statusBarHidden: true
                        }}
                    />
                </Stack.Protected>
                <Stack.Protected guard={true}>
                    <Stack.Screen
                        name="(auth)"
                        options={{ headerShown: false }}
                    />
                </Stack.Protected>
            </Stack>
            <StatusBar style="auto" />
        </Fragment>
    );
}

export { ErrorBoundary } from "expo-router";
