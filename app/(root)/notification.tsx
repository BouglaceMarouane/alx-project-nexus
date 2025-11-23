import DeliveryToggle from "@/components/Switch";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Notification = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-5 mt-5 flex flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.arrowLeft} className="size-6" />
        </TouchableOpacity>
        <Text className="text-xl font-sora-bold">Notifications</Text>
        <TouchableOpacity>
          <Image source={icons.chat} className="size-6" tintColor={"#C67C4E"} />
        </TouchableOpacity>
      </View>
      <View className="px-5 mt-10">
        <DeliveryToggle />
      </View>

      <View className="flex-1 px-5 items-center justify-center">
        <Image
          source={images.clipboard}
          className="w-36 h-36"
          resizeMode="contain"
        />
        <Text className="text-2xl font-sora-bold mt-4">Empty</Text>
        <Text className="text-sm text-dark mt-3 text-center">
          You don't have any notifications at this time.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Notification;
