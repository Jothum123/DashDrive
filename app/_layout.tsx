import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import {
  View
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className={`flex-1 ${colorScheme === 'dark' ? 'dark' : ''} bg-white dark:bg-black`}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/otp" />
          <Stack.Screen name="setup/payment-method" />
          <Stack.Screen name="setup/add-card" />
          <Stack.Screen name="home" />
          <Stack.Screen name="search" />
          <Stack.Screen name="negotiation/fare-input" />
          <Stack.Screen name="negotiation/broadcasting" />
          <Stack.Screen name="negotiation/tracking" />
          <Stack.Screen name="negotiation/completed" />
        </Stack>
      </View>
    </GestureHandlerRootView>
  );
}
