// backend/src/types/exam.types.ts

export interface TextSource {
  id: string;
  autor: string;
  tytul: string;
  fragment: string;
  metadane?: {
    rok?: number;
    zrodlo?: string;
    przypisy?: string[];
  };
}

export interface EssayTopic {
  id: string;
  numer: number;
  temat: string;
  polecenie: string;
  wymagania: {
    minSlow: number;
    lekturaObowiazkowa: boolean;
    innyUtworLiteracki: boolean;
    konteksty: string[];
  };
}

export enum TaskType {
  // Część językowa
  WYJASNIENIE_SENSU = "wyjasnienie_sensu",
  ROZSTRZYGNIECIE = "rozstrzygniecie",
  POROWNANIE_TEKSTOW = "porownanie_tekstow",
  PRAWDA_FALSZ = "prawda_falsz",
  NOTATKA_SYNTETYZUJACA = "notatka_syntetyzujaca",

  // Część historycznoliteracka
  PRZYPORZADKOWANIE = "przyporzadkowanie",
  ROZPOZNANIE_EPOKI = "rozpoznanie_epoki",
  SRODKI_STYLISTYCZNE = "srodki_stylistyczne",
  INTERPRETACJA_SYMBOLU = "interpretacja_symbolu",
  ANALIZA_FRAGMENTU = "analiza_fragmentu",
  POROWNANIE_UTWOROW = "porownanie_utworow",
}

export interface ExamTask {
  id: string;
  numer: string;
  typ: TaskType;
  polecenie: string;
  punkty: number;
  maxPunkty: number;
  tekstZrodlowy?: string | string[];
  wymagania?: {
    minSlow?: number;
    maxSlow?: number;
    wymagaUzasadnienia?: boolean;
    liczbaArgumentow?: number;
  };
  opcje?: string[]; // dla zadań wyboru
  fragmenty?: Array<{
    id: string;
    tekst: string;
    autor?: string;
  }>;
}

export interface TaskAssessment {
  points: number;
  maxPoints: number;
  feedback: {
    [key: string]: any;
  };
  details?: string;
}

export interface ExamStructure {
  arkusz1: {
    czasTrwania: number;
    maxPunktow: number;
    czesci: [
      {
        nazwa: string;
        tekstyZrodlowe: TextSource[];
        zadania: ExamTask[];
      },
      {
        nazwa: string;
        zadania: ExamTask[];
      }
    ];
  };
  arkusz2: {
    czasTrwania: number;
    maxPunktow: number;
    tematy: EssayTopic[];
  };
}
