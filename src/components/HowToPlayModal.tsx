import { useEffect, useRef } from "react";
import {
  DEFAULT_TIME_LIMIT,
  MAX_TILES,
} from "../game/config";

interface Props {
  open: boolean;
  questionCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function HowToPlayModal({
  open,
  onCancel,
  onConfirm,
}: Props) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  // Esc closes; focus the main button when opened
  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  const rules = [
    "รูปแบบเกมจะเป็นเกมทายภาพจาก MV ของ 4EVE โดยภาพจะถูกปิดไว้ด้วยช่อง 3x3",
    `แต่ละข้อมีเวลา ${DEFAULT_TIME_LIMIT} วินาที ช่องจะค่อยๆ เปิดทีละช่อง (สูงสุด ${MAX_TILES} ช่อง)`,
    "ดูภาพแล้วเลือกคำตอบที่ถูกที่สุดจาก 4 ตัวเลือก",
    "ยิ่งตอบเร็ว ยิ่งได้คะแนนเยอะ เพราะคะแนนที่ได้จะลดลงตามจำนวนช่องที่ถูกเปิด",
    "มีข้อยากพิเศษแทรกเข้ามา โดยจะได้คะแนน x2 เมื่อตอบถูก",
    "มีข้อโบนัสพิเศษให้ทายเมมเบอร์แทรกเข้ามา โดยจะได้คะแนน x3 เมื่อตอบถูก",
    "ตอบผิดหรือหมดเวลา ได้ 0 คะแนนในข้อนั้นทันที",
    "หวังว่าทุกคนจะสนุกน้า enjoy คับบ!"
  ];

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-night/80 p-4"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="how-to-play-title"
        className="px-frame animate-pop flex max-h-[90svh] w-full max-w-md flex-col gap-5 overflow-y-auto bg-ink p-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="how-to-play-title"
          className="font-pixel text-center text-3xl leading-relaxed text-[#fff04d] sm:text-base"
        >
          ♪ กติไก่ ♪
        </h2>

        <ol className="flex flex-col gap-3 text-base leading-snug">
          {rules.map((rule, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-pixel shrink-0 pt-1 text-xs text-[#4dfff3]">
                {i + 1}.
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ol>

        <div className="mt-2 flex flex-col-reverse gap-5 sm:flex-row sm:justify-center sm:gap-6">
          <button type="button" onClick={onCancel} className="px-btn px-5 py-3">
            <span className="font-bold">ยกเลิก</span>
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            className="px-btn bg-[#EE018F] px-5 py-3"
          >
            <span className="font-bold">เข้าใจแล้ว เริ่มได้เลย</span>
          </button>
        </div>
      </div>
    </div>
  );
}
