import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
  const { loading, isLoggedIn } = useGlobalContext();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
}
