// ===== STATE =====
const state = {
  currentStep: 1,
  totalSteps: 5,
  selectedTheme: 'dark-purple',
  education: [],
  experience: [],
  projects: [],
  achievements: [],
  techSkills: [],
  softSkills: [],
  languages: [],
};

// ===== PARTICLES =====
(function initParticles() {
  const container = document.getElementById('bgParticles');
  const colors = ['#8b5cf6','#06b6d4','#10b981','#f59e0b'];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*20+15}s;
      animation-delay:${Math.random()*15}s;
    `;
    container.appendChild(p);
  }
})();

// ===== BIO CHAR COUNT =====
const bioEl = document.getElementById('bio');
if (bioEl) {
  bioEl.addEventListener('input', () => {
    const count = bioEl.value.length;
    document.getElementById('bioCount').textContent = count;
    if (count > 500) bioEl.value = bioEl.value.slice(0, 500);
  });
}

// ===== NAVIGATION =====
function goToStep(step) {
  // Validate step 1 basics
  if (step > 1) {
    const name = document.getElementById('fullName').value.trim();
    const title = document.getElementById('title').value.trim();
    if (!name || !title) {
      shakeRequired();
      return;
    }
  }

  document.getElementById(`step-${state.currentStep}`).classList.remove('active');
  document.getElementById(`nav-step-${state.currentStep}`).classList.remove('active');

  if (state.currentStep < step) {
    document.getElementById(`nav-step-${state.currentStep}`).classList.add('completed');
  }

  state.currentStep = step;

  document.getElementById(`step-${state.currentStep}`).classList.add('active');
  document.getElementById(`nav-step-${state.currentStep}`).classList.add('active');

  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shakeRequired() {
  const inputs = [document.getElementById('fullName'), document.getElementById('title')];
  inputs.forEach(el => {
    if (!el.value.trim()) {
      el.style.animation = 'shake 0.4s ease';
      el.style.borderColor = '#ef4444';
      setTimeout(() => { el.style.animation = ''; el.style.borderColor = ''; }, 500);
    }
  });
}

function updateProgress() {
  const pct = Math.round(((state.currentStep - 1) / state.totalSteps) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressPct').textContent = pct + '%';
}

// Shake animation
const style = document.createElement('style');
style.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }`;
document.head.appendChild(style);

// ===== EDUCATION =====
function addEducation() {
  const id = Date.now();
  state.education.push({ id });
  const list = document.getElementById('educationList');
  const card = document.createElement('div');
  card.className = 'dynamic-card';
  card.id = `edu-${id}`;
  card.innerHTML = `
    <button class="card-remove" onclick="removeItem('edu-${id}', state.education, ${id})">✕</button>
    <div class="card-grid">
      <div class="form-group">
        <label class="form-label">Degree / Certification</label>
        <input type="text" data-field="degree" data-id="${id}" class="form-input" placeholder="e.g. B.Tech Computer Science" />
      </div>
      <div class="form-group">
        <label class="form-label">Institution</label>
        <input type="text" data-field="institution" data-id="${id}" class="form-input" placeholder="e.g. IIT Bombay" />
      </div>
      <div class="form-group">
        <label class="form-label">Year</label>
        <input type="text" data-field="year" data-id="${id}" class="form-input" placeholder="e.g. 2021 – 2025" />
      </div>
      <div class="form-group">
        <label class="form-label">Grade / CGPA</label>
        <input type="text" data-field="grade" data-id="${id}" class="form-input" placeholder="e.g. 9.2 CGPA" />
      </div>
      <div class="form-group full">
        <label class="form-label">Description (optional)</label>
        <textarea data-field="description" data-id="${id}" class="form-textarea" rows="2" placeholder="Relevant coursework, achievements..."></textarea>
      </div>
    </div>
  `;
  list.appendChild(card);
  bindCardInputs(card, state.education, id);
}

// ===== EXPERIENCE =====
function addExperience() {
  const id = Date.now();
  state.experience.push({ id });
  const list = document.getElementById('experienceList');
  const card = document.createElement('div');
  card.className = 'dynamic-card';
  card.id = `exp-${id}`;
  card.innerHTML = `
    <button class="card-remove" onclick="removeItem('exp-${id}', state.experience, ${id})">✕</button>
    <div class="card-grid">
      <div class="form-group">
        <label class="form-label">Job Title</label>
        <input type="text" data-field="role" data-id="${id}" class="form-input" placeholder="e.g. Software Engineer" />
      </div>
      <div class="form-group">
        <label class="form-label">Company</label>
        <input type="text" data-field="company" data-id="${id}" class="form-input" placeholder="e.g. Google" />
      </div>
      <div class="form-group">
        <label class="form-label">Duration</label>
        <input type="text" data-field="duration" data-id="${id}" class="form-input" placeholder="e.g. Jun 2023 – Present" />
      </div>
      <div class="form-group">
        <label class="form-label">Location</label>
        <input type="text" data-field="location" data-id="${id}" class="form-input" placeholder="e.g. Bangalore, India" />
      </div>
      <div class="form-group full">
        <label class="form-label">Description</label>
        <textarea data-field="description" data-id="${id}" class="form-textarea" rows="3" placeholder="Key responsibilities and achievements (use • for bullet points)"></textarea>
      </div>
    </div>
  `;
  list.appendChild(card);
  bindCardInputs(card, state.experience, id);
}

// ===== PROJECTS =====
function addProject() {
  const id = Date.now();
  state.projects.push({ id });
  const list = document.getElementById('projectList');
  const card = document.createElement('div');
  card.className = 'dynamic-card';
  card.id = `proj-${id}`;
  card.innerHTML = `
    <button class="card-remove" onclick="removeItem('proj-${id}', state.projects, ${id})">✕</button>
    <div class="card-grid">
      <div class="form-group">
        <label class="form-label">Project Name</label>
        <input type="text" data-field="name" data-id="${id}" class="form-input" placeholder="e.g. AI Resume Builder" />
      </div>
      <div class="form-group">
        <label class="form-label">Tech Stack</label>
        <input type="text" data-field="tech" data-id="${id}" class="form-input" placeholder="e.g. React, Node.js, MongoDB" />
      </div>
      <div class="form-group">
        <label class="form-label">Live URL (optional)</label>
        <input type="url" data-field="liveUrl" data-id="${id}" class="form-input" placeholder="https://your-project.com" />
      </div>
      <div class="form-group">
        <label class="form-label">GitHub URL (optional)</label>
        <input type="url" data-field="githubUrl" data-id="${id}" class="form-input" placeholder="https://github.com/..." />
      </div>
      <div class="form-group full">
        <label class="form-label">Description</label>
        <textarea data-field="description" data-id="${id}" class="form-textarea" rows="3" placeholder="What problem does it solve? What did you build?"></textarea>
      </div>
    </div>
  `;
  list.appendChild(card);
  bindCardInputs(card, state.projects, id);
}

// ===== ACHIEVEMENTS =====
function addAchievement() {
  const id = Date.now();
  state.achievements.push({ id });
  const list = document.getElementById('achievementList');
  const card = document.createElement('div');
  card.className = 'dynamic-card';
  card.id = `ach-${id}`;
  card.innerHTML = `
    <button class="card-remove" onclick="removeItem('ach-${id}', state.achievements, ${id})">✕</button>
    <div class="card-grid">
      <div class="form-group">
        <label class="form-label">Achievement Title</label>
        <input type="text" data-field="title" data-id="${id}" class="form-input" placeholder="e.g. Smart India Hackathon Winner" />
      </div>
      <div class="form-group">
        <label class="form-label">Year</label>
        <input type="text" data-field="year" data-id="${id}" class="form-input" placeholder="e.g. 2024" />
      </div>
      <div class="form-group full">
        <label class="form-label">Description</label>
        <textarea data-field="description" data-id="${id}" class="form-textarea" rows="2" placeholder="Brief description of the achievement..."></textarea>
      </div>
    </div>
  `;
  list.appendChild(card);
  bindCardInputs(card, state.achievements, id);
}

// ===== BIND INPUTS =====
function bindCardInputs(card, arr, id) {
  card.querySelectorAll('[data-field]').forEach(input => {
    input.addEventListener('input', () => {
      const item = arr.find(x => x.id === id);
      if (item) item[input.dataset.field] = input.value;
    });
  });
}

// ===== REMOVE ITEM =====
function removeItem(cardId, arr, id) {
  const idx = arr.findIndex(x => x.id === id);
  if (idx !== -1) arr.splice(idx, 1);
  const el = document.getElementById(cardId);
  if (el) { el.style.opacity = '0'; el.style.transform = 'scale(0.9)'; el.style.transition = 'all 0.2s'; setTimeout(() => el.remove(), 200); }
}

// ===== TAG INPUT =====
function initTagInput(inputId, containerId, arr) {
  const input = document.getElementById(inputId);
  const container = document.getElementById(containerId);

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = input.value.replace(',','').trim();
      if (val && !arr.includes(val)) {
        arr.push(val);
        addTag(val, container, arr);
        input.value = '';
      }
    }
    if (e.key === 'Backspace' && !input.value && arr.length) {
      const last = arr.pop();
      container.lastChild && container.removeChild(container.lastChild);
    }
  });

  container.parentElement.addEventListener('click', () => input.focus());
}

