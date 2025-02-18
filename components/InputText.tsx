import { Send, Paperclip } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Assume you have a function to handle the API call for getting bot responses
const fetchChatbotResponse = async (userMessage: string) => {
  const response = "This is a bot response to: " + userMessage;
  return response;
};

const InputText = ({ onMessageSend }: { onMessageSend: () => void }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isMultiLine, setIsMultiLine] = useState(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;

      const lineCount = textarea.value.split("\n").length;
      setIsMultiLine(lineCount > 1);

      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
      const maxHeight = lineHeight * 7;
      textarea.style.overflowY =
        textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [message]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: "user" },
      ]);
      setMessage("");

      const botResponse = await fetchChatbotResponse(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
      onMessageSend();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      {/* Chat messages */}
      <div className="flex-1 space-y-2 pb-20">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg ${msg.sender === "user" ? "bg-[#F9EF19]" : "bg-white"} max-w-xs`}
            >
              <span className="text-black">{msg.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area (Fixed at Bottom) */}
      <div className="fixed bottom-0 right-[-16%] left-0 py-3 px-4 mb-5">
        <div className="relative flex items-center w-full max-w-[46%] mx-auto">
          <textarea
            ref={textareaRef}
            className="flex-1 resize-none text-base px-4 py-3 pr-28 rounded-[14px] border-2 border-gray-400 
              bg-[rgba(217,217,217,0.4)] focus:bg-[rgba(217,217,217,0.2)] placeholder-white 
              focus:placeholder-opacity-50 focus:border-[#F9EF19] focus:outline-none text-white"
            placeholder="Type your message..."
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Button Container */}
          <div
            className={`absolute right-3 ${isMultiLine ? "bottom-3" : "top-1/2 transform -translate-y-1/2"} 
            flex items-center space-x-2 pr-3`}
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
