import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

import { AuthContextProvider } from "@/features/(auth)/AuthContext";

export default function MainLayout() {
    return (
        <AuthContextProvider>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#ffffffff",
                        position: "absolute",
                        left: "50%",
                        transform: [{ translateX: 12 }],
                        bottom: 25,
                        borderRadius: 30,
                        height: 60,
                        width: 370,
                        elevation: 5
                    },

                    tabBarItemStyle: {
                        marginTop: 10
                    },

                    tabBarActiveTintColor: "#000000ff",
                    tabBarInactiveTintColor: "#888888",
                    tabBarShowLabel: false
                }}
            >
                <Tabs.Screen
                    name="newsfeed"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, size, focused }) => (
                            <View
                                style={{
                                    backgroundColor: focused
                                        ? "#e1eafcff"
                                        : "transparent",
                                    width: 60,
                                    height: 50,
                                    borderRadius: 30,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <FontAwesome
                                    name="home"
                                    color={focused ? "#2167ffff" : "#888888"}
                                    size={size}
                                />
                            </View>
                        )
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        title: "Search",
                        tabBarIcon: ({ color, size, focused }) => (
                            <View
                                style={{
                                    backgroundColor: focused
                                        ? "#e1eafcff"
                                        : "transparent",
                                    width: 60,
                                    height: 50,
                                    borderRadius: 30,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <FontAwesome
                                    name="search"
                                    color={focused ? "#2167ffff" : "#888888"}
                                    size={size}
                                />
                            </View>
                        )
                    }}
                />
                <Tabs.Screen
                    name="addPost"
                    options={{
                        title: "Post",
                        tabBarIcon: ({ color, size, focused }) => (
                            <View
                                style={{
                                    backgroundColor: focused
                                        ? "#d5e3ffff"
                                        : "transparent",
                                    width: 60,
                                    height: 50,
                                    borderRadius: 30,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <FontAwesome
                                    name="plus"
                                    color={focused ? "#2167ffff" : "#888888"}
                                    size={size}
                                />
                            </View>
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color, size, focused }) => (
                            <View
                                style={{
                                    backgroundColor: focused
                                        ? "#d5e3ffff"
                                        : "transparent",
                                    width: 60,
                                    height: 50,
                                    borderRadius: 30,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <FontAwesome
                                    name="user"
                                    color={focused ? "#2167ffff" : "#888888"}
                                    size={size}
                                />
                            </View>
                        )
                    }}
                />
            </Tabs>
        </AuthContextProvider>
    );
}
