import {useState, useRef, useEffect} from 'react';

type GameState = 'idle' | 'playing' | 'done';

const CODE_SENTENCES = [
  "git push origin main",
  "npm run dev",
  "docker compose up -d",
  "SELECT * FROM users",
  "const x = await fetch(url)",
  "git commit -m 'fix: bug'",
  "git stash pop",
  "npm install --save-dev",
  "git checkout -b feature/auth",
  "console.log('hello world')",
  "throw new Error('not implemented')",
  "ALTER TABLE users ADD COLUMN age INT",
  "docker ps -a",
  "curl -X POST /api/login",
  "return res.status(200).json(data)",
  "git rebase -i HEAD~3",
  "export default function App()",
  "jest --watch --coverage",
] as const;

export default function TypingGame() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [sentenceIdx, setSentenceIdx] = useState<number>(0);
  const [typed, setTyped] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [errors, setErrors] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const [elapsed, setElapsed] = useState(0);

  const [demoText, setDemoText] = useState('');
  const [demoIdx, setDemoIdx] = useState(0);
  const [demoDeleting, setDemoDeleting] = useState(false);

  useEffect(() => {
    if (gameState !== 'idle') return;
    const current = CODE_SENTENCES[demoIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!demoDeleting) {
      if (demoText.length < current.length) {
        timeout = setTimeout(() => setDemoText(current.slice(0, demoText.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setDemoDeleting(true), 1800);
      }
    } else {
      if (demoText.length > 0) {
        timeout = setTimeout(() => setDemoText(current.slice(0, demoText.length - 1)), 25);
      } else {
        setDemoDeleting(false);
        setDemoIdx(i => (i + 1) % CODE_SENTENCES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [demoText, demoDeleting, demoIdx, gameState]);

  const sentence = CODE_SENTENCES[sentenceIdx];

  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setElapsed(startTime ? Date.now() - startTime : 0);
    }, 100);
    return () => clearInterval(interval);
  }, [gameState, startTime]);

  const start = () => {
    setGameState('playing');
    setTyped('');
    setErrors(0);
    setElapsed(0);
    const now = Date.now();
    setStartTime(now);
    setWpm(null);
    setAccuracy(100);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTyped(val);
    const errs = val.split('').filter((c, i) => c !== sentence[i]).length;
    setErrors(errs);
    setAccuracy(Math.max(0, Math.round((1 - errs / Math.max(val.length, 1)) * 100)));
    if (val.length >= sentence.length) {
      const elapsed = (Date.now() - startTime!) / 1000 / 60;
      const words = sentence.split(' ').length;
      setWpm(Math.round(words / elapsed));
      setGameState('done');
    }
  };

  const next = () => {
    setSentenceIdx(i => (i + 1) % CODE_SENTENCES.length);
    start();
  };

  return (
    <div className="typing-wrap">
      {gameState === 'idle' && (
        <div className="typing-idle">
          <div className="typing-sentence">
            {CODE_SENTENCES[demoIdx].split('').map((char, i) => {
              const isTyped = i < demoText.length;
              const isCursor = i === demoText.length;
              return (
                <span
                  key={i}
                  style={{
                    color: isTyped ? 'var(--text)' : 'var(--text-muted)',
                    position: 'relative',
                    borderBottom: isCursor ? '2px solid var(--cherry)' : 'none',
                    background: isCursor ? 'var(--cherry-dim)' : 'transparent',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
          <p className="typing-idle-text">How fast do you type code?</p>
          <button onClick={start} className="typing-start-btn">Start Test</button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'done') && (
        <div className="typing-active">
          <div className="typing-go-label">TYPE! TYPE! TYPE!</div>
          <div className="typing-sentence">
            {sentence.split('').map((char, i) => {
              let color = 'var(--text-muted)';
              if (i < typed.length) {
                color = typed[i] === char ? 'var(--text)' : 'var(--cherry)';
              }
              const isCursor = i === typed.length && gameState === 'playing';
              return (
                <span
                  key={i}
                  style={{
                    color,
                    position: 'relative',
                    borderBottom: isCursor ? '2px solid var(--cherry)' : 'none',
                    background: isCursor ? 'var(--cherry-dim)' : 'transparent',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>

          <input
            ref={inputRef}
            value={typed}
            onChange={handleInput}
            disabled={gameState === 'done'}
            className="typing-input"
            placeholder="type the snippet above…"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />

          <div className="typing-stats">
            {([['WPM', wpm ?? '—'], ['Accuracy', `${accuracy}%`], ['Errors', errors], ['Time', `${(elapsed / 1000).toFixed(1)}s`]] as const).map(([label, value]) => (
              <div key={label} className="typing-stat">
                <div className="typing-stat-label">{label}</div>
                <div
                  className="typing-stat-value"
                  style={{color: label === 'Errors' && errors > 0 ? 'var(--cherry)' : 'var(--text)'}}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="typing-done">
            {gameState === 'done' && <>
              <span className="typing-done-label">✓ complete!</span>
              <button onClick={next} className="typing-next-btn">Next →</button>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
