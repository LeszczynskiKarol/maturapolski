// frontend/src/features/exams/components/ExamTaskRenderer.tsx

import React, { useState } from "react";
import { ExamTask, TextSource, TaskType } from "../../../types/exam.types";

interface TaskRendererProps {
  task: ExamTask;
  textSources?: TextSource[];
  onAnswer: (answer: any) => void;
  currentAnswer?: any;
}

export const ExamTaskRenderer: React.FC<TaskRendererProps> = ({
  task,
  textSources,
  onAnswer,
  currentAnswer,
}) => {
  const props = { task, textSources, onAnswer, currentAnswer };

  switch (task.typ) {
    case TaskType.WYJASNIENIE_SENSU:
      return <WyjasnienieSensuTask {...props} />;

    case TaskType.ROZSTRZYGNIECIE:
      return <RozstrzygniecieTask {...props} />;

    case TaskType.NOTATKA_SYNTETYZUJACA:
      return <NotatkaSyntetyzujacaTask {...props} />;

    case TaskType.PRAWDA_FALSZ:
      return <PrawdaFalszTask {...props} />;

    case TaskType.PRZYPORZADKOWANIE:
      return <PrzyporzadkowanieTask {...props} />;

    default:
      return <div>Nieobsługiwany typ zadania: {task.typ}</div>;
  }
};

// KOMPLETNE KOMPONENTY DLA KAŻDEGO TYPU:

const WyjasnienieSensuTask: React.FC<TaskRendererProps> = ({
  task,
  textSources,
  onAnswer,
  currentAnswer = "",
}) => {
  const [text, setText] = useState(currentAnswer);

  return (
    <div className="space-y-4">
      {textSources && textSources.length > 0 && (
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-medium mb-2">Tekst:</h4>
          <div className="whitespace-pre-wrap text-sm">
            {textSources[0].fragment}
          </div>
        </div>
      )}

      <div className="bg-yellow-50 p-3 rounded">
        <p className="font-medium">{task.polecenie}</p>
        <p className="text-sm text-gray-600 mt-1">Punkty: 0-{task.maxPunkty}</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onAnswer(e.target.value);
        }}
        className="w-full h-24 p-3 border rounded"
        placeholder="Wyjaśnij sens..."
      />
    </div>
  );
};

const RozstrzygniecieTask: React.FC<TaskRendererProps> = ({
  task,
  textSources,
  onAnswer,
  currentAnswer = { rozstrzygniecie: "", uzasadnienie: "" },
}) => {
  const [decision, setDecision] = useState(currentAnswer.rozstrzygniecie);
  const [justification, setJustification] = useState(
    currentAnswer.uzasadnienie
  );

  const updateAnswer = (field: string, value: string) => {
    const newAnswer = {
      rozstrzygniecie: field === "decision" ? value : decision,
      uzasadnienie: field === "justification" ? value : justification,
    };
    onAnswer(newAnswer);
  };

  return (
    <div className="space-y-4">
      {textSources && (
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-medium mb-2">Teksty źródłowe:</h4>
          {textSources.map((source, idx) => (
            <details key={idx} className="mb-3">
              <summary className="cursor-pointer font-medium">
                Tekst {idx + 1}: {source.autor} - {source.tytul}
              </summary>
              <div className="mt-2 pl-4 text-sm whitespace-pre-wrap">
                {source.fragment}
              </div>
            </details>
          ))}
        </div>
      )}

      <div className="bg-yellow-50 p-3 rounded">
        <p className="font-medium">{task.polecenie}</p>
      </div>

      <div>
        <label className="block mb-2 font-medium">Rozstrzygnięcie:</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="tak"
              checked={decision === "tak"}
              onChange={(e) => {
                setDecision(e.target.value);
                updateAnswer("decision", e.target.value);
              }}
              className="mr-2"
            />
            TAK
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="nie"
              checked={decision === "nie"}
              onChange={(e) => {
                setDecision(e.target.value);
                updateAnswer("decision", e.target.value);
              }}
              className="mr-2"
            />
            NIE
          </label>
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">Uzasadnienie:</label>
        <textarea
          value={justification}
          onChange={(e) => {
            setJustification(e.target.value);
            updateAnswer("justification", e.target.value);
          }}
          className="w-full h-32 p-3 border rounded"
          placeholder="Uzasadnij swoją odpowiedź odwołując się do obu tekstów..."
        />
      </div>
    </div>
  );
};

