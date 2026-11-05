interface Props {
  choices: readonly string[];
  answerIndex: number;
  picked: number | null;
  locked: boolean;
  onPick: (i: number) => void;
}

const KEYS = ["A", "B", "C", "D"];

export function Choices({ choices, answerIndex, picked, locked, onPick }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5 px-1">
      {choices.map((choice, i) => {
        let tone = "bg-ink";
        if (locked && i === answerIndex) tone = "bg-leaf text-night";
        else if (locked && i === picked) tone = "bg-berry animate-shake";
        else if (locked) tone = "bg-ink opacity-50";

        return (
          <button
            key={choice}
            type="button"
            disabled={locked}
            onClick={() => onPick(i)}
            className={`px-btn ${tone} flex min-h-14 items-center gap-2 px-3 py-3 text-left`}
          >
            <span className="font-pixel text-[10px] text-gold">{KEYS[i]}</span>
            <span className="text-base leading-tight font-bold sm:text-lg">{choice}</span>
          </button>
        );
      })}
    </div>
  );
}