function addTag(val, container, arr) {
  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.innerHTML = `${val}<span class="tag-remove" onclick="removeTag(this,'${val.replace(/'/g,"\\'")}',${JSON.stringify(arr)})">×</span>`;
  tag.querySelector('.tag-remove').addEventListener('click', e => {
    e.stopPropagation();
    const idx = arr.indexOf(val);
    if (idx !== -1) arr.splice(idx, 1);
    tag.remove();
  });
  container.appendChild(tag);
}

initTagInput('techSkillInput', 'techTagContainer', state.techSkills);
initTagInput('softSkillInput', 'softTagContainer', state.softSkills);
initTagInput('langInput', 'langTagContainer', state.languages);

// ===== THEME SELECT =====
function selectTheme(el, theme) {
  document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  state.selectedTheme = theme;
}

// ===== GATHER DATA =====
function getData() {
  return {
    name: document.getElementById('fullName').value.trim(),
    title: document.getElementById('title').value.trim(),
    email: document.getElementById('email').value.trim(),
    location: document.getElementById('location').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    bio: document.getElementById('bio').value.trim(),
    photoUrl: document.getElementById('photoUrl').value.trim(),
    linkedin: document.getElementById('linkedin').value.trim(),
    github: document.getElementById('github').value.trim(),
    twitter: document.getElementById('twitter').value.trim(),
    website: document.getElementById('website').value.trim(),
    education: state.education,
    experience: state.experience,
    projects: state.projects,
    achievements: state.achievements,
    techSkills: state.techSkills,
    softSkills: state.softSkills,
    languages: state.languages,
    theme: state.selectedTheme,
  };
}

