import icons from "./icons";

export const settings = [
  {
    title: "Applied Jobs",
    icon: icons.calendar,
  },
  {
    title: "User Information",
    icon: icons.wallet,
  },
  {
    title: "Education",
    icon: icons.profile,
  },
  {
    title: "Notifications",
    icon: icons.notification,
  },
  {
    title: "Security",
    icon: icons.security,
  },
  {
    title: "Language",
    icon: icons.language,
  },
  {
    title: "Help Center",
    icon: icons.info,
  },
  {
    title: "Invite Friends",
    icon: icons.people,
  },
];

const withAll = (options: string[]) => ["All", ...options];

export const locationFilters = withAll([
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Netherlands",
]);

export const employmentFilters = withAll([
  "Full Time",
  "Part Time",
  "Internship",
]);

export const workModeFilters = withAll(["Remote", "Hybrid", "Onsite"]);

export const experienceFilters = withAll([
  "Junior",
  "Mid",
  "Senior",
  "Lead",
  "Principal",
]);
