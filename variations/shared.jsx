// Shared components used by all three variations.
// Clip player with label above. STAR story rendered as flowing prose.

function Clip({ clip, accent = '#FFD400', textOnVideo = '#000' }) {
  const videoRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <div className="nb-clip">
      <div className="nb-clip-label">
        <span className="nb-clip-label-text">{clip.label}</span>
      </div>
      <div className="nb-clip-frame"
        onClick={toggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ '--accent': accent }}>
        <video
          ref={videoRef}
          src={clip.src}
          poster={clip.still}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {!playing && (
          <div className="nb-clip-overlay">
            <div className="nb-clip-play" style={{ color: textOnVideo }}>▶</div>
          </div>
        )}
        {playing && hover && (
          <div className="nb-clip-overlay nb-clip-overlay-pause">
            <div className="nb-clip-play" style={{ color: textOnVideo }}>❚❚</div>
          </div>
        )}
      </div>
    </div>
  );
}

function StoryBlock({ block, variant = 'v1' }) {
  // Strip straight and curly double-quote characters from the prose.
  const stripQuotes = (s) => typeof s === 'string' ? s.replace(/["“”]/g, '') : s;
  return (
    <div className={`nb-story nb-story-${variant}`}>
      <h4 className="nb-story-h">{block.h}</h4>
      <p className="nb-story-p">{stripQuotes(block.p)}</p>
      {block.pull && (
        <div className="nb-pull">{stripQuotes(block.pull)}</div>
      )}
    </div>
  );
}

function ProjectDetail({ project, variant, onBack }) {
  return (
    <div className={`nb-detail nb-detail-${variant}`}>
      <button className="nb-back" onClick={onBack}>
        ← back to experience
      </button>

      <div className="nb-detail-head">
        <div className="nb-detail-kicker">{project.kicker}</div>
        <h2 className="nb-detail-title">{project.name}</h2>
        <div className="nb-detail-tag">{project.tag}</div>
      </div>

      <section className="nb-detail-clips">
        <div className="nb-section-label">▼ demo clips · {project.clips.length}</div>
        <div className="nb-clip-note">{project.clipsNote}</div>
        <div className="nb-clip-grid">
          {project.clips.map(c => <Clip key={c.label} clip={c} />)}
        </div>
      </section>

      <section className="nb-detail-story">
        <div className="nb-section-label">▼ how it went down</div>
        <div className="nb-story-body">
          {project.story.map((b, i) => <StoryBlock key={i} block={b} variant={variant} />)}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { Clip, StoryBlock, ProjectDetail });
