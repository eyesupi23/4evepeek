import { useState } from "react";
import { HowToPlayModal } from "./HowToPlayModal";

interface Props {
  questionCount: number;
  onStart: () => void;
}

/** Title: the logo is drawn as the game's own 3x3 grid, one tile "open" */
export function TitleScreen({ questionCount, onStart }: Props) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
      <div className="grid grid-cols-3 gap-1" aria-hidden>
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            className={`h-10 w-10 sm:h-12 sm:w-12 ${i === 4 ? "bg-[#EE018F] animate-blink" : "tile-cover"}`}
          />
        ))}
      </div>

      <h1 className="font-pixel text-2xl leading-relaxed text-[#EE018F] sm:text-3xl">
        4EVE
        <br />
        <span className="text-white">Peek</span>
      </h1>

      <p className="max-w-xs text-lg leading-snug text-mist">
        เมื่อความจำต้องแข่งกับเวลา คุณคือแฟนพันธุ์แต้ 4EVE หรือไม่ ไปลองกันโลด ;P
      </p>

      <button
        type="button"
        onClick={() => setShowHelp(true)}
        className="px-btn bg-[#EE018F] px-8 py-4"
      >
        <span className="text-xl font-bold">เริ่มเกม</span>
      </button>

      <dl className="flex text-sm text-[#4dfff3]">
        <div>
          <dt>
            **เกมนี้เป็นเพียงเกมที่แฟนคลับจัดทำขึ้นเพื่อความบันเทิงเท่านั้น <br />
            ศิลปินหรือค่ายไม่มีส่วนเกี่ยวข้องใดๆ ทั้งสิ้น**
          </dt>
        </div>
      </dl>

      <HowToPlayModal
        open={showHelp}
        questionCount={questionCount}
        onCancel={() => setShowHelp(false)}
        onConfirm={() => {
          setShowHelp(false);
          onStart();
        }}
      />
    </div>
  );
}
