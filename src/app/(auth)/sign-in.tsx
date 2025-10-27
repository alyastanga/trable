import { StyleSheet, TextInput } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

import { ThemedText } from "@/components/themed-text";
import { ThemedSafeAreaView, ThemedView } from "@/components/themed-view";
import { useLoginStore } from "@/features/(auth)/login/store";
import { useColorScheme } from "@/hooks/use-color-scheme";


export default function SignInScreen() {
    const colorScheme = useColorScheme();
    const email = useLoginStore((state) => state.email);
    const setEmail = useLoginStore((state) => state.setEmail);
    const password = useLoginStore((state) => state.password);
    const setPassword = useLoginStore((state) => state.setPassword);

    return (
        <ThemedSafeAreaView style={styles.mainContainer}>
            <ThemedView style={styles.titleContainer}></ThemedView>
            <ThemedView style={styles.form}>
                <ThemedView style={styles.inputContainer}>
                    <ThemedText>Email</ThemedText>
                    <TextInput
                        placeholder={"Enter your email"}
                        value={email}
                        onChangeText={setEmail}
                        style={styles.textInput}
                    />
                </ThemedView>
                <ThemedView style={styles.inputContainer}>
                    <ThemedText>Password</ThemedText>
                    <TextInput
                        placeholder={"Password"}
                        value={password}
                        onChangeText={setPassword}
                        style={styles.textInput}
                    />
                </ThemedView>
            </ThemedView>
        </ThemedSafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        padding: 16,

        position: "relative"
    },
    titleContainer: {
        flex: 1
    },
    form: {
        alignSelf: "flex-start",
        gap: 24,
        width: "100%"
    },
    inputContainer: {
        gap: 4,
        width: "100%"
    },
    textInput: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 12,
        width: "100%",
        padding: 16
    }
});
