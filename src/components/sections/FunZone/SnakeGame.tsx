import { useState, useEffect, useRef } from 'react';

const CELL = 18, COLS = 22, ROWS = 18;
const DIR: Record<string, [number, number]> = {
  ArrowUp:    [0, -1],
  ArrowDown:  [0,  1],
  ArrowLeft:  [-1, 0],
  ArrowRight: [ 1, 0],
};

type GameState = 'idle' | 'playing' | 'dead';

interface SnakeGameProps {
  onClose: () => void;
}

export default function SnakeGame({ onClose }: SnakeGameProps) {
  const [snake, setSnake] = useState<[number, number][]>([[5,5],[4,5],[3,5]]);
  const [food, setFood] = useState<[number, number]>([15, 9]);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState<number>(0);
  const [best, setBest] = useState<number>(0);
  const nextDir = useRef<[number, number]>([1, 0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const randFood = (s: [number, number][]): [number, number] => {
    let pos: [number, number];
    do {
      pos = [Math.floor(Math.random() * COLS), Math.floor(Math.random() * ROWS)];
    } while (s.some(([x, y]) => x === pos[0] && y === pos[1]));
    return pos;
  };

  const reset = () => {
    const s: [number, number][] = [[5,5],[4,5],[3,5]];
    setSnake(s);
    nextDir.current = [1, 0];
    setFood(randFood(s));
    setScore(0);
    setGameState('playing');
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!DIR[e.key]) return;
      e.preventDefault();
      const [dx, dy] = DIR[e.key];
      const [cx, cy] = nextDir.current;
      if (dx !== -cx || dy !== -cy) nextDir.current = [dx, dy];
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const [dx, dy] = nextDir.current;
        const head: [number, number] = [
          (prev[0][0] + dx + COLS) % COLS,
          (prev[0][1] + dy + ROWS) % ROWS,
        ];
        if (prev.some(([x, y]) => x === head[0] && y === head[1])) {
          setGameState('dead');
          setScore(s => { setBest(b => Math.max(b, s)); return s; });
          return prev;
        }
        let newSnake: [number, number][];
        setFood(f => {
          if (head[0] === f[0] && head[1] === f[1]) {
            newSnake = [head, ...prev];
            setScore(s => s + 10);
            return randFood([head, ...prev]);
          }
          newSnake = [head, ...prev.slice(0, -1)];
          return f;
        });
        return newSnake! || [head, ...prev.slice(0, -1)];
      });
    }, 120);
    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = COLS * CELL, H = ROWS * CELL;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = '#0a0a0e';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = '#1a1a22';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); ctx.stroke();
    }

    ctx.fillStyle = '#d42b4c';
    ctx.shadowColor = '#d42b4c';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(food[0] * CELL + CELL / 2, food[1] * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    snake.forEach(([x, y], i) => {
      const ratio = i / snake.length;
      ctx.fillStyle = i === 0 ? '#d42b4c' : `rgba(212,43,76,${0.9 - ratio * 0.6})`;
      const pad = i === 0 ? 1 : 2;
      ctx.beginPath();
      ctx.roundRect(x * CELL + pad, y * CELL + pad, CELL - pad * 2, CELL - pad * 2, i === 0 ? 4 : 3);
      ctx.fill();
    });
  }, [snake, food]);

  return (
    <div className="game-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="snake-window">

        <div className="terminal-titlebar">
          <div className="terminal-dots">
            {(['#ff5f57', '#febc2e', '#28c840'] as const).map((c, i) => (
              <div
                key={c}
                className="terminal-dot"
                style={{ background: c, cursor: i === 0 ? 'pointer' : 'default' }}
                onClick={i === 0 ? onClose : undefined}
              />
            ))}
          </div>
          <span className="terminal-title">snake.exe</span>
          <span className="snake-score">score: {score} · best: {best}</span>
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <canvas
            ref={canvasRef}
            width={COLS * CELL}
            height={ROWS * CELL}
            style={{ display: 'block' }}
          />
          {gameState !== 'playing' && (
            <div className="snake-overlay">
              {gameState === 'dead' && (
                <div className="snake-game-over">GAME OVER</div>
              )}
              <button onClick={reset} className="snake-start-btn">
                {gameState === 'idle' ? 'Start Game' : 'Play Again'}
              </button>
              <div className="snake-hint">use arrow keys</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
