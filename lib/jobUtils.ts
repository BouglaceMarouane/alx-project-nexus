import type { JobFromApi } from "./jobsApi";

const SALARY_FALLBACK = "Salary not specified";
const LOCATION_FALLBACK = "Location not specified";

const normalize = (value?: string | null) =>
  value?.toString().trim().toLowerCase() ?? "";

export type ActiveFilters = {
  location?: string;
  employment?: string;
  workMode?: string;
  experience?: string;
};

export const formatSalary = (salaryRaw: JobFromApi["salary_raw"]) => {
  if (!salaryRaw) return SALARY_FALLBACK;
  const trimmed = salaryRaw.trim();
  return trimmed.length ? trimmed : SALARY_FALLBACK;
};

export const formatLocation = (job: JobFromApi): string => {
  if (job.locations_derived?.[0]) return job.locations_derived[0]!;

  const hasGeoBreakdown =
    job.cities_derived?.[0] &&
    job.regions_derived?.[0] &&
    job.countries_derived?.[0];

  if (hasGeoBreakdown) {
    return `${job.cities_derived![0]}, ${job.regions_derived![0]}, ${job.countries_derived![0]}`;
  }

  return job.locations_raw ?? LOCATION_FALLBACK;
};

export const deriveWorkMode = (job: JobFromApi): string | undefined => {
  if (job.remote_derived === true || normalize(job.location_type) === "remote")
    return "Remote";

  if (normalize(job.location_type) === "hybrid") return "Hybrid";

  if (job.remote_derived === false) return "Onsite";

  if (normalize(job.location_type) === "office") return "Onsite";

  return undefined;
};

export const buildTags = (job: JobFromApi): string[] => {
  const tags: string[] = [];
  if (job.employment_type) tags.push(job.employment_type);
  const workMode = deriveWorkMode(job);
  if (workMode) tags.push(workMode);
  if (job.experience_level) tags.push(job.experience_level);
  return tags;
};

export const getLogoSource = (job: JobFromApi) =>
  job.organization_logo ? { uri: job.organization_logo } : undefined;

export const jobMatchesQuery = (
  job: JobFromApi,
  query: string | undefined
): boolean => {
  const normalized = normalize(query);
  if (!normalized) return true;

  const valuesToSearch = [
    job.title,
    job.organization,
    job.locations_raw,
    formatLocation(job),
    job.employment_type,
    job.experience_level,
  ];

  return valuesToSearch.some((value) => normalize(value).includes(normalized));
};

export const jobMatchesFilters = (
  job: JobFromApi,
  filters: ActiveFilters
): boolean => {
  const { location, employment, workMode, experience } = filters;

  if (location && location !== "All") {
    const normalizedLocation = normalize(location);
    const locationStrings = [
      formatLocation(job),
      job.locations_raw,
      job.cities_derived?.[0],
      job.countries_derived?.[0],
    ]
      .map((value) => normalize(value))
      .filter(Boolean);

    if (!locationStrings.some((value) => value.includes(normalizedLocation))) {
      return false;
    }
  }

  if (employment && employment !== "All") {
    if (normalize(job.employment_type) !== normalize(employment)) return false;
  }

  if (workMode && workMode !== "All") {
    if (normalize(deriveWorkMode(job)) !== normalize(workMode)) return false;
  }

  if (experience && experience !== "All") {
    if (normalize(job.experience_level) !== normalize(experience)) return false;
  }

  return true;
};
