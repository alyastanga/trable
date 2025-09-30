import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ModalScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText>Hiiie</ThemedText>
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
