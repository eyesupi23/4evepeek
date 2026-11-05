import { maxScoreFor, rankFor } from "../game/logic";
import type { Question, RoundResult } from "../game/types";

interface Props {
  results: RoundResult[];
  questions: Question[];
  score: number;
  onRestart: () => void;
  onTitle: () => void;
}

export function ResultScreen({
  results,
  questions,
  score,
  onRestart,
  onTitle,
}: Props) {
  const byId = new Map(questions.map((q) => [q.id, q]));
  const correct = results.filter((r) => r.correct).length;
  const maxScore = maxScoreFor(
    questions.filter((q) => results.some((r) => r.questionId === q.id)),
  );
  const { rank, title, desc } = rankFor(score, maxScore);

  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="pt-6 text-center">
        <p className="font-pixel text-lg text-mist">ระดับของคุณ</p>
        <p className="font-pixel text-lg text-mist pt-5">{rank}</p>
        <p className="animate-pop mt-5 mb-2 text-3xl font-bold text-gold">
          "{title}"
        </p>
        <p className="my-4 text-md text-[#4dfff3]">{desc} </p>
        {rank == 5 && (
          <a href="https://www.youtube.com/4evegroup"> -- Click --</a>
        )}

        <p className="mt-10 text-base text-mist">คะแนนรวม</p>
        <p className="font-pixel mt-3 text-4xl text-[#EE018F] tabular-nums">
          {score}
        </p>
        <p className="mt-4 text-md text-mist">
          ตอบถูก {correct} จาก {results.length} ข้อ
        </p>
      </div>

      <details className="group">
        <summary className="px-btn flex cursor-pointer list-none items-center justify-center gap-2 py-3 [&::-webkit-details-marker]:hidden">
          <span className="text-base">ดูคะแนนแต่ละข้อ</span>
          <span className="transition-transform group-open:rotate-180">▾</span>
        </summary>
        <ol className="px-frame mt-4 flex flex-col bg-ink">
          {results.map((r, i) => {
            const q = byId.get(r.questionId);
            const status = r.timedOut
              ? { label: "หมดเวลา", tone: "text-slate" }
              : r.correct
                ? { label: "ถูก", tone: "text-leaf" }
                : { label: "ผิด", tone: "text-berry" };
            return (
              <li
                key={r.questionId}
                className="flex items-center gap-3 border-b-2 border-night px-3 py-2 last:border-b-0"
              >
                {q && (
                  <img
                    src={q.image}
                    alt=""
                    className="h-9 w-12 shrink-0 object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">
                    {i + 1}. {q?.answer}
                  </p>
                  <p className={`text-sm font-bold ${status.tone}`}>
                    {status.label}
                  </p>
                </div>
                <span
                  className={`font-pixel text-xs tabular-nums ${r.points ? "text-gold" : "text-slate"}`}
                >
                  +{r.points}
                </span>
              </li>
            );
          })}
        </ol>
      </details>

      <div className="mt-auto flex flex-col gap-6 pb-2">
        <button
          type="button"
          onClick={onRestart}
          className="px-btn bg-berry py-4"
        >
          <span className="text-lg font-bold">เล่นอีกครั้ง</span>
        </button>
        <button type="button" onClick={onTitle} className="px-btn py-3">
          <span className="text-base">กลับหน้าแรก</span>
        </button>
      </div>
    </div>
  );
}