// ===== THEME CONFIGS =====
const themes = {
  'dark-purple': {
    bg: '#0a0812', bgCard: '#110f1c', bgSection: '#0f0c1e',
    accent: '#8b5cf6', accent2: '#06b6d4', text: '#f1f5f9', textSub: '#94a3b8',
    grad: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
    gradBg: 'radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.1) 0%, transparent 60%)',
  },
  'dark-ocean': {
    bg: '#050c1a', bgCard: '#071528', bgSection: '#0a1a30',
    accent: '#3b82f6', accent2: '#0ea5e9', text: '#f0f9ff', textSub: '#7dd3fc',
    grad: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%)',
    gradBg: 'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(14,165,233,0.1) 0%, transparent 60%)',
  },
  'light-peachy': {
    bg: '#fffdfc', bgCard: '#ffffff', bgSection: '#fff5f0',
    accent: '#f97316', accent2: '#ec4899', text: '#1e293b', textSub: '#64748b',
    grad: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
    gradBg: 'radial-gradient(ellipse at 20% 50%, rgba(249,115,22,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(236,72,153,0.08) 0%, transparent 60%)',
  },
  'light-bloom': {
    bg: '#f8faff', bgCard: '#ffffff', bgSection: '#f0f5ff',
    accent: '#8b5cf6', accent2: '#3b82f6', text: '#0f172a', textSub: '#475569',
    grad: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
    gradBg: 'radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.08) 0%, transparent 60%)',
  },
  'light-minimal': {
    bg: '#f8fafc', bgCard: '#ffffff', bgSection: '#f1f5f9',
    accent: '#6366f1', accent2: '#0ea5e9', text: '#0f172a', textSub: '#64748b',
    grad: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)',
    gradBg: 'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)',
  },
  'glass': {
    bg: '#0d0221', bgCard: 'rgba(255,255,255,0.06)', bgSection: 'rgba(255,255,255,0.03)',
    accent: '#f64f59', accent2: '#c471ed', text: '#ffffff', textSub: '#e2d9f3',
    grad: 'linear-gradient(135deg, #f64f59 0%, #c471ed 50%, #12c2e9 100%)',
    gradBg: 'linear-gradient(135deg, #1a0533 0%, #0d0221 50%, #001a3a 100%)',
  },
};

