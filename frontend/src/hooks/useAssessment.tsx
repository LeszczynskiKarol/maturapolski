// frontend/src/hooks/useAssessment.tsx

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";

export const useAssessment = () => {
  const [assessment, setAssessment] = useState(null);

  const { mutate: assess, isPending: isLoading } = useMutation({
    mutationFn: async (data: {
      content: string;
      topic: string;
      requirements: any;
    }) => {
      const response = await api.post("/api/assessment/essay", data);
      return response.data;
    },
    onSuccess: (data) => {
      setAssessment(data);
    },
  });

  return {
    assess,
    assessment,
    isLoading,
    reset: () => setAssessment(null),
  };
};
