import React from "react";
import { View, Text } from "react-native";

//eslint-disable-next-line project-structure/independent-modules
import { sampleUsers } from "@/features/users/db/sampleUser";

export default function CommentSection({
    comments = []
}: {
    comments?: any[];
}) {
    const postComments = comments;

    return (
        <View style={{ marginTop: 12 }}>
            <Text
                style={{
                    fontFamily: "MontserratBold",
                    marginBottom: 6,
                    borderTopWidth: 0.2,
                    paddingTop: 10
                }}
            >
                Comments
            </Text>

            {postComments.map((comment) => {
                const user = sampleUsers.find(
                    (u) => u._userId === comment.userId
                );
                if (!user) return null;

                return (
                    <View
                        key={comment._commentId}
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                            backgroundColor: "#F3F4F6",
                            borderRadius: 10,
                            padding: 10,
                            marginBottom: 2
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 2
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "MontserratSemiBold",
                                        marginRight: 6
                                    }}
                                >
                                    {user.displayName}
                                </Text>
                                <Text
                                    style={{
                                        backgroundColor:
                                            user.role === "Official"
                                                ? "#DBEAFE"
                                                : "#DCFCE7",
                                        color:
                                            user.role === "Official"
                                                ? "#1E3A8A"
                                                : "#166534",
                                        fontSize: 10,
                                        paddingHorizontal: 6,
                                        paddingVertical: 2,
                                        borderRadius: 10
                                    }}
                                >
                                    {user.role}
                                </Text>
                            </View>
                            <Text
                                style={{
                                    fontFamily: "Montserrat",
                                    color: "#374151"
                                }}
                            >
                                {comment.content}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "Montserrat",
                                    color: "#9CA3AF",
                                    fontSize: 10,
                                    marginTop: 2
                                }}
                            >
                                {new Date(comment.createdAt).toLocaleString()}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}
