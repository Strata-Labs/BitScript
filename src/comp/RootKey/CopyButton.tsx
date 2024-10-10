import React from "react";
import { Button } from "../Ui/button";
import { Copy, Check } from "lucide-react";
import { useCopy } from "./hooks/useCopy";

interface CopyButtonProps {
  textToCopy: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const { isCopied, copyToClipboard } = useCopy();

  // if the textcopy is empty, then don't show the button
  if (textToCopy === "") {
    return null;
  }

  const handleCopy = () => {
    copyToClipboard(textToCopy);
  };

  return (
    <Button
      type="button"
      variant="link"
      size="sm"
      className="h-8 px-2"
      onClick={handleCopy}
    >
      {isCopied ? (
        <Check className="h-4 w-4 mb-2 text-gray-500" />
      ) : (
        <Copy className="h-4 w-4 mb-2 text-gray-500" />
      )}
    </Button>
  );
};
