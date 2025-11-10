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
    FormControlLabel,
    FormControlLabelText
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack/index";
import { registerUser } from "@/features/(auth)/register/db/register";
import { useRegisterStore } from "@/features/(auth)/register/store";
import useAuth from "@/features/(auth)/use-auth";

export default function RegisterScreen() {
    const router = useRouter();
    const email = useRegisterStore((state) => state.email);
    const emailError = useRegisterStore((state) => state.emailError);
    const setEmail = useRegisterStore((state) => state.setEmail);
    const mobileNumber = useRegisterStore((state) => state.mobileNumber);
    const mobileNumberError = useRegisterStore(
        (state) => state.mobileNumberError
    );
    const setMobileNumber = useRegisterStore((state) => state.setMobileNumber);
    const password = useRegisterStore((state) => state.password);
    const passwordError = useRegisterStore((state) => state.passwordError);
    const setPassword = useRegisterStore((state) => state.setPassword);
    const confirmPassword = useRegisterStore((state) => state.confirmPassword);
    const confirmPasswordError = useRegisterStore(
        (state) => state.confirmPasswordError
    );
    const setConfirmPassword = useRegisterStore(
        (state) => state.setConfirmPassword
    );
    const validate = useRegisterStore((state) => state.validate);
    const clearAll = useRegisterStore((state) => state.clearAll);
    const { isLoading, refetch } = useAuth();

    function handleSubmit() {
        console.log("Submitting registration form...");
        const isValid = validate();
        if (!isValid) {
            console.log("Form validation failed.");
            refetch();
            return;
        }

        console.log("Form is valid, proceeding with registration...");
        registerUser({
            email,
            password,
            mobileNumber
        })
            .then(() => {
                console.log("Registration successful.");
                alert("Account created successfully!");
                clearAll();
                router.push("/sign-in");
            })
            .catch((err) => {
                console.log("Registration failed:", err.message);
                alert(err.message);
                refetch();
            });
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
                    <FormControlHelper></FormControlHelper>
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
                    isInvalid={!!mobileNumberError}
                    size="md"
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={true}
                >
                    <FormControlLabel>
                        <FormControlLabelText size="xl">
                            Mobile Number
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Input
                        variant="outline"
                        size="lg"
                        className="w-full rounded-xl"
                    >
                        <InputField
                            value={mobileNumber}
                            onChangeText={setMobileNumber}
                            placeholder="Enter your mobile number..."
                        />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon
                            as={AlertCircleIcon}
                            className="text-red-500"
                        />
                        <FormControlErrorText className="text-red-500">
                            {mobileNumberError}
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
                            secureTextEntry={true}
                        />
                    </Input>
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
                <FormControl
                    isInvalid={!!confirmPasswordError}
                    size="sm"
                    isDisabled={false}
                    isReadOnly={false}
                    isRequired={true}
                >
                    <FormControlLabel>
                        <FormControlLabelText size="xl">
                            Confirm Password
                        </FormControlLabelText>
                    </FormControlLabel>
                    <Input
                        variant="outline"
                        size="lg"
                        className="w-full rounded-xl"
                    >
                        <InputField
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Confirm password..."
                            secureTextEntry={true}
                        />
                    </Input>
                    <FormControlError>
                        <FormControlErrorIcon
                            as={AlertCircleIcon}
                            className="text-red-500"
                        />
                        <FormControlErrorText className="text-red-500">
                            {confirmPasswordError}
                        </FormControlErrorText>
                    </FormControlError>
                </FormControl>
                <Button
                    className="w-full rounded-xl"
                    size="lg"
                    variant="outline"
                    onPress={handleSubmit}
                >
                    <ButtonText>Create Account</ButtonText>
                </Button>
                <Button
                    className="w-full rounded-xl"
                    size="lg"
                    variant="outline"
                    onPress={() => router.push("/sign-in")}
                >
                    <ButtonText>Login</ButtonText>
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
