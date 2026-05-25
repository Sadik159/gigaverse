/* ============================================================
   GIGVERSE — Application Logic
   ============================================================ */

'use strict';

// ── State Management ──
const GV = {
  state: {
    currentPage: 'home',
    currentRole: 'worker', // 'worker' | 'client'
    isLoggedIn: false,
    user: null,
    emergencyMode: false,
    workers: [],
    teams: [],
    notifications: [],
    chat: { open: false, activeContact: null, messages: [] },
  },
  listeners: {},
  on(event, cb) { (this.listeners[event] = this.listeners[event] || []).push(cb); },
  emit(event, data) { (this.listeners[event] || []).forEach(cb => cb(data)); },
};

// ── Data Layer ──
const DB = {
  workers: [
    {
      id: 1, name: 'Arjun Mehta', initials: 'AM',
      title: 'YouTube & Reels Editor', online: true, emergencyReady: true,
      location: 'Mumbai', rating: 4.9, reviews: 142,
      skills: ['YouTube Editing', 'Reels', 'TikTok', 'Thumbnails'],
      badges: ['viral_shorts', 'thumbnail_expert', 'reels_growth'],
      proofScore: { skill: 92, quality: 88, engagement: 94, professionalism: 90 },
      pricing: { hourly: 850, project: 4500, monthly: 15000 },
      aiSuggestedPrice: { hourly: 900, project: 4800, monthly: 16000 },
      portfolioLinks: ['youtube.com/c/arjun', 'behance.net/arjun'],
      bio: 'Viral short-form content specialist with 3+ years crafting high-retention Reels and YouTube Shorts.',
      matchScore: 94,
    },
    {
      id: 2, name: 'Priya Sharma', initials: 'PS',
      title: 'WhatsApp & Telegram Community Manager', online: true, emergencyReady: false,
      location: 'Delhi', rating: 4.8, reviews: 89,
      skills: ['WhatsApp Groups', 'Telegram', 'Community Management', 'Broadcast Setup'],
      badges: ['community_architect', 'wa_tg_handler'],
      proofScore: { skill: 88, quality: 85, engagement: 91, professionalism: 95 },
      pricing: { hourly: 600, project: 3000, monthly: 12000 },
      aiSuggestedPrice: { hourly: 650, project: 3200, monthly: 12500 },
      portfolioLinks: ['linkedin.com/priya'],
      bio: 'Expert in building and managing large-scale WhatsApp and Telegram communities for brands.',
      matchScore: 87,
    },
    {
      id: 3, name: 'Rahul Dev', initials: 'RD',
      title: 'Discord & Livestream Moderator', online: false, emergencyReady: true,
      location: 'Bangalore', rating: 4.7, reviews: 67,
      skills: ['Discord Moderation', 'Livestream', 'Crisis Management', 'Engagement'],
      badges: ['discord_growth', 'livestream_mod', 'meme_strategist'],
      proofScore: { skill: 85, quality: 83, engagement: 88, professionalism: 87 },
      pricing: { hourly: 700, project: 3500, monthly: 13000 },
      aiSuggestedPrice: { hourly: 720, project: 3600, monthly: 13500 },
      portfolioLinks: ['discord.gg/rahul'],
      bio: 'Professional Discord moderator and crisis manager with experience managing 50K+ member servers.',
      matchScore: 81,
    },
    {
      id: 4, name: 'Sneha Kapoor', initials: 'SK',
      title: 'Social Media & Content Manager', online: true, emergencyReady: false,
      location: 'Pune', rating: 4.95, reviews: 201,
      skills: ['Social Media', 'Content Strategy', 'Instagram', 'WhatsApp Marketing'],
      badges: ['ai_prompt_eng', 'viral_shorts', 'reels_growth'],
      proofScore: { skill: 96, quality: 94, engagement: 97, professionalism: 98 },
      pricing: { hourly: 1200, project: 7000, monthly: 25000 },
      aiSuggestedPrice: { hourly: 1300, project: 7500, monthly: 27000 },
      portfolioLinks: ['instagram.com/sneha', 'behance.net/sneha'],
      bio: 'Award-winning content strategist specializing in viral social media campaigns across all platforms.',
      matchScore: 97,
    },
    {
      id: 5, name: 'Kiran Patel', initials: 'KP',
      title: 'Photo & Thumbnail Designer', online: true, emergencyReady: true,
      location: 'Ahmedabad', rating: 4.6, reviews: 53,
      skills: ['Photo Editing', 'Thumbnails', 'Graphic Design', 'Figma'],
      badges: ['thumbnail_expert'],
      proofScore: { skill: 82, quality: 89, engagement: 75, professionalism: 84 },
      pricing: { hourly: 500, project: 2500, monthly: 9000 },
      aiSuggestedPrice: { hourly: 520, project: 2600, monthly: 9500 },
      portfolioLinks: ['figma.com/kiran', 'behance.net/kiran'],
      bio: 'Creative thumbnail and photo editing specialist with a knack for eye-catching visuals.',
      matchScore: 74,
    },
    {
      id: 6, name: 'Aditya Nair', initials: 'AN',
      title: 'AI Prompt Engineer & Automation', online: false, emergencyReady: false,
      location: 'Hyderabad', rating: 4.85, reviews: 116,
      skills: ['AI Prompting', 'Automation', 'ChatGPT', 'Content AI'],
      badges: ['ai_prompt_eng', 'meme_strategist'],
      proofScore: { skill: 94, quality: 91, engagement: 89, professionalism: 93 },
      pricing: { hourly: 1500, project: 8000, monthly: 30000 },
      aiSuggestedPrice: { hourly: 1600, project: 8500, monthly: 32000 },
      portfolioLinks: ['github.com/aditya'],
      bio: 'Specialist in AI workflow automation, prompt engineering, and content generation at scale.',
      matchScore: 89,
    },
  ],

  teams: [
    {
      id: 1, name: 'Shorts Squad', emoji: '🎬',
      description: 'Full-stack short-form content team: scripting, editing, thumbnails, publishing.',
      members: [
        { name: 'Arjun M', role: 'Editor', initials: 'AM', color: '#5B21B6' },
        { name: 'Kiran P', role: 'Thumbnail Designer', initials: 'KP', color: '#7C3AED' },
        { name: 'Sneha K', role: 'Content Strategist', initials: 'SK', color: '#A78BFA' },
        { name: 'Dev R', role: 'Script Writer', initials: 'DR', color: '#4F46E5' },
      ],
      badges: ['viral_shorts', 'thumbnail_expert', 'reels_growth'],
      pricing: { hourly: 3200, project: 18000, monthly: 55000 },
      proofScore: 93, emergencyReady: true, rating: 4.95, reviews: 38,
    },
    {
      id: 2, name: 'Discord Guardians', emoji: '🛡️',
      description: 'Elite Discord moderation team available 24/7 for communities of all sizes.',
      members: [
        { name: 'Rahul D', role: 'Lead Moderator', initials: 'RD', color: '#1D4ED8' },
        { name: 'Priya S', role: 'Community Manager', initials: 'PS', color: '#3B82F6' },
        { name: 'Arun K', role: 'Livestream Producer', initials: 'AK', color: '#60A5FA' },
      ],
      badges: ['discord_growth', 'livestream_mod', 'community_architect'],
      pricing: { hourly: 2000, project: 12000, monthly: 38000 },
      proofScore: 88, emergencyReady: true, rating: 4.8, reviews: 24,
    },
    {
      id: 3, name: 'WA/TG Community Architects', emoji: '📱',
      description: 'Specialists in building and managing WhatsApp & Telegram brand communities.',
      members: [
        { name: 'Priya S', role: 'WA/TG Handler', initials: 'PS', color: '#059669' },
        { name: 'Meera J', role: 'Broadcast Specialist', initials: 'MJ', color: '#10B981' },
        { name: 'Raj V', role: 'Engagement Manager', initials: 'RV', color: '#6EE7B7' },
      ],
      badges: ['community_architect', 'wa_tg_handler'],
      pricing: { hourly: 1800, project: 10000, monthly: 32000 },
      proofScore: 86, emergencyReady: false, rating: 4.75, reviews: 19,
    },
  ],

  managedServices: [
    { id: 1, title: 'YouTube Channel Management', price: 15000, period: '/month', worker: 'Arjun Mehta', includes: ['Daily uploads', 'Thumbnail design', 'Community posts', 'Analytics report'], badge: 'viral_shorts' },
    { id: 2, title: 'Discord Server Moderation', price: 8000, period: '/month', worker: 'Rahul Dev', includes: ['24/7 moderation', 'Automod setup', 'Event coordination', 'Weekly reports'], badge: 'discord_growth' },
    { id: 3, title: 'Social Media Management', price: 25000, period: '/month', worker: 'Sneha Kapoor', includes: ['All platforms', 'Daily posting', 'Engagement', 'Reels production', 'Strategy'], badge: 'reels_growth' },
    { id: 4, title: 'WhatsApp Community Management', price: 12000, period: '/month', worker: 'Priya Sharma', includes: ['Group management', 'Broadcast setup', 'Customer handling', 'Lead nurturing'], badge: 'community_architect' },
  ],

  badgeMeta: {
    viral_shorts:       { label: 'Viral Shorts Editor',    icon: '🎬', color: 'purple' },
    thumbnail_expert:   { label: 'Thumbnail Expert',        icon: '🖼️', color: 'orange' },
    reels_growth:       { label: 'Reels Growth Specialist', icon: '📈', color: 'pink' },
    community_architect:{ label: 'Community Architect',     icon: '🏛️', color: 'blue' },
    wa_tg_handler:      { label: 'WA/TG Handler',           icon: '💬', color: 'green' },
    discord_growth:     { label: 'Discord Growth Expert',   icon: '🛡️', color: 'blue' },
    livestream_mod:     { label: 'Livestream Moderator',    icon: '🎙️', color: 'red' },
    meme_strategist:    { label: 'Meme Strategist',         icon: '😂', color: 'orange' },
    ai_prompt_eng:      { label: 'AI Prompt Engineer',      icon: '🤖', color: 'purple' },
  },
};

