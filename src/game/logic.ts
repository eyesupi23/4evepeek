import {
  DEFAULT_TIME_LIMIT,
  MAX_TILES,
  RANKS,
  SCORE_MULTIPLIERS,
  TILE_COUNT,
  TILE_POINTS,
  TIME_BONUS_PER_SECOND,
} from "./config";
import type { Question, Round } from "./types";

export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function prepareRound(q: Question): Round {
  const choices = shuffle(q.choices) as Round["choices"];
  const norm = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();
  const answerIndex = choices.findIndex((c) => norm(c) === norm(q.answer));
  if (answerIndex === -1) {
    throw new Error(
      `Question "${q.id}": answer "${q.answer}" is not one of its choices`,
    );
  }
  const tileOrder = shuffle(Array.from({ length: TILE_COUNT }, (_, i) => i));
  return { ...q, choices, answerIndex, tileOrder };
}

/** 1 tile at 0s, then one more each time another 1/MAX_TILES of the time passes */
export function tilesForElapsed(elapsedMs: number, limitMs: number): number {
  const step = limitMs / MAX_TILES;
  return Math.min(MAX_TILES, 1 + Math.floor(elapsedMs / step));
}

/** x2 / x3 etc. based on the question id's number range in SCORE_MULTIPLIERS */
export function multiplierFor(id: string): number {
  const n = Number(id);
  return (
    SCORE_MULTIPLIERS.find((r) => n >= r.from && n <= r.to)?.multiplier ?? 1
  );
}

export function scoreFor(
  correct: boolean,
  tilesShown: number,
  remainingMs: number,
): number {
  if (!correct) return 0;
  const base = TILE_POINTS[Math.min(tilesShown, TILE_POINTS.length) - 1] ?? 0;
  return base + Math.ceil(remainingMs / 1000) * TIME_BONUS_PER_SECOND;
}

/** Highest score possible: every question right with 1 tile open and the full time bonus */
export function maxScoreFor(questions: readonly Question[]): number {
  return questions.reduce((sum, q) => {
    const limitMs = (q.timeLimit ?? DEFAULT_TIME_LIMIT) * 1000;
    return sum + scoreFor(true, 1, limitMs) * multiplierFor(q.id);
  }, 0);
}

/** Rank number (1 = best) and title for a final score */
export function rankFor(
  score: number,
  maxScore: number,
): { rank: number; title: string; desc: string } {
  const percent = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const i = RANKS.findIndex((r) => percent >= r.minPercent);
  const index = i === -1 ? RANKS.length - 1 : i;
  return {
    rank: index + 1,
    title: RANKS[index].title,
    desc: RANKS[index].desc,
  };
}
