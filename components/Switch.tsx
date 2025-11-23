import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function DeliveryToggle() {
  const [selected, setSelected] = React.useState<"General" | "Applications">(
    "General"
  );

  return (
    <View className="flex-row bg-white rounded-2xl p-1">
      <TouchableOpacity
        onPress={() => setSelected("General")}
        className="flex-1 py-3 items-center"
        style={{
          borderBottomWidth: selected === "General" ? 3 : 2,
          borderColor: selected === "General" ? "#C67C4E" : "#E3E3E3",
        }}
      >
        <Text
          className={`
            font-sora-semibold
            ${selected === "General" ? "text-primary font-sora-medium" : "font-sora-medium text-black"}
          `}
        >
          General
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setSelected("Applications")}
        className="flex-1 py-3 items-center"
        style={{
          borderBottomWidth: selected === "Applications" ? 3 : 2,
          borderColor: selected === "Applications" ? "#C67C4E" : "#E3E3E3",
        }}
      >
        <Text
          className={`
            font-sora-semibold
            ${selected === "Applications" ? "text-primary font-sora-medium" : "font-sora-medium text-black"}
          `}
        >
          Applications
        </Text>
      </TouchableOpacity>
    </View>
  );
}
