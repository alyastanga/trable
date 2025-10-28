import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, ButtonText } from "@/components/ui/button";
import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack/index";
import { useLoginStore } from "@/features/(auth)/login/store";
import useAuth from "@/features/(auth)/use-auth";

export default function SignInScreen() {
    const router = useRouter();
    const email = useLoginStore((state) => state.email);
    const emailError = useLoginStore((state) => state.emailError);
    const setEmail = useLoginStore((state) => state.setEmail);
    const password = useLoginStore((state) => state.password);
    const passwordError = useLoginStore((state) => state.passwordError);
    const setPassword = useLoginStore((state) => state.setPassword);
    const validate = useLoginStore((state) => state.validate);
    const clearAll = useLoginStore((state) => state.clearAll);
    const { isLoading, refetch } = useAuth();

    function handleSubmit() {
        validate();
        refetch();
        clearAll();
    }

    function handleRegister() {
        router.push("/sign-up");
    }

    return (
        <SafeAreaView className="flex-1 justify-center align-center p-6 bg-background-900 dark:bg-background-0">
            <View className="flex-1 justify-center align-center">
                <Text className="font-montserrat text-6xl font-bold text-typography-0 dark:text-typography-900 text-center">
                    TRABLE
                </Text>
            </View>
            <VStack space="2xl">
                <FormControl
                    isInvalid={!!emailError}
                    size="md"
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={true}
                >
                    <FormControlLabel>
                        <FormControlLabelText size="xl">
                            Email
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Input
                        variant="outline"
                        size="lg"
                        className="w-full rounded-xl"
                    >
                        <InputField
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email..."
                        />
                    </Input>
                    <FormControlHelper>
                        <FormControlHelperText>
                            Must be a valid email address
                        </FormControlHelperText>
                    </FormControlHelper>
                    <FormControlError>
                        <FormControlErrorIcon
                            as={AlertCircleIcon}
                            className="text-red-500"
                        />
                        <FormControlErrorText className="text-red-500">
                            {emailError}
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>
                <FormControl
                    isInvalid={!!passwordError}
                    size="sm"
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={true}
                >
                    <FormControlLabel>
                        <FormControlLabelText size="xl">
                            Password
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Input
                        variant="outline"
                        size="lg"
                        className="w-full rounded-xl"
                    >
                        <InputField
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter your password..."
                        />
                    </Input>
                    <FormControlHelper>
                        <FormControlHelperText>
                            Must contain alphanumeric, lowercase, uppercase,
                            special characters and at least 8 characters long.
                        </FormControlHelperText>
                    </FormControlHelper>
                    <FormControlError>
                        <FormControlErrorIcon
                            as={AlertCircleIcon}
                            className="text-red-500"
                        />
                        <FormControlErrorText className="text-red-500">
                            {passwordError}
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>
                <Button
                    className="w-full rounded-xl"
                    size="lg"
                    variant="outline"
                    onPress={handleSubmit}
                >
                    <ButtonText>Sign in</ButtonText>
                </Button>

                <Text
                    className="font-montserrat text-xs text-typography-0 dark:text-typography-900 text-center"
                >
                    ---------------------- OR ----------------------
                </Text>

                <Button
                    className="w-full rounded-xl"
                    size="lg"
                    variant="outline"
                    onPress={handleRegister}
                >
                    <ButtonText>Register</ButtonText>
                </Button>
            </VStack>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        padding: 16,

        position: "relative"
    },
    titleContainer: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center"
    }
});
