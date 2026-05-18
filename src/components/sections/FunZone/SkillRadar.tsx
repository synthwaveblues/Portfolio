import {useState, useEffect, useRef} from 'react';

interface RadarSkill {
  label: string;
  value: number;
}

const SKILLS: RadarSkill[] = [
  {label: 'TypeScript', value: 0.9},
  {label: 'NestJS', value: 0.88},
  {label: 'PostgreSQL', value: 0.82},
  {label: 'React', value: 0.75},
  {label: 'Docker', value: 0.72},
  {label: 'Testing', value: 0.70},
  {label: 'Android', value: 0.62},
  {label: 'Cloud/AWS', value: 0.65},
];

const CX = 130, CY = 130, R = 95;
const GRID_LEVELS = [0.25, 0.5, 0.75, 1.0];
const DURATION = 500;

export default function SkillRadar() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setProgress(eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      {threshold: 0.3}
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const n = SKILLS.length;

  const getPoint = (i: number, val: number): [number, number] => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return [CX + Math.cos(angle) * R * val, CY + Math.sin(angle) * R * val];
  };

  const polyPoints = SKILLS
    .map((s, i) => getPoint(i, s.value * progress))
    .map(([x, y]) => `${x},${y}`)
    .join(' ');

  return (
    <div ref={ref} className="radar-wrap">
      <svg width={260} height={260} style={{overflow: 'visible'}}>
        {GRID_LEVELS.map(level => (
          <polygon
            key={level}
            points={SKILLS.map((_, i) => getPoint(i, level).join(',')).join(' ')}
            fill="none"
            stroke="var(--border)"
            strokeWidth={1}
          />
        ))}

        {SKILLS.map((_, i) => {
          const [x2, y2] = getPoint(i, 1);
          return <line key={i} x1={CX} y1={CY} x2={x2} y2={y2} stroke="var(--border)" strokeWidth={1}/>;
        })}

        <polygon
          points={polyPoints}
          fill="rgba(212,43,76,0.15)"
          stroke="var(--cherry)"
          strokeWidth={2}
        />

        {SKILLS.map((s, i) => {
          const [x, y] = getPoint(i, s.value * progress);
          return (
            <circle key={i} cx={x} cy={y} r={3.5} fill="var(--bg)" stroke="var(--cherry)" strokeWidth={2}/>
          );
        })}

        {SKILLS.map((s, i) => {
          const [x, y] = getPoint(i, 1.22);
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
              style={{fontFamily: 'var(--mono)', fontSize: 10, fill: 'var(--text-dim)'}}>
              {s.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
