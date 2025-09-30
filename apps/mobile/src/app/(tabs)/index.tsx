import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedSafeAreaView } from "@/components/themed-view";

export default function HomeScreen() {
    return (
        <ThemedSafeAreaView style={styles.titleContainer}>
            <ThemedText type="title">Welcome!</ThemedText>
            <Link href="/modal" style={styles.link}>
                <ThemedText type="link">Open Modal</ThemedText>
            </Link>
        </ThemedSafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    link: {
        paddingTop: 20,
        fontSize: 20
    }
});