// ── Helpers ──
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const fmt = n => '₹' + n.toLocaleString('en-IN');
const sleep = ms => new Promise(r => setTimeout(r, ms));

function renderBadges(badgeKeys, max = 4) {
  return badgeKeys.slice(0, max).map(key => {
    const b = DB.badgeMeta[key];
    if (!b) return '';
    return `<div class="ai-badge-icon ${b.color}" title="${b.label}">
      ${b.icon}
      <div class="tooltip">${b.label}</div>
    </div>`;
  }).join('');
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '';
  for (let i = 0; i < full; i++) s += '★';
  if (half) s += '½';
  return `<span style="color:#F59E0B;font-size:0.85rem">${s}</span> <span class="text-sm text-muted">${rating}</span>`;
}

function renderProofScoreCard(ps) {
  const scores = [
    { label: 'Skill Score', val: ps.skill },
    { label: 'Quality Score', val: ps.quality },
    { label: 'Engagement', val: ps.engagement },
    { label: 'Professionalism', val: ps.professionalism },
  ];
  return `<div class="proof-score-card">
    <div class="flex items-center gap-2 mb-3">
      <span style="font-size:1rem">🔍</span>
      <span class="font-semibold text-sm" style="color:var(--primary)">Proof-Based Hiring Score</span>
    </div>
    ${scores.map(s => `
      <div style="margin-bottom:10px">
        <div class="flex justify-between">
          <span class="score-label">${s.label}</span>
          <span class="score-value">${s.val}/100</span>
        </div>
        <div class="score-bar"><div class="score-fill" style="width:${s.val}%"></div></div>
      </div>
    `).join('')}
  </div>`;
}

