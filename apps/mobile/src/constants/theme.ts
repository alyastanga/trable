/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
    light: {
        text: "#000",
        background: "#fff",
        primary: "#BF0D3E",
        tint: tintColorLight,
        icon: "#BF0D3E",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight
    },
    dark: {
        text: "#ECEDEE",
        background: "#151718",
        primary: "#BF0D3E",
        tint: tintColorDark,
        icon: "#BF0D3E",
        tabIconDefault: "#9BA1A6",
        tabIconSelected: tintColorDark
    }
};

export const Icons = {
    size: {
        small: 16,
        medium: 20,
        large: 24,
        xlarge: 32,
        xxlarge: 48
    }
};

export const Fonts = Platform.select({
    ios: {
        sans: "Montserrat, system-ui",
        serif: "ui-serif",
        rounded: "ui-rounded",
        mono: "ui-monospace"
    },
    default: {
        sans: "Montserrat, normal",
        serif: "serif",
        rounded: "normal",
        mono: "monospace"
    },
    web: {
        sans: "Montserrat, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        serif: "Georgia, 'Times New Roman', serif",
        rounded:
            "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    }
});
