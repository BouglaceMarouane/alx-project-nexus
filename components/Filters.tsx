import {
  employmentFilters,
  experienceFilters,
  locationFilters,
  workModeFilters,
} from "@/constants/data";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type FilterKey = "location" | "employment" | "workMode" | "experience";

const dropdownConfig: {
  key: FilterKey;
  label: string;
  options: string[];
}[] = [
  { key: "location", label: "Location", options: locationFilters },
  { key: "employment", label: "Employment", options: employmentFilters },
  { key: "workMode", label: "Work Mode", options: workModeFilters },
  { key: "experience", label: "Experience", options: experienceFilters },
];

const Filters = () => {
  const params = useLocalSearchParams<{
    location?: string;
    employment?: string;
    workMode?: string;
    experience?: string;
  }>();

  const selections: Record<FilterKey, string> = {
    location: params.location?.toString() ?? "All",
    employment: params.employment?.toString() ?? "All",
    workMode: params.workMode?.toString() ?? "All",
    experience: params.experience?.toString() ?? "All",
  };

  const [openDropdown, setOpenDropdown] = useState<FilterKey | null>(null);

  const handleSelect = (key: FilterKey, value: string) => {
    const normalizedValue = value === "All" ? undefined : value;
    router.setParams({ [key]: normalizedValue });
    setOpenDropdown(null);
  };

  const toggleDropdown = (key: FilterKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <View
      style={{
        zIndex: openDropdown ? 100 : 0,
        elevation: openDropdown ? 16 : 0,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="flex-row gap-3 mt-3 mb-2"
        style={{ overflow: "visible" }}
      >
        {dropdownConfig.map(({ key, label, options }) => (
          <FilterDropdown
            key={key}
            label={label}
            value={selections[key]}
            options={options}
            isOpen={openDropdown === key}
            onToggle={() => toggleDropdown(key)}
            onSelect={(option) => handleSelect(key, option)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

type FilterDropdownProps = {
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (option: string) => void;
};

const dropdownContainerStyle: ViewStyle = {
  shadowColor: "#000000",
  shadowOpacity: 0.1,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 },
  elevation: 4,
};

const FilterDropdown = ({
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
}: FilterDropdownProps) => (
  <View
    className="relative"
    style={[{ minWidth: 140 }, isOpen ? { zIndex: 200, elevation: 20 } : null]}
  >
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onToggle}
      className="rounded-2xl border border-[#E0E4EB] bg-[#F5F7FB] px-4 py-3"
    >
      <Text className="text-xs font-sora-medium text-[#6C727F]">{label}</Text>
      <View className="flex-row items-center justify-between mt-1">
        <Text className="text-sm font-sora-bold text-dark">
          {value === "All" ? "Any" : value}
        </Text>
        <Text className="text-base text-[#6C727F]">{isOpen ? "▴" : "▾"}</Text>
      </View>
    </TouchableOpacity>

    {isOpen && (
      <View
        className="absolute left-0 right-0 top-[110%] rounded-2xl bg-white border border-[#E0E4EB] z-50"
        style={[dropdownContainerStyle, { zIndex: 300, elevation: 30 }]}
      >
        <ScrollView className="max-h-48">
          {options.map((option) => {
            const active = value === option;
            return (
              <TouchableOpacity
                key={option}
                onPress={() => onSelect(option)}
                className={`px-4 py-3 ${
                  active ? "bg-primary/10" : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-sm ${
                    active ? "text-primary font-sora-bold" : "text-dark"
                  }`}
                >
                  {option === "All" ? "Any" : option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    )}
  </View>
);

export default Filters;