// ===== GENERATE PORTFOLIO HTML =====
function generatePortfolioHTML(data) {
  const t = themes[data.theme] || themes['dark-purple'];
  const isLight = data.theme.startsWith('light');

  const photoSection = data.photoUrl ? `<div class="hero-photo-wrapper"><img src="${data.photoUrl}" alt="${data.name}" class="hero-photo" onerror="this.style.display='none'" /></div>` : '';

  const socialLinks = [
    data.linkedin && `<a href="${data.linkedin}" target="_blank" class="social-btn"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> LinkedIn</a>`,
    data.github && `<a href="${data.github}" target="_blank" class="social-btn"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg> GitHub</a>`,
    data.twitter && `<a href="${data.twitter}" target="_blank" class="social-btn"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg> Twitter</a>`,
    data.website && `<a href="${data.website}" target="_blank" class="social-btn">🌐 Website</a>`,
    data.email && `<a href="mailto:${data.email}" class="social-btn">✉️ Email</a>`,
  ].filter(Boolean).join('');

  const eduSection = data.education.filter(e => e.degree || e.institution).map(e => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h3 class="item-title">${e.degree || ''}</h3>
        <div class="item-meta">
          <span class="item-org">${e.institution || ''}</span>
          ${e.year ? `<span class="item-date">${e.year}</span>` : ''}
          ${e.grade ? `<span class="item-tag">${e.grade}</span>` : ''}
        </div>
        ${e.description ? `<p class="item-desc">${e.description}</p>` : ''}
      </div>
    </div>
  `).join('');

  const expSection = data.experience.filter(e => e.role || e.company).map(e => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h3 class="item-title">${e.role || ''}</h3>
        <div class="item-meta">
          <span class="item-org">${e.company || ''}</span>
          ${e.duration ? `<span class="item-date">${e.duration}</span>` : ''}
          ${e.location ? `<span class="item-tag">📍 ${e.location}</span>` : ''}
        </div>
        ${e.description ? `<p class="item-desc">${e.description.replace(/•/g, '<br>•')}</p>` : ''}
      </div>
    </div>
  `).join('');

  const techTagsHtml = data.techSkills.map(s => `<span class="skill-tag tech">${s}</span>`).join('');
  const softTagsHtml = data.softSkills.map(s => `<span class="skill-tag soft">${s}</span>`).join('');
  const langTagsHtml = data.languages.map(s => `<span class="skill-tag lang">${s}</span>`).join('');

  const projectCards = data.projects.filter(p => p.name).map(p => `
    <div class="project-card">
      <div class="project-header">
        <h3 class="project-title">${p.name}</h3>
        <div class="project-links">
          ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="proj-link">🔗 Live</a>` : ''}
          ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="proj-link">🐙 Code</a>` : ''}
        </div>
      </div>
      ${p.description ? `<p class="project-desc">${p.description}</p>` : ''}
      ${p.tech ? `<div class="project-tech">${p.tech.split(',').map(t => `<span class="tech-badge">${t.trim()}</span>`).join('')}</div>` : ''}
    </div>
  `).join('');

  const achievementItems = data.achievements.filter(a => a.title).map(a => `
    <div class="achievement-item">
      <div class="ach-icon">🏆</div>
      <div class="ach-content">
        <h4 class="ach-title">${a.title}</h4>
        ${a.year ? `<span class="ach-year">${a.year}</span>` : ''}
        ${a.description ? `<p class="ach-desc">${a.description}</p>` : ''}
      </div>
    </div>
  `).join('');

  const borderColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)';

  // Build closing tags as concatenated strings to prevent
  // the HTML parser from misinterpreting them inside this JS template literal
  const cStyle = '<' + '/style>';
  const cHead = '<' + '/head>';
  const cBody = '<' + '/body>';
  const cHtml = '<' + '/html>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${data.name} – Portfolio</title>
