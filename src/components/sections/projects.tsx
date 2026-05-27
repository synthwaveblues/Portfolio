import {useRef, useState, useEffect, useCallback} from "react";
import {PROJECTS} from "../../data/projects.ts";
import type {Project} from "../../data/projects.ts";

interface VideoPanelProps {
  project: Project;
  onClose: () => void;
}

interface ProjectCardProps {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}

function VideoPanel({project, onClose}: VideoPanelProps) {
  const isYoutube =
    project.videoUrl &&
    (project.videoUrl.includes('youtube') || project.videoUrl.includes('youtu.be'));
  const isVideo = project.videoUrl && !isYoutube;

  return (
    <div className="demo-panel">
      <div className="demo-panel-header">
        <span className="demo-panel-close" onClick={onClose}>×</span>
      </div>
      <div className="demo-panel-body">
        <div className="demo-video-wrap">
          {isYoutube ? (
            <iframe
              src={project.videoUrl
                .replace('watch?v=', 'embed/')
                .replace('youtu.be/', 'youtube.com/embed/')
                .replace('youtube.com/shorts/', 'youtube.com/embed/')
                .split('?')[0]}
              className="demo-iframe"
              allow="autoplay; fullscreen"
            />
          ) : isVideo ? (
            <video src={project.videoUrl} controls className="demo-video"/>
          ) : (
            <div className="demo-placeholder">
              <div className="demo-placeholder-icon">▶</div>
              <div className="demo-placeholder-text">video placeholder</div>
              <div className="demo-placeholder-sub">
                set <code>videoUrl</code> in <code>projects.ts</code>
              </div>
            </div>
          )}
        </div>
        <p className="demo-desc">{project.videodesc}</p>
      </div>
    </div>
  );
}

function ProjectCard({project, isOpen, onToggle}: ProjectCardProps) {
  return (
    <div
      className={`project-card ${isOpen ? "project-card-open" : ''}`}
      data-project-id={project.id}
      onClick={onToggle}
    >
      <div className="project-card-inner">
        <div className="project-thumbnail">
          {project.image
            ? <img src={project.image} alt={project.name} className="project-thumbnail-img"/>
            : <span className="project-thumbnail-placeholder">no preview</span>
          }
        </div>
        <div className="project-name">{project.name}</div>
        <div className="project-tagline">{project.tagline}</div>
        <div className="project-desc">{project.desc}</div>
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
        <div className="project-footer">
          <span className="project-year">{project.year}</span>
          <span className="project-demo-btn">
            {isOpen ? '↑ close demo' : '↓ live demo'}
          </span>
        </div>
      </div>
    </div>
  );
}

function getCols(): number {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

export default function Projects() {
  const [openId, setOpenId]       = useState<string | null>(null);
  const [displayId, setDisplayId] = useState<string | null>(null);
  const [cols, setCols]           = useState<number>(getCols);
  const demoRef  = useRef<HTMLDivElement>(null);
  const colsRef  = useRef<number>(cols);

  useEffect(() => {
    const update = () => {
      const next = getCols();
      if (next !== colsRef.current) {
        colsRef.current = next;
        setCols(next);
        setOpenId(null);
        setDisplayId(null);
      }
    };
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Callback ref — attaches to whichever panel wrap is currently active
  const panelRef = useCallback((el: HTMLDivElement | null) => {
    demoRef.current = el;
  }, []);

  const waitForClose = (el: HTMLDivElement, cb: () => void) => {
    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'max-height') return;
      el.removeEventListener('transitionend', onEnd);
      cb();
    };
    el.addEventListener('transitionend', onEnd);
  };

  const close = () => {
    const card = openId
      ? document.querySelector<HTMLElement>(`[data-project-id="${openId}"]`)
      : null;
    setOpenId(null);
    if (card) {
      const top = card.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({top, behavior: 'smooth'});
    }
    const el = demoRef.current;
    if (el) {
      waitForClose(el, () => setDisplayId(null));
    } else {
      setTimeout(() => setDisplayId(null), 300);
    }
  };

  const scrollToPanel = () => {
    const el = demoRef.current;
    if (!el) return;
    waitForClose(el, () => {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({top, behavior: 'smooth'});
    });
  };

  const toggle = (id: string) => {
    if (id === openId) {
      close();
      return;
    }
    const wasOpen = !!openId;
    if (colsRef.current === 3) {
      // Panel always in DOM for 3-cols — set both at once
      setOpenId(id);
      setDisplayId(id);
      if (!wasOpen) scrollToPanel();
    } else {
      setOpenId(null);
      setDisplayId(id);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setOpenId(id);
          const el = demoRef.current;
          if (el) {
            waitForClose(el, () => {
              const top = el.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({top, behavior: 'smooth'});
            });
          }
        });
      });
    }
  };

  const displayProject = PROJECTS.find(p => p.id === displayId);
  const displayIndex   = displayId ? PROJECTS.findIndex(p => p.id === displayId) : -1;
  const openRowIdx     = displayIndex >= 0 ? Math.floor(displayIndex / cols) : -1;

  const renderGrid = () => {
    if (cols === 3) {
      return PROJECTS.map(p => (
        <ProjectCard key={p.id} project={p} isOpen={openId === p.id} onToggle={() => toggle(p.id)}/>
      ));
    }

    const items: React.ReactNode[] = [];
    PROJECTS.forEach((p, i) => {
      items.push(
        <ProjectCard key={p.id} project={p} isOpen={openId === p.id} onToggle={() => toggle(p.id)}/>
      );
      const rowIdx      = Math.floor(i / cols);
      const isLastInRow = (i + 1) % cols === 0 || i === PROJECTS.length - 1;
      if (isLastInRow) {
        const isThisOpen = rowIdx === openRowIdx && !!openId;
        items.push(
          <div key={`panel-row-${rowIdx}`} style={{gridColumn: '1 / -1'}}>
            <div
              ref={rowIdx === openRowIdx ? panelRef : undefined}
              className={`demo-panel-wrap${isThisOpen ? ' demo-panel-wrap-open' : ''}`}
            >
              {rowIdx === openRowIdx && displayProject && (
                <VideoPanel project={displayProject} onClose={close}/>
              )}
            </div>
          </div>
        );
      }
    });
    return items;
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-label">
          <span className="section-label-slash">//</span>
          <span className="section-label-text">FEATURED WORK</span>
        </div>
        <div className="section-title">Projects</div>
        <div className="projects-grid">
          {renderGrid()}
        </div>
        {cols === 3 && (
          <div
            ref={panelRef}
            className={`demo-panel-wrap${openId ? ' demo-panel-wrap-open' : ''}`}
          >
            {displayProject && <VideoPanel project={displayProject} onClose={close}/>}
          </div>
        )}
        <div className="projects-footer">
          <span className="projects-footer-text">..and even more on my </span>
          <a className="projects-footer-link" href="https://github.com/synthwaveblues" target="_blank" rel="noreferrer">GitHub</a>
          <span className="projects-footer-text">:)</span>
        </div>
      </div>
    </section>
  );
}
