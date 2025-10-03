// frontend/src/components/QuestionWithContextLinks.tsx

import React from "react";
import { ContextualLink } from "./ContextualLink";

interface ContextLink {
  trigger: string;
  title: string;
  type: "text" | "image";
  content?: string;
  imageUrl?: string;
}

interface QuestionWithContextLinksProps {
  question: string;
  contextLinks: ContextLink[];
}

export const QuestionWithContextLinks: React.FC<
  QuestionWithContextLinksProps
> = ({ question, contextLinks }) => {
  // Sortuj linki od najdłuższych do najkrótszych (żeby nie było konfliktów)
  const sortedLinks = [...contextLinks].sort(
    (a, b) => b.trigger.length - a.trigger.length
  );

  let parts: Array<{ text: string; link?: ContextLink }> = [{ text: question }];

  // Zastąp każdy trigger linkiem
  sortedLinks.forEach((link) => {
    const newParts: typeof parts = [];

    parts.forEach((part) => {
      if (part.link) {
        // Już jest linkiem, nie ruszaj
        newParts.push(part);
      } else {
        // Podziel tekst na części przed/po triggerze
        const splitParts = part.text.split(link.trigger);

        splitParts.forEach((textPart, idx) => {
          if (idx > 0) {
            // Dodaj link między częściami
            newParts.push({ text: link.trigger, link });
          }
          if (textPart) {
            newParts.push({ text: textPart });
          }
        });
      }
    });

    parts = newParts;
  });

  return (
    <>
      {parts.map((part, idx) =>
        part.link ? (
          <ContextualLink
            key={idx}
            text={part.text}
            modalTitle={part.link.title}
            modalContent={part.link.content}
            modalImage={part.link.imageUrl}
            type={part.link.type}
          />
        ) : (
          <span key={idx}>{part.text}</span>
        )
      )}
    </>
  );
};