<meta name="description" content="${data.bio.slice(0, 150)}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: ${t.bg};
  --bg-card: ${t.bgCard};
  --bg-section: ${t.bgSection};
  --accent: ${t.accent};
  --accent2: ${t.accent2};
  --text: ${t.text};
  --text-sub: ${t.textSub};
  --grad: ${t.grad};
  --border: ${borderColor};
}
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
}
.bg-glow {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: ${t.gradBg};
}
/* NAV */
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 60px;
  background: ${isLight ? 'rgba(248,250,252,0.9)' : 'rgba(10,8,18,0.8)'};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}
.nav-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 700;
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.nav-links { display: flex; gap: 28px; }
.nav-links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-sub);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-links a:hover { color: var(--accent); }
/* SECTIONS */
section { 
  position: relative; 
  z-index: 1; 
  padding: 100px 60px;
  max-width: 1100px;
  margin: 0 auto;
}
/* HERO */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  gap: 60px;
  padding-top: 140px;
}
.hero-content { flex: 1; }
.hero-greeting {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
  opacity: 0;
  animation: fadeUp 0.6s 0.2s forwards;
}
.hero-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(40px, 5vw, 72px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
  opacity: 0;
  animation: fadeUp 0.6s 0.4s forwards;
}
.hero-name span {
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-title {
  font-size: 22px;
  font-weight: 500;
  color: var(--text-sub);
  margin-bottom: 24px;
  opacity: 0;
  animation: fadeUp 0.6s 0.6s forwards;
}
.hero-bio {
  font-size: 16px;
  line-height: 1.75;
  color: var(--text-sub);
  max-width: 560px;
  margin-bottom: 36px;
  opacity: 0;
  animation: fadeUp 0.6s 0.8s forwards;
}
.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
  opacity: 0;
  animation: fadeUp 0.6s 0.9s forwards;
}
.contact-item {
  font-size: 14px;
  color: var(--text-sub);
}
.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  opacity: 0;
  animation: fadeUp 0.6s 1s forwards;
}
.social-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 18px;
  background: ${isLight ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.06)'};
  border: 1px solid var(--border);
  border-radius: 99px;
  color: var(--text);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s;
}
.social-btn:hover {
  background: rgba(139,92,246,0.2);
  border-color: var(--accent);
  transform: translateY(-2px);
}
.hero-photo-wrapper {
  flex-shrink: 0;
  opacity: 0;
  animation: fadeIn 1s 0.5s forwards;
}
.hero-photo {
  width: 280px;
  height: 280px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid transparent;
  background: var(--grad) border-box;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(139,92,246,0.3);
}
/* SECTION HEADERS */
.section-header {
  margin-bottom: 48px;
  text-align: center;
}
.section-badge {
  display: inline-block;
  padding: 4px 14px;
  background: rgba(139,92,246,0.1);
  border: 1px solid rgba(139,92,246,0.3);
  border-radius: 99px;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 800;
  letter-spacing: -0.02em;
}
.section-title span {
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
/* TIMELINE */
.timeline { 
  position: relative;
  padding-left: 40px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 12px; top: 0; bottom: 0;
  width: 2px;
  background: var(--border);
}
.timeline-item {
  position: relative;
  margin-bottom: 32px;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.5s ease forwards;
}
.timeline-item:nth-child(1) { animation-delay: 0.1s; }
.timeline-item:nth-child(2) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.3s; }
.timeline-dot {
  position: absolute;
  left: -36px;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent);
}
.timeline-content {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px 24px;
  transition: border-color 0.3s;
}
.timeline-content:hover { border-color: rgba(139,92,246,0.3); }
.item-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}
.item-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.item-org { font-size: 14px; font-weight: 600; color: var(--accent); }
.item-date { font-size: 13px; color: var(--text-sub); }
.item-tag {
  font-size: 12px;
  padding: 2px 10px;
  background: rgba(139,92,246,0.1);
  border-radius: 99px;
  color: var(--text-sub);
}
.item-desc {
  font-size: 14px;
  color: var(--text-sub);
  line-height: 1.7;
  white-space: pre-line;
}
/* SKILLS */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
.skills-group {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
}
.skills-group-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-sub);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.skills-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.skill-tag {
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 600;
}
.skill-tag.tech {
  background: var(--bg-section);
  border: 1px solid var(--accent);
  color: var(--accent);
}
.skill-tag.soft {
  background: var(--bg-section);
  border: 1px solid var(--accent2);
  color: var(--accent2);
}
.skill-tag.lang {
  background: var(--bg-section);
  border: 1px solid var(--text-sub);
  color: var(--text);
}
/* PROJECTS */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}
.project-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--grad);
}
.project-card:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
.project-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}
.project-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 700;
}
.project-links { display: flex; gap: 8px; flex-shrink: 0; }
.proj-link {
  font-size: 12px;
  padding: 4px 10px;
  background: var(--bg-section);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text);
  text-decoration: none;
  transition: all 0.2s;
}
.proj-link:hover { border-color: var(--accent); color: var(--accent); }
.project-desc {
  font-size: 14px;
  color: var(--text-sub);
  line-height: 1.65;
  margin-bottom: 16px;
}
.project-tech { display: flex; flex-wrap: wrap; gap: 6px; }
.tech-badge {
  font-size: 11px;
  padding: 3px 10px;
  background: var(--bg-section);
  border: 1px solid var(--accent2);
  border-radius: 99px;
  color: var(--accent2);
}
/* ACHIEVEMENTS */
.achievements-list { display: flex; flex-direction: column; gap: 16px; }
.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px 24px;
  transition: border-color 0.3s;
}
.achievement-item:hover { border-color: rgba(139,92,246,0.3); }
.ach-icon { font-size: 24px; flex-shrink: 0; }
.ach-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
}
.ach-year {
  font-size: 12px;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
}
.ach-desc { font-size: 14px; color: var(--text-sub); line-height: 1.6; }
/* FOOTER */
footer {
  text-align: center;
  padding: 40px 60px;
  border-top: 1px solid var(--border);
  color: var(--text-sub);
  font-size: 14px;
  position: relative;
  z-index: 1;
}
footer span {
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}
/* ANIMATIONS */
@keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes slideIn { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:none; } }
/* SCROLLBAR */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 99px; }
/* RESPONSIVE */
@media (max-width: 768px) {
  nav { padding: 14px 20px; }
  .nav-links { display: none; }
  section { padding: 80px 24px; }
  .hero { flex-direction: column-reverse; gap: 32px; padding-top: 100px; }
  .hero-photo { width: 180px; height: 180px; }
}
${cStyle}
${cHead}
<body>
<div class="bg-glow"></div>

