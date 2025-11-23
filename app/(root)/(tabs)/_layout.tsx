import icons from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#C67C4E" : "#D3D3D3"}
      resizeMode="contain"
      className="w-6 h-6"
    />
    <Text
      className={`${focused ? "text-primary font-sora-bold" : "text-[#D3D3D3] font-sora-regular"} text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.explore} title="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.heart} title="Saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.profile} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
