import {useState, useEffect, useLayoutEffect, useRef} from 'react';
import type {CSSProperties} from 'react';
import {TECH_STACK} from '../../data/techstack';
import type {SkillGroup} from '../../data/techstack';

// deal animation phases
type DealPhase = 'idle' | 'stacked' | 'dealt';

interface DealOffset {
  x: number;
  y: number;
}

// PROPS
interface CategoryCardProps {
  category: SkillGroup;
  cardIndex: number;
  phase: DealPhase;
  offset?: DealOffset;
  dealt: boolean;
}

const DEAL_STAGGER = 220;
const DEAL_DURATION = 1000;
// reveal delay per card
const REVEAL_STAGGER = 200;
// visible part per card
const STACK_PEEK = 70;

const LAST_CARD = TECH_STACK.length - 1;

// last card deals first
function dealDelayFor(cardIndex: number): number {
  return (LAST_CARD - cardIndex) * DEAL_STAGGER;
}

function phaseClass(base: string, phase: DealPhase): string {
  return phase === 'stacked' ? ` ${base}-stacked` : phase === 'dealt' ? ` ${base}-in` : '';
}

function CategoryCard({category, cardIndex, phase, offset, dealt}: CategoryCardProps) {
  const allLanded = (LAST_CARD - 1) * DEAL_STAGGER + DEAL_DURATION;
  const landDelay = !dealt ? cardIndex * 80 : allLanded + cardIndex * REVEAL_STAGGER;

  const style = {
    '--deal-x': `${offset?.x ?? 0}px`,
    '--deal-y': `${offset?.y ?? 0}px`,
    '--deal-delay': `${dealDelayFor(cardIndex)}ms`,
    '--deal-duration': `${DEAL_DURATION}ms`,
    '--deal-z': dealt ? cardIndex + 1 : 'auto',
  } as CSSProperties;

  return (
    <div className={`category-card${phaseClass('category-card', phase)}`} style={style}>
      <div className="category-card-header">
        <span className="category-card-icon">{category.icon}</span>
        <span className="category-card-title">{category.category}</span>
      </div>
      <ul className="category-card-skills">
        {category.skills.map((skill, skillIndex) => (
          <li
            key={skill.name}
            className="skill-row"
            style={{'--sweep-delay': `${landDelay + skillIndex * 60}ms`} as CSSProperties}
          >
            <span className="skill-icons" aria-hidden="true">
              {skill.icons.map(icon => (
                <svg key={icon.title} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d={icon.path}/>
                </svg>
              ))}
            </span>
            <span className="skill-name">{skill.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function TechStack() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<DealPhase>('idle');
  const [offsets, setOffsets] = useState<DealOffset[]>([]);
  const [dealEnabled, setDealEnabled] = useState<boolean>(false);

  // measure and fan out
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    if (reduceMotion || columns < 2) return;

    const measure = () => {
      const cards = [...grid.querySelectorAll<HTMLElement>(':scope > .category-card')];
      const first = cards[0];
      setOffsets(cards.map((card, i) => ({
        x: first.offsetLeft + i * STACK_PEEK - card.offsetLeft,
        y: first.offsetTop - card.offsetTop,
      })));
    };

    measure();
    setDealEnabled(true);
    setPhase('stacked');
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('dealt');
          obs.disconnect();
        }
      },
      {rootMargin: '0px 0px -30% 0px'}
    );
    obs.observe(grid);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stack" className="techstack-section">
      <div className="container">
        <div className="section-title">Tech Stack</div>
        <div className="tech-grid" ref={gridRef}>
          {TECH_STACK.map((cat, index) => (
            <CategoryCard
              key={cat.category}
              category={cat}
              cardIndex={index}
              phase={phase}
              offset={offsets[index]}
              dealt={dealEnabled}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
