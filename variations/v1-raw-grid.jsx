// Variation 1 — RAW GRID
// Newsprint cream bg, electric blue accent + hot red, bordered block grid,
// everything orthogonal. Classic neo-brutalist grid.

function V1Identity({ d }) {
  return (
    <div className="v1-identity">
      <div className="v1-id-main">
        <div className="v1-id-meta">PORTFOLIO / 2026 / v1.RAW</div>
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
          <div key={i} className="v1-projrow">
            <div className="v1-projrow-head">
              <div className="v1-projrow-n">{p.name}</div>
              <div className="v1-projrow-d">{p.dates}</div>
            </div>
            <div className="v1-projrow-stack">
              {p.stack.map(s => <span key={s} className="v1-chip v1-chip-alt">{s}</span>)}
            </div>
            <ul className="v1-projrow-bullets">
              {p.bullets.map((b, j) => <li key={j}>{strip(b)}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function V1Certificates({ title }) {
  // Stubbed — no real certs yet. Three empty placeholder cards so the layout
  // reads as intentional and the shape is obvious when real content lands.
  const stubs = [
    { slot: 'CERT · 01' },
    { slot: 'CERT · 02' },
    { slot: 'CERT · 03' },
  ];
  return (
    <section className="v1-section">
      <h2 className="v1-h">▸ {title || 'CERTIFICATES'}</h2>
      <div className="v1-certs-note">
        <span className="v1-certs-note-tag">STUB</span>
        placeholder — content to be added
      </div>
      <div className="v1-certs-grid">
        {stubs.map((s, i) => (
          <div key={i} className="v1-cert-card">
            <div className="v1-cert-slot">{s.slot}</div>
            <div className="v1-cert-body">
              <div className="v1-cert-line v1-cert-line-1" />
              <div className="v1-cert-line v1-cert-line-2" />
              <div className="v1-cert-line v1-cert-line-3" />
            </div>
            <div className="v1-cert-foot">ISSUER · DATE</div>
          </div>
        ))}
      </div>
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

function V1RawGrid() {
  const d = window.RESUME_DATA;
  const [openProject, setOpenProject] = React.useState(null);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const rootRef = React.useRef(null);
  React.useEffect(() => { if (openProject) rootRef.current?.scrollTo({ top: 0, behavior: 'instant' }); }, [openProject]);

  const certs = t.showCertificates ? <V1Certificates title={t.certificatesTitle} /> : null;

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
          <ProjectDetail project={openProject} variant="v1" onBack={() => setOpenProject(null)} />
        </div>
      ) : (
        <div className="v1-shell">
          <V1Identity d={d} />
          <V1Education d={d} />
          {t.certificatesPosition === 'after-education' && certs}
          <V1Experience d={d} onOpen={setOpenProject} />
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
