import { useEffect, useRef } from "react";

const CELL = 20;
const GAP = 4;
const STEP = CELL * 2.1;
const LIFE = 780;
const FADE_IN = 180;
const FADE_OUT = 980;
const MAX_LIT = 160;

const STAMPS = [
  ["..a.", ".bbd", "a.c.", "..a."],
  [".a..", "cb..", ".bd.", "..c."],
  ["a..d", ".bb.", "..ca"],
  ["..a", ".bc", "d.a", ".b."],
];

const PALETTES = {
  light: {
    a: "#F3E2C4",
    b: "#E39B68",
    c: "#D4849C",
    d: "#7EA8C8",
  },
  dark: {
    a: "#F0D08A",
    b: "#E8926A",
    c: "#E08AA4",
    d: "#8EBFDE",
  },
} as const;

type Tone = keyof (typeof PALETTES)["light"];

type LitCell = {
  col: number;
  row: number;
  colour: string;
  dim: number;
  born: number;
  until: number;
};

const easeOut = (t: number) => 1 - (1 - t) ** 2;
const easeIn = (t: number) => t * t;

const rotate = (rows: string[], turns: number) => {
  let grid = rows.map((row) => [...row]);
  const steps = ((turns % 4) + 4) % 4;
  for (let turn = 0; turn < steps; turn += 1) {
    const height = grid.length;
    const width = grid[0].length;
    grid = Array.from({ length: width }, (_, x) =>
      Array.from({ length: height }, (_, y) => grid[height - 1 - y][x]),
    );
  }
  return grid;
};

