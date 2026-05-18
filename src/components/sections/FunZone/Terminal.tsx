import { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  t: 'comment' | 'text' | 'error' | 'cmd' | 'input' | 'link';
  v: string;
  href?: string;
}

type CommandResult = TerminalLine[] | '__clear__';

const COMMANDS: Record<string, () => CommandResult> = {
  help: () => [
    { t: 'comment', v: '// available commands' },
    { t: 'cmd', v: 'about' },
    { t: 'cmd', v: 'skills' },
    { t: 'cmd', v: 'projects' },
    { t: 'cmd', v: 'contact' },
    { t: 'cmd', v: 'github' },
    { t: 'cmd', v: 'clear' },
  ],
  about: () => [
    { t: 'text', v: 'Anton Shevchenko — Full-Stack Developer' },
    { t: 'text', v: 'MSc ICT @ Poznan University of Technology' },
    { t: 'text', v: 'Passionate about microservices, AI integration,' },
    { t: 'text', v: 'and building systems that scale.' },
  ],
  skills: () => [
    { t: 'text', v: 'TypeScript · NestJS · PostgreSQL · Docker' },
    { t: 'text', v: 'React · GraphQL · REST · Microservices' },
    { t: 'text', v: 'Jest · AWS S3 · GitHub Actions · Prisma' },
  ],
  projects: () => [
    { t: 'text', v: '[1] Student Helper — AI exam prep platform' },
    { t: 'text', v: '[2] Ad Portal API — classifieds backend' },
    { t: 'text', v: '[3] MovieChecklist — Android Kotlin app' },
  ],
  contact: () => [
    { t: 'link', v: 'github.com/synthwaveblues', href: 'https://github.com/synthwaveblues' },
    { t: 'link', v: 'linkedin.com/in/anton-shevchenko-8a4827357', href: 'https://linkedin.com/in/anton-shevchenko-8a4827357' },
  ],
  github: () => {
    window.open('https://github.com/synthwaveblues', '_blank');
    return [{ t: 'text', v: 'opening github...' }];
  },
  clear: () => '__clear__',
};

const LINE_COLORS: Record<string, string> = {
  comment: 'var(--text-dim)',
  text:    'var(--text)',
  error:   'var(--cherry)',
  cmd:     '#7ec8e3',
  input:   'var(--text)',
  link:    '#5ecf8a',
};

interface TerminalProps {
  onClose: () => void;
}

export default function Terminal({ onClose }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { t: 'comment', v: "// welcome to anton's terminal. type 'help'" },
  ]);
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'nearest' });
  }, [lines]);

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [...lines, { t: 'input', v: trimmed }];
    if (trimmed === '') { setLines(newLines); return; }

    const fn = COMMANDS[trimmed];
    if (!fn) {
      setLines([...newLines, { t: 'error', v: `command not found: ${trimmed}. try 'help'` }]);
    } else {
      const result = fn();
      if (result === '__clear__') {
        setLines([]);
      } else {
        setLines([...newLines, ...result]);
      }
    }
    setHistory(h => [trimmed, ...h.slice(0, 19)]);
    setHistIdx(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      const ni = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(ni);
      setInput(history[ni] || '');
    } else if (e.key === 'ArrowDown') {
      const ni = Math.max(histIdx - 1, -1);
      setHistIdx(ni);
      setInput(ni === -1 ? '' : history[ni]);
    }
  };

  return (
    <div className="game-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="terminal-window">

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
          <span className="terminal-title">anton@portfolio ~</span>
          <div style={{ width: 54 }} />
        </div>

        <div
          className="terminal-body"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className="terminal-line"
              style={{ color: LINE_COLORS[line.t] || 'var(--text)' }}
            >
              {line.t === 'input' && (
                <span style={{ color: 'var(--cherry)' }}>❯ </span>
              )}
              {line.t === 'cmd' && (
                <span style={{ color: 'var(--text-muted)' }}>  › </span>
              )}
              {line.t === 'link' ? (
                <a
                  href={line.href}
                  target="_blank"
                  rel="noreferrer"
                  className="terminal-link"
                >
                  {line.v}
                </a>
              ) : (
                line.v
              )}
            </div>
          ))}

          <div className="terminal-input-row">
            <span className="terminal-prompt">❯</span>
            <input
              ref={inputRef}
              autoFocus
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="terminal-input"
            />
          </div>
          <div ref={bottomRef} />
        </div>

      </div>
    </div>
  );
}
