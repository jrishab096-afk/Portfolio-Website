export const themes = {
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

// Ensures URLs always have a protocol so they don't become relative links
const safeUrl = (url) => {
  if (!url) return '';
  return /^https?:\/\//i.test(url) ? url : 'https://' + url;
};

export function generatePortfolioHTML(data) {
  const t = themes[data.theme] || themes['dark-purple'];
  const isLight = (data.theme || '').startsWith('light');

  const photoSection = data.photoUrl
    ? `<div class="hero-photo-wrapper"><img src="${data.photoUrl}" alt="${data.name}" class="hero-photo" onerror="this.style.display='none'" /></div>`
    : '';

  let socialLinks = '';
  if (data.linkedin) socialLinks += `<a href="${safeUrl(data.linkedin)}" target="_blank" class="social-icon" title="LinkedIn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>`;
  if (data.github) socialLinks += `<a href="${safeUrl(data.github)}" target="_blank" class="social-icon" title="GitHub"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>`;
  if (data.twitter) socialLinks += `<a href="${safeUrl(data.twitter)}" target="_blank" class="social-icon" title="Twitter"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>`;
  if (data.website) socialLinks += `<a href="${safeUrl(data.website)}" target="_blank" class="social-icon" title="Website"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></a>`;

  const eduSection = (data.education || []).filter(e => e.degree).map(e => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h3 class="item-title">${e.degree}</h3>
        <span class="item-subtitle">${e.institution} <span class="item-date">• ${e.year}</span></span>
        ${e.cgpa ? `<span class="item-cgpa">📊 ${e.cgpa}</span>` : ''}
        ${e.description ? `<p class="item-desc">${e.description}</p>` : ''}
      </div>
    </div>
  `).join('');

  const expSection = (data.experience || []).filter(e => e.role).map(e => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h3 class="item-title">${e.role}</h3>
        <span class="item-subtitle">${e.company} <span class="item-date">• ${e.year}</span></span>
        ${e.description ? `<p class="item-desc">${e.description}</p>` : ''}
      </div>
    </div>
  `).join('');

  const techTagsHtml = (data.techSkills || []).map(s => `<span class="skill-tag tech">${s}</span>`).join('');
  const softTagsHtml = (data.softSkills || []).map(s => `<span class="skill-tag soft">${s}</span>`).join('');
  const langTagsHtml = (data.languages || []).map(s => `<span class="skill-tag lang">${s}</span>`).join('');

  const projectCards = (data.projects || []).filter(p => p.name).map(p => {
    const techBadges = p.technologies ? p.technologies.split(',').map(t => `<span class="tech-badge">${t.trim()}</span>`).join('') : '';
    return `
      <div class="project-card">
        <div class="project-header">
          <h3 class="project-title">${p.name}</h3>
          <div class="project-links">
            ${p.link ? `<a href="${p.link}" target="_blank" class="proj-link">View Project ↗</a>` : ''}
          </div>
        </div>
        <p class="project-desc">${p.description || ''}</p>
        <div class="project-tech">${techBadges}</div>
      </div>
    `;
  }).join('');

  const achievementItems = (data.achievements || []).filter(a => a.title).map(a => `
    <div class="achievement-item">
      <div class="ach-icon">🏆</div>
      <div>
        <h4 class="ach-title">${a.title}</h4>
        <span class="ach-year">${a.year}</span>
        ${a.description ? `<p class="ach-desc">${a.description}</p>` : ''}
      </div>
    </div>
  `).join('');

  const borderColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)';

  // Build HTML safely using array parts to avoid template-literal parser issues with closing tags
  const parts = [];

  parts.push('<!DOCTYPE html>');
  parts.push('<html lang="en">');
  parts.push('<head>');
  parts.push('<meta charset="UTF-8">');
  parts.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
  parts.push(`<title>${data.name || 'Portfolio'} | Portfolio</title>`);
  parts.push('<link rel="preconnect" href="https://fonts.googleapis.com">');
  parts.push('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
  parts.push('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">');

  const css = `
:root {
  --bg: ${t.bg};
  --bg-card: ${t.bgCard};
  --bg-section: ${t.bgSection};
  --accent: ${t.accent};
  --accent2: ${t.accent2};
  --text: ${t.text};
  --text-sub: ${t.textSub};
  --border: ${borderColor};
  --grad: ${t.grad};
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background-color: var(--bg); color: var(--text); line-height: 1.6; overflow-x: hidden; }
.bg-glow { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: ${t.gradBg}; z-index: -1; pointer-events: none; }
nav { display: flex; justify-content: space-between; align-items: center; padding: 24px 60px; border-bottom: 1px solid var(--border); background: var(--bg-card); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 100; }
.nav-name { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
.nav-links { display: flex; gap: 32px; font-size: 14px; font-weight: 500; }
.nav-links a { color: var(--text-sub); text-decoration: none; transition: color 0.2s; }
.nav-links a:hover { color: var(--accent); }
section { padding: 100px 60px; max-width: 1100px; margin: 0 auto; }
.section-header { margin-bottom: 50px; }
.section-badge { display: inline-block; padding: 6px 16px; border-radius: 99px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; background: var(--bg-card); border: 1px solid var(--border); color: var(--text-sub); margin-bottom: 16px; }
.section-title { font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 700; color: var(--text); }
.section-title span { background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero { display: flex; align-items: center; justify-content: space-between; gap: 60px; min-height: calc(100vh - 80px); padding-top: 0; }
.hero-content { flex: 1; max-width: 600px; animation: fadeUp 0.8s ease backwards; }
.hero-greeting { font-size: 20px; color: var(--text-sub); margin-bottom: 16px; font-weight: 500; }
.hero-name { font-family: 'Space Grotesk', sans-serif; font-size: clamp(48px, 6vw, 72px); font-weight: 700; line-height: 1.1; margin-bottom: 16px; letter-spacing: -1px; }
.hero-name span { background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-title { font-size: clamp(20px, 2.5vw, 24px); color: var(--text); font-weight: 500; margin-bottom: 24px; }
.hero-bio { font-size: 16px; color: var(--text-sub); line-height: 1.7; margin-bottom: 40px; }
.contact-info { display: flex; flex-wrap: wrap; gap: 24px; margin-bottom: 40px; }
.contact-item { display: flex; align-items: center; gap: 8px; font-size: 15px; color: var(--text); font-weight: 500; }
.social-links { display: flex; gap: 16px; }
.social-icon { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 12px; border: 1px solid var(--border); background: var(--bg-card); color: var(--text); transition: all 0.2s; }
.social-icon:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-3px); }
.hero-photo-wrapper { position: relative; width: 320px; height: 320px; flex-shrink: 0; animation: fadeIn 1s ease 0.4s backwards; }
.hero-photo-wrapper::before { content:''; position:absolute; inset:-10px; border-radius:50%; background:var(--grad); opacity:0.3; filter:blur(20px); z-index:-1; }
.hero-photo { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; border: 4px solid var(--bg-card); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
.timeline { position: relative; padding-left: 30px; }
.timeline::before { content:''; position:absolute; top:0; bottom:0; left:5px; width:2px; background:var(--border); }
.timeline-item { position: relative; padding-bottom: 40px; }
.timeline-item:last-child { padding-bottom: 0; }
.timeline-dot { position: absolute; left:-30px; top:6px; width:12px; height:12px; border-radius:50%; background:var(--accent); outline:4px solid var(--bg); }
.timeline-content { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; transition: border-color 0.3s; }
.timeline-content:hover { border-color: var(--accent); }
.item-title { font-size: 18px; font-weight: 700; margin-bottom: 6px; }
.item-subtitle { display: block; font-size: 15px; color: var(--accent); font-weight: 600; margin-bottom: 12px; }
.item-date { color: var(--text-sub); font-weight: 500; font-size: 14px; }
.item-cgpa { display: inline-block; margin: 6px 0 10px; font-size: 13px; font-weight: 700; color: var(--accent2); background: var(--bg-section); border: 1px solid var(--accent2); border-radius: 99px; padding: 3px 12px; }
.item-desc { font-size: 14px; color: var(--text-sub); line-height: 1.7; white-space: pre-line; }
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
.skills-group { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
.skills-group-title { font-size: 13px; font-weight: 700; color: var(--text-sub); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 16px; }
.skills-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.skill-tag { padding: 6px 14px; border-radius: 99px; font-size: 13px; font-weight: 600; }
.skill-tag.tech { background: var(--bg-section); border: 1px solid var(--accent); color: var(--accent); }
.skill-tag.soft { background: var(--bg-section); border: 1px solid var(--accent2); color: var(--accent2); }
.skill-tag.lang { background: var(--bg-section); border: 1px solid var(--text-sub); color: var(--text); }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.project-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; position: relative; overflow: hidden; transition: all 0.3s; }
.project-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--grad); }
.project-card:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
.project-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
.project-title { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700; }
.project-links { display: flex; gap: 8px; flex-shrink: 0; }
.proj-link { font-size: 12px; padding: 4px 10px; background: var(--bg-section); border: 1px solid var(--border); border-radius: 6px; color: var(--text); text-decoration: none; transition: all 0.2s; }
.proj-link:hover { border-color: var(--accent); color: var(--accent); }
.project-desc { font-size: 14px; color: var(--text-sub); line-height: 1.65; margin-bottom: 16px; }
.project-tech { display: flex; flex-wrap: wrap; gap: 6px; }
.tech-badge { font-size: 11px; padding: 3px 10px; background: var(--bg-section); border: 1px solid var(--accent2); border-radius: 99px; color: var(--accent2); }
.achievements-list { display: flex; flex-direction: column; gap: 16px; }
.achievement-item { display: flex; align-items: flex-start; gap: 16px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; padding: 20px 24px; transition: border-color 0.3s; }
.achievement-item:hover { border-color: var(--accent); }
.ach-icon { font-size: 24px; flex-shrink: 0; }
.ach-title { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
.ach-year { font-size: 12px; color: var(--accent); font-weight: 600; margin-bottom: 6px; display: block; }
.ach-desc { font-size: 14px; color: var(--text-sub); line-height: 1.6; }
footer { text-align: center; padding: 40px 60px; border-top: 1px solid var(--border); color: var(--text-sub); font-size: 14px; position: relative; z-index: 1; }
footer span { background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; }
@keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 99px; }
@media (max-width: 768px) {
  nav { padding: 14px 20px; }
  .nav-links { display: none; }
  section { padding: 80px 24px; }
  .hero { flex-direction: column-reverse; gap: 32px; padding-top: 100px; }
  .hero-photo-wrapper { width: 180px; height: 180px; }
}
  `.trim();

  // Push style block with safely split closing tag
  parts.push('<style>' + css + '<' + '/style>');
  parts.push('<' + '/head>');
  parts.push('<body>');

  parts.push('<div class="bg-glow"></div>');

  parts.push('<nav>');
  parts.push(`<span class="nav-name">${data.name || ''}</span>`);
  parts.push('<div class="nav-links">');
  if ((data.education || []).length) parts.push('<a href="#education">Education</a>');
  if ((data.experience || []).length) parts.push('<a href="#experience">Experience</a>');
  if ((data.techSkills || []).length || (data.softSkills || []).length) parts.push('<a href="#skills">Skills</a>');
  if ((data.projects || []).length) parts.push('<a href="#projects">Projects</a>');
  if ((data.achievements || []).length) parts.push('<a href="#achievements">Achievements</a>');
  if (data.email) parts.push(`<a href="https://mail.google.com/mail/?view=cm&to=${data.email}" target="_blank">Contact</a>`);
  parts.push('</div>');
  parts.push('</nav>');

  parts.push('<section class="hero" id="hero">');
  parts.push('<div class="hero-content">');
  parts.push(`<h1 class="hero-name"><span>${data.name || ''}</span></h1>`);
  parts.push(`<p class="hero-title">${data.title || ''}</p>`);
  if (data.bio) parts.push(`<p class="hero-bio">${data.bio}</p>`);
  parts.push('<div class="contact-info">');
  if (data.location) parts.push(`<span class="contact-item">📍 ${data.location}</span>`);
  if (data.email) parts.push(`<a href="https://mail.google.com/mail/?view=cm&to=${data.email}" target="_blank" class="contact-item" style="text-decoration:none;color:inherit;">✉️ ${data.email}</a>`);
  if (data.phone) parts.push(`<a href="tel:${data.phone}" class="contact-item" style="text-decoration:none;color:inherit;">📞 ${data.phone}</a>`);
  parts.push('</div>');
  parts.push(`<div class="social-links">${socialLinks}</div>`);
  parts.push('</div>');
  parts.push(photoSection);
  parts.push('</section>');

  if ((data.education || []).filter(e => e.degree || e.institution).length) {
    parts.push('<section id="education">');
    parts.push('<div class="section-header"><div class="section-badge">📚 Education</div><h2 class="section-title">Academic <span>Background</span></h2></div>');
    parts.push(`<div class="timeline">${eduSection}</div>`);
    parts.push('</section>');
  }

  if ((data.experience || []).filter(e => e.role || e.company).length) {
    parts.push('<section id="experience">');
    parts.push('<div class="section-header"><div class="section-badge">💼 Experience</div><h2 class="section-title">Work <span>Experience</span></h2></div>');
    parts.push(`<div class="timeline">${expSection}</div>`);
    parts.push('</section>');
  }

  if ((data.techSkills || []).length || (data.softSkills || []).length || (data.languages || []).length) {
    parts.push('<section id="skills">');
    parts.push('<div class="section-header"><div class="section-badge">⚡ Skills</div><h2 class="section-title">Skills & <span>Technologies</span></h2></div>');
    parts.push('<div class="skills-grid">');
    if ((data.techSkills || []).length) parts.push(`<div class="skills-group"><div class="skills-group-title">🛠️ Technical Skills</div><div class="skills-tags">${techTagsHtml}</div></div>`);
    if ((data.softSkills || []).length) parts.push(`<div class="skills-group"><div class="skills-group-title">🤝 Soft Skills</div><div class="skills-tags">${softTagsHtml}</div></div>`);
    if ((data.languages || []).length) parts.push(`<div class="skills-group"><div class="skills-group-title">🌍 Languages</div><div class="skills-tags">${langTagsHtml}</div></div>`);
    parts.push('</div>');
    parts.push('</section>');
  }

  if ((data.projects || []).filter(p => p.name).length) {
    parts.push('<section id="projects">');
    parts.push('<div class="section-header"><div class="section-badge">🚀 Projects</div><h2 class="section-title">Featured <span>Projects</span></h2></div>');
    parts.push(`<div class="projects-grid">${projectCards}</div>`);
    parts.push('</section>');
  }

  if ((data.achievements || []).filter(a => a.title).length) {
    parts.push('<section id="achievements">');
    parts.push('<div class="section-header"><div class="section-badge">🏆 Achievements</div><h2 class="section-title">Awards & <span>Achievements</span></h2></div>');
    parts.push(`<div class="achievements-list">${achievementItems}</div>`);
    parts.push('</section>');
  }

  parts.push('<footer>');
  parts.push(`<p>© ${new Date().getFullYear()} ${data.name || ''}. All rights reserved.</p>`);
  parts.push('</footer>');

  parts.push('<' + '/body>');
  parts.push('<' + '/html>');

  return parts.join('\n');
}
