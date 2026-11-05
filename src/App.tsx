import { useState } from "react";
import { GameScreen } from "./components/GameScreen";
import { ResultScreen } from "./components/ResultScreen";
import { TitleScreen } from "./components/TitleScreen";
import { questions } from "./data/questions";
import { setMuted } from "./game/sound";
import { useGame } from "./hooks/useGame";

export default function App() {
  const game = useGame(questions);
  const [muted, setMutedState] = useState(false);

  const toggleMute = () => {
    setMuted(!muted);
    setMutedState(!muted);
  };

  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-col px-5 py-5 md:max-w-lg md:py-10">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={toggleMute}
          className="p-2 text-sm text-mist"
          aria-pressed={muted}
        >
          {muted ? "เสียง: ปิด" : "เสียง: เปิด"}
        </button>
      </div>

      {game.phase === "title" && (
        <TitleScreen questionCount={questions.length} onStart={game.start} />
      )}

      {(game.phase === "playing" || game.phase === "reveal") && game.round && (
        <GameScreen
          key={game.round.id}
          round={game.round}
          index={game.index}
          total={game.total}
          score={game.score}
          remainingMs={game.remainingMs}
          limitMs={game.limitMs}
          visibleTiles={game.visibleTiles}
          picked={game.picked}
          revealed={game.phase === "reveal"}
          lastResult={game.lastResult}
          onAnswer={game.answer}
        />
      )}

      {game.phase === "result" && (
        <ResultScreen
          results={game.results}
          questions={questions}
          score={game.score}
          onRestart={game.start}
          onTitle={game.toTitle}
        />
      )}
    </main>
  );
}