// ── Toast Notifications ──
const Toast = {
  container: null,
  init() { this.container = document.getElementById('toastContainer'); },
  show(msg, type = 'default', icon = '✦') {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span style="font-size:1.1rem">${icon}</span><span>${msg}</span>`;
    this.container.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 400);
    }, 3800);
  },
  success(msg) { this.show(msg, 'success', '✅'); },
  error(msg) { this.show(msg, 'error', '❌'); },
  info(msg) { this.show(msg, '', '💡'); },
};

// ── Confetti ──
function launchConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#5B21B6','#7C3AED','#A78BFA','#F59E0B','#10B981','#EC4899','#3B82F6'];
  for (let i = 0; i < 80; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `
      left: ${Math.random() * 100}vw;
      top: -10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-delay: ${Math.random() * 1.5}s;
      animation-duration: ${2 + Math.random() * 2}s;
    `;
    container.appendChild(p);
    setTimeout(() => p.remove(), 5000);
  }
}

// ── Modal System ──
const Modal = {
  open(id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.add('active');
  },
  close(id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.remove('active');
  },
  closeAll() {
    $$('.modal-overlay').forEach(o => o.classList.remove('active'));
  },
};

// ── Skeleton Loader ──
function showSkeleton(container, count = 3) {
  container.innerHTML = Array(count).fill(0).map(() => `
    <div style="padding:24px;background:white;border-radius:20px;border:1px solid #EDE9FE">
      <div class="flex gap-3 items-center">
        <div class="skeleton skeleton-avatar"></div>
        <div style="flex:1">
          <div class="skeleton skeleton-text" style="width:60%;height:16px"></div>
          <div class="skeleton skeleton-text w-3/4" style="height:12px;margin-top:6px"></div>
        </div>
      </div>
      <div class="skeleton skeleton-text" style="width:100%;height:12px;margin-top:16px"></div>
      <div class="skeleton skeleton-text w-3/4" style="height:12px"></div>
      <div class="skeleton skeleton-card" style="height:80px;margin-top:12px"></div>
    </div>
  `).join('');
}

// ── Worker Card Renderer ──
function renderWorkerCard(w, compact = false) {
  const urgentRate = Math.round(w.pricing.hourly * 1.5);
  return `
    <div class="worker-card animate-fade-in" onclick="openWorkerProfile(${w.id})">
      <div class="flex justify-between items-center" style="margin-bottom:14px">
        <div class="flex items-center gap-3">
          <div class="worker-avatar">
            ${w.initials}
            ${w.online ? '<div class="online-dot"></div>' : ''}
          </div>
          <div>
            <div class="worker-name">${w.name}</div>
            <div class="worker-title">${w.title}</div>
            <div style="margin-top:4px">${renderStars(w.rating)} <span class="text-muted text-xs">(${w.reviews})</span></div>
          </div>
        </div>
        <div class="three-dot-menu">
          <div class="three-dot-btn" onclick="event.stopPropagation();toggleDropdown('dd_${w.id}')">⋮</div>
          <div class="dropdown-menu" id="dd_${w.id}">
            <div class="dropdown-item" onclick="openChat(${w.id})">💬 Message</div>
            <div class="dropdown-item" onclick="openWorkerProfile(${w.id})">👤 View Profile</div>
            <div class="dropdown-item" onclick="hireWorker(${w.id})">⚡ Hire Now</div>
            <div class="dropdown-item" onclick="addToTeamModal(${w.id})">👥 Add to Team</div>
          </div>
        </div>
      </div>

      <div class="flex gap-2" style="flex-wrap:wrap;margin-bottom:12px">
        ${w.skills.slice(0,3).map(s => `<span class="badge-skill">${s}</span>`).join('')}
      </div>

      <div class="flex gap-2 items-center" style="margin-bottom:14px;flex-wrap:wrap">
        ${renderBadges(w.badges)}
        ${w.emergencyReady ? '<span class="badge badge-emergency badge-sm">⚡ Emergency Ready</span>' : ''}
      </div>

      <div class="flex justify-between items-end">
        <div>
          <div class="worker-rate">${fmt(w.pricing.hourly)}<span class="period">/hr</span></div>
          <div class="text-xs text-muted" style="margin-top:2px">AI suggested: ${fmt(w.aiSuggestedPrice.hourly)}/hr</div>
        </div>
        <div class="flex gap-2 items-center">
          ${w.matchScore >= 90 ? `<span class="match-score-badge">🎯 ${w.matchScore}% match</span>` : ''}
          <span class="badge ${w.online ? 'badge-success' : ''}" style="${!w.online ? 'background:#F9FAFB;color:#9CA3AF;border:1px solid #E5E7EB' : ''} font-size:0.72rem;padding:3px 8px">
            ${w.online ? '● Online' : '○ Offline'}
          </span>
        </div>
      </div>

      ${GV.state.emergencyMode && w.emergencyReady ? `
        <div style="margin-top:12px;padding:10px;background:#FEF2F2;border-radius:10px;border:1px solid #FECACA">
          <div class="flex justify-between items-center">
            <span style="font-size:0.82rem;color:#DC2626;font-weight:600">⚡ Emergency Rate</span>
            <span style="font-family:var(--font-display);font-weight:800;color:#DC2626">${fmt(urgentRate)}/hr</span>
          </div>
          <div style="font-size:0.75rem;color:#9CA3AF;margin-top:2px">1.5x rush pricing • Available now</div>
        </div>
      ` : ''}
    </div>
  `;
}

// ── Team Card Renderer ──
function renderTeamCard(t) {
  return `
    <div class="team-card animate-fade-in" onclick="openTeamProfile(${t.id})">
      <div class="flex justify-between items-start" style="margin-bottom:16px">
        <div>
          <div style="font-size:1.8rem;margin-bottom:6px">${t.emoji}</div>
          <div class="font-semibold text-lg" style="font-family:var(--font-display);color:var(--primary-dark)">${t.name}</div>
          <div class="text-sm text-muted" style="margin-top:2px">${t.members.length} members</div>
        </div>
        ${t.emergencyReady ? '<span class="badge badge-emergency">⚡ Emergency Ready</span>' : ''}
      </div>

      <p class="text-sm text-muted" style="margin-bottom:16px;line-height:1.6">${t.description}</p>

      <div class="team-avatar-stack" style="margin-bottom:14px">
        ${t.members.map(m => `<div class="avatar" style="background:${m.color}" title="${m.name} — ${m.role}">${m.initials}</div>`).join('')}
        <div class="avatar" style="background:#E5E7EB;color:#6B7280;font-size:0.65rem">+${t.members.length}</div>
      </div>

      <div class="flex gap-2" style="flex-wrap:wrap;margin-bottom:14px">
        ${renderBadges(t.badges)}
      </div>

      <div class="proof-score-card" style="margin-bottom:16px;padding:12px">
        <div class="flex justify-between items-center">
          <span class="score-label">Team Proof Score</span>
          <span class="score-value">${t.proofScore}/100</span>
        </div>
        <div class="score-bar" style="margin-top:8px"><div class="score-fill" style="width:${t.proofScore}%"></div></div>
      </div>

      <div class="flex justify-between items-center">
        <div>
          <div class="worker-rate">${fmt(t.pricing.monthly)}<span class="period">/mo</span></div>
          <div class="text-xs text-muted">${fmt(t.pricing.hourly)}/hr • ${fmt(t.pricing.project)}/project</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();hireTeam(${t.id})">Hire Team</button>
      </div>
    </div>
  `;
}

// ── Page Renderers ──
function renderHomePage() {
  return `
    <!-- Hero -->
    <div class="hero">
      <div style="position:relative;z-index:1">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(167,139,250,0.2);color:#C4B5FD;padding:8px 18px;border-radius:9999px;font-size:0.82rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:24px;border:1px solid rgba(167,139,250,0.3)">
          ✦ World's First Niche Creator Gig Platform
        </div>
        <h1 class="hero-title">Post the work <span class="highlight">you want to do</span></h1>
        <p class="hero-subtitle">Find expert video editors, community managers, WhatsApp/Telegram handlers, Discord mods, and 50+ creator-economy roles.</p>

        <div class="search-bar" style="margin:36px auto 0;max-width:680px">
          <input type="text" placeholder="Search skills, e.g. YouTube Editor, Discord Mod, Telegram Handler..." id="heroSearch" />
          <select id="heroCategory">
            <option value="">All Categories</option>
            <option>Video Editing</option>
            <option>Community Management</option>
            <option>WhatsApp / Telegram</option>
            <option>Discord / Livestream</option>
            <option>Social Media</option>
            <option>Photo Editing</option>
            <option>AI & Automation</option>
          </select>
          <button class="search-btn" onclick="searchWorkers()">🔍 Search</button>
        </div>

        <div class="hero-actions">
          <button class="btn btn-primary btn-xl" onclick="navigateTo('workers')">
            🎯 Find Talent For Me
          </button>
          <button class="btn btn-emergency btn-xl" onclick="activateEmergencyMode()">
            ⚡ Need Someone In 10 Minutes
          </button>
          <button class="btn btn-xl" style="background:rgba(255,255,255,0.15);color:white;border:2px solid rgba(255,255,255,0.3);backdrop-filter:blur(10px)" onclick="navigateTo('teams')">
            👥 Browse Teams
          </button>
        </div>

        <div class="hero-stats">
          <div>
            <div class="hero-stat-number">12,400+</div>
            <div class="hero-stat-label">Verified Workers</div>
          </div>
          <div style="width:1px;background:rgba(255,255,255,0.15)"></div>
          <div>
            <div class="hero-stat-number">3,200+</div>
            <div class="hero-stat-label">Active Clients</div>
          </div>
          <div style="width:1px;background:rgba(255,255,255,0.15)"></div>
          <div>
            <div class="hero-stat-number">98%</div>
            <div class="hero-stat-label">Satisfaction Rate</div>
          </div>
          <div style="width:1px;background:rgba(255,255,255,0.15)"></div>
          <div>
            <div class="hero-stat-number">850+</div>
            <div class="hero-stat-label">Teams Available</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Ticker -->
    <div style="background:var(--lavender);padding:10px 0;border-bottom:1px solid var(--accent-soft)">
      <div class="live-ticker">
        <div class="ticker-inner" id="liveTicker">
          ${[
            '🎬 Arjun just completed a YouTube package for ₹18,000',
            '⚡ Emergency edit fulfilled in 8 minutes by Shorts Squad',
            '🏛️ WA Community: 5K members managed by Priya Sharma',
            '🤖 AI Verified: 3 new prompt engineers joined today',
            '💬 Telegram broadcast setup: 50K reach by ₹8,000/mo',
            '🎙️ Discord server moderation: 24/7 coverage hired',
            '📈 Sneha Kapoor got 6-month social media contract',
            '🔥 New team created: Content Creators Collective',
          ].map(i => `<div class="ticker-item"><div class="ticker-dot"></div>${i}</div>`).join('')}
          ${[
            '🎬 Arjun just completed a YouTube package for ₹18,000',
            '⚡ Emergency edit fulfilled in 8 minutes by Shorts Squad',
            '🏛️ WA Community: 5K members managed by Priya Sharma',
          ].map(i => `<div class="ticker-item"><div class="ticker-dot"></div>${i}</div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Feature Categories -->
    <div style="padding:64px 24px;max-width:1200px;margin:0 auto">
      <div class="section-header" style="text-align:center">
        <div class="section-tag">✦ Browse by Category</div>
        <h2 class="section-title">Every creator-economy role, in one place</h2>
        <p class="section-subtitle">From YouTube editors to WhatsApp community architects — find it all here</p>
      </div>

      <div class="grid grid-4 gap-4" style="margin-top:40px">
        ${[
          { icon:'🎬', label:'Video Editing', sub:'YouTube, Reels, TikTok, Shorts', count:2340 },
          { icon:'💬', label:'WhatsApp & Telegram', sub:'Groups, Broadcast, Community', count:1820 },
          { icon:'🛡️', label:'Discord & Moderation', sub:'Servers, Livestream, Events', count:960 },
          { icon:'📸', label:'Photo & Design', sub:'Thumbnails, Editing, Figma', count:1450 },
          { icon:'📱', label:'Social Media', sub:'Instagram, Twitter, LinkedIn', count:3100 },
          { icon:'🤖', label:'AI & Automation', sub:'Prompts, Bots, Workflows', count:780 },
          { icon:'🎙️', label:'Livestream & Events', sub:'Production, Moderation, Hosting', count:620 },
          { icon:'🔥', label:'Crisis Management', sub:'Reputation, PR, Emergency', count:340 },
        ].map((c, i) => `
          <div class="card card-body animate-fade-in delay-${(i%5)+1}" style="text-align:center;cursor:pointer" onclick="filterCategory('${c.label}')">
            <div style="font-size:2rem;margin-bottom:10px">${c.icon}</div>
            <div style="font-family:var(--font-display);font-weight:700;font-size:0.95rem;color:var(--primary-dark)">${c.label}</div>
            <div style="font-size:0.78rem;color:var(--grey-600);margin-top:4px">${c.sub}</div>
            <div style="margin-top:10px;font-size:0.75rem;font-weight:700;color:var(--primary)">${c.count.toLocaleString()} workers</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Top Workers Preview -->
    <div style="background:var(--grey-100);padding:64px 24px">
      <div style="max-width:1200px;margin:0 auto">
        <div class="flex justify-between items-end" style="margin-bottom:32px">
          <div>
            <div class="section-tag">✦ Top Rated</div>
            <h2 class="section-title">Featured Workers</h2>
          </div>
          <button class="btn btn-outline" onclick="navigateTo('workers')">View All →</button>
        </div>
        <div class="workers-grid">
          ${DB.workers.slice(0,3).map(w => renderWorkerCard(w)).join('')}
        </div>
      </div>
    </div>

    <!-- AI Features Showcase -->
    <div style="padding:64px 24px;max-width:1200px;margin:0 auto">
      <div class="section-header" style="text-align:center">
        <div class="section-tag">✦ AI-Powered</div>
        <h2 class="section-title">Built for the creator economy</h2>
      </div>
      <div class="grid grid-3 gap-6" style="margin-top:40px">
        ${[
          { icon:'🔍', title:'Proof-Based Hiring', desc:'AI scans portfolios from Drive, YouTube, Instagram & more — giving you real skill scores, not just claims.', color:'var(--primary)' },
          { icon:'🎯', title:'AI Price Suggestion', desc:'Smart pricing based on market demand, your portfolio strength, region & experience level. Always earn your worth.', color:'#059669' },
          { icon:'⚡', title:'Emergency Mode', desc:'Need a video editor in 10 minutes? Our emergency network shows online, ready workers with rush pricing instantly.', color:'#DC2626' },
          { icon:'🤖', title:'Find Me Clients', desc:'AI matches you to ideal clients, auto-sends personalized proposals, and predicts hiring probability.', color:'#D97706' },
          { icon:'🏛️', title:'Team Marketplace', desc:'Create or join teams, get AI-suggested team pricing, and offer packages clients can hire as a unit.', color:'#7C3AED' },
          { icon:'📋', title:'Managed Contracts', desc:'Offer monthly retainer services from ₹8,000/mo. Clients subscribe for stable, predictable ongoing work.', color:'#1D4ED8' },
        ].map(f => `
          <div class="card card-body">
            <div style="width:44px;height:44px;border-radius:12px;background:${f.color}15;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:14px">${f.icon}</div>
            <h3 style="font-family:var(--font-display);font-weight:700;margin-bottom:8px;color:var(--primary-dark)">${f.title}</h3>
            <p class="text-sm text-muted" style="line-height:1.7">${f.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- CTA Strip -->
    <div style="background:linear-gradient(135deg,var(--primary-dark),var(--primary));padding:60px 24px;text-align:center;color:white">
      <h2 style="font-family:var(--font-display);font-size:2.2rem;font-weight:800;margin-bottom:14px">Ready to join the gig economy?</h2>
      <p style="opacity:0.8;max-width:480px;margin:0 auto 28px">Post your skills, get AI-verified, and start earning in minutes. No traditional job board nonsense.</p>
      <div class="flex gap-4 justify-center flex-wrap">
        <button class="btn btn-xl" style="background:white;color:var(--primary);font-weight:700" onclick="openAuthModal('worker')">Post Your Skills →</button>
        <button class="btn btn-xl" style="background:rgba(255,255,255,0.15);color:white;border:2px solid rgba(255,255,255,0.3)" onclick="openAuthModal('client')">Hire Talent →</button>
      </div>
    </div>
  `;
}

function renderWorkersPage() {
  const query = GV.state.searchQuery || '';
  const cat = GV.state.searchCategory || '';
  let filtered = DB.workers.filter(w => {
    const q = query.toLowerCase();
    if (!q && !cat) return true;
    const matchQ = !q || w.name.toLowerCase().includes(q) || w.title.toLowerCase().includes(q) || w.skills.some(s => s.toLowerCase().includes(q));
    const matchC = !cat || w.skills.some(s => s.toLowerCase().includes(cat.toLowerCase())) || w.title.toLowerCase().includes(cat.toLowerCase());
    return matchQ && matchC;
  });

  if (GV.state.emergencyMode) {
    filtered = filtered.filter(w => w.emergencyReady && w.online);
  }

  return `
    ${GV.state.emergencyMode ? `
      <div class="emergency-banner" style="margin-bottom:24px;animation:emergency-glow 2s infinite">
        <div class="pulse-ring">⚡</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:1.05rem">Emergency Mode Active</div>
          <div style="opacity:0.8;font-size:0.85rem;margin-top:2px">Showing only online, emergency-ready workers • Rush rates apply (1.5x–2x)</div>
        </div>
        <div class="countdown" id="emergencyTimer">09:47</div>
        <button class="btn btn-sm" style="background:rgba(255,255,255,0.2);color:white" onclick="deactivateEmergencyMode()">Exit Emergency</button>
      </div>
    ` : ''}

    <div class="flex justify-between items-center" style="margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.6rem;color:var(--primary-dark)">
          ${GV.state.emergencyMode ? '⚡ Emergency-Ready Workers' : 'Browse Workers'}
        </h2>
        <p class="text-muted text-sm" style="margin-top:4px">${filtered.length} workers found${query ? ` for "${query}"` : ''}</p>
      </div>
      <div class="flex gap-3 items-center flex-wrap">
        <button class="btn btn-emergency btn-sm" onclick="activateEmergencyMode()">⚡ Emergency Mode</button>
        <button class="btn btn-primary btn-sm" onclick="findClientsForMe()">🤖 Find Me Clients</button>
        <select class="form-select" style="width:auto;padding:9px 14px" onchange="sortWorkers(this.value)">
          <option value="match">Best Match</option>
          <option value="rating">Top Rated</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>
      </div>
    </div>

    <!-- Filters -->
    <div style="margin-bottom:24px">
      <div class="filter-chips">
        ${['All','Video Editing','WhatsApp/Telegram','Discord','Social Media','AI & Automation','Emergency Ready','Online Now'].map(f => `
          <div class="chip ${f === 'All' ? 'active' : ''}" onclick="filterWorkers('${f}',this)">${f}</div>
        `).join('')}
      </div>
    </div>

    <!-- Workers Grid -->
    <div class="workers-grid" id="workersGrid">
      ${filtered.length ? filtered.map(w => renderWorkerCard(w)).join('') : `
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--grey-600)">
          <div style="font-size:3rem;margin-bottom:16px">🔍</div>
          <div style="font-family:var(--font-display);font-weight:700;font-size:1.2rem;margin-bottom:8px">No workers found</div>
          <p>Try different keywords or remove filters</p>
          <button class="btn btn-primary" style="margin-top:16px" onclick="clearFilters()">Clear Filters</button>
        </div>
      `}
    </div>

    <!-- Pagination -->
    ${filtered.length > 0 ? `
      <div class="flex justify-center gap-2" style="margin-top:40px">
        ${[1,2,3,4,5].map(p => `<button class="btn ${p===1?'btn-primary':'btn-ghost'}" style="width:40px;height:40px;padding:0;border-radius:10px">${p}</button>`).join('')}
        <button class="btn btn-ghost">→</button>
      </div>
    ` : ''}
  `;
}

function renderTeamsPage() {
  return `
    <div class="flex justify-between items-center" style="margin-bottom:32px;flex-wrap:wrap;gap:12px">
      <div>
        <div class="section-tag">✦ Team Marketplace</div>
        <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.8rem;color:var(--primary-dark)">Hire Entire Teams</h2>
        <p class="text-muted text-sm" style="margin-top:6px">Package deals, unified management, AI-verified team scores</p>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-outline" onclick="openCreateTeamModal()">+ Create Team</button>
        <button class="btn btn-primary" onclick="openJoinTeamModal()">👥 Join Team</button>
      </div>
    </div>

    <!-- Team Stats -->
    <div class="grid grid-4 gap-4" style="margin-bottom:32px">
      ${[
        { label:'Active Teams', val:'850+', icon:'👥' },
        { label:'Avg Team Rating', val:'4.82', icon:'⭐' },
        { label:'Emergency Teams', val:'120+', icon:'⚡' },
        { label:'Contracts Completed', val:'4,200+', icon:'✅' },
      ].map(s => `
        <div class="stat-card">
          <div style="font-size:1.5rem;margin-bottom:6px">${s.icon}</div>
          <div class="stat-number">${s.val}</div>
          <div class="stat-label">${s.label}</div>
        </div>
      `).join('')}
    </div>

    <!-- Teams Grid -->
    <div class="teams-grid">
      ${DB.teams.map(t => renderTeamCard(t)).join('')}
    </div>
  `;
}

function renderManagedServicesPage() {
  return `
    <div style="margin-bottom:32px">
      <div class="section-tag">✦ Monthly Retainers</div>
      <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.8rem;color:var(--primary-dark)">Managed Service Contracts</h2>
      <p class="text-muted" style="margin-top:8px">Subscribe to stable, ongoing services. Fixed monthly pricing, predictable output.</p>
    </div>

    <div class="grid grid-2 gap-6">
      ${DB.managedServices.map(m => {
        const b = DB.badgeMeta[m.badge];
        return `
          <div class="managed-card">
            <div class="flex justify-between items-start" style="margin-bottom:16px">
              <div>
                <div style="font-family:var(--font-display);font-weight:700;font-size:1.1rem;color:var(--primary-dark)">${m.title}</div>
                <div class="text-sm text-muted" style="margin-top:4px">by ${m.worker}</div>
              </div>
              ${b ? `<div class="ai-badge-icon ${b.color}">${b.icon}<div class="tooltip">${b.label}</div></div>` : ''}
            </div>

            <div style="margin-bottom:16px">
              <span class="managed-price">${fmt(m.price)}</span>
              <span class="managed-period">${m.period}</span>
            </div>

            <div style="margin-bottom:16px">
              ${m.includes.map(i => `
                <div class="flex items-center gap-2" style="margin-bottom:7px">
                  <span style="color:var(--success);font-size:0.9rem">✓</span>
                  <span class="text-sm">${i}</span>
                </div>
              `).join('')}
            </div>

            <div class="managed-duration-btns">
              <div class="duration-btn active" onclick="selectDuration(this,'1')">1 Month</div>
              <div class="duration-btn" onclick="selectDuration(this,'3')">3 Months</div>
              <div class="duration-btn" onclick="selectDuration(this,'6')">6 Months <span style="color:var(--success);font-size:0.7rem">Save 10%</span></div>
            </div>

            <button class="btn btn-primary w-full" style="margin-top:14px" onclick="subscribeManagedService(${m.id})">
              Subscribe Now
            </button>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderWorkerDashboard() {
  const user = { name: 'You', skills: ['YouTube Editing', 'Reels', 'Thumbnails'], badges: ['viral_shorts', 'thumbnail_expert'], pricing: { hourly: 850, project: 4500, monthly: 15000 }, aiSuggestedPrice: { hourly: 920, project: 4900, monthly: 16500 } };
  return `
    <div class="flex justify-between items-center" style="margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.8rem;color:var(--primary-dark)">Worker Dashboard</h2>
        <p class="text-muted text-sm">Welcome back! Here's your overview.</p>
      </div>
      <div class="flex gap-3 flex-wrap">
        <button class="btn btn-primary" onclick="findClientsForMe()">🤖 Find Me Clients</button>
        <button class="btn btn-emergency" onclick="toggleEmergencyReady()">⚡ Emergency Ready: OFF</button>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="dashboard-grid" style="margin-bottom:28px">
      ${[
        { label:'Profile Views', val:'1,247', change:'+18% this week', icon:'👁️' },
        { label:'Proposals Sent', val:'23', change:'8 pending reply', icon:'📨' },
        { label:'Active Contracts', val:'3', change:'₹42,000 active', icon:'📋' },
        { label:'Total Earned', val:'₹2.4L', change:'This month', icon:'💰' },
      ].map(s => `
        <div class="stat-card">
          <div style="font-size:1.5rem;margin-bottom:8px">${s.icon}</div>
          <div class="stat-number">${s.val}</div>
          <div class="stat-label">${s.label}</div>
          <div class="stat-change">${s.change}</div>
        </div>
      `).join('')}
    </div>

    <div class="grid" style="grid-template-columns:1.4fr 1fr;gap:24px">
      <!-- AI Price Tiles -->
      <div>
        <div class="ai-suggestion-box" style="margin-bottom:20px">
          <div class="ai-label">🤖 AI Price Suggestion Engine</div>
          <div class="text-sm" style="opacity:0.8;margin-bottom:18px">Based on market demand, portfolio strength, and your region</div>
          <div class="grid grid-3 gap-3">
            ${[
              { label:'Hourly Rate', ai: user.aiSuggestedPrice.hourly, yours: user.pricing.hourly, key:'hourly' },
              { label:'Per Project', ai: user.aiSuggestedPrice.project, yours: user.pricing.project, key:'project' },
              { label:'Monthly', ai: user.aiSuggestedPrice.monthly, yours: user.pricing.monthly, key:'monthly' },
            ].map(p => `
              <div style="background:rgba(255,255,255,0.1);border-radius:12px;padding:14px;text-align:center">
                <div style="font-size:0.72rem;opacity:0.7;margin-bottom:4px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase">${p.label}</div>
                <div style="font-family:var(--font-display);font-size:1.2rem;font-weight:800">${fmt(p.yours)}</div>
                <div style="font-size:0.7rem;opacity:0.6;margin-top:4px">AI: ${fmt(p.ai)}</div>
                <button onclick="updatePrice('${p.key}',${p.ai})" style="background:rgba(255,255,255,0.15);color:white;border:none;border-radius:6px;padding:4px 10px;font-size:0.7rem;font-weight:600;cursor:pointer;margin-top:8px;font-family:var(--font-body)">Use AI Rate</button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- My Badges -->
        <div class="card card-body">
          <div class="flex justify-between items-center" style="margin-bottom:16px">
            <div style="font-family:var(--font-display);font-weight:700">My AI Badges</div>
            <button class="btn btn-sm btn-outline" onclick="navigateTo('verify')">+ Get Verified</button>
          </div>
          <div class="flex gap-3 flex-wrap">
            ${user.badges.map(b => {
              const meta = DB.badgeMeta[b];
              return `<div class="flex items-center gap-2 badge badge-verified badge-lg">${meta.icon} ${meta.label}</div>`;
            }).join('')}
            <div style="border:2px dashed var(--grey-200);border-radius:10px;padding:8px 16px;font-size:0.8rem;color:var(--grey-400);cursor:pointer" onclick="navigateTo('verify')">+ Earn more</div>
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div>
        <!-- Emergency Ready Toggle -->
        <div class="card card-body" style="margin-bottom:20px">
          <div class="toggle-group">
            <div>
              <div class="toggle-label">⚡ Emergency Ready</div>
              <div class="toggle-sublabel">Appear in emergency mode searches</div>
            </div>
            <div class="toggle" id="emergencyToggle" onclick="toggleEmergencyReady(this)">
              <div class="knob"></div>
            </div>
          </div>
          <div class="toggle-group" style="border-top:1px solid var(--grey-100);padding-top:14px">
            <div>
              <div class="toggle-label">🟢 Available Now</div>
              <div class="toggle-sublabel">Show your online status</div>
            </div>
            <div class="toggle on" onclick="this.classList.toggle('on')">
              <div class="knob"></div>
            </div>
          </div>
          <div class="toggle-group" style="border-top:1px solid var(--grey-100);padding-top:14px">
            <div>
              <div class="toggle-label">📋 Accept Managed Contracts</div>
              <div class="toggle-sublabel">Monthly retainer bookings</div>
            </div>
            <div class="toggle on" onclick="this.classList.toggle('on')">
              <div class="knob"></div>
            </div>
          </div>
        </div>

        <!-- Teams Quick Panel -->
        <div class="card card-body">
          <div class="flex justify-between items-center" style="margin-bottom:14px">
            <div style="font-family:var(--font-display);font-weight:700">My Teams</div>
            <div class="three-dot-menu">
              <div class="three-dot-btn" onclick="toggleDropdown('teamDropdown')">⋮</div>
              <div class="dropdown-menu" id="teamDropdown">
                <div class="dropdown-item" onclick="openCreateTeamModal()">➕ Create Team</div>
                <div class="dropdown-item" onclick="openJoinTeamModal()">👥 Join Team</div>
                <div class="dropdown-item" onclick="navigateTo('teams')">📋 Manage Teams</div>
              </div>
            </div>
          </div>
          <div style="padding:24px;text-align:center;color:var(--grey-400);border:2px dashed var(--grey-200);border-radius:12px">
            <div style="font-size:2rem;margin-bottom:8px">👥</div>
            <div style="font-size:0.85rem;font-weight:500">Not in any team yet</div>
            <button class="btn btn-primary btn-sm" style="margin-top:12px" onclick="openCreateTeamModal()">Create Your Team</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAIVerifyPage() {
  return `
    <div style="max-width:700px;margin:0 auto">
      <div style="text-align:center;margin-bottom:40px">
        <div class="section-tag" style="justify-content:center">✦ AI Skill Verification</div>
        <h2 style="font-family:var(--font-display);font-weight:800;font-size:2rem;color:var(--primary-dark)">Earn AI-Verified Badges</h2>
        <p class="text-muted" style="margin-top:8px">Take AI-graded tests and display verified badges on your profile</p>
      </div>

      <!-- Portfolio Scanner -->
      <div class="card card-body" style="margin-bottom:28px">
        <div class="ai-label">🔍 Proof-Based Portfolio Scanner</div>
        <h3 style="font-family:var(--font-display);font-weight:700;margin-bottom:12px">Paste your portfolio links</h3>
        <p class="text-sm text-muted" style="margin-bottom:20px">AI analyzes your work across platforms and generates a verified score card</p>

        <div class="form-group">
          <label class="form-label">Portfolio Links (one per line)</label>
          <textarea class="form-textarea" id="portfolioLinks" placeholder="https://youtube.com/c/your-channel&#10;https://behance.net/yourwork&#10;https://instagram.com/yourpage&#10;https://figma.com/yourproject" style="min-height:130px"></textarea>
          <div class="form-hint">Supports: YouTube, Instagram, Behance, GitHub, Figma, Google Drive, Telegram, Discord</div>
        </div>

        <button class="btn btn-primary w-full" onclick="scanPortfolio()">
          🔍 Scan My Portfolio
        </button>

        <div id="portfolioResult" style="margin-top:20px;display:none"></div>
      </div>

      <!-- Available Badges -->
      <div class="card card-body">
        <h3 style="font-family:var(--font-display);font-weight:700;margin-bottom:20px">Available Skill Certifications</h3>
        <div class="grid grid-2 gap-3">
          ${Object.entries(DB.badgeMeta).map(([key, b]) => `
            <div style="display:flex;align-items:center;gap:12px;padding:14px;border:1px solid var(--grey-200);border-radius:12px;cursor:pointer;transition:all 0.2s" onmouseenter="this.style.borderColor='var(--accent)'" onmouseleave="this.style.borderColor='var(--grey-200)'">
              <div class="ai-badge-icon ${b.color}" style="width:40px;height:40px;font-size:1.2rem">${b.icon}</div>
              <div>
                <div style="font-weight:600;font-size:0.88rem">${b.label}</div>
                <div style="font-size:0.75rem;color:var(--grey-600);margin-top:2px">AI Graded Test</div>
              </div>
              <button class="btn btn-sm btn-outline" style="margin-left:auto" onclick="startVerification('${key}')">Take Test</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ── Navigation ──
function navigateTo(page) {
  GV.state.currentPage = page;
  renderPage();
  $$('.sidebar-link').forEach(l => l.classList.remove('active'));
  const link = $(`.sidebar-link[data-page="${page}"]`);
  if (link) link.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPage() {
  const main = document.getElementById('mainContent');
  const page = GV.state.currentPage;

  const renderers = {
    home: renderHomePage,
    workers: renderWorkersPage,
    teams: renderTeamsPage,
    managed: renderManagedServicesPage,
    dashboard: renderWorkerDashboard,
    verify: renderAIVerifyPage,
    emergency: () => { activateEmergencyMode(); return renderWorkersPage(); },
  };

  if (page === 'home') {
    document.getElementById('sidebarWrapper').style.display = 'none';
    main.style.padding = '0';
  } else {
    document.getElementById('sidebarWrapper').style.display = '';
    main.style.padding = '32px 24px';
  }

  main.innerHTML = (renderers[page] || renderers.home)();
  main.querySelectorAll('.animate-fade-in').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${i * 0.07}s`;
    requestAnimationFrame(() => el.style.opacity = '');
  });

  if (page === 'emergency') startEmergencyTimer();
}

// ── Actions ──
function searchWorkers() {
  GV.state.searchQuery = document.getElementById('heroSearch')?.value || '';
  GV.state.searchCategory = document.getElementById('heroCategory')?.value || '';
  navigateTo('workers');
}

function filterCategory(cat) {
  GV.state.searchCategory = cat;
  navigateTo('workers');
}

function filterWorkers(filter, el) {
  $$('.filter-chips .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');

  const grid = document.getElementById('workersGrid');
  if (!grid) return;
  showSkeleton(grid, 4);
  setTimeout(() => {
    let filtered = [...DB.workers];
    if (filter === 'Emergency Ready') filtered = filtered.filter(w => w.emergencyReady);
    else if (filter === 'Online Now') filtered = filtered.filter(w => w.online);
    else if (filter !== 'All') filtered = filtered.filter(w => w.skills.some(s => s.includes(filter)) || w.title.includes(filter));
    grid.innerHTML = filtered.map(w => renderWorkerCard(w)).join('');
  }, 900);
}

function clearFilters() {
  GV.state.searchQuery = '';
  GV.state.searchCategory = '';
  navigateTo('workers');
}

function sortWorkers(by) {
  const grid = document.getElementById('workersGrid');
  if (!grid) return;
  let sorted = [...DB.workers];
  if (by === 'rating') sorted.sort((a,b) => b.rating - a.rating);
  else if (by === 'price_low') sorted.sort((a,b) => a.pricing.hourly - b.pricing.hourly);
  else if (by === 'price_high') sorted.sort((a,b) => b.pricing.hourly - a.pricing.hourly);
  else sorted.sort((a,b) => b.matchScore - a.matchScore);
  grid.innerHTML = sorted.map(w => renderWorkerCard(w)).join('');
}

function activateEmergencyMode() {
  GV.state.emergencyMode = true;
  navigateTo('workers');
  startEmergencyTimer();
  Toast.show('⚡ Emergency Mode activated! Showing available workers.', 'error', '⚡');
}

function deactivateEmergencyMode() {
  GV.state.emergencyMode = false;
  navigateTo('workers');
}

let emergencyInterval = null;
function startEmergencyTimer() {
  let secs = 600;
  clearInterval(emergencyInterval);
  emergencyInterval = setInterval(() => {
    secs--;
    const el = document.getElementById('emergencyTimer');
    if (!el) { clearInterval(emergencyInterval); return; }
    const m = Math.floor(secs / 60).toString().padStart(2,'0');
    const s = (secs % 60).toString().padStart(2,'0');
    el.textContent = `${m}:${s}`;
    if (secs <= 0) { clearInterval(emergencyInterval); deactivateEmergencyMode(); }
  }, 1000);
}

function toggleEmergencyReady(el) {
  if (!el) return;
  el.classList.toggle('on');
  const on = el.classList.contains('on');
  Toast.success(on ? '⚡ You are now Emergency Ready!' : 'Emergency Ready disabled');
  if (on) launchConfetti();
}

function toggleDropdown(id) {
  const dd = document.getElementById(id);
  if (!dd) return;
  $$('.dropdown-menu.open').forEach(m => { if (m.id !== id) m.classList.remove('open'); });
  dd.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.three-dot-menu')) {
    $$('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
  }
  if (e.target.classList.contains('modal-overlay')) Modal.closeAll();
});

function openWorkerProfile(id) {
  const w = DB.workers.find(x => x.id === id);
  if (!w) return;
  const modal = document.getElementById('workerProfileModal');
  const body = modal.querySelector('.modal-body');
  body.innerHTML = `
    <div class="flex gap-4 items-start" style="margin-bottom:24px">
      <div class="worker-avatar" style="width:72px;height:72px;font-size:1.6rem;flex-shrink:0">
        ${w.initials}
        ${w.online ? '<div class="online-dot"></div>' : ''}
      </div>
      <div>
        <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.4rem">${w.name}</h2>
        <div class="text-muted">${w.title} • ${w.location}</div>
        <div style="margin-top:8px">${renderStars(w.rating)} <span class="text-muted text-sm">(${w.reviews} reviews)</span></div>
        <div class="flex gap-2 flex-wrap" style="margin-top:10px">
          ${renderBadges(w.badges)}
          ${w.emergencyReady ? '<span class="badge badge-emergency">⚡ Emergency Ready</span>' : ''}
        </div>
      </div>
    </div>

    <p class="text-sm" style="color:var(--grey-700);margin-bottom:20px;line-height:1.7">${w.bio}</p>

    <div class="flex gap-3 flex-wrap" style="margin-bottom:20px">
      ${w.skills.map(s => `<span class="badge-skill">${s}</span>`).join('')}
    </div>

    ${renderProofScoreCard(w.proofScore)}

    <div class="grid grid-3 gap-3" style="margin:20px 0">
      ${[
        { label:'Hourly', val: w.pricing.hourly, ai: w.aiSuggestedPrice.hourly },
        { label:'Project', val: w.pricing.project, ai: w.aiSuggestedPrice.project },
        { label:'Monthly', val: w.pricing.monthly, ai: w.aiSuggestedPrice.monthly },
      ].map(p => `
        <div class="price-tile">
          <div class="amount">${fmt(p.val)}</div>
          <div class="type">${p.label}</div>
          <div class="ai-tag">🤖 AI: ${fmt(p.ai)}</div>
        </div>
      `).join('')}
    </div>

    <div class="flex gap-3">
      <button class="btn btn-primary" style="flex:1" onclick="hireWorker(${w.id})">⚡ Hire Now</button>
      <button class="btn btn-outline" onclick="openChat(${w.id})">💬 Message</button>
    </div>
  `;
  Modal.open('workerProfileModal');
}

function openTeamProfile(id) {
  const t = DB.teams.find(x => x.id === id);
  if (!t) return;
  const modal = document.getElementById('teamProfileModal');
  const body = modal.querySelector('.modal-body');
  body.innerHTML = `
    <div style="text-align:center;margin-bottom:24px">
      <div style="font-size:3rem;margin-bottom:8px">${t.emoji}</div>
      <h2 style="font-family:var(--font-display);font-weight:800;font-size:1.5rem">${t.name}</h2>
      <div class="text-muted text-sm">${t.members.length} members • ${renderStars(t.rating)} (${t.reviews} reviews)</div>
    </div>
    <p class="text-sm text-muted" style="margin-bottom:20px;line-height:1.7">${t.description}</p>

    <div style="margin-bottom:20px">
      <div style="font-weight:600;margin-bottom:12px;font-family:var(--font-display)">Team Members</div>
      ${t.members.map(m => `
        <div class="flex items-center gap-3" style="padding:10px 0;border-bottom:1px solid var(--grey-100)">
          <div style="width:36px;height:36px;border-radius:50%;background:${m.color};display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:0.85rem;font-family:var(--font-display)">${m.initials}</div>
          <div>
            <div class="font-medium text-sm">${m.name}</div>
            <div class="text-xs text-muted">${m.role}</div>
          </div>
          <span class="badge badge-primary badge-sm" style="margin-left:auto">${m.role}</span>
        </div>
      `).join('')}
    </div>

    <div class="flex gap-2 flex-wrap" style="margin-bottom:20px">${renderBadges(t.badges)}</div>

    <div class="proof-score-card" style="margin-bottom:20px">
      <div class="flex justify-between">
        <span class="score-label">Team Proof Score</span>
        <span class="score-value">${t.proofScore}/100</span>
      </div>
      <div class="score-bar" style="margin-top:8px"><div class="score-fill" style="width:${t.proofScore}%"></div></div>
    </div>

    <div class="grid grid-3 gap-3" style="margin-bottom:20px">
      ${[
        { label:'Hourly', val: t.pricing.hourly },
        { label:'Project', val: t.pricing.project },
        { label:'Monthly', val: t.pricing.monthly },
      ].map(p => `
        <div class="price-tile">
          <div class="amount">${fmt(p.val)}</div>
          <div class="type">${p.label}</div>
        </div>
      `).join('')}
    </div>

    <button class="btn btn-primary w-full" onclick="hireTeam(${t.id})">Hire ${t.name}</button>
  `;
  Modal.open('teamProfileModal');
}

function hireWorker(id) {
  const w = DB.workers.find(x => x.id === id);
  Modal.closeAll();
  setTimeout(() => {
    Toast.success(`Proposal sent to ${w.name}! They'll respond within 2 hours.`);
    launchConfetti();
  }, 300);
}

function hireTeam(id) {
  const t = DB.teams.find(x => x.id === id);
  Modal.closeAll();
  setTimeout(() => {
    Toast.success(`Team contract initiated with ${t.name}! 🎉`);
    launchConfetti();
  }, 300);
}

function subscribeManagedService(id) {
  const s = DB.managedServices.find(x => x.id === id);
  Toast.success(`Subscribed to "${s.title}" — ₹${s.price.toLocaleString('en-IN')}/month`);
  launchConfetti();
}

function openCreateTeamModal() {
  Modal.closeAll();
  Modal.open('createTeamModal');
}

function openJoinTeamModal() {
  Toast.info('Browse the team marketplace and click "Join Team" on any listing.');
  navigateTo('teams');
}

function createTeam() {
  const name = document.getElementById('teamName')?.value;
  if (!name) { Toast.error('Please enter a team name'); return; }
  Modal.closeAll();
  setTimeout(() => {
    Toast.success(`Team "${name}" created successfully! 🎉`);
    launchConfetti();
    setTimeout(() => navigateTo('teams'), 1500);
  }, 300);
}

function findClientsForMe() {
  Modal.open('findClientsModal');
  const list = document.getElementById('clientMatchList');
  if (list) {
    list.innerHTML = '<div style="text-align:center;padding:30px"><div class="skeleton" style="width:80%;height:16px;margin:0 auto 10px"></div><div class="skeleton" style="width:60%;height:12px;margin:0 auto"></div></div>';
    setTimeout(() => {
      list.innerHTML = [
        { name:'TechBrand India', need:'YouTube Shorts Editor', budget:'₹12,000-18,000/mo', chance:'High', emoji:'🏢' },
        { name:'StartupXYZ', need:'Thumbnail + Reels package', budget:'₹8,000 project', chance:'High', emoji:'🚀' },
        { name:'Creator Academy', need:'Monthly content management', budget:'₹25,000/mo', chance:'Medium', emoji:'🎓' },
        { name:'FashionBrand', need:'Instagram Reels Editor', budget:'₹1,200/hr', chance:'Medium', emoji:'👗' },
        { name:'Gaming Studio', need:'Discord Moderator + Shorts', budget:'₹15,000/mo', chance:'Low', emoji:'🎮' },
      ].map(c => `
        <div style="display:flex;align-items:center;gap:12px;padding:14px;border:1px solid var(--grey-100);border-radius:12px;margin-bottom:10px">
          <div style="font-size:1.5rem">${c.emoji}</div>
          <div style="flex:1">
            <div class="font-semibold text-sm">${c.name}</div>
            <div class="text-xs text-muted">${c.need} • ${c.budget}</div>
          </div>
          <span class="match-prediction match-${c.chance.toLowerCase()}">${c.chance} Match</span>
          <button class="btn btn-primary btn-sm" onclick="sendProposal('${c.name}')">Send Proposal</button>
        </div>
      `).join('');
    }, 1500);
  }
}

function sendProposal(client) {
  Modal.closeAll();
  Toast.success(`Personalized proposal sent to ${client}! 📨`);
}

function openAuthModal(role) {
  GV.state.currentRole = role;
  const modal = document.getElementById('authModal');
  const title = modal.querySelector('.modal-title');
  title.textContent = role === 'worker' ? '🎨 Create Worker Profile' : '🏢 Hire Talent';
  Modal.open('authModal');
}

function handleAuth() {
  const name = document.getElementById('authName')?.value;
  const email = document.getElementById('authEmail')?.value;
  if (!name || !email) { Toast.error('Please fill all fields'); return; }
  GV.state.isLoggedIn = true;
  GV.state.user = { name, email, role: GV.state.currentRole };
  Modal.closeAll();
  Toast.success(`Welcome, ${name}! 🎉`);
  launchConfetti();
  setTimeout(() => navigateTo('dashboard'), 500);
}

function scanPortfolio() {
  const links = document.getElementById('portfolioLinks')?.value;
  if (!links) { Toast.error('Please paste at least one portfolio link'); return; }
  const result = document.getElementById('portfolioResult');
  result.style.display = 'block';
  result.innerHTML = `
    <div style="text-align:center;padding:20px">
      <div class="skeleton" style="height:14px;margin-bottom:8px;width:60%;margin-left:auto;margin-right:auto"></div>
      <div class="skeleton" style="height:12px;margin-bottom:8px;width:80%;margin-left:auto;margin-right:auto"></div>
      <div class="text-sm text-muted" style="margin-top:12px">🤖 AI scanning your portfolio links...</div>
    </div>
  `;
  setTimeout(() => {
    const scores = { skill: 88, quality: 84, engagement: 91, professionalism: 86 };
    result.innerHTML = `
      <div style="padding:4px 0">
        ${renderProofScoreCard(scores)}
        <div style="margin-top:14px;padding:12px;background:#ECFDF5;border-radius:10px;border:1px solid #A7F3D0">
          <div style="color:#059669;font-weight:700;font-size:0.9rem">✅ Portfolio Verified!</div>
          <div style="color:#065F46;font-size:0.82rem;margin-top:4px">Your work has been analyzed. Badges recommended: Viral Shorts Editor, Reels Growth Specialist</div>
          <button class="btn btn-success btn-sm" style="margin-top:10px" onclick="claimBadges()">Claim Badges</button>
        </div>
      </div>
    `;
  }, 2200);
}

function claimBadges() {
  Toast.success('Badges earned and added to your profile! 🏆');
  launchConfetti();
}

function startVerification(key) {
  const b = DB.badgeMeta[key];
  Modal.open('verifyTestModal');
  const body = document.querySelector('#verifyTestModal .modal-body');
  body.innerHTML = `
    <div style="text-align:center;margin-bottom:24px">
      <div class="ai-badge-icon ${b.color}" style="width:60px;height:60px;font-size:1.8rem;margin:0 auto 12px">${b.icon}</div>
      <h3 style="font-family:var(--font-display);font-weight:700">${b.label} Certification</h3>
      <p class="text-muted text-sm" style="margin-top:8px">AI-graded 10-question test • ~15 minutes • Instant results</p>
    </div>
    <div style="padding:20px;background:var(--grey-100);border-radius:12px;margin-bottom:20px">
      <div style="font-weight:600;margin-bottom:10px">Test covers:</div>
      <div class="text-sm text-muted">• Core skills and best practices<br>• Real-world scenario questions<br>• Portfolio review criteria<br>• AI-graded sample task</div>
    </div>
    <button class="btn btn-primary w-full" onclick="startTest('${key}')">Start Certification Test</button>
  `;
}

function startTest(key) {
  const body = document.querySelector('#verifyTestModal .modal-body');
  body.innerHTML = '<div style="text-align:center;padding:30px"><div class="skeleton" style="width:80%;height:16px;margin:0 auto 10px"></div><p class="text-muted text-sm">🤖 AI preparing your test...</p></div>';
  setTimeout(() => {
    body.innerHTML = `
      <div style="margin-bottom:20px">
        <div class="flex justify-between items-center" style="margin-bottom:8px">
          <span class="font-semibold">Question 1 of 10</span>
          <div class="score-bar" style="width:120px;flex:none">
            <div class="score-fill" style="width:10%"></div>
          </div>
        </div>
        <h3 style="font-family:var(--font-display);font-weight:700;margin-bottom:16px;font-size:1rem;line-height:1.5">What is the optimal video length for maximum retention on YouTube Shorts?</h3>
        ${['Under 15 seconds','15–30 seconds','30–60 seconds','1–3 minutes'].map((opt,i) => `
          <div style="padding:12px 16px;border:2px solid var(--grey-200);border-radius:10px;cursor:pointer;margin-bottom:8px;font-size:0.9rem;transition:all 0.2s" onclick="selectAnswer(this)">
            ${['A','B','C','D'][i]}. ${opt}
          </div>
        `).join('')}
      </div>
      <button class="btn btn-primary" onclick="submitAnswer()">Next Question →</button>
    `;
  }, 1000);
}

function selectAnswer(el) {
  $$('#verifyTestModal .modal-body [onclick^="selectAnswer"]').forEach(e => { e.style.borderColor = 'var(--grey-200)'; e.style.background = ''; });
  el.style.borderColor = 'var(--primary)';
  el.style.background = 'var(--lavender)';
}

function submitAnswer() {
  Modal.closeAll();
  setTimeout(() => {
    Toast.success('🏆 Certified! Badge added to your profile!');
    launchConfetti();
  }, 300);
}

function updatePrice(key, aiVal) {
  Toast.success(`${key.charAt(0).toUpperCase()+key.slice(1)} rate updated to AI-suggested ${fmt(aiVal)}`);
}

function selectDuration(el, months) {
  el.closest('.managed-duration-btns').querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function openChat(workerId) {
  Modal.closeAll();
  const w = DB.workers.find(x => x.id === workerId);
  Modal.open('chatModal');
  const header = document.querySelector('#chatModal .chat-header');
  header.innerHTML = `
    <div class="worker-avatar" style="width:36px;height:36px;font-size:0.85rem;flex-shrink:0">${w.initials}</div>
    <div>
      <div class="font-semibold text-sm">${w.name}</div>
      <div class="text-xs text-muted">${w.online ? '● Online' : '○ Offline'}</div>
    </div>
  `;
  const msgs = document.querySelector('#chatModal .chat-messages');
  msgs.innerHTML = `
    <div class="message received">
      <div class="message-bubble">Hi! I saw your interest in my profile. How can I help?</div>
      <div class="message-time">2:34 PM</div>
    </div>
  `;
}

function sendChatMessage() {
  const input = document.getElementById('chatInputField');
  const text = input?.value?.trim();
  if (!text) return;
  const msgs = document.querySelector('#chatModal .chat-messages');
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  msgs.innerHTML += `
    <div class="message sent">
      <div class="message-bubble">${text}</div>
      <div class="message-time">${time}</div>
    </div>
  `;
  input.value = '';
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => {
    msgs.innerHTML += `
      <div class="message received">
        <div class="message-bubble">Thanks for reaching out! I'd love to discuss your project. What's your timeline?</div>
        <div class="message-time">${time}</div>
      </div>
    `;
    msgs.scrollTop = msgs.scrollHeight;
  }, 1200);
}

function addToTeamModal(workerId) {
  Toast.info('Select a team from the Teams page to add this worker.');
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  Toast.init();
  renderPage();

  // Navbar active state
  document.querySelectorAll('.nav-link[data-page]').forEach(l => {
    l.addEventListener('click', () => navigateTo(l.dataset.page));
  });

  document.querySelectorAll('.sidebar-link[data-page]').forEach(l => {
    l.addEventListener('click', () => navigateTo(l.dataset.page));
  });

  // Chat enter key
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && document.activeElement.id === 'chatInputField') sendChatMessage();
  });
});
