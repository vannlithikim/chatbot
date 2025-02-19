// CopyButton.tsx
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false); // Reset after 2 seconds
        }, 2000); // Show the checkmark for 2 seconds
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  return (
    <button
      onClick={copyText}
      className=""
    >
      {copied ? (
        <Check size={18} />
      ) : (
        <Copy size={18} />
      )}
    </button>
  );
};

export default CopyButton;
