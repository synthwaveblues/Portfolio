import {useEffect, useRef} from 'react';

const FONT = '12px "JetBrains Mono Variable", monospace';
const LINE = 14;
const FPS = 30;

type Palette = {
  sun: string[]; grid: string[]; haze: string; ridge: string; hill: string; star: string; cloud?: string[]
};

function ramp(stops: string[], n: number): string[] {
  const rgb = stops.map(h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)));
  return Array.from({length: n}, (_, i) => {
    const t = (i / (n - 1)) * (rgb.length - 1);
    const k = Math.min(rgb.length - 2, Math.floor(t));
    const f = t - k;
    return `rgb(${rgb[k].map((v, j) => Math.round(v + (rgb[k + 1][j] - v) * f)).join(',')})`;
  });
}

const DARK: Palette = {
  sun: ramp(['#ffd1dc', '#ff7d95', '#d42b4c', '#8f1d36'], 10),
  grid: ramp(['#2a1420', '#5a1a2c', '#a3233f', '#d42b4c', '#ff8aa0'], 12),
  haze: '#3a1824',
  ridge: '#b0304e',
  hill: '#6a1f33',
  star: '#8a8a96',
};

const LIGHT: Palette = {
  sun: ramp(['#ff6f8c', '#e8395c', '#d42b4c', '#a3233f'], 10),
  grid: ramp(['#d6a0af', '#c96f88', '#d42b4c', '#b0243f', '#8f1d36'], 12),
  haze: '#d9abb8',
  ridge: '#a3233f',
  hill: '#cc8a9d',
  star: '#c96f88',
  cloud: ['#ffffff', '#ffffff', '#fbeff3', '#e4b8c4', '#cf8ea1', '#bb6c83', '#a3536c', '#8f3d58'],
};

