import icons from "@/constants/icons";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CardProps {
  jobTitle?: string;
  company?: string;
  location?: string;
  salaryRange?: string;
  tags?: string[];
  logo?: ImageSourcePropType | { uri: string };
  isSaved?: boolean;
  onPress?: () => void;
}

const defaultTags = ["Full Time", "Onsite"];

export const Card = ({
  jobTitle,
  company,
  location,
  salaryRange,
  tags,
  logo,
  isSaved = false,
  onPress,
}: CardProps) => {
  const safeTitle = jobTitle ?? "Untitled job";
  const safeCompany = company ?? "Unknown company";
  const safeLocation = location ?? "Location not specified";
  const safeSalary = salaryRange ?? "Salary not specified";
  const safeTags = tags && tags.length ? tags : defaultTags;

  const initials = safeCompany
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  const hasLogo = !!logo;

  return (
    <TouchableOpacity
      className="w-full rounded-3xl bg-white border border-[#EEF1F6] p-5 gap-4"
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center gap-3 flex-1">
          <View className="size-12 rounded-2xl bg-[#F5F7FB] items-center justify-center">
            {hasLogo ? (
              <Image
                source={typeof logo === "string" ? { uri: logo } : logo}
                className="w-7 h-7"
                resizeMode="contain"
              />
            ) : (
              <Text className="text-sm font-sora-bold text-[#6C727F]">
                {initials || "?"}
              </Text>
            )}
          </View>

          <View className="flex-1">
            <Text className="text-dark text-base font-sora-bold">
              {safeTitle}
            </Text>
            <Text className="text-sm text-[#6C727F] font-sora-medium">
              {safeCompany}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          className={`size-10 rounded-2xl border items-center justify-center ${
            isSaved ? "bg-primary border-primary" : "border-[#E0E4EB]"
          }`}
          onPress={onPress}
        >
          <Image
            source={icons.heart}
            className="size-5"
            style={{ tintColor: isSaved ? "#C67C4E" : "#8F96A3" }}
          />
        </TouchableOpacity>
      </View>

      <View className="flex flex-col border-t border-secondary" />

      <View className="gap-2">
        <Text className="text-sm text-[#6C727F] font-sora-medium">
          {safeLocation}
        </Text>

        <Text className="text-lg font-sora-bold text-primary">
          {safeSalary}
        </Text>
      </View>

      <View className="flex-row gap-3">
        {safeTags.slice(0, 2).map((tag) => (
          <View
            key={tag}
            className="rounded-full border border-[#E7EBF1] px-4 py-2"
          >
            <Text className="text-xs font-sora-bold text-[#6C727F]">{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export const FeaturedCard = ({
  jobTitle,
  company,
  location,
  salaryRange,
  tags,
  logo,
  isSaved = false,
  onPress,
}: CardProps) => {
  const safeTitle = jobTitle ?? "Untitled job";
  const safeCompany = company ?? "Unknown company";
  const safeLocation = location ?? "Location not specified";
  const safeSalary = salaryRange ?? "Salary not specified";
  const safeTags = tags && tags.length ? tags : defaultTags;

  const initials = safeCompany
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  const hasLogo = !!logo;

  return (
    <TouchableOpacity
      className="w-[300px] rounded-3xl bg-white border border-[#C67C4E] p-5 gap-4"
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center gap-3 flex-1">
          <View className="size-12 rounded-2xl bg-[#F5F7FB] items-center justify-center">
            {hasLogo ? (
              <Image
                source={typeof logo === "string" ? { uri: logo } : logo}
                className="w-7 h-7"
                resizeMode="contain"
              />
            ) : (
              <Text className="text-sm font-sora-bold text-[#6C727F]">
                {initials || "?"}
              </Text>
            )}
          </View>

          <View className="flex-1">
            <Text className="text-dark text-base font-sora-bold">
              {safeTitle}
            </Text>
            <Text className="text-sm text-[#6C727F] font-sora-medium">
              {safeCompany}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          className={`size-10 rounded-2xl border items-center justify-center ${
            isSaved ? "bg-primary border-primary" : "border-[#E0E4EB]"
          }`}
          onPress={onPress}
        >
          <Image
            source={icons.heart}
            className="size-5"
            style={{ tintColor: isSaved ? "#C67C4E" : "#8F96A3" }}
          />
        </TouchableOpacity>
      </View>

      <View className="flex flex-col border-t border-secondary" />

      <View className="gap-2">
        <Text className="text-sm text-[#6C727F] font-sora-medium">
          {safeLocation}
        </Text>

        <Text className="text-lg font-sora-bold text-primary">
          {safeSalary}
        </Text>
      </View>

      <View className="flex-row gap-3">
        {safeTags.slice(0, 2).map((tag) => (
          <View
            key={tag}
            className="rounded-full border border-[#E7EBF1] px-4 py-2"
          >
            <Text className="text-xs font-sora-bold text-[#6C727F]">{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};
