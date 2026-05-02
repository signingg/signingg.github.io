// Shared data — resume-aligned. Keep sections matching the resume exactly.
window.RESUME_DATA = {
  identity: {
    name: 'Donald Tsang',
    tagline: 'CS undergrad @ RIT · focused on AI & Data',
    phone: '(929) 280-9977',
    email: 'donald@taishan.com',
    github: 'github.com/signingg',
    location: 'Rochester, NY',
    objective: 'Computer Science B.S. candidate seeking Summer 2026 computer science internships.',
  },

  education: {
    school: 'Rochester Institute of Technology',
    where: 'Rochester, NY',
    degree: 'Bachelor of Science in Computer Science',
    graduation: 'Expected Spring 2028',
    gpa: '3.1',
    coursework: [
      'Computer Science for AP Students',
      'Principles of Data Management',
      'Web & Mobile I & II',
      'Mechanics of Programming',
      'Intro to Software Engineering',
      'Concepts of Parallel and Distributed Systems',
      'Concepts of Computer Systems',
      'CS Theory',
    ],
  },

  skills: {
    'Programming Languages': ['Java', 'PHP', 'TypeScript', 'JavaScript', 'C', 'C#', 'Assembly', 'Python', 'SQL'],
    'Web & Backend Frameworks': ['Angular', 'Spring Boot', 'Node.js'],
    'Databases': ['PostgreSQL', 'MySQL'],
    'DevOps & Tools': ['Git', 'Docker', 'Maven', 'Make', 'Valgrind', 'SonarQube', 'Pandas', 'Matplotlib', 'XAMPP', 'Postman', 'FileZilla', 'MobaXterm', 'Claude Cowork', 'Claude Code', 'Claude Chat', 'CodeX', 'GitHub Copilot', 'Visual Studio Code', 'PhpStorm', 'IntelliJ IDEA'],
  },

  experience: [
    {
      id: 'freelance',
      role: 'Freelance Software Developer',
      org: 'Self-employed · PocketMine-MP',
      dates: '2021 — 2023',
      featured: true,
      bullets: [
        'Initiated freelance development during high school using the PocketMine-MP API; completed client commissions spanning plugin development, user interaction systems, and data management for Minecraft: Pocket Edition servers.',
        'Translated client requirements into technical specifications; iteratively developed and tested features across commission cycles while resolving performance and gameplay issues.',
        'Debugged and refined persistent data systems using YAML, JSON, and SQL to ensure reliable storage across player sessions and server restarts.',
        'Generated $1.2K in net profit across commissions, serving at least 3 clients with repeat engagements through consistent delivery and technical reliability.',
      ],
      reflection:
        "This wasn't full-on professional experience, but the prolonged development cycles gave me early, practical exposure to topics I'd later meet academically: race conditions, software process, data persistence, event-driven architecture, and more. It's where I learned that shipping is a loop, not an event.",
      projects: [
        {
          id: 'signshop',
          name: 'SignShop',
          kicker: 'PocketMine-MP 3.x commission · 2021',
          tag: 'In-world sign-based shop plugin',
          clips: [
            { label: '01 · Buy Sign',           src: 'media/signshop/01-buy-sign.mp4' },
            { label: '02 · Sell Sign',          src: 'media/signshop/02-sell-sign.mp4' },
            { label: '03 · Sell All Sign',      src: 'media/signshop/03-sell-all-sign.mp4' },
            { label: '04 · Server-Wide Boost',  src: 'media/signshop/04-server-wide-boost.mp4' },
          ],
          clipsNote: "The clips below are simple walk-throughs — they don't showcase the plugin's full functionality.",
          story: [
            {
              h: 'The brief',
              p: "A live Minecraft Bedrock server operator needed a faster way for players to trade raw materials in bulk — shops placed anywhere in the world via ordinary signs, no menu navigation, no chest-UI indirection. A specific prior failure was on the table: a competing plugin had been installed, the server restarted, and every placed shop sign had vanished because the plugin's persistence had been wiped on reload. \"Where does the data actually live\" was not a theoretical question. A database-backed design was initially on the table and was deliberately rejected after pushback — it would have introduced schema migrations, a connection pool, and an orphaned-record class of failures for what was structurally a set of self-describing records placed in the world.",
            },
            {
              h: 'The bet',
              p: 'Build the system around a data-management choice that eliminated an entire class of plugin-side staleness failures: make every shop sign its own self-describing record, embedded directly in the world\'s own save file. On top of that, layer a timed server-wide sell-multiplier system for promotional events — and make sure the multiplier state survived logout, crash, and rejoin without drift.',
            },
            {
              h: 'Data persistence',
              p: "Rather than maintaining a separate database of (world, coordinates) → (item, price) records, each shop sign rewrites itself as a custom tile subclass at creation time, with the shop's type, item, and price written into the tile's own persisted metadata. The world save is the persistence layer — tiles deserialize with the world chunk, shops are immediately interactive on server boot, and there's no orphaned-record cleanup path because orphaned records can't exist. The plugin's only side-tables are a small config file for cosmetic item-name overrides and a per-player file for active boost state (expiration timestamp + multiplier amount).",
            },
            {
              h: 'Event listening',
              p: "The plugin is event-driven end to end. Player-interact events handle every sign tap, gated by a per-player cooldown to prevent rapid-click exploits. Player-join events reconcile active boosts against wall-clock time: if the boost expired while the player was offline, it's cleared and the player is messaged; if it's still active, the booster task is rescheduled with the remaining time. A repeating scheduled task expires boosts in real time during active sessions. Sign creation uses a per-player session pattern — an admin arms a session via a command, and the next plain sign they tap is consumed and rewrapped into the shop tile in a single transaction, with parallel session types kept isolated so they can't collide on the same player.",
            },
            {
              h: 'Process',
              p: 'Shipped against a written spec and maintained on a long iteration loop with the operator. Cosmetic display names were made config-driven from day one so signs could be re-skinned without redeploys. Production bugs — most visibly a null-player crash in the boost-expiry task months after delivery — were diagnosed from stack traces forwarded from the live server and fixed inline. The "world tile is the record" architectural choice was validated over years of zero "signs disappeared after restart" reports, which was the exact failure mode the design was chosen to prevent.',
            },
            {
              h: 'Outcome',
              p: "Shipped alongside the auction-house work and has run on the operator's server since, with every placed shop sign surviving every restart the operator has put it through — the exact thing the architecture was designed to make impossible to break. Boost state survived logout and rejoin via on-disk storage plus the join-time reconciliation pass. The operator and their staff have added hundreds of shop signs over the years without editing a single config file. The long iteration loop produced a plugin that's still carrying the server's raw-material economy today.",
            },
          ],
        },
        {
          id: 'auctionhouse',
          name: 'Auction House',
          kicker: 'PocketMine-MP 3.x commission · 2021',
          tag: 'Listings + bidding system for a live player economy',
          clips: [
            { label: '01 · Cold Open',            src: 'media/auctionhouse/01-cold-open.mp4' },
            { label: '02 · Browse Flow',          src: 'media/auctionhouse/02-browse-flow.mp4' },
            { label: '03 · Player Scope Filter',  src: 'media/auctionhouse/03-player-scope-filter.mp4' },
            { label: '04 · Blacklist',            src: 'media/auctionhouse/04-blacklist.mp4' },
            { label: '05 · List Flow',            src: 'media/auctionhouse/05-list-flow.mp4' },
            { label: '06 · Discord Webhook',      src: 'media/auctionhouse/06-discord-webhook.mp4', still: 'media/auctionhouse/06-discord-webhook.png' },
          ],
          clipsNote: "The clips below are simple walk-throughs — they don't showcase the plugin's full functionality.",
          story: [
            {
              h: 'The brief',
              p: "A game-server operator running a player-driven economy needed a custom listings and bidding system for a production multiplayer environment. Off-the-shelf options were brittle under load, but the real blockers were architectural: none of them had a persistence or recovery story that could survive what a real production server throws at a plugin — mid-transaction crashes, rename events where the stable identity is a UUID but the display name isn't, disconnects mid-interaction, wallets that can't cover a transaction, items that have nowhere to return to because the destination inventory is full.",
            },
            {
              h: 'The bet',
              p: 'Design the plugin around three concerns from the start: persistence that survives restart, crash, and rename without losing player wealth; a reactive event-driven architecture that handles client state correctly across every disconnect boundary; and a deployment process where the operator could QA on live users, feed bugs back, and see each round land without an engineering redeploy cycle.',
            },
            {
              h: 'Data persistence',
              p: "Each player's state got its own on-disk record: active listings, a refund pool of outbid money waiting to be claimed, and a rewards pool of items won — all serialized in a deterministic format on logout and on plugin disable, reloaded on the next interaction. Every listing also got a unique identifier written onto every item copy the UI rendered, as metadata attached to the item stack itself. That meant any clicked item at any point in any menu could be resolved back to its source listing — the identity round-trip survived crashes, restarts, and rename events, without needing a separate lookup table in sync.",
            },
            {
              h: 'Event listening',
              p: "Everything was driven by the game's native event model. Inventory transaction events handled every click and dispatched to the right menu flow. Player-join events reconciled persisted state — whose listings are still live? whose refunds are waiting? — on rejoin. Block-place events registered physical in-world billboards. Each live UI ran a repeating update task that observed window state, refreshed countdown timers, and self-cancelled cleanly when the player closed the window or disconnected. Rejection paths — insufficient funds, blacklisted items, permission failures — were each wired to the same close-and-recover pattern so no item ever vanished into a stuck inventory state.",
            },
            {
              h: 'Process',
              p: 'Built for iteration from the start. Fees, blacklists, rank-tiered permissions, webhook destinations, and duration caps all lived in config, meaning the operator could tune production behavior without a redeploy. Live QA drove rewrites — the largest being an optimization pass that moved every UI off a flickery form-based path onto chest inventories with sub-2-second live refresh. Each production bug that came back (crash-recovery edge cases, fee-vs-wallet interactions, enforcement corner cases) was folded back into the recovery model as a tightened path or an exposed knob.',
            },
            {
              h: 'Outcome',
              p: 'Shipped to live production and has run on the same server continuously since. Player wealth has survived crash recovery, server updates, and rename events on the back of the on-disk plus tagged-identity persistence model. The config-driven surface meant the operator could tune fees, blacklists, and permissions without engineering support. The production feedback loop — bug report, recovery-path tightening, ship, next report — kept the plugin production-grade years past the original delivery date.',
            },
          ],
        },
      ],
    },
    {
      id: 'fintech',
      role: 'FinTech Focus Program',
      org: 'Giant Machines',
      dates: 'Summer 2023',
      featured: false,
      bullets: [
        'Selected from a competitive national applicant pool for a fintech-focused summer program designed to introduce students to real-world software engineering and financial systems.',
        'Led portions of development using Python and JavaScript across 2 prototype applications; supported peers in understanding core technical concepts and kept the team aligned on implementation details.',
        'Delivered 2 functional prototypes and a final presentation within a 2-week intensive program, contributing to peer mentorship and overall team performance throughout.',
      ],
    },
  ],

  certificates: [
    {
      name: 'Claude 101',
      issuer: 'Anthropic',
      date: 'May 2026',
      certNo: 'g3q3bbg7it6q',
      verify: 'https://verify.skilljar.com/c/g3q3bbg7it6q',
      thumb: 'media/certs/claude-101.png',
      pdf: 'media/certs/claude-101.pdf',
    },
    {
      name: 'Introduction to Claude Cowork',
      issuer: 'Anthropic',
      date: 'May 2026',
      certNo: '8y8kde8igtfu',
      verify: 'https://verify.skilljar.com/c/8y8kde8igtfu',
      thumb: 'media/certs/claude-cowork.png',
      pdf: 'media/certs/claude-cowork.pdf',
    },
    {
      name: 'Introduction to Subagents',
      issuer: 'Anthropic',
      date: 'May 2026',
      certNo: 'my5y6t48m6bm',
      verify: 'https://verify.skilljar.com/c/my5y6t48m6bm',
      thumb: 'media/certs/claude-subagents.png',
      pdf: 'media/certs/claude-subagents.pdf',
    },
    {
      name: 'Claude Code 101',
      issuer: 'Anthropic',
      date: 'May 2026',
      certNo: 'dkmsuggdvmyi',
      verify: 'https://verify.skilljar.com/c/dkmsuggdvmyi',
      thumb: 'media/certs/claude-code-101.png',
      pdf: 'media/certs/claude-code-101.pdf',
    },
  ],

  projects: [
    { name: 'ASL Calculator', stack: [], dates: 'Summer 2026', stub: true,
      teaser: 'Computer-vision sign-language → arithmetic, end-to-end.',
      bullets: [],
    },
    { name: 'House Price Predictor', stack: [], dates: 'Summer 2026', stub: true,
      teaser: 'Regression model practice.',
      bullets: [],
    },
    { name: 'AI-Augmented Scripting & Automations', stack: [], dates: 'Summer 2026', stub: true,
      teaser: 'A working library of LLM-driven CLIs for the day-to-day grind.',
      bullets: [],
    },
    { name: 'Secure Distributed Messenger', stack: ['C#', '.NET', 'Docker', 'Git'], dates: 'Spring 2026',
      bullets: [
        'Responsible for the multi-threaded architecture of a secure messaging application built by a 4-person team (majority Deaf/HoH members); engineered separate background tasks for accepting connections and receiving messages per client, while keeping the main thread dedicated to user input and clean thread shutdown.',
        'Refactored the architecture from a central relay to a peer-to-peer model in Sprint 3.',
        'Established file-based message history with load-on-startup behavior and a /history command, ensuring chat logs persisted locally across application runs.',
      ],
    },
    { name: 'Arithmetic Expression Interpreter', stack: ['C', 'Valgrind', 'Make'], dates: 'Fall 2025',
      bullets: [
        'Assigned as a solo project in Mechanics of Programming to build a complete postfix arithmetic interpreter from scratch; developed a REPL-based program in C supporting integer variables, arithmetic operators, assignment, and ternary expressions.',
        'Required to correctly parse postfix notation into an evaluable structure; assembled a tokenizer, recursive parser, and Abstract Syntax Tree (AST) with proper handling of operator precedence, associativity, and the multi-child ternary node structure.',
        'Constructed dynamic memory routines for all stack nodes, tree nodes, and symbol table entries, freeing all heap allocations after each expression to prevent accumulation across the read-eval-print loop.',
        'Applied Valgrind-guided debugging across all test inputs, achieving zero memory errors and zero leaks on every test case; earned full marks on stack implementation, symbol table correctness, and style and documentation.',
      ],
    },
    { name: 'Dreaming Doggies U-Fund Platform (MVP)', stack: ['Java', 'Angular', 'Spring Boot', 'Docker', 'SonarQube', 'Node.js', 'Git'], dates: 'Fall 2025',
      bullets: [
        'Tasked with delivering a nonprofit funding platform for a dog rescue organization in a 5-person Agile Scrum team over a semester; produced an MVP supporting complete helper and admin workflows, presented as a final product demo to the class.',
        "Helped configure role-based login logic distinguishing helpers from the admin account and persist all application state — needs, funding baskets, and user data — via JSON file-based storage, ensuring session continuity while satisfying the product owner's no-database constraint.",
        'Containerized services with Docker, enforced code standards via SonarQube, and assisted in shipping approved feature enhancements including an AI chatbot and donor board.',
      ],
    },
    { name: 'Database-Driven Movie Application', stack: ['Python', 'Java', 'PostgreSQL', 'Pandas', 'Matplotlib', 'Git'], dates: 'Spring 2025',
      bullets: [
        'Tasked with designing the data model for a semester-long database course project modeling a scaled-down streaming platform in a 5-person team; assisted in developing a 3NF-normalized relational schema across 16 tables covering movies, cast, studios, genres, users, collections, watch sessions, and social follows.',
        'Required to populate the database with sufficient data for complex analytical queries; contributed to Python ETL pipelines using Pandas and psycopg2 to clean, transform, and load a Kaggle Netflix dataset into PostgreSQL.',
        'Supported delivery of a Java console application with movie search, watch logging, ratings, collections, and a recommendation engine built on similar-user analysis; SQL index optimizations across 5 key columns reduced query execution times by up to 450x over thousands of database rows.',
      ],
    },
  ],
};
