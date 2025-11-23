import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Saved = () => {
  return (
    <SafeAreaView className="flex-1 justify-center align-center">
      <Text className="text-center text-2xl font-sora-extrabold">
        You can find your saved jobs here!
      </Text>
    </SafeAreaView>
  );
};

export default Saved;
