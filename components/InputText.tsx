import { Send, Paperclip } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Assume you have a function to handle the API call for getting bot responses
const fetchChatbotResponse = async (userMessage: string) => {
  // Placeholder for actual API call to get a response from a chatbot
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
      // Add user message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: "user" },
      ]);

      // Clear the message input field
      setMessage("");

      // Get bot's response after a delay
      const botResponse = await fetchChatbotResponse(message);

      // Add bot response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);

      // Notify parent to hide the welcome text
      onMessageSend();
    }
  };

  return (
    <div className="relative flex flex-col w-full space-y-3">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-2 max-h-96">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg ${
                msg.sender === "user" ? "bg-[#F9EF19]" : "bg-white"
              } max-w-xs`}
            >
              <span className="text-black">{msg.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="relative flex items-center w-full">
        <textarea
          ref={textareaRef}
          className="flex-1 resize-none text-base px-4 py-3 pr-28 rounded-[14px] border-2 border-gray-400 
            bg-[rgba(217,217,217,0.4)] focus:bg-[rgba(217,217,217,0.2)] placeholder-white 
            focus:placeholder-opacity-50 focus:border-[#F9EF19] focus:outline-none text-black"
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
          {/* Paperclip Button */}
          <button className="p-2 rounded-full bg-white text-gray-700 hover:bg-yellow-400 transition">
            <Paperclip size={15} />
          </button>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            className={`p-2 rounded-full ${message ? "bg-[#F9E919]" : "bg-white"} text-gray-700 hover:bg-yellow-400 transition`}
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputText;
