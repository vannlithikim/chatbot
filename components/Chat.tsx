import { useEffect, useState, useRef } from "react";
import { PaperAirplaneIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput(""); // Clear input

    setMessages((prev) => [...prev, { role: "user", content: userMessage }, { role: "ai", content: "" }]);
    setIsStreaming(true);

    const eventSource = new EventSource(`/api/sse?message=${encodeURIComponent(userMessage)}`);

    eventSource.onmessage = (event) => {
      if (event.data === "__END__") {
        setIsStreaming(false);
        eventSource.close();
      } else {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];

          if (lastMessage && lastMessage.role === "ai") {
            lastMessage.content += event.data;
          } else {
            newMessages.push({ role: "ai", content: event.data });
          }

          return [...newMessages];
        });
      }
    };

    eventSource.onerror = () => {
      console.error("SSE connection error");
      eventSource.close();
      setIsStreaming(false);
    };
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isStreaming && input.trim() !== "") {
      sendMessage();
    }
  };

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Chat Header with Dark Mode Toggle */}
      <header className="p-4 bg-gray-100 dark:bg-gray-800 text-center font-semibold text-lg border-b border-gray-300 dark:border-gray-700 flex justify-between">
        <span>GPT</span>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <SunIcon className="w-6 h-6 text-yellow-500" /> : <MoonIcon className="w-6 h-6 text-gray-900" />}
        </button>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {/* AI Chat Bubble */}
            <div
            className={`p-3 max-w-md md:max-w-lg lg:max-w-xl rounded-lg ${
                msg.role === "user" ? "bg-gray-100 text-gray-900" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
            >
            {msg.role === "ai" ? (
                <ReactMarkdown className="prose prose-sm dark:prose-invert">{msg.content}</ReactMarkdown>
            ) : (
                msg.content
            )}
            </div>
          </div>
        ))}
        <div ref={chatContainerRef}></div>
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center">
        <input
            className="flex-1 p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl outline-none placeholder-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress} 
            placeholder="Type a message..."
            disabled={isStreaming}
        />

        <button
          className={`ml-3 p-3 rounded-full ${isStreaming ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
          onClick={sendMessage}
          disabled={isStreaming}
        >
          <PaperAirplaneIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
