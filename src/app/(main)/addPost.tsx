import { View, Text, StyleSheet } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";

export default function PostScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Post Creation Restricted 🚫</Text>
            <Text style={styles.message}>
                Your account is currently unverified.
            </Text>
            <Text style={styles.subText}>
                Please verify your account to enable this feature.
            </Text>

            <Button style={styles.button}>
                <ButtonText style={styles.buttonText}>Verify Now</ButtonText>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        backgroundColor: "#f9f9f9"
    },
    title: {
        fontFamily: "MontserratBold",
        fontSize: 22,
        color: "#333",
        marginBottom: 10,
        textAlign: "center"
    },
    message: {
        fontFamily: "MontserratSemiBold",
        fontSize: 16,
        color: "#E53E3E",
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 10
    },
    subText: {
        fontFamily: "Montserrat",
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 10
    },

    button: {
        height: 41,
        backgroundColor: "#1D4ED8",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 40,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    buttonText: {
        fontFamily: "MontserratBold",
        color: "#FFFFFF",
        fontSize: 16
    }
});
