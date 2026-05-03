// Variation 1 — RAW GRID
// Newsprint cream bg, electric blue accent + hot red, bordered block grid,
// everything orthogonal. Classic neo-brutalist grid.

function V1Identity({ d }) {
  return (
    <div className="v1-identity">
      <div className="v1-id-main">
        <div className="v1-id-meta">PORTFOLIO / 2026</div>
        <h1 className="v1-id-name">{d.identity.name}</h1>
        <div className="v1-id-tag">{d.identity.tagline}</div>
        <p className="v1-id-obj">{d.identity.objective}</p>
      </div>
      <div className="v1-id-side">
        <div className="v1-id-kv"><span>LOC</span>{d.identity.location}</div>
        <div className="v1-id-kv"><span>PHN</span>{d.identity.phone}</div>
        <div className="v1-id-kv"><span>EML</span><a href={`mailto:${d.identity.email}`}>{d.identity.email}</a></div>
        <div className="v1-id-kv"><span>GIT</span><a href={`https://${d.identity.github}`} target="_blank" rel="noreferrer">{d.identity.github}</a></div>
      </div>
    </div>
  );
}

function V1Education({ d }) {
  const e = d.education;
  return (
    <section className="v1-section">
      <h2 className="v1-h">▸ EDUCATION</h2>
      <div className="v1-edu">
        <div className="v1-edu-top">
          <div>
            <div className="v1-edu-school">{e.school}</div>
            <div className="v1-edu-degree">{e.degree}</div>
          </div>
          <div className="v1-edu-rt">
            <div>{e.graduation}</div>
            <div className="v1-edu-gpa">GPA {e.gpa}</div>
          </div>
        </div>
        <div className="v1-edu-course">
          <div className="v1-edu-course-h">RELEVANT COURSEWORK</div>
          <div className="v1-edu-course-list">
            {e.coursework.map(c => <span key={c} className="v1-course">{c}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function V1Skills({ d }) {
  return (
    <section className="v1-section">
      <h2 className="v1-h">▸ TECHNICAL SKILLS</h2>
      <div className="v1-skills">
        {Object.entries(d.skills).map(([k, arr]) => (
          <div key={k} className="v1-skill-row">
            <div className="v1-skill-k">{k}</div>
            <div className="v1-skill-v">
              {arr.map(s => <span key={s} className="v1-chip">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function V1Experience({ d, onOpen }) {
  const strip = (s) => typeof s === 'string' ? s.replace(/["“”]/g, '') : s;
  return (
    <section className="v1-section">
      <h2 className="v1-h">▸ EXPERIENCE</h2>
      {d.experience.map(x => (
        <div key={x.id} className={`v1-xp ${x.featured ? 'v1-xp-featured' : ''}`}>
          <div className="v1-xp-head">
            <div>
              <div className="v1-xp-role">{x.role}</div>
              <div className="v1-xp-org">{x.org}</div>
            </div>
            <div className="v1-xp-dates">{x.dates}</div>
          </div>
          <ul className="v1-xp-bullets">
            {x.bullets.map((b, i) => <li key={i}>{strip(b)}</li>)}
          </ul>
          {x.reflection && (
            <div className="v1-xp-reflection">
              <span className="v1-reflect-mark">※</span> {strip(x.reflection)}
            </div>
          )}
          {x.projects && (
            <div className="v1-xp-projects">
              <div className="v1-xp-projects-h">CLICK TO EXPLORE SAMPLE PROJECTS →</div>
              <div className="v1-xp-proj-grid">
                {x.projects.map(p => (
                  <button key={p.id} className="v1-proj-card" onClick={() => onOpen(p)}>
                    <div className="v1-proj-card-n">{p.name}</div>
                    <div className="v1-proj-card-t">{p.tag}</div>
                    <div className="v1-proj-card-k">{p.kicker}</div>
                    <div className="v1-proj-card-cta">open detail ↗</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

function V1Projects({ d }) {
  const strip = (s) => typeof s === 'string' ? s.replace(/["“”]/g, '') : s;
  return (
    <section className="v1-section">
      <h2 className="v1-h">▸ PROJECTS</h2>
      <div className="v1-proj-list">
        {d.projects.map((p, i) => (
          <div key={i} className={`v1-projrow ${p.stub ? 'v1-projrow-stub' : ''}`}>
            <div className="v1-projrow-head">
              <div className="v1-projrow-n">{p.name}</div>
              <div className="v1-projrow-d">{p.dates}</div>
            </div>
            {p.stub ? (
              <div className="v1-projrow-stub-body">
                <div className="v1-projrow-stub-tag">▸ IN THE WORKS · SUMMER 2026</div>
                {p.teaser && <div className="v1-projrow-teaser">{p.teaser}</div>}
                <div className="v1-projrow-stub-lines">
                  <div className="v1-cert-line v1-cert-line-1" />
                  <div className="v1-cert-line v1-cert-line-2" />
                  <div className="v1-cert-line v1-cert-line-3" />
                </div>
              </div>
            ) : (
              <>
                <div className="v1-projrow-stack">
                  {p.stack.map(s => <span key={s} className="v1-chip v1-chip-alt">{s}</span>)}
                </div>
                <ul className="v1-projrow-bullets">
                  {p.bullets.map((b, j) => <li key={j}>{strip(b)}</li>)}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function V1CertModal({ cert, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div className="v1-cert-modal" onClick={onClose}>
      <div className="v1-cert-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="v1-cert-modal-bar">
          <div className="v1-cert-modal-title">
            {cert.name} <span className="v1-cert-modal-meta">· {cert.issuer} · {cert.date}</span>
          </div>
          <div className="v1-cert-modal-actions">
            <a className="v1-cert-modal-link" href={cert.verify} target="_blank" rel="noreferrer">verify ↗</a>
            <a className="v1-cert-modal-link" href={cert.pdf} target="_blank" rel="noreferrer">open pdf ↗</a>
            <button className="v1-cert-modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>
        <iframe className="v1-cert-modal-frame" src={cert.pdf} title={cert.name} />
      </div>
    </div>
  );
}

function certFromHash(list) {
  const m = (typeof location !== 'undefined' ? location.hash : '').match(/(?:^|#|&)cert=([^&]+)/);
  if (!m) return null;
  const id = decodeURIComponent(m[1]);
  return list.find(c => c.certNo === id) || null;
}

function V1Certificates({ title, items }) {
  const list = items && items.length ? items : [
    { slot: 'CERT · 01' },
    { slot: 'CERT · 02' },
    { slot: 'CERT · 03' },
  ];
  const [open, setOpenState] = React.useState(() => certFromHash(list));

  React.useEffect(() => {
    const onPop = () => setOpenState(certFromHash(list));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [list]);

  const setOpen = (c) => {
    if (c) {
      history.pushState(null, '', `#cert=${encodeURIComponent(c.certNo)}`);
      setOpenState(c);
    } else {
      history.back();
    }
  };

  return (
    <section className="v1-section">
      <h2 className="v1-h">▸ {title || 'CERTIFICATES'}</h2>
      <div className="v1-certs-grid">
        {list.map((c, i) => {
          const filled = !!c.name;
          const Tag = filled ? 'button' : 'div';
          const label = filled ? c.name.toUpperCase() : (c.slot || '');
          return (
            <Tag
              key={i}
              type={filled ? 'button' : undefined}
              className={`v1-cert-card ${filled ? 'v1-cert-card-filled' : ''}`}
              onClick={filled ? () => setOpen(c) : undefined}
            >
              <div className="v1-cert-slot">{label}</div>
              {filled ? (
                c.thumb ? (
                  <div className="v1-cert-thumb-wrap">
                    <img className="v1-cert-thumb" src={c.thumb} alt={c.name} />
                  </div>
                ) : (
                  <div className="v1-cert-body">
                    <div className="v1-cert-name">{c.name}</div>
                    <span className="v1-cert-verify">view ↗</span>
                  </div>
                )
              ) : (
                <div className="v1-cert-body">
                  <div className="v1-cert-line v1-cert-line-1" />
                  <div className="v1-cert-line v1-cert-line-2" />
                  <div className="v1-cert-line v1-cert-line-3" />
                </div>
              )}
              <div className="v1-cert-foot">
                {filled ? `${c.issuer.toUpperCase()} · ${c.date.toUpperCase()}` : 'ISSUER · DATE'}
              </div>
            </Tag>
          );
        })}
      </div>
      {open && <V1CertModal cert={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function V1Contact({ d }) {
  return (
    <section className="v1-section v1-contact">
      <h2 className="v1-h">▸ CONTACT</h2>
      <div className="v1-contact-body">
        <div className="v1-contact-big">LET'S BUILD SOMETHING.</div>
        <div className="v1-contact-links">
          <a href={`mailto:${d.identity.email}`} className="v1-contact-link">{d.identity.email}</a>
          <a href={`https://${d.identity.github}`} target="_blank" rel="noreferrer" className="v1-contact-link">{d.identity.github} ↗</a>
        </div>
      </div>
    </section>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showCertificates": true,
  "certificatesTitle": "CERTIFICATES",
  "certificatesPosition": "after-projects"
}/*EDITMODE-END*/;

function findProjectById(d, id) {
  if (!id) return null;
  const all = (d.experience || []).flatMap(x => x.projects || []);
  return all.find(p => p.id === id) || null;
}
function projectFromHash(d) {
  const m = (typeof location !== 'undefined' ? location.hash : '').match(/(?:^|#|&)project=([^&]+)/);
  return m ? findProjectById(d, decodeURIComponent(m[1])) : null;
}

function V1RawGrid() {
  const d = window.RESUME_DATA;
  const [openProject, setOpenProjectState] = React.useState(() => projectFromHash(d));
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    // Deep-linked hash? Inject a clean base entry beneath so 'back' closes
    // the view instead of leaving the site.
    if (location.hash) {
      const h = location.hash;
      history.replaceState(history.state, '', location.pathname + location.search);
      history.pushState(null, '', h);
    }
    const onPop = () => setOpenProjectState(projectFromHash(d));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [d]);

  React.useEffect(() => { if (openProject) rootRef.current?.scrollTo({ top: 0, behavior: 'instant' }); }, [openProject]);

  const openProjectNav = (p) => {
    history.pushState(null, '', `#project=${encodeURIComponent(p.id)}`);
    setOpenProjectState(p);
  };
  const closeProjectNav = () => history.back();

  const certs = t.showCertificates ? <V1Certificates title={t.certificatesTitle} items={d.certificates} /> : null;

  return (
    <div ref={rootRef} className="v1-root">
      <div className="v1-marquee">
        <div className="v1-marquee-track">
          {Array.from({length: 10}).map((_, i) => (
            <span key={i}>DONALD TSANG · RIT CS · AI &amp; DATA · PORTFOLIO 2026 · </span>
          ))}
        </div>
      </div>

      {openProject ? (
        <div className="v1-shell">
          <ProjectDetail project={openProject} variant="v1" onBack={closeProjectNav} />
        </div>
      ) : (
        <div className="v1-shell">
          <V1Identity d={d} />
          <V1Education d={d} />
          {t.certificatesPosition === 'after-education' && certs}
          <V1Experience d={d} onOpen={openProjectNav} />
          {t.certificatesPosition === 'after-experience' && certs}
          <V1Projects d={d} />
          {t.certificatesPosition === 'after-projects' && certs}
          <V1Skills d={d} />
          {t.certificatesPosition === 'after-skills' && certs}
          <V1Contact d={d} />
        </div>
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Certificates section" />
        <TweakToggle
          label="Show certificates"
          value={t.showCertificates}
          onChange={(v) => setTweak('showCertificates', v)}
        />
        <TweakText
          label="Section title"
          value={t.certificatesTitle}
          placeholder="CERTIFICATES"
          onChange={(v) => setTweak('certificatesTitle', v)}
        />
        <TweakRadio
          label="Position"
          value={t.certificatesPosition}
          options={['after-education', 'after-experience', 'after-projects', 'after-skills']}
          onChange={(v) => setTweak('certificatesPosition', v)}
        />
      </TweaksPanel>
    </div>
  );
}

window.V1RawGrid = V1RawGrid;
