import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
    return <Stack screenOptions={{
        headerTitleAlign: "center",  // 👈 this line centers the title
      }}/>;
}
