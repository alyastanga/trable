import { eq } from "drizzle-orm";
import { useState, useEffect } from "react";
import { View, StyleSheet, Image, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PostCard from "@/components/ui/post/postCard";
import { db } from "@/drizzle/db";
import {
    barangayAnnouncements,
    barangays,
    users,
    barangayProjects,
    officials
} from "@/drizzle/schema";
//eslint-disable-next-line project-structure/independent-modules
import { seedDatabase } from "@/tasks/seed";

export default function NewsfeedScreen() {
    const [announcement, setAnnouncement] = useState<any[]>();

    useEffect(() => {
        async function init() {
            /*
            await db.delete(users);
            await db.delete(barangays);
            await db.delete(barangayAnnouncements);
            await db.delete(barangayProjects);
            await db.delete(officials);
        */

            await seedDatabase();
            const announcementData = await db
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

            const projectData = await db
                .select({
                    id: barangayProjects._barangayProjectId,
                    title: barangayProjects.title,
                    content: barangayProjects.description,
                    category: barangayProjects.category,
                    budgetAllocated: barangayProjects.budgetAllocated,
                    status: barangayProjects.status,
                    startDate: barangayProjects.startDate,
                    estimatedEndDate: barangayProjects.estimatedEndDate,
                    barangayName: barangays.name,
                    barangayImage: barangays.displayImage,
                    city: barangays.city,
                    province: barangays.province,
                    postedBy: users.displayName
                })
                .from(barangayProjects)
                .leftJoin(
                    barangays,
                    eq(barangayProjects._barangayId, barangays._barangayId)
                )
                .leftJoin(
                    officials,
                    eq(barangayProjects._officialId, officials._officialId)
                )
                .leftJoin(users, eq(officials._userId, users._userId));

            console.log("Fetched project: ", projectData);

            const data = [
                ...announcementData.map((item) => {
                    return {
                        ...item,
                        type: "announcement"
                    };
                }),

                ...projectData.map((item) => {
                    return {
                        ...item,
                        type: "project"
                    };
                })
            ];

            console.log("Announcements count:", announcementData.length);
            console.log("Projects count:", projectData.length);

            setAnnouncement(data);
        }
        init();
    }, []);

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
            </View>

            <FlatList
                data={announcement}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listStyle}
                keyExtractor={(item) => `${item.type}-${item.id}`}
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
        paddingTop: 1,
        paddingHorizontal: 4
    }
});
