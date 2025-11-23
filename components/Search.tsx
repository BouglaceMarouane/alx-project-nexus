import icons from "@/constants/icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

type SearchProps = {
  onToggleFilters?: () => void;
};

const Search = ({ onToggleFilters }: SearchProps) => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query || "");

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };
  return (
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-gray-100 border border-grey mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.explore} className="size-5" />
        <TextInput
          placeholder="Search for a job..."
          placeholderTextColor="#8F96A3"
          value={search}
          onChangeText={handleSearch}
          className="flex-1 text-sm font-sora text-dark ml-2"
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggleFilters}
        accessibilityLabel="Toggle filters"
      >
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
