import {useRef, useState} from "react";
import {PROJECTS, PROJECT_LABELS, PROJECT_ICONS} from "../../data/projects.ts";
import type {Project} from "../../data/projects.ts";

// PROPS
interface VideoPanelProps {
  project: Project;
  onClose: () => void;
}

interface ProjectCardProps {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}

// VIDEO PANEL
function VideoPanel({project, onClose}: VideoPanelProps) {
  const isYoutube =
    project.videoUrl &&
    (project.videoUrl.includes('youtube') || project.videoUrl.includes('youtu.be'));
  const isVideo = project.videoUrl && !isYoutube;

  return (
    <div className="demo-panel">
      <div className="demo-panel-header">
        <div className="demo-panel-title">
          <span className="demo-panel-dot"/>
          <span>LIVE DEMO - {project.name}</span>
        </div>
        <span className="demo-panel-close" onClick={onClose}>×</span>
      </div>
      <div className="demo-panel-body">
        <div className="demo-video-wrap">
          {
            isYoutube ? (
              <iframe
                src={project.videoUrl
                  .replace('watch?v=', 'embed/')
                  .replace('youtu.be/', 'youtube.com/embed/')}
                className="demo-iframe"
                allow="autoplay; fullscreen"
              />
            ) : isVideo ? (
              <video
                src={project.videoUrl}
                controls
                className="demo-video"
              />
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
  )
}

function ProjectCard({project, isOpen, onToggle}: ProjectCardProps) {
  return (
    <div
      className={`project-card ${isOpen ? "project-card-open" : ''}`}
      onClick={onToggle}
    >
      <div className="project-card-inner">
        <div className="project-num">{project.num}</div>
        <div className="project-thumbnail">
          <div className="project-thumbnail-label">
            {PROJECT_LABELS[project.id]}
          </div>
          <div className="project-thumbnail-icon">
            {PROJECT_ICONS[project.id]}
          </div>
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
  )
}

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    const section = document.getElementById('projects');
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({top, behavior: 'smooth'});
    }
  };

  const handleClose = () => {
    setOpenId(null);
    scrollToProjects();
  };

  const toggle = (id: string) => {
    const next = id === openId ? null : id;
    setOpenId(next);
    if (next && !openId && demoRef.current) {
      const el = demoRef.current;
      const onEnd = () => {
        el.removeEventListener('transitionend', onEnd);
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({top, behavior: 'smooth'});
      };
      el.addEventListener('transitionend', onEnd);
    } else if (!next) {
      scrollToProjects();
    }
  }

  const openProject = PROJECTS.find(p => p.id === openId);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-label">
          <span className="section-label-slash">//</span>
          <span className="section-label-text">FEATURED WORK</span>
        </div>
        <div className="section-title">Projects</div>
        <div className="projects-grid">
          {PROJECTS.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              isOpen={openId === p.id}
              onToggle={() => toggle(p.id)}
            />
          ))}
        </div>
        <div
          className={`demo-panel-wrap ${openId ? "demo-panel-wrap-open" : ""}`}
          ref={demoRef}
        >
          {openProject && (
            <VideoPanel
              project={openProject}
              onClose={handleClose}
            />
          )}
        </div>
        <div className="projects-footer">
          <span className="projects-footer-text">..and even more on my </span>
          <a className="projects-footer-link" href="https://github.com/synthwaveblues" target="_blank"
             rel="noreferrer">GitHub</a>
          <span className="projects-footer-text">:)</span>

        </div>
      </div>
    </section>
  )
}

