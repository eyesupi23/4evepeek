/** One question. Add new ones in src/data/questions.ts */
export interface Question {
  id: string;
  /** Path under /public (e.g. "/images/cat.png") or any image URL */
  image: string;
  /** Exactly 4 choices */
  choices: [string, string, string, string];
  /** Must match one of the choices exactly */
  answer: string;
  /** Seconds for this question. Falls back to DEFAULT_TIME_LIMIT */
  timeLimit?: number;
}

/** A question ready to play: choices shuffled, tile reveal order picked */
export interface Round extends Question {
  answerIndex: number;
  tileOrder: number[];
}

export interface RoundResult {
  questionId: string;
  correct: boolean;
  timedOut: boolean;
  tilesShown: number;
  points: number;
}

export type Phase = "title" | "playing" | "reveal" | "result";
