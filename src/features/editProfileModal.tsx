import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Modal, View, Text, TouchableOpacity, Pressable } from "react-native";

type Props = {
    visible: boolean;
    onClose: () => void;
    onTakePhoto?: () => void;
    onChooseFromGallery?: () => void;
    onRemove?: () => void;
};

export default function EditProfileModal({
    visible,
    onClose,
    onTakePhoto,
    onChooseFromGallery,
    onRemove
}: Props) {
    const handle = (cb?: () => void) => {
        cb?.();
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable
                className="flex-1 bg-black/50 justify-center items-center"
                onPress={onClose}
            >
                <Pressable
                    className="w-11/12 bg-white rounded-2xl p-4 shadow-lg"
                    onPress={() => {}}
                >
                    {/* Exit button */}
                    <TouchableOpacity
                        onPress={onClose}
                        className="absolute top-3 right-3 p-2"
                        accessibilityLabel="Close"
                    >
                        <FontAwesome name="close" size={20} color="#374151" />
                    </TouchableOpacity>

                    <Text className="text-lg font-semibold text-gray-800 mb-4">
                        Edit Profile Photo
                    </Text>

                    <View className="mt-2 rounded-lg overflow-hidden">
                        <TouchableOpacity
                            onPress={() => handle(onTakePhoto)}
                            className="flex-row items-center px-4 py-3 bg-white"
                        >
                            <FontAwesome
                                name="camera"
                                size={18}
                                color="#111827"
                                style={{ marginRight: 12 }}
                            />
                            <Text className="text-base text-gray-800">
                                Take Photo
                            </Text>
                        </TouchableOpacity>

                        <View className="h-[1px] bg-gray-100" />

                        <TouchableOpacity
                            onPress={() => handle(onChooseFromGallery)}
                            className="flex-row items-center px-4 py-3 bg-white"
                        >
                            <FontAwesome
                                name="image"
                                size={18}
                                color="#111827"
                                style={{ marginRight: 12 }}
                            />
                            <Text className="text-base text-gray-800">
                                Choose From Gallery
                            </Text>
                        </TouchableOpacity>

                        <View className="h-[1px] bg-gray-100" />

                        <TouchableOpacity
                            onPress={() => handle(onRemove)}
                            className="flex-row items-center px-4 py-3 bg-white"
                        >
                            <FontAwesome
                                name="trash"
                                size={18}
                                color="#dc2626"
                                style={{ marginRight: 12 }}
                            />
                            <Text className="text-base text-red-600">
                                Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}