<nav>
  <span class="nav-name">${data.name}</span>
  <div class="nav-links">
    ${data.education.length ? '<a href="#education">Education</a>' : ''}
    ${data.experience.length ? '<a href="#experience">Experience</a>' : ''}
    ${(data.techSkills.length || data.softSkills.length) ? '<a href="#skills">Skills</a>' : ''}
    ${data.projects.length ? '<a href="#projects">Projects</a>' : ''}
    ${data.achievements.length ? '<a href="#achievements">Achievements</a>' : ''}
    ${data.email ? `<a href="mailto:${data.email}">Contact</a>` : ''}
  </div>
</nav>

<!-- HERO -->
<section class="hero" id="hero">
  <div class="hero-content">
    <p class="hero-greeting">👋 Hey there, I'm</p>
    <h1 class="hero-name"><span>${data.name}</span></h1>
    <p class="hero-title">${data.title}</p>
    ${data.bio ? `<p class="hero-bio">${data.bio}</p>` : ''}
    <div class="contact-info">
      ${data.location ? `<span class="contact-item">📍 ${data.location}</span>` : ''}
      ${data.email ? `<span class="contact-item">✉️ ${data.email}</span>` : ''}
      ${data.phone ? `<span class="contact-item">📞 ${data.phone}</span>` : ''}
    </div>
    <div class="social-links">${socialLinks}</div>
  </div>
  ${photoSection}
</section>

