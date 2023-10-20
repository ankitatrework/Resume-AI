import Image from "next/image";
import toast from "react-hot-toast";
import React, { useState } from "react";

interface ResumeModalProps {
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

export default function ResumeModal({ resumes, setResumes }: ResumeModalProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (file === null) {
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("File must be a PDF");
      return;
    }

    setName("");
    setFile(null);
    setShowModal(false);

    void toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("Resume uploaded successfully!");
        }, 2000);
      }),
      {
        loading: "Uploading resume...",
        success: "Resume uploaded successfully!",
        error: "Error uploading resume!",
      },
    );

    const randomTailwindColor = () => {
      const colors = [
        "bg-pink-600",
        "bg-purple-600",
        "bg-yellow-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-indigo-500",
      ];

      return colors[Math.floor(Math.random() * colors.length)]!;
    };

    setResumes([
      ...resumes,
      {
        name: name,
        initials: "R",
        href: "#",
        score: 0,
        bgColor: randomTailwindColor(),
      },
    ]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile !== undefined) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className={`mx-2 block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        type="button"
      >
        Upload Resume
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
                    Add Resume
                  </h3>
                  <form className="space-y-6" onSubmit={submitForm}>
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Resume Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                        placeholder="Sidharth Sethi Resume - September 2023"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <div
                        className={`mx-1 box-border flex h-full shrink-0 grow-0 basis-auto flex-col items-center justify-center rounded-[5px] border-2 border-dashed border-[#d7d7d7] md:mx-5`}
                      >
                        <label
                          htmlFor="fileInput"
                          className="m-10 flex cursor-pointer flex-col items-center"
                        >
                          <Image
                            width={100}
                            height={100}
                            className=" text-indigo-500 md:h-16 md:w-fit"
                            src="/favicon.ico"
                            alt="Project"
                          />
                          <span className="text-md text-purple-600">
                            Upload a file
                            <span className="text-white">
                              {" "}
                              or drag and drop
                            </span>
                          </span>
                        </label>

                        <input
                          type="file"
                          id="fileInput"
                          onChange={handleFileChange}
                          className="sr-only"
                          required
                        />
                        <span className="mb-5 text-sm text-gray-400">
                          {file
                            ? `Selected file: ${file.name}`
                            : "No file selected"}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit Resume
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
