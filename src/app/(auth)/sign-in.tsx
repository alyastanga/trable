import { StyleSheet } from "react-native";

import { ThemedSafeAreaView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function SignInScreen() {
    const colorScheme = useColorScheme();

    return (
        <ThemedSafeAreaView style={styles.mainContainer}></ThemedSafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    background: {
        ...StyleSheet.absoluteFillObject, // makes it fill parent and sit behind,
        zIndex: -1,
        justifyContent: "center",
        alignItems: "center"
    },
    svgBackground: {
        transform: [{ scaleX: -1 }]
    }
});
