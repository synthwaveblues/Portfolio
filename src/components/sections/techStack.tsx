import {useState, useEffect, useRef} from 'react';
import {TECH_STACK} from '../../data/techstack';
import type {SkillGroup, Skill} from '../../data/techstack';

// PROPS
interface SkillBarProps {
  skill: Skill;
  delay: number;
}

interface CategoryCardProps {
  category: SkillGroup;
  cardIndex: number;
}

// SKILL BAR
function SkillBar({skill, delay}: SkillBarProps) {
  const [width, setWidth] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(skill.level), delay);
        }
      },
      {threshold: 0.2}
    )

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [skill.level, delay]);

  return (
    <div className="skill-row" ref={ref}>
      <div className="skill-name-row">
        <span className="skill-name">{skill.name}</span>
        <span
          className="skill-level"
          style={{opacity: width > 0 ? 1 : 0}}
        >
          {skill.level}%
        </span>
      </div>

      <div className="skill-bar-bg">
        <div
          className="skill-bar-fill"
          style={{
            width: `${width}%`,
            transition: `width 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

function CategoryCard({category, cardIndex}: CategoryCardProps) {
  return (
    <div className="category-card">
      <div className="category-card-header">
        <span className="category-card-icon">{category.icon}</span>
        <span className="category-card-title">{category.category}</span>
      </div>
      <div className="category-card-skills">
        {category.skills.map((skill, skillIndex) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            delay={cardIndex * 80 + skillIndex * 60}
          />
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  return (
    <section id="stack" className="techstack-section">
      <div className="container">
        <div className="section-label">
          <span className="section-label-slash">//</span>
          <span className="section-label-text">PROFICIENCY</span>
        </div>
        <div className="section-title">Tech Stack</div>
        <div className="tech-grid">
          {TECH_STACK.map((cat, index) => (
            <CategoryCard
              key={cat.category}
              category={cat}
              cardIndex={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}