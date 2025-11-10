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
import { loginUser } from "@/features/(auth)/login/db/login";
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
    const { isLoading, refetch, setUser } = useAuth();

    async function handleSubmit() {
        const isValid = validate();

        if (!isValid) {
            alert("Please fix the errors before submitting.");
            return;
        }

        try {
            const result = await loginUser({ email, password });

            if (result) {
                await refetch();
                alert("Login successful!");

                setUser({
                    email: result.user?.email || email,
                    role: "Unverified"
                });
                clearAll();

                router.replace("/newsfeed");
                console.log("User logged in:", result.user);
            }
        } catch (error) {
            alert("Login failed: ");
        }
    }

    function handleRegister() {
        router.push("/sign-up");
    }

    return (
        <SafeAreaView className="flex-1 justify-center align-center p-6 bg-background-900 dark:bg-background-0">
            <View className="flex-1 justify-center align-center">
                <Text
                    style={{ fontFamily: "MontserratBold" }}
                    className="text-6xl text-typography-0 dark:text-typography-900 text-center"
                >
                    TRABLE
                </Text>
                <Text
                    style={{ fontFamily: "Montserrat" }}
                    className="text-md text-typography-1 dark:text-typography-900 text-center"
                >
                    Transparency starts here
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
                        <FormControlLabelText
                            style={{ fontFamily: "MontserratSemiBold" }}
                            size="xl"
                        >
                            Email
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Input
                        variant="outline"
                        size="lg"
                        className="w-full rounded-xl"
                    >
                        <InputField
                            style={{ fontFamily: "Montserrat" }}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email..."
                        />
                    </Input>
                    <FormControlHelper>
                        <FormControlHelperText
                            style={{ fontFamily: "Montserrat" }}
                        >
                            Must be a valid email address
                        </FormControlHelperText>
                    </FormControlHelper>
                    <FormControlError>
                        <FormControlErrorIcon
                            as={AlertCircleIcon}
                            className="text-red-500"
                        />
                        <FormControlErrorText
                            style={{ fontFamily: "MontserratSemiBold" }}
                            className="text-red-500"
                        >
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
                        <FormControlLabelText
                            style={{ fontFamily: "MontserratSemiBold" }}
                            size="xl"
                        >
                            Password
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Input
                        variant="outline"
                        size="lg"
                        className="w-full rounded-xl"
                    >
                        <InputField
                            style={{ fontFamily: "Montserrat" }}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter your password..."
                            secureTextEntry={true}
                        />
                    </Input>
                    <FormControlHelper>
                        <FormControlHelperText
                            style={{ fontFamily: "Montserrat" }}
                        >
                            Must contain alphanumeric, lowercase, uppercase,
                            special characters and at least 8 characters long.
                        </FormControlHelperText>
                    </FormControlHelper>
                    <FormControlError>
                        <FormControlErrorIcon
                            style={{ fontFamily: "MontserratSemiBold" }}
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
                    <ButtonText style={{ fontFamily: "MontserratSemiBold" }}>
                        Sign in
                    </ButtonText>
                </Button>

                <Text
                    style={{ fontFamily: "MontserratSemiBold" }}
                    className="text-xs text-typography-0 dark:text-typography-900 text-center"
                >
                    ---------------------- OR ----------------------
                </Text>

                <Button
                    className="w-full rounded-xl"
                    size="lg"
                    variant="outline"
                    onPress={handleRegister}
                >
                    <ButtonText style={{ fontFamily: "MontserratSemiBold" }}>
                        Register
                    </ButtonText>
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
