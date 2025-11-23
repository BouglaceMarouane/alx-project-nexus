import { Card } from "@/components/Card";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getJobs, type JobFromApi } from "@/lib/jobsApi";
import {
  buildTags,
  formatLocation,
  formatSalary,
  getLogoSource,
  jobMatchesFilters,
  jobMatchesQuery,
  type ActiveFilters,
} from "@/lib/jobUtils";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Explore = () => {
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
      console.error("Error loading jobs on explore page", err);
      setError("Failed to load jobs.");
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

  const jobCountLabel = `Found ${filteredJobs.length} job${
    filteredJobs.length === 1 ? "" : "s"
  }`;

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 mt-6 flex flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="2xl" />
          </TouchableOpacity>
          <Text className="text-xl font-sora-bold">Explore Jobs</Text>
          <TouchableOpacity onPress={() => router.push("/notification")}>
            <Image
              source={icons.notification}
              className="size-6"
              tintColor={"#C67C4E"}
            />
          </TouchableOpacity>
        </View>

        <View className="px-5 mt-5" style={{ overflow: "visible" }}>
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

          <View className="mt-5">
            <Text className="text-lg font-sora-bold text-dark">
              {loading ? "Loading jobs..." : jobCountLabel}
            </Text>

            <View className="mt-5 gap-5">
              {loading ? (
                <ActivityIndicator size="large" color="#C67C4E" />
              ) : error ? (
                <Text className="text-sm text-red-500">{error}</Text>
              ) : filteredJobs.length ? (
                filteredJobs.map((job) => {
                  const location = formatLocation(job);
                  const salaryRange = formatSalary(job.salary_raw);
                  const tags = buildTags(job);
                  const logo = getLogoSource(job);

                  return (
                    <Card
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
              ) : jobs.length ? (
                <Text className="text-sm text-[#6C727F]">
                  No jobs match your filters yet.
                </Text>
              ) : (
                <Text className="text-sm text-[#6C727F]">
                  No jobs found right now.
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;
