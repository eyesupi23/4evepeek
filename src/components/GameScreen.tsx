import { useEffect } from "react";
import { MAX_TILES } from "../game/config";
import { multiplierFor } from "../game/logic";
import type { Round, RoundResult } from "../game/types";
import { Choices } from "./Choices";
import { ImageGrid } from "./ImageGrid";
import { TimerBar } from "./TimerBar";

interface Props {
  round: Round;
  index: number;
  total: number;
  score: number;
  remainingMs: number;
  limitMs: number;
  visibleTiles: number;
  picked: number | null;
  revealed: boolean;
  lastResult?: RoundResult;
  onAnswer: (i: number) => void;
}

export function GameScreen(props: Props) {
  const { round, index, total, score, revealed, lastResult, onAnswer } = props;
  const multiplier = multiplierFor(round.id);

  // Keyboard: 1-4 / A-D to answer (moves on by itself after the reveal)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (revealed) return;
      const i = "1234".indexOf(e.key) !== -1 ? "1234".indexOf(e.key) : "abcd".indexOf(e.key.toLowerCase());
      if (i >= 0 && e.key.length === 1) onAnswer(i);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, onAnswer]);

  return (
    <div className="flex flex-1 flex-col gap-5">
      <header className="flex items-center justify-between text-sm text-mist">
        <span>
          ข้อ <span className="font-pixel text-xs text-snow">{index + 1}/{total}</span>
          {multiplier > 1 && (
            <span className="font-pixel ml-2 bg-berry px-2 py-1 text-xs text-snow">x{multiplier}</span>
          )}
        </span>
        <span>
          คะแนน <span className="font-pixel text-xs text-gold tabular-nums">{String(score).padStart(4, "0")}</span>
        </span>
      </header>

      <TimerBar
        remainingMs={revealed ? 0 : props.remainingMs}
        limitMs={props.limitMs}
        tilesShown={Math.min(props.visibleTiles, MAX_TILES)}
        maxTiles={MAX_TILES}
      />

      <div className="relative mx-auto w-full max-w-[min(100%,69svh)]">
        <ImageGrid
          image={round.image}
          tileOrder={round.tileOrder}
          visibleTiles={props.visibleTiles}
          alt={round.answer}
          solved={revealed}
        />
        {revealed && lastResult && <Verdict result={lastResult} />}
      </div>

      <Choices
        choices={round.choices}
        answerIndex={round.answerIndex}
        picked={props.picked}
        locked={revealed}
        onPick={onAnswer}
      />

    </div>
  );
}

function Verdict({ result }: { result: RoundResult }) {
  const { label, tone } = result.timedOut
    ? { label: "หมดเวลา", tone: "bg-slate" }
    : result.correct
      ? { label: "ถูกต้อง", tone: "bg-leaf text-night" }
      : { label: "ผิด", tone: "bg-berry" };

  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-3 flex justify-center" role="status">
      <div className={`px-frame animate-pop ${tone} flex items-center gap-3 px-4 py-2`}>
        <span className="text-base font-bold">{label}</span>
        <span className="font-pixel text-xs tabular-nums">+{result.points}</span>
      </div>
    </div>
  );
}
