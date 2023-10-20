import React from "react";
import ResumeModal from "./ResumeModal";
import ResumeGrid from "./ResumeGrid";

interface resume {
  bgColor: string;
  initials: string;
  name: string;
  score: number;
  href: string;
}

const resumeList = [
  {
    name: "Sidharth Sethi September",
    initials: "SS",
    href: "#",
    score: 916,
    bgColor: "bg-pink-600",
  },
  {
    name: "Ankit Rout Oct",
    initials: "AR",
    href: "#",
    score: 912,
    bgColor: "bg-purple-600",
  },
  {
    name: "SidResume",
    initials: "S",
    href: "#",
    score: 160,
    bgColor: "bg-yellow-500",
  },
  {
    name: "Resume 1234",
    initials: "R1",
    href: "#",
    score: 800,
    bgColor: "bg-green-500",
  },
];

export default function ResumeList() {
  const [resumes, setResumes] = React.useState<resume[]>(resumeList);

  return (
    <div className="flex flex-col p-4">
      <div className="mr-auto flex w-full justify-between py-2">
        <h1 className="text-2xl font-bold text-gray-500">Resume List</h1>
        <ResumeModal resumes={resumes} setResumes={setResumes} />
      </div>
      <ResumeGrid resumes={resumes} setResumes={setResumes} />
    </div>
  );
}
