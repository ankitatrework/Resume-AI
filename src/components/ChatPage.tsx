import { useRef, useState } from "react";
import MessageBubble from "./MessageBubble";

interface message {
  text: string;
  isSender: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<message[]>([]);
  const [message, setMessage] = useState<string>("");
  const messagesElement = useRef<HTMLDivElement>(null);

  if (messagesElement.current) {
    messagesElement.current.scrollTop = messagesElement.current.scrollHeight;
  }

  const handleSubmit = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { text: message, isSender: true }]);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p:2 flex h-[90vh] flex-1 flex-col justify-between  sm:p-6">
      <div
        id="messages"
        ref={messagesElement}
        className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col space-y-4 overflow-y-auto p-3"
      >
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            text={message.text}
            isSender={message.isSender}
          />
        ))}
      </div>

      {/* Input  */}
      <div className="mb-2 border-t-2 border-gray-200 px-4 pt-4 sm:mb-0">
        <div className="relative flex">
          <span className="absolute inset-y-0 flex items-center">
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-8 w-8 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
          </span>
          <textarea
            rows={2}
            placeholder="Write your message!"
            className="w-full rounded-md bg-gray-200 py-3 pl-12 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute inset-y-0 right-0 hidden items-center sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-6 py-6 text-white transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none"
              onClick={handleSubmit}
            >
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-2 h-6 w-6 rotate-90 transform"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
