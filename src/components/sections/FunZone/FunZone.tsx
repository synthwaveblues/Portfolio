import { useState } from 'react';
import SpotifyWidget from './SpotifyWidget';
import SkillRadar from './SkillRadar';
import TypingGame from './TypingGame';
import Terminal from './Terminal';
import SnakeGame from './SnakeGame';

export default function FunZone() {
  const [openGame, setOpenGame] = useState<'terminal' | 'snake' | null>(null);

  return (
    <section id="fun" className="fz-section">
      <div className="fz-inner">
        <div className="section-label">
          <span className="section-label-slash">//</span>
          <span className="section-label-text">INTERACTIVE</span>
        </div>
        <div className="section-title">Fun Zone</div>

        <div className="fz-grid">
          <div className="fz-card">
            <SpotifyWidget/>
          </div>

          <div className="fz-card">
            <div className="fz-card-label">Skill Radar</div>
            <SkillRadar/>
          </div>

          <div className="fz-card">
            <div className="fz-card-label">Typing Speed Game</div>
            <TypingGame/>
          </div>

          <div className="fz-egg-row">
            <div className="fz-egg-card" onClick={() => setOpenGame('terminal')}>
              <span className="fz-egg-icon">&gt;_</span>
              <div className="fz-egg-title">Terminal</div>
              <div className="fz-egg-sub">click to open</div>
            </div>
            <div className="fz-egg-card" onClick={() => setOpenGame('snake')}>
              <span className="fz-egg-icon">~&gt;</span>
              <div className="fz-egg-title">Snake</div>
              <div className="fz-egg-sub">click to open</div>
            </div>
          </div>
        </div>
      </div>

      {openGame === 'terminal' && <Terminal onClose={() => setOpenGame(null)} />}
      {openGame === 'snake' && <SnakeGame onClose={() => setOpenGame(null)} />}
    </section>
  );
}
