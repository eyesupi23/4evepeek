export const GRID_SIZE = 3; // 3x3 = 9 tiles
export const TILE_COUNT = GRID_SIZE * GRID_SIZE;

/** Tiles open over time: 1 at the start, up to this many before time runs out */
export const MAX_TILES = 5;

export const DEFAULT_TIME_LIMIT = 10; // seconds

/** How long the answer stays on screen before moving to the next question */
export const REVEAL_DELAY_MS = 1000;

/** Points for a correct answer, by how many tiles were open (index 0 = 1 tile) */
export const TILE_POINTS = [500, 400, 300, 200, 100];

/** Bonus per whole second left on the clock */
export const TIME_BONUS_PER_SECOND = 10;

/** Shuffle the question order each game */
export const SHUFFLE_QUESTIONS = true;

/**
 * Score multiplier by question id (id is the number in questions.ts).
 * Ids not listed here score normally (x1).
 */
export const SCORE_MULTIPLIERS = [
  { from: 16, to: 20, multiplier: 2 },
  { from: 21, to: 27, multiplier: 3 },
];

/**
 * Rank titles on the result screen, checked top to bottom.
 * minPercent = percent of the highest possible score. Rank 1 needs a perfect score (100).
 */
export const RANKS = [
  {
    minPercent: 90,
    title: "วัดกันเลยฉันคงไม่แพ้ใคร!!",
    desc: `ตัวแม่ ตัวมัม ตัวมารดา แม้รูปยังไม่ขึ้น คุณก็สามารถกดตอบได้เลยด้วยจิตวิญญาณแห่งฟอร์อาย คนทำเกมเองยังทำไม่ได้ แต่คุณทำได้ ขอคาราวะ!!!`,
  },
  {
    minPercent: 75,
    title: "แฟนพันธุ์(เกือบ)แท้!!",
    desc: "ความรู้แน่นจนเกือบจะได้เป็นตัวจริง แต่บางข้อก็อาศัยดวงกับเซนส์ เรียกว่ารักจริง แต่จำไม่ค่อยได้ ทำไม่ค่อยทัน",
  },
  {
    minPercent: 50,
    title: "แฟนตัวจริงนะ แต่ว่า",
    desc: "เพลงอาจจะคุ้นหู แต่ MV อาจจะยังไม่คุ้นตา คะแนนนี้ไม่ได้แปลว่าไม่รัก แต่หลักฐานว่ารักยังไม่เพียงพอ",
  },
  {
    minPercent: 25,
    title: "แฟน(มือ)ใหม่หัดขับ",
    desc: "ก็รักนะ แต่ความจำไม่ค่อยให้ความร่วมมือ บางข้อก็ตอบด้วยความมั่นใจ...แต่ไม่มีที่มา",
  },
  {
    minPercent: 0,
    title: "อืมมมมม.....",
    desc: "ขอต้อนรับเข้าสู่การเป็นฟอร์อายวันแรก หรือไม่ คุณอาจจะชอบฟังเพลงมากกว่าดู MV ก็ได้มั้ง แต่ไม่เป็นไรนะ เราแนบลิงค์อฟช.วงมาให้คุณแล้ว คลิกเล้ยย...",
  },
];
