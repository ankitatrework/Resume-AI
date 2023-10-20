/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";

interface MessageBubbleProps {
  text: string;
  isSender: boolean;
}

const senderURL =
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
const recieverURL =
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=1974&q=80";

const components: any = {
  code: ({
    inline,
    className,
    children,
  }: {
    inline: boolean;
    className: string;
    children: string;
  }) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter language={match[1]} style={dracula}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className}>{children}</code>
    );
  },
};

export default function MessageBubble({ text, isSender }: MessageBubbleProps) {
  return (
    <div className={`chat-message ${isSender ? "justify-end" : ""}`}>
      <div className={`flex items-end ${isSender ? "justify-end" : ""}`}>
        <div
          className={`mx-2 flex max-w-3xl flex-col space-y-2 text-lg ${
            isSender ? "order-1 items-end" : "order-2 items-start"
          }`}
        >
          <div>
            <span
              className={`inline-block rounded-lg px-4 py-2 text-lg ${
                isSender
                  ? "rounded-br-none bg-blue-600 text-white"
                  : "rounded-bl-none bg-gray-300 text-gray-600"
              }`}
            >
              <ReactMarkdown components={components}>{text}</ReactMarkdown>
            </span>
          </div>
        </div>
        <Image
          height={24}
          width={24}
          src={isSender ? senderURL : recieverURL}
          alt="Profile"
          className={`${
            isSender ? "order-2" : "order-1"
          } h-10 w-10 rounded-full`}
        />
      </div>
    </div>
  );
}
