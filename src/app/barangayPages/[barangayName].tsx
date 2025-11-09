import { AntDesign } from "@expo/vector-icons";
import { eq } from "drizzle-orm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ScrollView,
    FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PostCard from "@/components/ui/post/postCard";
import { db } from "@/drizzle/db";
import { barangayAnnouncements, barangays } from "@/drizzle/schema";
import { barangayImages } from "assets/images/barangayImages/barangayImages";

const TABS = {
    ALL: "All",
    ANNOUNCEMENTS: "Announcements",
    PROJECTS: "Projects",
    BUDGET: "Budget",
    OFFICIALS: "Officials"
};

export default function BarangayPage() {
    const { barangayName } = useLocalSearchParams();
    const [barangayData, setBarangayData] = useState<any>(null);
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState(TABS.ALL);
    const router = useRouter();

    useEffect(() => {
        async function fetchBarangay() {
            if (!barangayName || typeof barangayName !== "string") return;

            // Fetch Barangay Data
            const barangay = await db
                .select({
                    _barangayId: barangays._barangayId,
                    name: barangays.name,
                    city: barangays.city,
                    province: barangays.province,
                    displayImage: barangays.displayImage
                })
                .from(barangays)
                .where(eq(barangays.name, barangayName));

            if (barangay.length === 0) return;

            setBarangayData(barangay[0]);
            const _barangayId = barangay[0]._barangayId;

            // Fetch Announcements
            const ann = await db
                .select()
                .from(barangayAnnouncements)
                .where(eq(barangayAnnouncements._barangayId, _barangayId));

            const formattedAnnouncements = ann.map((item) => ({
                id: item._barangayAnnouncementId,
                title: item.title,
                content: item.content,
                type: "announcement",
                barangayName: barangay[0].name,
                barangayImage: barangay[0].displayImage,
                city: barangay[0].city,
                province: barangay[0].province,
                comments: []
            }));

            setAnnouncements(formattedAnnouncements);
        }

        fetchBarangay();
    }, [barangayName]);

    function handleBackPress() {
        router.back();
    }

    if (!barangayData)
        return (
            <Text style={{ textAlign: "center", marginTop: 50 }}>
                Loading...
            </Text>
        );

    const renderTabContent = () => {
        if (activeTab === TABS.ALL || activeTab === TABS.ANNOUNCEMENTS) {
            return (
                <FlatList
                    data={announcements}
                    keyExtractor={(item) => `ann-${item.id}`}
                    renderItem={({ item }) => <PostCard item={item} />}
                    contentContainerStyle={styles.listContainer}
                    scrollEnabled={false} // CRUCIAL: Must be false when nested in ScrollView
                />
            );
        }

        // Placeholder return for other tabs
        return (
            <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>
                    {activeTab} data coming soon...
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Pressable onPress={() => console.log("Im pressing the logo")}>
                    <Image
                        source={require("assets/images/trableIcon.png")}
                        style={{ width: 34, height: 34 }}
                        resizeMode="contain"
                    />
                </Pressable>

                <Pressable onPress={handleBackPress}>
                    <AntDesign name="arrow-left" size={26} color="black" />
                </Pressable>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <View style={styles.coverSection}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={barangayImages[barangayData.name]}
                            style={styles.profileImage}
                            resizeMode="cover"
                        />
                    </View>

                    <Text style={styles.barangayTitle}>
                        {barangayData.name}
                    </Text>
                    <Text style={styles.barangaySubtitle}>
                        {barangayData.city}, {barangayData.province}
                    </Text>
                </View>

                <ScrollView
                    style={styles.tabBarWrapper}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabBar}
                >
                    {Object.values(TABS).map((tabName) => (
                        <Pressable
                            key={tabName}
                            onPress={() => setActiveTab(tabName)}
                            style={styles.tabItemContainer}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === tabName && styles.activeTab
                                ]}
                            >
                                {tabName}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>

                {renderTabContent()}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: "#ffffff",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB"
    },

    headerTitle: {
        flex: 1,
        textAlign: "center",
        fontSize: 18,
        color: "#111827",
        marginHorizontal: 10,
        fontFamily: "MontserratSemiBold"
    },

    coverSection: {
        padding: 16,
        backgroundColor: "#Ffffff",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: "center"
    },

    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#ffffffff",
        padding: 3,
        marginBottom: 10,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50
    },

    barangayTitle: {
        fontSize: 28,
        fontFamily: "MontserratSemiBold",
        marginTop: 10,
        color: "#111827"
    },

    barangaySubtitle: {
        color: "#6B7280",
        fontSize: 16,
        fontFamily: "Montserrat",
        marginTop: 4
    },

    placeholderContainer: {
        padding: 40,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 200
    },

    placeholderText: {
        fontSize: 18,
        color: "#6B7280",
        fontFamily: "MontserratSemiBold"
    },

    tabBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB"
    },

    tabText: {
        fontSize: 16,
        color: "#6B7280",
        fontFamily: "MontserratSemiBold",
        paddingBottom: 5
    },
    activeTab: {
        color: "#1D4ED8",
        borderBottomWidth: 2,
        borderBottomColor: "#1D4ED8"
    },

    tabItemContainer: {
        marginRight: 24
    },

    tabBarWrapper: {
        backgroundColor: "#FFFFFF",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB"
    },

    listContainer: {
        paddingHorizontal: 16
    },

    announcementItem: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 16,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2
    },
    announcementTitle: {
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: "MontserratSemiBold",
        marginBottom: 4
    },
    announcementContent: {
        color: "#4B5563",
        fontFamily: "Montserrat"
    }
});
