import { AntDesign } from "@expo/vector-icons";
import { desc, eq } from "drizzle-orm";
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
import BudgetView from "@/components/barangay/BudgetView";

import PostCard from "@/components/ui/post/postCard";
import { db } from "@/drizzle/db";
import {
    barangayAnnouncements,
    barangayBudgets,
    barangayProjects,
    barangays,
    users,
    officials
} from "@/drizzle/schema";
import { barangayImages } from "assets/images/barangayImages/barangayImages";

const TABS = {
    ALL: "All",
    ANNOUNCEMENTS: "Announcements",
    PROJECTS: "Projects",
    BUDGET: "Budget",
    OFFICIALS: "Officials"
};

interface BudgetData {
    year: number;
    category: string;
    allocatedAmount: number;
}

interface OfficialsData {
    name: string;
    position: string;
    displayImage: string | null;
    termStart: string | null;
    termEnd: string | null;
}

export default function BarangayPage() {
    const { barangayName } = useLocalSearchParams();
    const [barangayData, setBarangayData] = useState<any>(null);
    const [projects, setProject] = useState<any>(null);
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [budgetData, setBudgetData] = useState<BudgetData[]>([]);
    const [officialsData, setOfficialsData] = useState<OfficialsData[]>([]);
    const [activeTab, setActiveTab] = useState(TABS.ALL);
    const router = useRouter();

    async function fetchOfficialsData(_barangayId: number) {
        if (!_barangayId) return;

        try {
            const official = await db
                .select({
                    name: users.fullName,
                    position: officials.position,
                    displayImage: users.displayImage,
                    termStart: officials.termStart,
                    termEnd: officials.termEnd
                })
                .from(officials)
                .leftJoin(users, eq(officials._userId, users._userId))
                .where(eq(officials._barangayId, _barangayId));

            setOfficialsData(official as OfficialsData[]);
        } catch (error) {
            console.error("Error fetching officials data:", error);
        }
    }

    async function fetchBarangayBudget(_barangayId: number) {
        if (!_barangayId) return;

        try {
            const budget = await db
                .select({
                    year: barangayBudgets.year,
                    category: barangayBudgets.category,
                    allocatedAmount: barangayBudgets.amount
                })
                .from(barangayBudgets)
                .where(eq(barangayBudgets._barangayId, _barangayId))
                .orderBy(desc(barangayBudgets.year), barangayBudgets.category);

            setBudgetData(budget);
        } catch (error) {
            console.error("Error fetching budget data:", error);
        }
    }

    useEffect(() => {
        async function fetchBarangay() {
            if (!barangayName || typeof barangayName !== "string") return;

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

            const proj = await db
                .select()
                .from(barangayProjects)
                .where(eq(barangayProjects._barangayId, _barangayId));

            const formattedProjects = proj.map((item) => ({
                id: item._barangayProjectId,
                title: item.title,
                content: item.description,
                type: "project",
                barangayName: barangay[0].name,
                barangayImage: barangay[0].displayImage,
                city: barangay[0].city,
                province: barangay[0].province,
                comments: []
            }));
            setAnnouncements(formattedAnnouncements);
            setProject(formattedProjects);
            fetchBarangayBudget(_barangayId);
            fetchOfficialsData(_barangayId);
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
        if (activeTab === TABS.ALL) {
            const allPosts = [...announcements, ...projects];

            return (
                <FlatList
                    data={allPosts}
                    keyExtractor={(item) => `${item.type}-${item.id}`}
                    renderItem={({ item }) => <PostCard item={item} />}
                    contentContainerStyle={styles.listContainer}
                    scrollEnabled={false}
                />
            );
        }

        if (activeTab === TABS.ANNOUNCEMENTS) {
            return (
                <FlatList
                    data={announcements}
                    keyExtractor={(item) => `ann-${item.id}`}
                    renderItem={({ item }) => <PostCard item={item} />}
                    contentContainerStyle={styles.listContainer}
                    scrollEnabled={false}
                />
            );
        }

        if (activeTab === TABS.PROJECTS) {
            return (
                <FlatList
                    data={projects}
                    keyExtractor={(item) => `proj-${item.id}`}
                    renderItem={({ item }) => <PostCard item={item} />}
                    contentContainerStyle={styles.listContainer}
                    scrollEnabled={false}
                />
            );
        }

        if (activeTab === TABS.BUDGET) {
            return (
                <View style={styles.listContainer}>
                    <BudgetView data={budgetData} />
                </View>
            );
        }

        if (activeTab === TABS.OFFICIALS) {
            if (officialsData.length === 0) {
                return (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.placeholderText}>
                            No officials listed for this barangay.
                        </Text>
                    </View>
                );
            }

            return (
                <View style={styles.listContainer}>
                    <FlatList
                        data={officialsData}
                        keyExtractor={(item, index) =>
                            `${item.position}-${index}`
                        }
                        renderItem={({ item }) => (
                            <View style={styles.officialCard}>
                                <Image
                                    source={
                                        item.displayImage
                                            ? { uri: item.displayImage }
                                            : require("assets/images/DefaultPic.png")
                                    }
                                    style={styles.officialImage}
                                />
                                <View style={styles.officialDetails}>
                                    <Text style={styles.officialName}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.officialPosition}>
                                        {item.position}
                                    </Text>
                                    <Text style={styles.officialTerm}>
                                        Term: {item.termStart || "N/A"} -{" "}
                                        {item.termEnd || "Present"}
                                    </Text>
                                </View>
                            </View>
                        )}
                        contentContainerStyle={styles.listContainer}
                        scrollEnabled={false}
                    />
                </View>
            );
        }
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
        paddingHorizontal: 20
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
        fontSize: 16,
        fontFamily: "MontserratSemiBold",
        marginBottom: 4
    },
    announcementContent: {
        color: "#4B5563",
        fontFamily: "Montserrat"
    },

    officialCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 1,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1
    },
    officialImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#D1D5DB",
        marginRight: 15
    },
    officialDetails: {
        flex: 1,
        justifyContent: "center"
    },
    officialName: {
        fontSize: 18,
        fontFamily: "MontserratSemiBold",
        color: "#111827"
    },
    officialPosition: {
        fontSize: 14,
        fontFamily: "Montserrat",
        color: "#1D4ED8"
    },
    officialTerm: {
        fontSize: 12,
        fontFamily: "Montserrat",
        color: "#6B7280",
        marginTop: 2
    }
});
