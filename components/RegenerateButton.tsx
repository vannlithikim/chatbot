import { RotateCcw } from "lucide-react";

interface RegenerateButtonProps {
  lastUserMessage: string | null;
  setMessages: React.Dispatch<React.SetStateAction<{ text: string; sender: "user" | "bot" }[]>>;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
}

const handleFullResponse = async (
  userMessage: string,
  setMessages: React.Dispatch<React.SetStateAction<{ text: string; sender: "user" | "bot" }[]>>,
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(`/api/sse?message=${encodeURIComponent(userMessage)}`);
    if (!response.ok) throw new Error("Server Error: Failed to fetch data");

    const data = await response.json();
    setMessages((prev) => [...prev, { text: data.data, sender: "bot" }]);
  } catch (error) {
    console.error(error);
    setMessages((prev) => [...prev, { text: "Server Error: Please try again later.", sender: "bot" }]);
  } finally {
    setIsStreaming(false);
  }
};

const RegenerateButton: React.FC<RegenerateButtonProps> = ({ lastUserMessage, setMessages, setIsStreaming }) => {
  const handleRegenerate = async () => {
    if (lastUserMessage) {
      setIsStreaming(true);

      // Remove the previous bot response
      setMessages((prev) => {
        const updatedMessages = [...prev];
        if (updatedMessages[updatedMessages.length - 1]?.sender === "bot") {
          updatedMessages.pop();
        }
        return updatedMessages;
      });

      // Fetch a new response
      handleFullResponse(lastUserMessage, setMessages, setIsStreaming);
    }
  };

  return (
    <button onClick={handleRegenerate} title="Regenerate Response">
      <RotateCcw size={18} className="text-white" />
    </button>
  );
};

export default RegenerateButton;
