import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const { isLoggedIn, loading, refetch } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href="/" />;
  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
      Alert.alert("Login successful");
    } else {
      Alert.alert("Login failed");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-slate-50 justify-center items-center">
      <StatusBar barStyle="dark-content" />
      <View className="w-full max-w-md px-8">
        <View className="mb-10 items-center">
          <Image
            source={images.logo2}
            className="size-44 pb-6"
            resizeMode="contain"
          />
          <Text className="text-3xl font-sora-bold text-primary">
            Welcome Back
          </Text>
          <Text className="text-slate-500 mt-2">
            Sign in to continue to JobHunt
          </Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-slate-700 font-medium mb-1">Username</Text>
            <TextInput
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-blue-500 mt-2"
              placeholder="Enter your username"
              placeholderTextColor="#94a3b8"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-slate-700 font-medium mt-2">Password</Text>
            <TextInput
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 mt-2 text-slate-900 focus:border-blue-500"
              placeholder="Enter your password"
              placeholderTextColor="#94a3b8"
              secureTextEntry
            />
          </View>

          <TouchableOpacity className="items-end my-2">
            <Text className="text-blue-600 font-medium">Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            className="w-full bg-[#313131] py-4 rounded-xl items-center mt-2 shadow-sm"
          >
            <Text className="text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center my-8">
          <View className="flex-1 h-[1px] bg-slate-200" />
          <Text className="mx-4 text-slate-400">Or continue with</Text>
          <View className="flex-1 h-[1px] bg-slate-200" />
        </View>
        <View className="flex flex-row gap-4">
          <TouchableOpacity
            className="bg-white p-4 rounded-xl shadow-lg shadow-zinc-300 flex-1 flex-row items-center justify-center gap-3 w-full"
            onPress={handleLogin}
          >
            <Image
              source={icons.google}
              className="w-6 h-6"
              resizeMode="contain"
            />
            <Text className="text-dark text-center font-sora-bold text-base">
              Sign in with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
