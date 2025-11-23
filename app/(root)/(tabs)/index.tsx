import { Card, FeaturedCard } from "@/components/Card";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import Tooltip from "@/components/Tooltip";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useGlobalContext } from "@/lib/global-provider";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { JobFromApi } from "@/lib/jobsApi";
import { getJobs } from "@/lib/jobsApi";
import {
  buildTags,
  formatLocation,
  formatSalary,
  getLogoSource,
  jobMatchesFilters,
  jobMatchesQuery,
  type ActiveFilters,
} from "@/lib/jobUtils";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Good Night";
};

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{
    query?: string;
    location?: string;
    employment?: string;
    workMode?: string;
    experience?: string;
  }>();

  const [jobs, setJobs] = useState<JobFromApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [greeting, setGreeting] = useState(getGreeting());
  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => clearInterval(interval);
  }, []);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filtersMounted, setFiltersMounted] = useState(false);
  const filterAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error("Error loading jobs from JSON", err);
      setError("Failed to load local jobs data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardPress = (id: string) => router.push(`/jobs/${id}`);
  const toggleFilters = () => setFiltersVisible((prev) => !prev);

  const queryParam = params.query?.toString();

  const activeFilters = useMemo<ActiveFilters>(
    () => ({
      location: params.location?.toString(),
      employment: params.employment?.toString(),
      workMode: params.workMode?.toString(),
      experience: params.experience?.toString(),
    }),
    [params.location, params.employment, params.workMode, params.experience]
  );

  const filteredJobs = useMemo(() => {
    if (!jobs.length) return [];
    return jobs.filter(
      (job) =>
        jobMatchesQuery(job, queryParam) &&
        jobMatchesFilters(job, activeFilters)
    );
  }, [jobs, queryParam, activeFilters]);

  const featuredJobs = useMemo(() => filteredJobs.slice(0, 3), [filteredJobs]);

  const hasActiveFilters =
    (queryParam && queryParam.toString().trim().length > 0) ||
    Object.values(activeFilters).some(
      (value) => value && value !== "All" && value.trim().length > 0
    );

  const showFilteredEmptyState =
    !loading &&
    !error &&
    !!jobs.length &&
    hasActiveFilters &&
    !filteredJobs.length;

  useEffect(() => {
    if (filtersVisible) setFiltersMounted(true);
    Animated.timing(filterAnim, {
      toValue: filtersVisible ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !filtersVisible) {
        setFiltersMounted(false);
      }
    });
  }, [filtersVisible, filterAnim]);

  const filterStyles = {
    opacity: filterAnim,
    transform: [
      {
        translateY: filterAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-16, 0],
        }),
      },
    ],
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5 py-2"
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row">
                <Image
                  source={images.avatar}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-sora text-dark">
                    {greeting}
                  </Text>
                  <Text className="text-base font-sora-medium text-dark">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => router.push("/notification")}>
                <Image
                  source={icons.notification}
                  className="size-6"
                  tintColor={"#C67C4E"}
                />
              </TouchableOpacity>
            </View>

            <Search onToggleFilters={toggleFilters} />

            {(filtersMounted || filtersVisible) && (
              <Animated.View
                style={[
                  {
                    marginTop: 12,
                    overflow: "visible",
                    zIndex: filtersVisible ? 200 : 0,
                    elevation: filtersVisible ? 20 : 0,
                  },
                  filterStyles,
                ]}
                pointerEvents={filtersVisible ? "auto" : "none"}
              >
                <Filters />
              </Animated.View>
            )}

            <View className="my-5">
              <Tooltip />
              <View className="flex flex-row items-center justify-between mt-5">
                <Text className="text-lg font-sora-bold text-dark">
                  Our Recommendations
                </Text>
                <TouchableOpacity onPress={() => router.push("/explore")}>
                  <Text className="text-sm font-sora text-primary">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                bounces={false}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex-row gap-4 mt-5 pr-5"
              >
                {featuredJobs.length
                  ? featuredJobs.map((job) => {
                      const location = formatLocation(job);
                      const salaryRange = formatSalary(job.salary_raw);
                      const tags = buildTags(job);
                      const logo = getLogoSource(job);

                      return (
                        <FeaturedCard
                          key={job.id}
                          jobTitle={job.title}
                          company={job.organization}
                          location={location}
                          salaryRange={salaryRange}
                          tags={tags.length ? tags : undefined}
                          logo={logo}
                          onPress={() => handleCardPress(job.id)}
                        />
                      );
                    })
                  : [0, 1, 2].map((idx) => (
                      <FeaturedCard key={`placeholder-${idx}`} />
                    ))}
              </ScrollView>

              <View className="mt-5" style={{ overflow: "visible" }}>
                <View className="flex flex-row items-center justify-between mt-5">
                  <Text className="text-lg font-sora-bold text-dark">
                    Recent Jobs
                  </Text>
                  <TouchableOpacity onPress={() => router.push("/explore")}>
                    <Text className="text-sm font-sora text-primary">
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-10">
            {loading ? (
              <>
                <ActivityIndicator size="large" color="#C67C4E" />
                <Text className="mt-2 text-sm text-[#6C727F]">
                  Loading jobs...
                </Text>
              </>
            ) : error ? (
              <Text className="text-sm text-red-500">{error}</Text>
            ) : showFilteredEmptyState ? (
              <Text className="text-sm text-[#6C727F]">
                No jobs match your filters yet.
              </Text>
            ) : (
              <Text className="text-sm text-[#6C727F]">
                No jobs found right now.
              </Text>
            )}
          </View>
        }
        renderItem={({ item }) => {
          const location = formatLocation(item);
          const salaryRange = formatSalary(item.salary_raw);
          const tags = buildTags(item);
          const logo = getLogoSource(item);

          return (
            <Card
              jobTitle={item.title}
              company={item.organization}
              location={location}
              salaryRange={salaryRange}
              tags={tags.length ? tags : undefined}
              logo={logo}
              onPress={() => handleCardPress(item.id)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}
