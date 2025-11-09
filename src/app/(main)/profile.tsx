import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, ButtonText } from "@/components/ui/button";
import useAuth from "@/features/(auth)/use-auth";

export default function Profile() {
    const router = useRouter();
    const { user, setUser } = useAuth();
    console.log("Profile user:", user);
    const defaultProfilePic = require("assets/images/DefaultPic.png");

    function handleHome() {
        router.replace("/newsfeed");
    }

    function handleSignOut() {
        setUser(null);
        router.replace("/sign-in");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Pressable onPress={handleHome}>
                    <Image
                        style={{ width: 34, height: 34 }}
                        source={require("assets/images/trableIcon.png")}
                    />
                </Pressable>
                <Text style={{ fontFamily: "MontserratBold", fontSize: 20 }}>
                    {" "}
                    Profile{" "}
                </Text>
                <Pressable>
                    <FontAwesome
                        name="sign-out"
                        size={34}
                        color="black"
                        onPress={handleSignOut}
                    />
                </Pressable>
            </View>

            <View style={styles.profileContainer}>
                <View style={styles.leftColumn}>
                    <Image
                        source={defaultProfilePic}
                        style={styles.profileImage}
                    />
                    <Text style={styles.infoText}>
                        {user?.role || "Unverified"}
                    </Text>
                    <Button
                        style={{
                            backgroundColor: "#1D4ED8",
                            borderRadius: 20,
                            width: "100%",
                            alignItems: "center",
                            marginBottom: 10
                        }}
                    >
                        <ButtonText
                            style={{
                                color: "white",
                                fontFamily: "MontserratSemiBold",
                                fontSize: 9.5
                            }}
                        >
                            Verify Account
                        </ButtonText>
                    </Button>
                    <Button
                        style={{
                            borderRadius: 20,
                            width: "100%",
                            alignItems: "center",
                            marginBottom: 10
                        }}
                    >
                        <ButtonText
                            style={{
                                fontFamily: "MontserratSemiBold",
                                fontSize: 9.5
                            }}
                        >
                            Edit Profile
                        </ButtonText>
                    </Button>
                </View>

                <View style={styles.rightColumn}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>
                            Email: {user?.email || "N/A"}
                        </Text>
                        <Text style={styles.infoText}>
                            Full Name: {user?.role || "N/A"}
                        </Text>
                        <Text style={styles.infoText}>
                            Mobile Number: {user?.role || "N/A"}
                        </Text>
                        <Text style={styles.infoText}>
                            Barangay: {user?.role || "N/A"}
                        </Text>
                        <Text style={styles.infoText}>
                            Province: {user?.role || "N/A"}
                        </Text>
                        <Text style={styles.infoText}>
                            City: {user?.role || "N/A"}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },

    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30
    },

    infoContainer: {
        padding: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },

    profileContainer: {
        flexDirection: "row",
        shadowColor: "#000",
        padding: 5,
        alignItems: "center"
    },

    leftColumn: {
        width: "35%",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20
    },

    rightColumn: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch"
    },

    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 20
    },
    infoText: {
        fontFamily: "MontserratSemiBold",
        fontSize: 12,
        marginBottom: 10
    },
    warningText: {
        fontFamily: "Montserrat",
        marginTop: 10,
        color: "red",
        fontWeight: "bold"
    }
});
