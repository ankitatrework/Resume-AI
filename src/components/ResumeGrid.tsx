import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const getInitials = (name: string) => {
  const names = name.split(" ");
  return (names[0]?.charAt(0) ?? "") + (names[1]?.charAt(0) ?? "");
};

interface ResumeGridProps {
  resumes: {
    bgColor: string;
    initials: string;
    name: string;
    score: number;
    href: string;
  }[];

  setResumes: React.Dispatch<
    React.SetStateAction<
      {
        bgColor: string;
        initials: string;
        name: string;
        score: number;
        href: string;
      }[]
    >
  >;
}

export default function ResumeGrid({ resumes, setResumes }: ResumeGridProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedResume, setSelectedResume] = useState<string | null>(null);

  const sortedResumes = [...resumes].sort((a, b) => b.score - a.score);

  const openOptions = (name: string) => {
    setShowOptions(true);
    setSelectedResume(name);
  };

  const closeOptions = () => {
    setShowOptions(false);
    setSelectedResume(null);
  };

  const deleteResume = () => {
    if (selectedResume) {
      setResumes(resumes.filter((resume) => resume.name !== selectedResume));
      closeOptions();
    }
  };

  const options = [
    {
      label: "Delete",
      onClick: deleteResume,
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
        {sortedResumes.map((resume) => (
          <li
            key={resume.name}
            className="relative col-span-1 flex rounded-md shadow-sm"
          >
            <div
              className={classNames(
                resume.bgColor,
                "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white",
              )}
            >
              {getInitials(resume.initials)}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <Link
                  href='/chat'
                  className="font-medium text-gray-900 hover:text-gray-600"
                >
                  {resume.name}
                </Link>
                <p className="text-gray-500">{resume.score} / 1000</p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => openOptions(resume.name)}
                >
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>

                {showOptions && selectedResume === resume.name && (
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
