import { create } from "zustand";

type job = {
  jobID: string;
  bgColor: string;
  initials: string;
  company: string;
  position: string;
  description: string;
  href: string;
};

type JobStore = {
  jobs: job[];
  addJob: (job: job) => void;
  deleteJob: (jobID: string) => void;
};

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
  deleteJob: (jobID: string) =>
    set((state) => ({
      jobs: state.jobs.filter((job) => job.jobID !== jobID),
    })),
}));
