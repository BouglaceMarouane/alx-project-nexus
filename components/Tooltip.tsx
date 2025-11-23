import images from "@/constants/images";
import { Image as ExpoImage } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const WOMAN_IMAGE_STYLE = { width: 176, height: 176, marginTop: 8 };

const Tooltip = () => {
  return (
    <View className="relative w-full rounded-3xl bg-[#C67C4E] overflow-hidden px-6 py-6">
      <View className="absolute inset-0">
        <View className="absolute -right-16 -top-20 size-40 rounded-full bg-white/15" />
        <View className="absolute -right-10 top-4 size-28 rounded-2xl bg-white/20 rotate-6" />
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-1 max-w-[52%]">
          <Text className="text-white text-sm uppercase tracking-widest">
            Featured tip
          </Text>
          <Text className="text-lg font-sora-bold text-white mt-1">
            Increase your chances of getting hired!
          </Text>

          <TouchableOpacity
            className="bg-light rounded-full px-5 py-2 mt-4 self-start shadow-md shadow-zinc-500"
            onPress={() => router.push("/(root)/featuredTipPage")}
          >
            <Text className="text-dark font-sora-semibold text-sm">
              Read more
            </Text>
          </TouchableOpacity>
        </View>

        <ExpoImage
          source={images.woman}
          transition={200}
          contentFit="cover"
          cachePolicy="memory-disk"
          priority="high"
          style={WOMAN_IMAGE_STYLE}
        />
      </View>
    </View>
  );
};

export default Tooltip;
