import {useState, useEffect, useRef} from 'react';
import {EXPERIENCE, EDUCATION} from '../../data/timeline';
import type {ExperienceItem, EducationItem} from '../../data/timeline';

// PROPS
interface ExperienceCardProps {
  item: ExperienceItem;
  visible: boolean;
  index: number;
}

interface EducationCardProps {
  item: EducationItem;
  visible: boolean;
  index: number;
}

function ExperienceCard({item, visible, index}: ExperienceCardProps) {
  return (
    <div
      className="timeline-item"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: `all 0.5s ease ${index * 0.1}s`,
      }}
    >
      <div className="timeline-dot"/>
      <div className="timeline-content">
        <div className="timeline-meta">
          <span className="timeline-period">{item.period}</span>
          <span className="timeline-location">{item.location}</span>
        </div>
        <div className="timeline-company">{item.company}</div>
        <div className="timeline-role">{item.role}</div>
        <ul className="timeline-points">
          {item.points.map((point, i) => (
            <li key={i} className="timeline-point">{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EducationCard({item, visible, index}: EducationCardProps) {
  return (
    <div
      className="timeline-item"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: `all 0.5s ease ${index * 0.15}s`,
      }}
    >
      <div className="timeline-dot"/>
      <div className="timeline-content">
        <div className="timeline-meta">
          <span className="timeline-period">{item.period}</span>
        </div>
        <div className="timeline-company">{item.school}</div>
        <div className="timeline-role">{item.degree}</div>
        <p className="timeline-detail">{item.detail}</p>
      </div>
    </div>
  );
}

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexAttr = entry.target.getAttribute('data-index');
            if (indexAttr) {
              const idx = Number(indexAttr);
              setVisibleItems((prev) => new Set([...prev, idx]));
            }
          }
        });
      },
      {threshold: 0.2}
    );

    refs.current.forEach((ref) => ref && obs.observe(ref));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" className="timeline-section">
      <div className="container">
        <div className="section-label">
          <span className="section-label-slash">//</span>
          <span className="section-label-text">BACKGROUND</span>
        </div>
        <div className="section-title">Experience & Education</div>

        <div className="timeline-cols">
          <div className="timeline-col">
            <div className="timeline-col-header">
              <span className="timeline-col-title">Work Experience</span>
              <div className="timeline-col-line"/>
            </div>
            <div className="timeline-col-body">
              {EXPERIENCE.map((item, index) => (
                <div
                  key={`exp-${index}`}
                  ref={(el) => {
                    refs.current[index] = el;
                  }}
                  data-index={index}
                >
                  <ExperienceCard
                    item={item}
                    index={index}
                    visible={visibleItems.has(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="timeline-col">
            <div className="timeline-col-header">
              <span className="timeline-col-title">Education</span>
              <div className="timeline-col-line"/>
            </div>
            <div className="timeline-col-body">
              {EDUCATION.map((item, index) => {
                const globalIndex = index + EXPERIENCE.length;
                return (
                  <div
                    key={`edu-${index}`}
                    ref={(el) => {
                      refs.current[globalIndex] = el;
                    }}
                    data-index={globalIndex}
                  >
                    <EducationCard
                      item={item}
                      index={globalIndex}
                      visible={visibleItems.has(globalIndex)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}