import { View, type ViewProps } from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";
import {
    SafeAreaView,
    SafeAreaViewProps
} from "react-native-safe-area-context";

import { useThemeColor } from "@/hooks/use-theme-color";

type BaseProps = {
    lightColor?: string;
    darkColor?: string;
};

type ThemedViewProps = ViewProps & BaseProps;

type ThemedSafeViewProps = SafeAreaViewProps & BaseProps;

type ThemedAnimatedViewProps = AnimatedProps<ViewProps> & BaseProps;

export function ThemedView({
    style,
    lightColor,
    darkColor,
    ...otherProps
}: ThemedViewProps) {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "background"
    );

    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ThemedSafeAreaView({
    style,
    lightColor,
    darkColor,
    ...otherProps
}: ThemedSafeViewProps) {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "background"
    );

    return (
        <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
    );
}

export function ThemedAnimatedView({
    style,
    lightColor,
    darkColor,
    ...otherProps
}: ThemedAnimatedViewProps) {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "background"
    );

    return (
        <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />
    );
}