const PixelBackdrop = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cols = 1;
    let rows = 1;
    let width = 0;
    let height = 0;
    let palette: Record<Tone, string> = { ...PALETTES.light };
    let avoid: DOMRect[] = [];
    const lit = new Map<string, LitCell>();
    let frame = 0;
    let moveFrame = 0;
    let pointer: { x: number; y: number } | null = null;
    let last: { x: number; y: number } | null = null;
    let active: { col: number; row: number }[] = [];
    let stampIndex = 0;
    let ambientTimer = 0;
    let visible = true;

    const readPalette = () => {
      const probe = document.createElement("canvas").getContext("2d", {
        willReadFrequently: true,
      });
      if (!probe) return;
      probe.fillStyle = getComputedStyle(root).color;
      probe.fillRect(0, 0, 1, 1);
      const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      palette = { ...(luminance > 0.5 ? PALETTES.dark : PALETTES.light) };
    };

    const measureAvoid = () => {
      const origin = root.getBoundingClientRect();
      const pad = 6;
      const host = root.parentElement ?? document;
      avoid = [...host.querySelectorAll("[data-grid-avoid]")].flatMap((el) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const rects = [...range.getClientRects()].filter(
          (rect) => rect.width > 0 && rect.height > 0,
        );
        const boxes = rects.length > 0 ? rects : [el.getBoundingClientRect()];
        return boxes.map(
          (rect) =>
            new DOMRect(
              rect.left - origin.left - pad,
              rect.top - origin.top - pad,
              rect.width + pad * 2,
              rect.height + pad * 2,
            ),
        );
      });
    };

    const resize = () => {
      width = root.clientWidth;
      height = root.clientHeight;
      cols = Math.max(1, Math.ceil(width / CELL));
      rows = Math.max(1, Math.ceil(height / CELL));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readPalette();
      measureAvoid();
    };

    const dimFor = (col: number, row: number) => {
      const x = col * CELL + CELL / 2;
      const y = row * CELL + CELL / 2;
      let nearest = Number.POSITIVE_INFINITY;
      for (const box of avoid) {
        const dx = Math.max(box.left - x, 0, x - box.right);
        const dy = Math.max(box.top - y, 0, y - box.bottom);
        nearest = Math.min(nearest, Math.hypot(dx, dy));
        if (nearest === 0) break;
      }
      if (!Number.isFinite(nearest)) return 1;
      return 0.12 + 0.88 * Math.min(1, nearest / (2.4 * CELL));
    };

    const draw = (now: number) => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      const size = CELL - GAP * 2;
      for (const [key, cell] of lit) {
        let alpha: number;
        if (now < cell.until) {
          alpha = easeOut(Math.min(1, (now - cell.born) / FADE_IN));
        } else {
          const progress = (now - cell.until) / FADE_OUT;
          if (progress >= 1) {
            lit.delete(key);
            continue;
          }
          alpha = 1 - easeIn(progress);
        }
        ctx.globalAlpha = alpha * cell.dim;
        ctx.fillStyle = cell.colour;
        ctx.fillRect(cell.col * CELL + GAP, cell.row * CELL + GAP, size, size);
      }
      ctx.globalAlpha = 1;
      if (lit.size > 0) frame = requestAnimationFrame(draw);
    };

    const ensureDraw = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const light = (col: number, row: number, tone: Tone, life: number) => {
      if (col < 0 || row < 0 || col >= cols || row >= rows || lit.size >= MAX_LIT) return;
      const key = `${col},${row}`;
      const now = performance.now();
      const existing = lit.get(key);
      if (existing && now < existing.until) {
        existing.until = now + life;
        existing.dim = dimFor(col, row);
        ensureDraw();
        return;
      }
      let born = now;
      if (existing) {
        const faded = 1 - easeIn(Math.min(1, (now - existing.until) / FADE_OUT));
        born = now - (1 - Math.sqrt(Math.max(0, 1 - faded))) * FADE_IN;
      }
      lit.set(key, {
        col,
        row,
        colour: palette[tone],
        dim: dimFor(col, row),
        born,
        until: now + life,
      });
      ensureDraw();
    };

    const plant = (col: number, row: number, turns: number, remember = true) => {
      const stamp = rotate(STAMPS[stampIndex % STAMPS.length], turns);
      stampIndex += 1;
      const originX = col - Math.floor(stamp[0].length / 2);
      const originY = row - Math.floor(stamp.length / 2);
      const placed: { col: number; row: number }[] = [];
      stamp.forEach((line, y) => {
        [...line].forEach((tone, x) => {
          if (tone === ".") return;
          const cellCol = originX + x;
          const cellRow = originY + y;
          light(cellCol, cellRow, tone as Tone, LIFE);
          placed.push({ col: cellCol, row: cellRow });
        });
      });
      if (remember) active = placed;
    };

    const hold = () => {
      const now = performance.now();
      for (const spot of active) {
        const cell = lit.get(`${spot.col},${spot.row}`);
        if (!cell) continue;
        cell.until = now + LIFE;
      }
      if (active.length > 0) ensureDraw();
    };

    const paintPointer = () => {
      moveFrame = 0;
      if (!pointer) return;
      if (
        pointer.x < 0 ||
        pointer.y < 0 ||
        pointer.x > width ||
        pointer.y > height
      ) {
        last = null;
        return;
      }

      const col = Math.floor(pointer.x / CELL);
      const row = Math.floor(pointer.y / CELL);
      if (!last) {
        plant(col, row, 0);
        last = { ...pointer };
        return;
      }

      const dx = pointer.x - last.x;
      const dy = pointer.y - last.y;
      if (Math.hypot(dx, dy) < STEP) {
        hold();
        return;
      }

      const turns = Math.round((Math.atan2(dy, dx) + Math.PI) / (Math.PI / 2));
      plant(col, row, turns);
      last = { ...pointer };
    };

    const onPointer = (event: PointerEvent) => {
      const origin = root.getBoundingClientRect();
      pointer = {
        x: event.clientX - origin.left,
        y: event.clientY - origin.top,
      };
      if (!moveFrame) moveFrame = requestAnimationFrame(paintPointer);
    };

    const ambient = () => {
      ambientTimer = window.setTimeout(ambient, 3200 + Math.random() * 2800);
      if (!visible || document.hidden) return;
      plant(
        2 + Math.floor(Math.random() * Math.max(1, cols - 4)),
        2 + Math.floor(Math.random() * Math.max(1, rows - 4)),
        Math.floor(Math.random() * 4),
        false,
      );
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    observer.observe(root);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);

    let avoidFrame = 0;
    const mutationObserver = new MutationObserver(() => {
      if (avoidFrame) return;
      avoidFrame = requestAnimationFrame(() => {
        avoidFrame = 0;
        measureAvoid();
      });
    });
    mutationObserver.observe(root.parentElement ?? document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    const themeObserver = new MutationObserver(readPalette);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    resize();
    ambientTimer = window.setTimeout(ambient, 900);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      themeObserver.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(moveFrame);
      cancelAnimationFrame(avoidFrame);
      clearTimeout(ambientTimer);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden text-foreground [mask-image:linear-gradient(to_bottom,#000_92%,transparent)]"
      style={{
        backgroundImage:
          "linear-gradient(to right, hsl(var(--foreground) / 0.055) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.055) 1px, transparent 1px)",
        backgroundSize: `${CELL}px ${CELL}px`,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default PixelBackdrop;
