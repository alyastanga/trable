import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, ButtonText } from "@/components/ui/button";
import useAuth from "@/features/(auth)/use-auth";

import EditProfileModal from "../../features/editProfileModal";

export default function Profile() {
    const [modalVisible, setModalVisible] = useState(false);
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

    async function handleTakePhoto() {
        try {
            const { status } =
                await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permission required",
                    "Camera permission is required to take a photo."
                );
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.7,
                allowsEditing: true
            });

            if (!result.canceled && result.assets?.[0]?.uri) {
                const uri = result.assets[0].uri;
                setUser(user ? ({ ...user, photoUrl: uri } as any) : user);
            }
        } catch (err) {
            console.error("Take photo error:", err);
            Alert.alert("Error", "Could not take photo.");
        }
    }

    async function handleChoose() {
        try {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permission required",
                    "Media library permission is required to choose a photo."
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.7,
                allowsEditing: true
            });

            if (!result.canceled && result.assets?.[0]?.uri) {
                const uri = result.assets[0].uri;
                setUser(user ? ({ ...user, photoUrl: uri } as any) : user);
            }
        } catch (err) {
            console.error("Choose photo error:", err);
            Alert.alert("Error", "Could not choose photo.");
        }
    }

    function handleRemove() {
        Alert.alert(
            "Remove Photo",
            "Are you sure you want to remove your profile photo?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () =>
                        setUser(
                            user ? ({ ...user, photoUrl: null } as any) : user
                        )
                }
            ],
            { cancelable: true }
        );
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
                        className="bg-[#1D4ED8] rounded-2xl w-full items-center mb-2.5"
                        onPress={() => router.push("/sign-in")}
                    >
                        <ButtonText className="text-white font-[MontserratSemiBold] text-[9.5px]">
                            Verify Account
                        </ButtonText>
                    </Button>

                    <Button
                        className="rounded-2xl w-full items-center mb-2.5"
                        onPress={() => setModalVisible(true)}
                    >
                        <ButtonText className="font-[MontserratSemiBold] text-[9.5px]">
                            Edit Profile
                        </ButtonText>
                    </Button>

                    <EditProfileModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        onTakePhoto={handleTakePhoto}
                        onChooseFromGallery={handleChoose}
                        onRemove={handleRemove}
                    />
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
