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
    <div className="video-panel">
      <div className="video-panel-header">
        <div className="video-panel-title">
          <span className="video-panel-dot"/>
          <span>LIVE DEMO - {project.name}</span>
        </div>
        <span className="video-panel-close" onClick={onClose}>×</span>
      </div>
      <div className="video-panel-body">
        <div className="video-panel-demo">
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
        <p className="video-panel-desc">{project.videodesc}</p>
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

  const toggle = (id: string) => {
    const next = id === openId ? null : id;
    setOpenId(next);
    if (next && demoRef.current) {
      setTimeout(() => {
        const top = demoRef.current!.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({top, behavior: 'smooth'});
      }, 100);
    }
  }

  const openProject = PROJECTS.find(p => p.id === openId);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-body">
        <div className="section-label">FEATURED WORK</div>
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
          className={`"demo-panel-wrap ${openId ? "demo-panel-wrap-open" : ""}`}
          ref={demoRef}
        >
          {openProject && (
            <VideoPanel
              project={openProject}
              onClose={() => setOpenId(null)}
            />
          )}
        </div>
      </div>
    </section>
  )
}