${data.education.filter(e => e.degree || e.institution).length ? `
<!-- EDUCATION -->
<section id="education">
  <div class="section-header">
    <div class="section-badge">📚 Education</div>
    <h2 class="section-title">Academic <span>Background</span></h2>
  </div>
  <div class="timeline">${eduSection}</div>
</section>
` : ''}

${data.experience.filter(e => e.role || e.company).length ? `
<!-- EXPERIENCE -->
<section id="experience">
  <div class="section-header">
    <div class="section-badge">💼 Experience</div>
    <h2 class="section-title">Work <span>Experience</span></h2>
  </div>
  <div class="timeline">${expSection}</div>
</section>
` : ''}

${(data.techSkills.length || data.softSkills.length || data.languages.length) ? `
<!-- SKILLS -->
<section id="skills">
  <div class="section-header">
    <div class="section-badge">⚡ Skills</div>
    <h2 class="section-title">Skills & <span>Technologies</span></h2>
  </div>
  <div class="skills-grid">
    ${data.techSkills.length ? `<div class="skills-group"><div class="skills-group-title">🛠️ Technical Skills</div><div class="skills-tags">${techTagsHtml}</div></div>` : ''}
    ${data.softSkills.length ? `<div class="skills-group"><div class="skills-group-title">🤝 Soft Skills</div><div class="skills-tags">${softTagsHtml}</div></div>` : ''}
    ${data.languages.length ? `<div class="skills-group"><div class="skills-group-title">🌍 Languages</div><div class="skills-tags">${langTagsHtml}</div></div>` : ''}
  </div>
</section>
` : ''}

${data.projects.filter(p => p.name).length ? `
<!-- PROJECTS -->
<section id="projects">
  <div class="section-header">
    <div class="section-badge">🚀 Projects</div>
    <h2 class="section-title">Featured <span>Projects</span></h2>
  </div>
  <div class="projects-grid">${projectCards}</div>
</section>
` : ''}

${data.achievements.filter(a => a.title).length ? `
<!-- ACHIEVEMENTS -->
<section id="achievements">
  <div class="section-header">
    <div class="section-badge">🏆 Achievements</div>
    <h2 class="section-title">Awards & <span>Achievements</span></h2>
  </div>
  <div class="achievements-list">${achievementItems}</div>
</section>
` : ''}

<footer>
  <p>Built with ❤️ by <span>${data.name}</span> • Made using PortfolioForge</p>
</footer>
${cBody}
${cHtml}`;
}

// ===== PREVIEW =====
function openPreview() {
  const data = getData();
  const html = generatePortfolioHTML(data);
  const iframe = document.getElementById('previewIframe');
  iframe.srcdoc = html;
  document.getElementById('previewModal').classList.add('open');
  document.getElementById('previewOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePreview() {
  document.getElementById('previewModal').classList.remove('open');
  document.getElementById('previewOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== DOWNLOAD =====
function downloadPortfolio() {
  const data = getData();
  if (!data.name) {
    showToast('⚠️ Please fill in your name first (Step 1).');
    return;
  }
  const html = generatePortfolioHTML(data);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Keep the blob URL alive to prevent ERR_FILE_NOT_FOUND in some browsers
  showToast('✅ Portfolio downloaded! Rename to index.html and drop on Netlify.');
}

// ===== NETLIFY DEPLOY =====
function openNetlifyDeploy() {
  downloadPortfolio();
  setTimeout(() => window.open('https://app.netlify.com/drop', '_blank'), 800);
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:32px; left:50%; transform:translateX(-50%);
    background:#1a2035; border:1px solid rgba(139,92,246,0.4);
    color:#f1f5f9; padding:14px 24px; border-radius:12px;
    font-size:14px; font-weight:500; z-index:9999;
    box-shadow:0 8px 30px rgba(0,0,0,0.5);
    animation:toastIn 0.3s ease;
    max-width:90vw; text-align:center;
  `;
  toast.textContent = msg;
  const s = document.createElement('style');
  s.textContent = '@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
  document.head.appendChild(s);
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 4000);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePreview();
});

// ===== AUTO-SAVE to localStorage =====
function autoSave() {
  const data = getData();
  localStorage.setItem('portfolioData', JSON.stringify(data));
}

setInterval(autoSave, 3000);

// ===== Initialize: add at least one of each =====
addEducation();
addExperience();
addProject();
addAchievement();
