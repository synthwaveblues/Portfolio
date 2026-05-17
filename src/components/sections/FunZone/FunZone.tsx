import SpotifyWidget from './SpotifyWidget';
import SkillRadar from './SkillRadar';
import TypingGame from './TypingGame';

export default function FunZone() {
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
            <div className="fz-egg-card">
              <span className="fz-egg-icon">$_</span>
              <div className="fz-egg-title">Terminal</div>
              <div className="fz-egg-sub">coming soon</div>
            </div>
            <div className="fz-egg-card">
              <span style={{fontSize: 28}}>🐍</span>
              <div className="fz-egg-title">Snake</div>
              <div className="fz-egg-sub">coming soon</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
