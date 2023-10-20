import toast from "react-hot-toast";
import React, { useState } from "react";
import { useJobStore } from "~/context/jobStore";
import randomTailwindColor from "~/utils/randomTailwindColor";
import getInitials from "~/utils/getInitials";

export default function JobModal() {
  const { addJob } = useJobStore();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [company, setName] = useState<string>("");
  const [position, setposition] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    setName("");
    setposition("");
    setDescription("");
    setShowModal(false);

    void toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("Job uploaded successfully!");
        }, 2000);
      }),
      {
        loading: "Uploading job...",
        success: "Job uploaded successfully!",
        error: "Error uploading job!",
      },
    );

    addJob({
      jobID: company + "1",
      company: company,
      initials: getInitials(company),
      href: "/resume",
      position: position,
      description: description,
      bgColor: randomTailwindColor(),
    });
  };

  return (
    <>
      <button
        onClick={openModal}
        className={`mx-2 block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        type="button"
      >
        Upload Job
      </button>

      {showModal ? (
        <div className="absolute right-1 top-20 z-10 mx-auto w-96">
          <div
            tabIndex={-1}
            className="z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
            style={{ right: 0, left: "auto" }}
          >
            <div className="relative max-h-full w-full max-w-md">
              <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute right-2.5 top-3 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                    Add Job
                  </h3>
                  <form className="space-y-6" onSubmit={submitForm}>
                    <div>
                      <label
                        htmlFor="company"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Company company
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                        placeholder="Rework AI"
                        value={company}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="position"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Job position
                      </label>
                      <input
                        type="text"
                        name="position"
                        id="position"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                        placeholder="Full Stack Developer"
                        value={position}
                        onChange={(e) => setposition(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Job position
                      </label>
                      <input
                        type="textbox"
                        name="description"
                        id="description"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                        placeholder="Pay Range 8-14 LPA | 0-2 years experience | Full Time | Remote | Gurgaon \n\n\
                        
                        We are looking for a Full Stack Developer to produce scalable software solutions. You’ll be part of a cross-functional team that’s responsible for the full software development life cycle, from conception to deployment.\n\n\

                        As a Full Stack Developer, you should be comfortable around both front-end and back-end coding languages, development frameworks and third-party libraries. You should also be a team player with a knack for visual design and utility.\n\n\

                        If you’re also familiar with Agile methodologies, we’d like to meet you.\n\n\

                        Your goal will be to build efficient programs and systems that serve user needs.\n\n\

                        Responsibilities\n\n\
                        \n\n\
                        Work with development teams and product managers to ideate software solutions\n\n\
                        Design client-side and server-side architecture\n\n\
                        Build the front-end of applications through appealing visual design\n\n\
                        Develop and manage well-functioning databases and applications\n\n\
                        Write effective APIs\n\n\
                        Test software to ensure responsiveness and efficiency\n\n\
                        Troubleshoot, debug and upgrade software\n\n\
                        Create security and data protection settings\n\n\
                        Build features and applications with a mobile responsive design\n\n\
                        Write technical documentation\n\n\
                        Work with data scientists and analysts to improve software\n\n\

                        Requirements\n\n\
                        \n\n\
                        Proven experience as a Full Stack Developer or similar role\n\n\
                        Experience developing desktop and mobile applications\n\n\
                        Familiarity with common stacks\n\n\
                        Knowledge of multiple front-end languages and libraries (e.g. HTML/ CSS, JavaScript, XML, jQuery)\n\n\
                        Knowledge of multiple back-end languages (e.g. C#, Java, Python) and JavaScript frameworks (e.g. Angular, React, Node.js)\n\n\
                        Familiarity with databases (e.g. MySQL, MongoDB), web servers (e.g. Apache) and UI/UX design\n\n\
                        Excellent communication and teamwork skills\n\n\
                        Great attention to detail\n\n\
                        Organizational skills\n\n\
                        An analytical mind\n\n\
                        Degree in Computer Science, Statistics or relevant field\n\n\
                        \n\n\

                        

                        "
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit Job
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
