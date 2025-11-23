import icons from "@/constants/icons";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tipSections = [
  {
    id: "applications",
    title: "Approach every application with intention",
    description:
      "Hiring teams skim hundreds of profiles. Respect their time by showing that you read the description and understand what they need.",
    bullets: [
      "Mirror keywords from the posting in your summary and experience.",
      "Lead with quantified wins (impact, scale, speed).",
      "Keep cover letters short: problem → your proof → call-to-action.",
    ],
  },
  {
    id: "resume",
    title: "Tune your resume for the role",
    description:
      "Your resume is a product. Iterate on it like one so recruiters quickly see alignment.",
    bullets: [
      "Highlight 3–4 projects that match the team’s tech stack.",
      "Swap skills/tooling sections per role instead of listing every technology.",
      "Use a consistent structure: Situation → Action → Result.",
    ],
  },
  {
    id: "cv",
    title: "Adjust your CV for each company",
    description:
      "Show that you understand the organization’s stage and priorities.",
    bullets: [
      "For startups: emphasize adaptability and end-to-end ownership.",
      "For larger orgs: mention collaboration with cross-functional partners.",
      "Call out any domain knowledge (fintech, health, AI safety, etc.).",
    ],
  },
];

const placeholderImages = [
  { id: "applications", label: "Application Strategy" },
  { id: "resume", label: "Resume Snapshot" },
  { id: "cv", label: "CV Tailoring" },
];

const PlaceholderCard = ({ label }: { label: string }) => (
  <View className="rounded-3xl border border-dashed border-[#E0E4EB] bg-[#F5F7FB] h-44 items-center justify-center">
    <Image
      source={{
        uri: "https://placehold.co/400x300?text=Add+Image",
      }}
      className="w-full h-full rounded-3xl"
      resizeMode="cover"
    />
    <View className="absolute inset-0 bg-black/30 rounded-3xl items-center justify-center">
      <Text className="text-white font-sora-semibold">{label}</Text>
      <Text className="text-white/80 text-xs mt-1">
        Replace with your own artwork
      </Text>
    </View>
  </View>
);

const FeaturedTipPage = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-12 px-5"
      >
        <View className="flex flex-row items-center justify-between mt-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="size-11 rounded-full bg-[#F5F7FB] items-center justify-center"
            activeOpacity={0.8}
          >
            <Image source={icons.arrowLeft} className="size-5" />
          </TouchableOpacity>
          <Text className="text-lg font-sora-bold text-dark">
            Featured Application Tips
          </Text>
          <View className="size-11" />
        </View>

        <View className="mt-8 gap-4">
          <Text className="text-3xl font-sora-bold text-dark leading-tight">
            Build applications that feel tailor made.
          </Text>
          <Text className="text-base text-[#6C727F]">
            Use these quick frameworks whenever you apply. They keep your
            profile sharp, personal, and aligned with the role you really want.
          </Text>
        </View>

        <View className="mt-8 gap-5">
          {tipSections.map((section) => (
            <View
              key={section.id}
              className="rounded-3xl border border-[#EEF1F6] bg-white p-5 shadow-sm shadow-black/5"
            >
              <Text className="text-xs uppercase tracking-[0.3em] text-[#C67C4E]">
                {section.id === "applications"
                  ? "Apply"
                  : section.id === "resume"
                    ? "Resume"
                    : "CV"}
              </Text>
              <Text className="text-xl font-sora-bold text-dark mt-2">
                {section.title}
              </Text>
              <Text className="text-sm text-[#6C727F] mt-2">
                {section.description}
              </Text>
              <View className="mt-4 gap-3">
                {section.bullets.map((bullet) => (
                  <View key={bullet} className="flex-row items-start gap-3">
                    <View className="size-2 rounded-full bg-primary mt-2" />
                    <Text className="flex-1 text-sm text-dark font-sora-medium">
                      {bullet}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View className="mt-10 rounded-3xl bg-primary px-6 py-6">
          <Text className="text-white text-sm uppercase tracking-[0.3em]">
            Quick checklist
          </Text>
          <Text className="text-white text-2xl font-sora-bold mt-2">
            Before you hit submit
          </Text>
          <View className="mt-5 gap-3">
            {[
              "Did I prove impact in every role?",
              "Does my resume highlight skills this job needs?",
              "Have I mirrored tools/keywords from the posting?",
              "Would I be excited to discuss every bullet in an interview?",
            ].map((item) => (
              <View key={item} className="flex-row items-start gap-3">
                <View className="size-5 rounded-full bg-white/20 items-center justify-center mt-0.5">
                  <View className="size-2 rounded-full bg-white" />
                </View>
                <Text className="flex-1 text-white text-base">{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeaturedTipPage;
