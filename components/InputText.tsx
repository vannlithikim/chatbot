import { Send, Paperclip } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const InputText = () => {
  const [message, setMessage] = useState("");
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
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [message]);

  return (
    <div className="relative flex items-center w-full">
      <textarea
        ref={textareaRef}
        className="flex-1 resize-none text-base px-4 py-3 pr-28 rounded-[14px] border border-[#F9EF19] 
        bg-[rgba(217,217,217,0.4)] focus:bg-[rgba(217,217,217,0.2)] placeholder-white focus:placeholder-opacity-50"
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
        <button className="p-2 rounded-full bg-white text-gray-500 hover:bg-yellow-400 transition">
          <Paperclip size={20} />
        </button>

        {/* Send Button */}
        <button
          className={`p-2 rounded-full ${
            message ? "bg-[#F9E919]" : "bg-gray-300"
          } text-gray-500 hover:bg-yellow-400 transition`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default InputText;
