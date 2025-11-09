import { View, Text } from "react-native";

export default function PostScreen() {
    return (
        <View className="flex-1 justify-center items-center bg-background-900">
            <Text className="text-white text-xl font-bold">Post Screen</Text>
            <Text className="text-gray-400 mt-2 text-center px-4">
                Here you can view and create posts. This is your default post
                page.
            </Text>
        </View>
    );
}
