// jobsApi.ts
import jobs from "@/constants/jobs.json";

export type JobFromApi = {
  id: string;
  date_posted: string;
  date_created: string;
  title: string;
  organization: string;
  organization_url: string | null;
  date_validthrough: string | null;
  locations_raw: string | null;
  location_type: string | null;
  location_requirements_raw: string | null;
  salary_raw: string | null;
  employment_type: string | null;
  url: string;
  source_type: string;
  source: string;
  source_domain: string;
  organization_logo: string | null;
  cities_derived?: string[];
  regions_derived?: string[];
  countries_derived?: string[];
  locations_derived?: string[];
  timezones_derived?: string[];
  lats_derived?: number[];
  lngs_derived?: number[];
  remote_derived?: boolean;
  experience_level?: "Junior" | "Mid" | "Senior" | "Lead" | "Principal";
};

const JOB_LIST = jobs as JobFromApi[];

const simulateNetwork = async () => new Promise((res) => setTimeout(res, 350));

export async function getJobs(): Promise<JobFromApi[]> {
  await simulateNetwork();
  return JOB_LIST;
}

export async function getJobById(id: string): Promise<JobFromApi | null> {
  await simulateNetwork();
  return JOB_LIST.find((job) => job.id === id) ?? null;
}
