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

function PdfSlideshow({ src, count }) {
  const [page, setPage] = React.useState(1);
  const canvasRef = React.useRef(null);
  const pdfRef = React.useRef(null);
  const renderingRef = React.useRef(false);

  const renderPage = React.useCallback((num) => {
    if (!pdfRef.current || !canvasRef.current || renderingRef.current) return;
    renderingRef.current = true;
    pdfRef.current.getPage(num).then(p => {
      const viewport = p.getViewport({ scale: window.devicePixelRatio >= 2 ? 2.0 : 1.6 });
      const canvas = canvasRef.current;
      if (!canvas) { renderingRef.current = false; return; }
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      p.render({ canvasContext: canvas.getContext('2d'), viewport }).promise.then(() => {
        renderingRef.current = false;
      });
    });
  }, []);

  React.useEffect(() => {
    if (typeof pdfjsLib === 'undefined') return;
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    pdfjsLib.getDocument(src).promise.then(pdf => {
      pdfRef.current = pdf;
      renderPage(1);
    });
  }, [src, renderPage]);

  const go = React.useCallback((dir) => {
    setPage(prev => {
      const next = Math.min(Math.max(prev + dir, 1), count);
      setTimeout(() => renderPage(next), 0);
      return next;
    });
  }, [count, renderPage]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  return (
    <div className="nb-pdf-slideshow">
      <canvas ref={canvasRef} className="nb-pdf-canvas" />
      <div className="nb-pdf-nav">
        <button className="nb-pdf-btn" onClick={() => go(-1)} disabled={page === 1}>← prev</button>
        <span className="nb-pdf-counter">{page} / {count}</span>
        <button className="nb-pdf-btn" onClick={() => go(1)} disabled={page === count}>next →</button>
      </div>
    </div>
  );
}

function ProjectDetail({ project, variant, onBack }) {
  const hasSlides = project.slides && project.slides.src;
  const hasClips = project.clips && project.clips.length > 0;
  const hasStory = project.story && project.story.length > 0;

  return (
    <div className={`nb-detail nb-detail-${variant}`}>
      <button className="nb-back" onClick={onBack}>
        ← back
      </button>

      <div className="nb-detail-head">
        <div className="nb-detail-kicker">{project.kicker}</div>
        <h2 className="nb-detail-title">{project.name}</h2>
        <div className="nb-detail-tag">{project.tag}</div>
      </div>

      {hasSlides && (
        <section className="nb-detail-slides">
          <div className="nb-section-label">▼ architecture slides · {project.slides.count}</div>
          <PdfSlideshow src={project.slides.src} count={project.slides.count} />
        </section>
      )}

      {!hasSlides && hasClips && (
        <section className="nb-detail-clips">
          <div className="nb-section-label">▼ demo clips · {project.clips.length}</div>
          <div className="nb-clip-note">{project.clipsNote}</div>
          <div className="nb-clip-grid">
            {project.clips.map(c => <Clip key={c.label} clip={c} />)}
          </div>
        </section>
      )}

      {hasStory && (
        <section className="nb-detail-story">
          <div className="nb-section-label">▼ how it went down</div>
          <div className="nb-story-body">
            {project.story.map((b, i) => <StoryBlock key={i} block={b} variant={variant} />)}
          </div>
        </section>
      )}
    </div>
  );
}

Object.assign(window, { Clip, StoryBlock, ProjectDetail });
