import { eq } from "drizzle-orm";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, ButtonText } from "@/components/ui/button";
import PostCard from "@/components/ui/post/postCard";
import { db } from "@/drizzle/db";
import { barangayAnnouncements, barangays } from "@/drizzle/schema";
import useAuth from "@/features/(auth)/use-auth";

export default function NewsfeedScreen() {
    const [announcement, setAnnouncement] = useState<any[]>();
    const { setUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        async function fetchAnnouncement() {
            const data = await db
                .select({
                    id: barangayAnnouncements._barangayAnnouncementId,
                    title: barangayAnnouncements.title,
                    content: barangayAnnouncements.content,
                    barangayName: barangays.name,
                    barangayImage: barangays.displayImage,
                    city: barangays.city,
                    province: barangays.province
                })
                .from(barangayAnnouncements)
                .leftJoin(
                    barangays,
                    eq(barangayAnnouncements._barangayId, barangays._barangayId)
                );
            console.log("Fetched Annoucement: ", data);
            setAnnouncement(data);
        }
        fetchAnnouncement();
    }, []);

    function testing() {
        console.log("Dev Mode: ", __DEV__);
    }

    function goBack() {
        setUser(null);
        console.log("User logged out");
        router.replace("/sign-in");
        console.log("Navigated back to Sign In screen");
    }

    return (
        <SafeAreaView className="flex-1 justify-center align-center p-6 bg-background-900 dark:bg-background-900">
            <View style={styles.titleContainer}>
                <Pressable onPress={() => console.log("Im pressing the logo")}>
                    <Image
                        source={require("assets/images/trableIcon.png")}
                        style={{ width: 34, height: 34 }}
                        resizeMode="contain"
                    />
                </Pressable>

                <Pressable
                    onPress={() => console.log("Im pressing this search")}
                    className="ml-60"
                >
                    <Image
                        source={require("assets/images/bell.png")}
                        style={{ width: 26, height: 26 }}
                        resizeMode="contain"
                    />
                </Pressable>

                <Pressable
                    onPress={() => console.log("Im pressing this burger")}
                >
                    <Image
                        source={require("assets/images/burger-bar.png")}
                        style={{ width: 26, height: 26 }}
                        resizeMode="contain"
                    />
                </Pressable>
            </View>
            <View
                style={styles.mainContainer}
                className="flex-1 justify-center align-center"
            >
                <Text
                    style={{ fontFamily: "MontserratBold" }}
                    className=" text-3xl text-typography-0 light:text-typography-900 text-center"
                >
                    Welcome to TRABLE!
                </Text>
                <Text
                    style={{ fontFamily: "MontserratSemiBold" }}
                    className="text-gray-400 text-center mt-4 px-3"
                >
                    You’re currently browsing as an Unverified User Verify your
                    account to connect with your barangay and unlock full
                    features.
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 12
                    }}
                >
                    <Button
                        className="w-1/2 bg-blue-700 mt-4 px-3"
                        size="lg"
                        style={{ backgroundColor: "#1D4ED8", borderRadius: 30 }}
                        onPress={testing}
                    >
                        <ButtonText
                            style={{
                                fontFamily: "MontserratBold",
                                color: "#ffffff"
                            }}
                        >
                            Verify Account
                        </ButtonText>
                    </Button>
                </View>
            </View>

            <FlatList
                data={announcement}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listStyle}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <PostCard item={item} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        position: "relative"
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,

        position: "relative"
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 18
    },
    listStyle: {
        paddingTop: 20,
        paddingHorizontal: 4
    }
});