const NotatkaSyntetyzujacaTask: React.FC<TaskRendererProps> = ({
  task,
  textSources,
  onAnswer,
  currentAnswer = "",
}) => {
  const [text, setText] = useState(currentAnswer);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const { minSlow = 60, maxSlow = 90 } = task.wymagania || {};

  return (
    <div className="space-y-4">
      {textSources && (
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-medium mb-2">Teksty źródłowe:</h4>
          {textSources.map((source, idx) => (
            <details key={idx} className="mb-3">
              <summary className="cursor-pointer font-medium">
                Tekst {idx + 1}: {source.autor} - {source.tytul}
              </summary>
              <div className="mt-2 pl-4 text-sm whitespace-pre-wrap">
                {source.fragment}
              </div>
            </details>
          ))}
        </div>
      )}

      <div className="bg-yellow-50 p-3 rounded">
        <p className="font-medium">{task.polecenie}</p>
        <p className="text-sm mt-1">
          Wymagania: {minSlow}-{maxSlow} wyrazów | Punkty: 0-{task.maxPunkty}
        </p>
      </div>

      <div>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onAnswer(e.target.value);
          }}
          className="w-full h-40 p-3 border rounded"
          placeholder="Napisz notatkę syntetyzującą..."
        />

        <div className="flex justify-between mt-2 text-sm">
          <span
            className={
              wordCount < minSlow
                ? "text-red-500"
                : wordCount > maxSlow
                ? "text-orange-500"
                : "text-green-500"
            }
          >
            Liczba słów: {wordCount}/{minSlow}-{maxSlow}
          </span>

          <div className="text-gray-500">
            Oceniane: Synteza (0-2) • Limit słów (0-1) • Język (0-1)
          </div>
        </div>
      </div>
    </div>
  );
};

const PrawdaFalszTask: React.FC<TaskRendererProps> = ({
  task,
  textSources,
  onAnswer,
  currentAnswer = [],
}) => {
  const [answers, setAnswers] = useState<boolean[]>(currentAnswer);

  const statements = task.fragmenty || [];

  const updateAnswer = (index: number, value: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    onAnswer(newAnswers);
  };

  return (
    <div className="space-y-4">
      {textSources && textSources[0] && (
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-medium mb-2">Tekst:</h4>
          <div className="whitespace-pre-wrap text-sm">
            {textSources[0].fragment}
          </div>
        </div>
      )}

      <div className="bg-yellow-50 p-3 rounded">
        <p className="font-medium">{task.polecenie}</p>
      </div>

      <div className="space-y-3">
        {statements.map((statement, idx) => (
          <div key={idx} className="border p-3 rounded">
            <p className="mb-2">
              {idx + 1}. {statement.tekst}
            </p>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`statement-${idx}`}
                  checked={answers[idx] === true}
                  onChange={() => updateAnswer(idx, true)}
                  className="mr-2"
                />
                Prawda
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`statement-${idx}`}
                  checked={answers[idx] === false}
                  onChange={() => updateAnswer(idx, false)}
                  className="mr-2"
                />
                Fałsz
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PrzyporzadkowanieTask: React.FC<TaskRendererProps> = ({
  task,
  onAnswer,
  currentAnswer = {},
}) => {
  const [mappings, setMappings] =
    useState<Record<string, string>>(currentAnswer);

  const fragments = task.fragmenty || [];
  const options = task.opcje || [];

  const updateMapping = (fragmentId: string, option: string) => {
    const newMappings = { ...mappings, [fragmentId]: option };
    setMappings(newMappings);
    onAnswer(newMappings);
  };

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 p-3 rounded">
        <p className="font-medium">{task.polecenie}</p>
      </div>

      <div className="bg-gray-50 p-3 rounded">
        <p className="font-medium mb-2">Opcje do wyboru:</p>
        <div className="flex flex-wrap gap-2">
          {options.map((option, idx) => (
            <span key={idx} className="px-3 py-1 bg-white border rounded">
              {idx + 1}. {option}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {fragments.map((fragment, idx) => (
          <div key={fragment.id} className="border p-3 rounded">
            <p className="mb-2 font-medium">
              Fragment {String.fromCharCode(65 + idx)}:
            </p>
            <p className="text-sm mb-3 italic">{fragment.tekst}</p>
            {fragment.autor && (
              <p className="text-xs text-gray-600 mb-2">— {fragment.autor}</p>
            )}

            <select
              value={mappings[fragment.id] || ""}
              onChange={(e) => updateMapping(fragment.id, e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Wybierz...</option>
              {options.map((option, optIdx) => (
                <option key={optIdx} value={option}>
                  {optIdx + 1}. {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};
