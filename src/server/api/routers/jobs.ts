import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const addJobInput = z.object({
  company: z.string(),
  position: z.string(),
  description: z.string(),
});

export const JobRouter = createTRPCRouter({
  addJob: publicProcedure.input(addJobInput).query(({ input }) => {
    return {
      created: true,
      data: {
        id: "1",
        company: input.company,
        position: input.position,
        description: input.description,
      },
    };
  }),

  getAllJobs: publicProcedure.query(() => {
    return {
      data: [
        {
          id: "d1",
          bgColor: "bg-blue-500",
          initials: "JD",
          company: "Company A",
          position: "Frontend Developer",
          description: "We are looking for a talented Frontend Developer...",
          href: "/resume",
        },
        {
          id: "d2",
          bgColor: "bg-green-500",
          initials: "WD",
          company: "Company B",
          position: "UX Designer",
          description: "Join our team as a UX Designer and help us create...",
          href: "/resume",
        },
        {
          id: "d3",
          bgColor: "bg-yellow-500",
          initials: "SD",
          company: "Company C",
          position: "Software Engineer",
          description: "Are you a passionate Software Engineer...",
          href: "/resume",
        },
        {
          id: "d4",
          bgColor: "bg-red-500",
          initials: "MD",
          company: "Company D",
          position: "Data Scientist",
          description: "Exciting opportunity for a Data Scientist to work on...",
          href: "/resume",
        },
        {
          id: "1",
          company: "Google",
          position: "Software Engineer",
          description: "Work on Google Search",
        },
        {
          id: "2",
          company: "Facebook",
          position: "Software Engineer",
          description: "Work on Facebook Ads",
        },
        {
          id: "3",
          company: "Apple",
          position: "Software Engineer",
          description: "Work on Apple Maps",
        },
        {
          id: "4",
          company: "Amazon",
          position: "Software Engineer",
          description: "Work on Amazon Prime",
        },
        {
          id: "5",
          company: "Netflix",
          position: "Software Engineer",
          description: "Work on Netflix Originals",
        },
      ],
    };
  }),
});
