import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
    return (
        <>
            <StatusBar hidden={true} />
            <Stack
                screenOptions={{
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "#1f2937",
                    },
                    headerTintColor: "#f3f4f6",
                }}
            >
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="movies/[id]"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </>
    );
}
