# Pixel Peek

เกมทายภาพสไตล์ 8-bit — React + TypeScript + Tailwind CSS v4 + Vite

## เริ่มใช้งาน

```bash
npm install
npm run dev      # เปิด http://localhost:5173
npm run build    # build ไว้ที่ dist/
```

## กติกา

- ภาพถูกแบ่งเป็น grid 3×3 เริ่มเปิดให้เห็น 1 ช่อง
- เวลาลดลงเรื่อย ๆ และเปิดช่องเพิ่มทุก 1/4 ของเวลา (สูงสุด 4 ช่อง)
- ตอบถูกได้ 400 / 300 / 200 / 100 คะแนน ตามจำนวนช่องที่เปิด + โบนัส 10 คะแนนต่อวินาทีที่เหลือ
- เวลาหมดหรือตอบผิด = 0 คะแนน
- คีย์บอร์ด: `1-4` หรือ `A-D` เพื่อตอบ, `Enter` ไปข้อต่อไป

## เพิ่มคำถาม

1. วางรูปไว้ใน `public/images/` (รูปสี่เหลี่ยมจัตุรัสดีที่สุด)
2. เพิ่มข้อใน `src/data/questions.ts`

```ts
{
  id: "cat",                     // ห้ามซ้ำ
  image: "/images/cat.png",
  choices: ["แมว", "หมา", "เสือ", "กระต่าย"],
  answer: "แมว",                 // ต้องตรงกับหนึ่งใน choices
  timeLimit: 20,                 // (ไม่ใส่ก็ได้) วินาที
}
```

ลำดับคำถาม ลำดับ choice และช่องที่เปิด จะสุ่มใหม่ทุกเกม

## ปรับแต่ง

- `src/game/config.ts` — เวลาเริ่มต้น, จำนวนช่องสูงสุด, คะแนน, สุ่มลำดับข้อ
- `src/index.css` — สี (palette Sweetie 16) และฟอนต์ใน `@theme`
- `scripts/make-sprites.py` — สร้างภาพ pixel art ตัวอย่าง (แก้ตาราง 16×16 แล้วรันใหม่)

## โครงสร้าง

```
src/
  data/questions.ts     คำถามทั้งหมด
  game/                 config, types, logic (สุ่ม/คิดคะแนน), sound (เสียง 8-bit)
  hooks/useGame.ts      state ของเกม + ตัวจับเวลา
  components/           TitleScreen, GameScreen, ImageGrid, TimerBar, Choices, ResultScreen
```
