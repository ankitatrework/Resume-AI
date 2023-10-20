import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
import { useJobStore } from "~/context/jobStore";
import getInitials from "~/utils/getInitials";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function JobGrid() {
  const { jobs, deleteJob } = useJobStore();

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showJobDescriptionModal, setShowJobDescriptionModal] = useState(false);

  const openJobDescriptionModal = () => {
    setShowJobDescriptionModal(true);
  };

  const closeJobDescriptionModal = () => {
    setShowJobDescriptionModal(false);
  };

  const openOptions = (jobID: string) => {
    setShowOptions(true);
    setSelectedJob(jobID);
  };

  const closeOptions = () => {
    setShowOptions(false);
    setSelectedJob(null);
  };

  const handleDeleteJob = () => {
    if (selectedJob) {
      deleteJob(selectedJob);
      closeOptions();
    }
  };

  const options = [
    {
      label: "View Description",
      onClick: openJobDescriptionModal,
      className: "text-indigo-600 hover:text-indigo-500 cursor-pointer",
    },
    {
      label: "Delete",
      onClick: handleDeleteJob,
      className: "text-red-500",
    },
    {
      label: "Cancel",
      onClick: closeOptions,
      className: "text-gray-500",
    },
  ];

  return (
    <div>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {jobs.map((job) => (
          <li
            key={job.company}
            className="relative col-span-1 flex rounded-md shadow-sm"
          >
            <div
              className={classNames(
                job.bgColor,
                "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white",
              )}
            >
              {getInitials(job.initials)}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <Link
                  href={job.href}
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {job.position}
                </Link>
                <p className="text-gray-500">{job.company}</p>
                <Link
                  href={job.href}
                  className="cursor-pointer text-indigo-600 hover:text-indigo-500"
                >
                  Apply Now
                </Link>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => openOptions(job.jobID)}
                >
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>

                {showOptions && selectedJob === job.jobID && (
                  <div className="absolute right-1 top-1 z-10 ml-auto w-32">
                    <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                      {options.map((option, index) => (
                        <li key={index}>
                          <button
                            onClick={option.onClick}
                            className={`block w-full px-4 py-2 text-left text-sm font-medium ${
                              index !== options.length - 1
                                ? "border-b border-gray-200"
                                : ""
                            } ${option.className}`}
                          >
                            {option.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
