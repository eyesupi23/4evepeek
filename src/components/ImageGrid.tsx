import { GRID_SIZE, TILE_COUNT } from "../game/config";

interface Props {
  image: string;
  tileOrder: number[];
  visibleTiles: number;
  alt: string;
  solved: boolean;
}

/** The picture with a 3x3 grid of covers on top. Covers fade out in tileOrder. */
export function ImageGrid({ image, tileOrder, visibleTiles, alt, solved }: Props) {
  const open = new Set(tileOrder.slice(0, visibleTiles));

  return (
    <div className="px-frame relative aspect-[4/3] w-full bg-night">
      <img
        src={image}
        alt={solved ? alt : "ภาพปริศนา"}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
        aria-hidden
      >
        {Array.from({ length: TILE_COUNT }, (_, i) => {
          const isOpen = open.has(i);
          return (
            <div key={i} className="relative">
              <div
                className={`tile-cover absolute inset-0 grid place-items-center ${isOpen ? "opacity-0" : "opacity-100"}`}
              >
                <span className="font-pixel text-xl text-sky/70 sm:text-2xl">?</span>
              </div>
              {/* grid lines stay visible while playing */}
              {!solved && <div className="absolute inset-0 border-2 border-night/80" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
