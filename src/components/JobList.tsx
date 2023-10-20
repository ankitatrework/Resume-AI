import React, { useState } from "react";
import JobModal from "./JobModal";
import JobGrid from "./JobGrid";
import { api } from "~/utils/api";
import { useJobStore } from "~/context/jobStore";
import randomTailwindColor from "~/utils/randomTailwindColor";
import getInitials from "~/utils/getInitials";

export default function JobList() {
  const { addJob } = useJobStore();
  const [fetchJobs, setFetchJobs] = useState<boolean>(true);

  const getJobs = api.jobs.getAllJobs.useQuery(undefined, {
    enabled: fetchJobs,

    onSuccess: () => {
      if (getJobs.data !== undefined) {
        setFetchJobs(false);
        getJobs.data.data.forEach((job) => {
          const bgColor = randomTailwindColor();
          const initials = getInitials(job.company);
          const newJob = {
            jobID: job.id,
            bgColor: bgColor,
            initials: initials,
            company: job.company,
            position: job.position,
            description: job.description,
            href: "/resume",
          };

          addJob(newJob);
        });
      }
    },
  });

  return (
    <div className="flex flex-col p-4">
      <div className="mr-auto flex w-full justify-between py-2">
        <h1 className="text-2xl font-bold text-gray-500">Job List</h1>
        <JobModal />
      </div>
      <JobGrid />
    </div>
  );
}