// value noise
function hash(i: number): number {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function noise(x: number): number {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash(i) * (1 - u) + hash(i + 1) * u;
}

function noise2(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = hash(ix + iy * 57), b = hash(ix + 1 + iy * 57);
  const c = hash(ix + (iy + 1) * 57), d = hash(ix + 1 + (iy + 1) * 57);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
}

const PUFF = '.:;coO08@@';

export default function HeroRoad() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !hero || !ctx) return;

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;
    let pal = root.dataset.theme === 'light' ? LIGHT : DARK;
    let cw = 7.2, cols = 0, rows = 0;
    let chars: string[] = [], tints: string[] = [];
    let travel = 0, steer = 0, steerTo = 0, speed = 1, boost = false;
    let sky = new Float32Array(0);
    let raf = 0, last = 0, visible = true, ready = false;

    const resize = () => {
      const w = hero.clientWidth, h = hero.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = FONT;
      ctx.textBaseline = 'top';
      cw = ctx.measureText('M').width;
      cols = Math.ceil(w / cw);
      rows = Math.ceil(h / LINE);
      chars = new Array(cols * rows);
      tints = new Array(cols * rows);
      sky = new Float32Array(cols * rows);
    };

    // build frame
    const build = () => {
      chars.fill(' ');
      const narrow = cols * cw < 769;
      const hy = Math.floor(rows * (narrow ? 0.7 : 0.58)), cx = cols / 2, aspect = LINE / cw;
      const R = narrow ? 0 : rows * 0.22, sunY = hy - R * 0.35, depth = (rows - hy) * 0.75;
      const lane = narrow ? cw / 1600 : 1 / cols;

      // mountain heights
      const ridges = new Float32Array(cols + 1);
      for (let x = 0; x <= cols; x++) {
        const u = narrow ? (x * cw) / 600 : x / cols, peak = narrow ? 0.08 : 0.1;
        ridges[x] = hy - 1 - (noise(u * 7 + steer * 0.15) ** 2 * rows * peak + noise(u * 23 + steer * 0.4 + 9) * rows * peak * 0.25);
      }

      // cloud density
      const cloud = narrow ? undefined : pal.cloud;
      if (cloud) {
        const drift = travel * 0.06 + steer * 0.25;
        for (let y = 0; y < hy; y++) {
          const v = y / hy, band = Math.max(0, 1 - Math.abs(v - 0.42) * 2.4);
          for (let x = 0; x < cols; x++) {
            const sx = (x * cw) / 360 + drift, sy = (y * LINE) / 240;
            let d = noise2(sx, sy) * 0.55 + noise2(sx * 2.1, sy * 2.1 + 7) * 0.3 + noise2(sx * 4.3, sy * 4.3 + 3) * 0.15;
            d = (d - 0.73 + band * 0.3) * 3.2;
            sky[y * cols + x] = d;
          }
        }
      }

      for (let y = 0; y < hy; y++) {
        for (let x = 0; x < cols; x++) {
          const k = y * cols + x, ridge = ridges[x];
          if (y >= ridge) {
            const edge = y < ridge + 1;
            chars[k] = edge ? (ridges[x + 1] < ridge ? '/' : '\\') : (x + y) & 1 ? '.' : ':';
            tints[k] = edge ? pal.ridge : pal.hill;
            continue;
          }
          if (cloud && sky[k] > 0.04) {
            const d = sky[k], above = y > 1 ? sky[k - 2 * cols] : 0;
            chars[k] = PUFF[Math.min(9, Math.floor(d * 10))];
            tints[k] = cloud[d < 0.18 ? 6 : Math.max(0, Math.min(5, Math.round(1 - (d - above) * 9)))];
            continue;
          }
          const dist = Math.hypot((x - cx) / aspect, y - sunY);
          if (dist < R) {
            const s = (y - (sunY - R)) / (hy - sunY + R);
            const cut = y - Math.floor(sunY - R * 0.4);
            if (cut > 0 && cut % 4 < 1 + Math.floor(cut / 6)) continue;
            chars[k] = dist > R - 0.9 ? ':' : '#';
            tints[k] = pal.sun[Math.max(0, Math.min(9, Math.floor(s * 10)))];
            continue;
          }
          if (pal.cloud && !narrow) continue;
          const day = !!pal.cloud, rise = day ? Math.floor(travel * 0.8) : 0;
          const star = hash(x * 31 + (y + rise) * 997);
          if (star > 0.992) {
            const glint = Math.sin(travel * 2 + star * 50);
            chars[k] = day ? (glint > 0.6 ? '+' : glint > -0.2 ? '·' : '.') : glint > 0.3 ? '*' : '.';
            tints[k] = pal.star;
          }
        }
      }

      for (let y = hy; y < rows; y++) {
        const d0 = y - hy + 0.6, z0 = depth / d0, z1 = depth / (d0 + 1);
        const b = (y - hy) / (rows - hy);
        const shade = pal.grid[Math.min(11, Math.floor(1 + b * 11))];
        const rowDense = (z0 - z1) * 3 > 0.8;
        const rowLine = Math.floor(z0 * 3 + travel * 3) !== Math.floor(z1 * 3 + travel * 3);
        for (let x = 0; x < cols; x++) {
          const k = y * cols + x;
          const w0 = (x - cx) * lane * z0 * 14 + steer;
          const w1 = (x + 1 - cx) * lane * z0 * 14 + steer;
          const colDense = w1 - w0 > 0.6;
          if (y === hy && !narrow) {
            chars[k] = '_';
            tints[k] = pal.ridge;
          } else if (rowDense && colDense) {
            if ((x + y) % 4 === 0) {
              chars[k] = '.';
              tints[k] = pal.haze;
            }
          } else if (!colDense && Math.floor(w0) !== Math.floor(w1)) {
            const r = (x - cx) / (aspect * d0);
            chars[k] = Math.abs(r) < 0.35 ? '|' : Math.abs(r) > 2.5 ? '_' : r < 0 ? '/' : '\\';
            tints[k] = shade;
          } else if (rowLine && !rowDense) {
            chars[k] = b > 0.5 ? '=' : '-';
            tints[k] = shade;
          }
        }
      }
    };

    // draw colour runs
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < rows; y++) {
        let run = '', tint = '', x0 = 0;
        const flush = () => {
          if (!run) return;
          ctx.fillStyle = tint;
          ctx.fillText(run.trimEnd(), x0 * cw, y * LINE);
        };
        for (let x = 0; x < cols; x++) {
          const k = y * cols + x, c = chars[k];
          if (c === ' ') {
            if (run) run += ' ';
            continue;
          }
          if (tints[k] !== tint) {
            flush();
            tint = tints[k];
            run = '';
            x0 = x;
          }
          run += c;
        }
        flush();
      }
    };

    const frame = () => {
      build();
      draw();
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 1000 / FPS) return;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      speed += ((boost ? 5 : 1) - speed) * 0.06;
      steer += (steerTo - steer) * 0.05;
      travel += dt * speed * 0.9;
      frame();
    };

    const play = () => {
      if (!ready || still || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // input
    const onMove = (e: PointerEvent) => {
      steerTo = (e.clientX / innerWidth - 0.5) * 3;
    };
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest('a, button, .hero-code-card')) boost = true;
    };
    const onUp = () => {
      boost = false;
    };
    const onVisibility = () => (document.hidden ? pause() : play());

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? play() : pause();
    });
    const ro = new ResizeObserver(() => {
      if (!ready) return;
      resize();
      frame();
    });
    const mo = new MutationObserver(() => {
      pal = root.dataset.theme === 'light' ? LIGHT : DARK;
      if (ready) frame();
    });

    let cancelled = false;
    const start = async () => {
      await document.fonts.load(FONT).catch(() => undefined);
      if (cancelled) return;
      ready = true;
      resize();
      frame();
      canvas.classList.add('is-on');
      play();
    };

    // after page load
    const boot = () => setTimeout(start, 200);
    if (document.readyState === 'complete') boot();
    else addEventListener('load', boot, {once: true});

    io.observe(hero);
    ro.observe(hero);
    mo.observe(root, {attributes: true, attributeFilter: ['data-theme']});
    addEventListener('pointermove', onMove, {passive: true});
    hero.addEventListener('pointerdown', onDown);
    addEventListener('pointerup', onUp);
    addEventListener('pointercancel', onUp);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      pause();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      removeEventListener('load', boot);
      removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerdown', onDown);
      removeEventListener('pointerup', onUp);
      removeEventListener('pointercancel', onUp);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="hero-road" aria-hidden="true"/>;
}
