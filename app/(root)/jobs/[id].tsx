import icons from "@/constants/icons";
import {
  buildTags,
  deriveWorkMode,
  formatLocation,
  formatSalary,
  getLogoSource,
} from "@/lib/jobUtils";
import { getJobById, type JobFromApi } from "@/lib/jobsApi";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatPublishedDate = (value?: string | null) => {
  if (!value) return "Date not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date not available";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const JobDetails = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [job, setJob] = useState<JobFromApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Job not found.");
      setLoading(false);
      return;
    }

    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const result = await getJobById(id.toString());
        if (!isMounted) return;
        if (result) {
          setJob(result);
          setError(null);
        } else {
          setError("Job not found.");
        }
      } catch (err) {
        console.error("Failed to load job details", err);
        if (isMounted) setError("Failed to load job details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const tags = useMemo(() => (job ? buildTags(job) : []), [job]);
  const location = job ? formatLocation(job) : "";
  const salary = job ? formatSalary(job.salary_raw) : "";
  const workMode = job ? deriveWorkMode(job) : undefined;
  const logoSource = job ? getLogoSource(job) : undefined;
  const postedOn = job ? formatPublishedDate(job.date_posted) : "";

  const handleApply = () => {
    if (job?.url) {
      Linking.openURL(job.url).catch((err) =>
        console.warn("Unable to open job URL", err)
      );
    }
  };

  const handleCompanySite = () => {
    if (job?.organization_url) {
      Linking.openURL(job.organization_url).catch((err) =>
        console.warn("Unable to open organization URL", err)
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#C67C4E" />
        <Text className="mt-2 text-sm text-[#6C727F]">
          Loading job details...
        </Text>
      </SafeAreaView>
    );
  }

  if (error || !job) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-base text-center text-[#6C727F]">{error}</Text>
        <TouchableOpacity
          className="mt-4 rounded-full bg-primary px-6 py-3"
          onPress={() => router.back()}
        >
          <Text className="text-white font-sora-semibold text-sm">Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const initials = job.organization
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-36 px-5"
      >
        <View className="flex-row items-center justify-between mt-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="size-8 rounded-full bg-[#F5F7FB] items-center justify-center"
          >
            <Image source={icons.arrowLeft} className="size-5" />
          </TouchableOpacity>

          <Text className="text-sm font-sora-light text-dark">
            Job Description
          </Text>

          <Text className="text-xs text-[#8F96A3]">
            {job.source_domain ?? job.source}
          </Text>
        </View>

        <View className="mt-8 flex-row items-start gap-4">
          <View className="size-16 rounded-2xl bg-[#F5F7FB] items-center justify-center">
            {logoSource ? (
              <Image
                source={logoSource}
                className="size-10"
                resizeMode="contain"
              />
            ) : (
              <Text className="text-base font-sora-bold text-[#6C727F]">
                {initials || "?"}
              </Text>
            )}
          </View>
          <View className="flex-1 justify-center">
            <Text className="text-2xl font-sora-bold text-dark">
              {job.title}
            </Text>
            <Text className="text-base text-[#6C727F] font-sora-medium mt-1">
              {job.organization}
            </Text>
            <Text className="text-sm text-[#8F96A3] mt-1">{location}</Text>
          </View>
        </View>

        <View className="mt-6 rounded-3xl border border-[#EEF1F6] p-5 bg-white gap-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xs uppercase tracking-widest text-[#8F96A3]">
                Salary
              </Text>
              <Text className="text-xl font-sora-bold text-primary mt-1">
                {salary}
              </Text>
            </View>
          </View>

          <View className="flex flex-col">
            <Text className="text-xs uppercase tracking-widest text-[#8F96A3]">
              Posted
            </Text>
            <Text className="text-sm font-sora-semibold text-dark mt-1">
              {postedOn}
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2">
            {tags.slice(0, 4).map((tag) => (
              <View
                key={tag}
                className="rounded-full border border-[#E7EBF1] px-3 py-1.5"
              >
                <Text className="text-xs font-sora-semibold text-[#6C727F]">
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-6 gap-4">
          <InfoRow label="Employment type" value={job.employment_type} />
          <InfoRow label="Experience" value={job.experience_level} />
          <InfoRow label="Work mode" value={workMode} />
          <InfoRow
            label="Application deadline"
            value={
              job.date_validthrough
                ? formatPublishedDate(job.date_validthrough)
                : "Not specified"
            }
          />
        </View>

        <View className="mt-8 gap-3">
          <Text className="text-lg font-sora-bold text-dark">
            About the role
          </Text>
          <Text className="text-sm text-[#6C727F] leading-relaxed">
            We pulled this opening directly from{" "}
            {job.source_domain ?? "the job feed"}. Review the employer&apos;s
            page for the full description, requirements, and benefits before
            applying.
          </Text>
        </View>

        {job.organization_url && (
          <TouchableOpacity
            className="mt-6 rounded-2xl border border-[#E0E4EB] px-4 py-4 flex-row items-center justify-between"
            activeOpacity={0.85}
            onPress={handleCompanySite}
          >
            <View>
              <Text className="text-xs uppercase tracking-widest text-[#8F96A3]">
                Company site
              </Text>
              <Text className="text-base font-sora-semibold text-primary">
                Visit {job.organization}
              </Text>
            </View>
            <Image source={icons.arrowLeft} className="size-5 rotate-180" />
          </TouchableOpacity>
        )}
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 bg-white border-t border-[#EEF1F6] px-5 py-4 flex-row items-center gap-4">
        <View className="flex-1">
          <Text className="text-xs text-[#8F96A3] uppercase tracking-widest">
            Ready to apply?
          </Text>
          <Text className="text-sm text-[#6C727F]">
            You will be redirected to the employer&apos;s site.
          </Text>
        </View>
        <TouchableOpacity
          className="bg-primary rounded-full px-6 py-3"
          activeOpacity={0.9}
          onPress={handleApply}
          disabled={!job.url}
        >
          <Text className="text-white font-sora-semibold text-sm">
            Apply now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => (
  <View className="flex-row items-center justify-between rounded-2xl border border-[#EEF1F6] px-4 py-3 bg-white">
    <Text className="text-sm text-[#8F96A3]">{label}</Text>
    <Text className="text-sm font-sora-semibold text-dark">
      {value?.length ? value : "Not specified"}
    </Text>
  </View>
);

export default JobDetails;
