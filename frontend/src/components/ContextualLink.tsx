// frontend/src/components/ContextualLink.tsx

import React, { useState } from "react";
import { ContextModal } from "./ContextModal";

interface ContextualLinkProps {
  text: string;
  modalTitle: string;
  modalContent?: string;
  modalImage?: string;
  type: "text" | "image";
}

export const ContextualLink: React.FC<ContextualLinkProps> = ({
  text,
  modalTitle,
  modalContent,
  modalImage,
  type,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 
                 dark:hover:text-blue-300 underline decoration-dotted 
                 decoration-2 underline-offset-2 hover:decoration-solid
                 transition-all font-medium cursor-pointer"
      >
        {text}
      </button>

      <ContextModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        content={modalContent}
        image={modalImage}
        type={type}
      />
    </>
  );
};
