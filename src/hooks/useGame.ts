import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_TIME_LIMIT, REVEAL_DELAY_MS, SHUFFLE_QUESTIONS, TILE_COUNT } from "../game/config";
import { multiplierFor, prepareRound, scoreFor, shuffle, tilesForElapsed } from "../game/logic";
import { sfx } from "../game/sound";
import type { Phase, Question, Round, RoundResult } from "../game/types";

export function useGame(questions: Question[]) {
  const [phase, setPhase] = useState<Phase>("title");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<RoundResult[]>([]);

  const round: Round | undefined = rounds[index];
  const limitMs = (round?.timeLimit ?? DEFAULT_TIME_LIMIT) * 1000;
  const remainingMs = Math.max(0, limitMs - elapsed);
  const tilesShown = tilesForElapsed(elapsed, limitMs);
  const visibleTiles = phase === "playing" ? tilesShown : TILE_COUNT;
  const score = results.reduce((sum, r) => sum + r.points, 0);
  const lastResult = results[results.length - 1];

  // Refs so the timer callback always sees fresh values
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const elapsedRef = useRef(0);

  const resetClock = () => {
    elapsedRef.current = 0;
    setElapsed(0);
  };

  const finishRound = useCallback(
    (choice: number | null) => {
      if (phaseRef.current !== "playing" || !round) return;
      phaseRef.current = "reveal";
      const e = Math.min(elapsedRef.current, limitMs);
      const timedOut = choice === null;
      const correct = choice === round.answerIndex;
      const shown = tilesForElapsed(e, limitMs);
      const result: RoundResult = {
        questionId: round.id,
        correct,
        timedOut,
        tilesShown: shown,
        points: scoreFor(correct, shown, limitMs - e) * multiplierFor(round.id),
      };
      (timedOut ? sfx.timeout : correct ? sfx.correct : sfx.wrong)();
      setPicked(choice);
      setResults((prev) => [...prev, result]);
      setPhase("reveal");
    },
    [round, limitMs],
  );

  // Countdown
  useEffect(() => {
    if (phase !== "playing") return;
    const start = performance.now();
    elapsedRef.current = 0;
    setElapsed(0);
    const id = window.setInterval(() => {
      const e = performance.now() - start;
      elapsedRef.current = e;
      setElapsed(e);
      if (e >= limitMs) finishRound(null);
    }, 50);
    return () => window.clearInterval(id);
  }, [phase, index, limitMs, finishRound]);

  // Beep each time a new tile opens (skip the first)
  const prevTiles = useRef(1);
  useEffect(() => {
    if (phase === "playing" && tilesShown > prevTiles.current) sfx.reveal();
    prevTiles.current = phase === "playing" ? tilesShown : 1;
  }, [phase, tilesShown]);

  const start = useCallback(() => {
    const ordered = SHUFFLE_QUESTIONS ? shuffle(questions) : questions;
    setRounds(ordered.map(prepareRound));
    setIndex(0);
    resetClock();
    setResults([]);
    setPicked(null);
    setPhase("playing");
    sfx.start();
  }, [questions]);

  const next = useCallback(() => {
    if (index + 1 < rounds.length) {
      setIndex((i) => i + 1);
      resetClock();
      setPicked(null);
      setPhase("playing");
      return;
    }
    setPhase("result");
  }, [index, rounds.length]);

  // After answering, show the answer for a moment then move on automatically
  const nextRef = useRef(next);
  nextRef.current = next;
  useEffect(() => {
    if (phase !== "reveal") return;
    const id = window.setTimeout(() => nextRef.current(), REVEAL_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [phase, index]);

  return {
    phase,
    round,
    index,
    total: rounds.length,
    remainingMs,
    limitMs,
    visibleTiles,
    picked,
    results,
    lastResult,
    score,
    start,
    answer: finishRound,
    next,
    toTitle: () => setPhase("title"),
  };
}
