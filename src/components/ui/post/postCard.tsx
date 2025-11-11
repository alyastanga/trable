import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CommentSection from "@/components/ui/post/commentSec";
import { barangayImages } from "@assets/images/barangayImages/barangayImages";

interface PostCardProps {
    item: {
        id: number;
        barangayName: string;
        city: string;
        province: string;
        title: string;
        content: string;
        barangayImage: string;
        comments?: any[];
        postImage?: string;
        type: "announcement" | "project";
    };
}

const getTag = (type: "announcement" | "project") => {
    if (type === "announcement") {
        return {
            text: "ANNOUNCEMENT",
            style: styles.announcementTagContainer
        };
    }
    if (type === "project") {
        return {
            text: "PROJECT PROGRESS",
            style: styles.projectTagContainer
        };
    }
    return null;
};

const PostCard = ({ item }: PostCardProps) => {
    const barangayPic = barangayImages[item.barangayName];
    const [liked, setLiked] = useState(false);
    const router = useRouter();

    const postTag = getTag(item.type);

    function handleBarangayPress() {
        router.push(`/barangayPages/${item.barangayName}` as any);
        console.log("Navigated to Barangay: ", item.barangayName);
    }

    const isLocalKeyAvailable = item.postImage
        ? item.postImage in barangayImages
        : false;

    if (item.postImage === "road-before.jpg" && isLocalKeyAvailable) {
        console.log("SUCCESS: Local image found in map!");
    }

    const postImageSource = item.postImage
        ? barangayImages[item.postImage]
            ? barangayImages[item.postImage]
            : { uri: item.postImage }
        : null;

    return (
        <SafeAreaView>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Pressable onPress={handleBarangayPress}>
                        <Image style={styles.avatar} source={barangayPic} />
                    </Pressable>
                    <View style={styles.textContainer}>
                        <Text style={styles.barangayName}>
                            {item.barangayName}
                        </Text>
                        <Text style={styles.city}>
                            {item.city}, {item.province}
                        </Text>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    {postImageSource && (
                        <Image
                            source={postImageSource}
                            style={styles.postImage}
                            resizeMode="cover"
                        />
                    )}
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.content}>{item.content}</Text>
                </View>

                {postTag && (
                    <View style={[styles.tagContainer, postTag.style]}>
                        <Text style={styles.tagText}>{postTag.text}</Text>
                    </View>
                )}

                <Pressable onPress={() => setLiked(!liked)}>
                    <FontAwesome
                        name={liked ? "heart" : "heart-o"}
                        size={24}
                        color={liked ? "red" : "black"}
                    />
                </Pressable>
                <CommentSection comments={item.comments || []} />
            </View>
        </SafeAreaView>
    );
};

export default PostCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 0.75,
        shadowRadius: 3,
        elevation: 10,
        borderRadius: 20,
        padding: 20
    },

    postImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
    },

    tagContainer: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 10
    },
    tagText: {
        fontSize: 12,
        fontFamily: "MontserratSemiBold",
        color: "#ffffffff"
    },
    announcementTagContainer: {
        backgroundColor: "#EF4444"
    },

    projectTagContainer: {
        backgroundColor: "#10B981"
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.2
    },

    textContainer: {
        flexDirection: "column"
    },

    barangayName: {
        fontFamily: "MontserratSemiBold",
        fontSize: 16,
        color: "#000000ff",
        marginBottom: 3
    },

    city: {
        fontFamily: "Montserrat",
        fontSize: 11,
        color: "#000000ff"
    },

    title: {
        fontFamily: "MontserratBold",
        fontSize: 15,
        fontWeight: "600",
        color: "#000000ff"
    },

    content: {
        fontFamily: "Montserrat",
        fontSize: 14,
        color: "#000000ff",
        marginBottom: 10
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: "#333"
    },

    contentContainer: {}
});
