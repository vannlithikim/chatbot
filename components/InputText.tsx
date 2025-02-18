import { Send, Paperclip, RotateCcw, Pencil, Copy } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Function to handle the full API response
const handleFullResponse = async (
  userMessage: string,
  setMessages: React.Dispatch<React.SetStateAction<{ text: string; sender: "user" | "bot" }[]>>,
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(`/api/sse?message=${encodeURIComponent(userMessage)}`);

    if (!response.ok) {
      throw new Error('Server Error: Failed to fetch data');
    }

    const data = await response.json();

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: data.data, sender: "bot" }, // Add the full response from the API
    ]);
  } catch (error) {
    // Handle error and display an error message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: "Server Error: Please try again later.", sender: "bot" },
    ]);
    console.error(error); // Log the error for debugging purposes
  } finally {
    setIsStreaming(false); // Set streaming to false after the process ends
  }
};

const InputText = ({ onMessageSend, isCollapsed }: { onMessageSend: () => void, isCollapsed: boolean }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
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
    if (message.trim() && !isStreaming) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: "user" },
      ]);
      setMessage(""); // Clear the input message

      // Start fetching response from the server (wait for the full response)
      setIsStreaming(true);
      handleFullResponse(message, setMessages, setIsStreaming);

      onMessageSend(); // Optional: Notify parent component (if necessary)
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
              className={`p-3 rounded-lg ${msg.sender === "user" ? "bg-[#F9EF19]" : "bg-transparent"} max-w-xs relative`}
            >
              <span className={`${msg.sender === "user" ? "text-black " : "text-white"}`}>{msg.text}</span>
              {msg.sender === "bot" && (
                <div className="absolute left-3 bottom-[-25px] flex justify-center gap-2">
                  <RotateCcw size={18} className="text-white" />
                  <Pencil size={18} className="text-white"/>
                  <Copy size={18} className="text-white"/>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area (Fixed at Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 py-3 px-4 mb-5 bg-transparent z-10">
        <div
          className={`relative flex items-center w-full max-w-[54%] mx-auto ${
            isCollapsed ? "ml-[345px]" : "ml-[460px]"
          }`}
        >
          <div className="absolute top-[-30px] bottom-0 left-[-10] right-10 bg-[#2B2B2B] z-0 w-[110%]" />

          <textarea
            ref={textareaRef}
            className="flex-1 resize-none text-base px-4 py-3 pr-28 rounded-[14px] border-2 border-gray-400 
            bg-[rgba(217,217,217,0.4)] focus:bg-[rgba(217,217,217,0.2)] focus:placeholder-opacity-50 
            focus:border-[#F9EF19] focus:outline-none text-white z-10"
            placeholder="Type your message..."
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Button Container */}
          <div
            className={`absolute right-3 ${isMultiLine ? "bottom-3" : "top-1/2 transform -translate-y-1/2"} 
            flex items-center space-x-2 pr-3 z-10`}
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
