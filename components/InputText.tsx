import { Send, Paperclip, Pencil } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import RegenerateButton from "./RegenerateButton"; 
import CopyButton from "./CopyButton"; 

const handleFullResponse = async (
  userMessage: string,
  setMessages: React.Dispatch<React.SetStateAction<{ text: string; sender: "user" | "bot"; id: number }[]>>,
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(`/api/sse?message=${encodeURIComponent(userMessage)}`);
    if (!response.ok) throw new Error("Server Error: Failed to fetch data");

    const data = await response.json();
    setMessages((prev) => [...prev, { text: data.data, sender: "bot", id: Date.now() }]);
  } catch (error) {
    console.error(error);
    setMessages((prev) => [...prev, { text: "Server Error: Please try again later.", sender: "bot", id: Date.now() }]);
  } finally {
    setIsStreaming(false);
  }
};

const InputText = ({ onMessageSend, isCollapsed }: { onMessageSend: () => void; isCollapsed: boolean }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot"; id: number }[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isMultiLine, setIsMultiLine] = useState(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      setIsMultiLine(textarea.value.split("\n").length > 1);

      const maxHeight = parseInt(getComputedStyle(textarea).lineHeight, 10) * 7;
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [message]);

  const handleSendMessage = async () => {
    if (message.trim() && !isStreaming) {
      setMessages((prev) => [...prev, { text: message, sender: "user", id: Date.now() }]);
      setLastUserMessage(message);
      setMessage("");

      setIsStreaming(true);
      handleFullResponse(message, setMessages, setIsStreaming);
      onMessageSend();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      {/* Chat messages */}
      <div className="flex-1 space-y-2 pb-20">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} relative`}>
            <div
              className={`p-3 rounded-lg ${msg.sender === "user" ? "bg-[#F9EF19]" : "bg-transparent"} max-w-xs`}
            >
              <span className={`${msg.sender === "user" ? "text-black" : "text-white"}`}>
                {msg.text}
              </span>

              {msg.sender === "bot" && (
                <div className="absolute left-3 bottom-[-15px] flex justify-center gap-2">
                  <RegenerateButton
                    lastUserMessage={lastUserMessage}
                    setMessages={setMessages}
                    setIsStreaming={setIsStreaming}
                  />
                  <Pencil size={18} className="text-white" />
                  <CopyButton text={msg.text} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 py-3 px-4 mb-5 bg-transparent z-10">
        <div className={`relative flex items-center w-full max-w-[54%] mx-auto ${isCollapsed ? "ml-[345px]" : "ml-[460px]"}`}>
          <div className="absolute top-[-20px] left-[-10px] right-10 bg-[#2B2B2B] z-0 w-[110%] h-[200px]" />

          <textarea
            ref={textareaRef}
            className="flex-1 resize-none text-base px-4 py-3 pr-28 rounded-[14px] border-2 border-gray-400 bg-[rgba(0,0,0,0.4)] focus:bg-[rgba(53,53,53,0.2)] focus:placeholder-opacity-50 focus:border-[#F9EF19] focus:outline-none text-white z-10"
            placeholder="Type your message..."
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div
            className={`absolute right-3 ${isMultiLine ? "bottom-3" : "top-1/2 transform -translate-y-1/2"} flex items-center space-x-2 pr-3 z-10`}
          >
            <button className="p-2 rounded-full bg-white text-gray-700 hover:bg-yellow-400 transition">
              <Paperclip size={15} />
            </button>
            <button
              onClick={handleSendMessage}
              className={`p-2 rounded-full ${message ? "bg-[#F9E919]" : "bg-white"} text-gray-700 hover:bg-yellow-400 transition`}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputText;
