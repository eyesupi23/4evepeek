const SEGMENTS = 15;

interface Props {
  remainingMs: number;
  limitMs: number;
  tilesShown: number;
  maxTiles: number;
}

export function TimerBar({ remainingMs, limitMs, tilesShown, maxTiles }: Props) {
  const ratio = remainingMs / limitMs;
  const filled = Math.ceil(ratio * SEGMENTS);
  const color = ratio > 0.66 ? "bg-leaf" : ratio > 0.33 ? "bg-gold" : "bg-berry";
  const seconds = Math.ceil(remainingMs / 1000);

  return (
    <div className="flex items-center gap-3">
      <div
        className="px-frame flex flex-1 gap-[3px] bg-night p-[3px]"
        role="timer"
        aria-label={`เหลือ ${seconds} วินาที`}
      >
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <div key={i} className={`h-3 flex-1 ${i < filled ? color : "bg-ink"}`} />
        ))}
      </div>
      <span
        className={`font-pixel w-8 text-right text-sm tabular-nums ${ratio <= 0.33 ? "text-berry animate-blink" : "text-snow"}`}
      >
        {seconds}
      </span>
      <div className="flex gap-1" aria-label={`เปิดภาพแล้ว ${tilesShown} จาก ${maxTiles} ช่อง`}>
        {Array.from({ length: maxTiles }, (_, i) => (
          <div key={i} className={`h-3 w-3 ${i < tilesShown ? "bg-ice" : "bg-ink"}`} />
        ))}
      </div>
    </div>
  );
}
