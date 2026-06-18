// ============================================================
// SITE DATA LOADER
// Fetches blogs, projects, and certificates from Firestore
// and renders them into the page. If Firebase isn't configured
// yet, this file quietly does nothing and the static HTML
// content already in index.html stays visible.
// ============================================================

import { db, collection, getDocs, query, orderBy, isFirebaseConfigured } from './firebase-init.js';

const ICONS = {
    web: 'fa-solid fa-laptop-code',
    python: 'fa-brands fa-python',
    ai: 'fa-solid fa-brain'
};

function escapeHtml(str = '') {
    const div = document.createElement('div');
    div.innerText = str;
    return div.innerHTML;
}

// ---------- PROJECTS ----------
async function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    try {
        const snap = await getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc')));
        if (snap.empty) return; // keep static fallback content

        grid.innerHTML = '';
        snap.forEach(docSnap => {
            const p = docSnap.data();
            const card = document.createElement('div');
            card.className = `glass-card project-card item-${p.category || 'web'}`;
            card.setAttribute('data-category', p.category || 'web');
            card.innerHTML = `
                <div class="project-img">
                    <img src="${escapeHtml(p.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80')}" alt="${escapeHtml(p.title)}">
                    <div class="project-overlay"><i class="fa-solid fa-eye"></i></div>
                </div>
                <div class="project-content">
                    <span class="project-category">${escapeHtml(p.categoryLabel || p.category || 'Project')}</span>
                    <h4>${escapeHtml(p.title)}</h4>
                    <p>${escapeHtml(p.description)}</p>
                    <div class="tech-stack">
                        ${(p.tech || []).map(t => `<span>${escapeHtml(t)}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${p.codeUrl ? `<a href="${escapeHtml(p.codeUrl)}" target="_blank" class="btn btn-outline"><i class="fa-brands fa-github"></i> Code</a>` : ''}
                        ${p.liveUrl ? `<a href="${escapeHtml(p.liveUrl)}" target="_blank" class="btn"><i class="fa-solid fa-link"></i> Live</a>` : ''}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        if (window.bindPortfolioFilter) window.bindPortfolioFilter();
        if (window.bindImageModal) window.bindImageModal();
        if (window.bindCursorHover) window.bindCursorHover();
        if (window.AOS) window.AOS.refreshHard();
    } catch (err) {
        console.error('[Projects] Failed to load from Firestore:', err);
    }
}

// ---------- CERTIFICATES ----------
async function renderCertificates() {
    const grid = document.getElementById('certsGrid');
    if (!grid) return;

    try {
        const snap = await getDocs(query(collection(db, 'certificates'), orderBy('createdAt', 'desc')));
        if (snap.empty) return; // keep static fallback content

        grid.innerHTML = '';
        snap.forEach(docSnap => {
            const c = docSnap.data();
            const card = document.createElement('div');
            card.className = 'glass-card cert-card';
            card.innerHTML = `
                <img src="${escapeHtml(c.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80')}" alt="${escapeHtml(c.title)}">
                <h4>${escapeHtml(c.title)}</h4>
                <p class="text-muted" style="font-size: 0.8rem;">${escapeHtml(c.issuer || '')}${c.year ? ' / ' + escapeHtml(String(c.year)) : ''}</p>
            `;
            grid.appendChild(card);
        });

        if (window.bindImageModal) window.bindImageModal();
        if (window.bindCursorHover) window.bindCursorHover();
        if (window.AOS) window.AOS.refreshHard();
    } catch (err) {
        console.error('[Certificates] Failed to load from Firestore:', err);
    }
}

// ---------- BLOG ----------
let allPosts = [];

async function renderBlogs() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;

    try {
        const snap = await getDocs(query(collection(db, 'blogs'), orderBy('createdAt', 'desc')));

        if (snap.empty) {
            grid.innerHTML = `
                <div class="blog-empty">
                    <i class="fa-solid fa-feather-pointed"></i>
                    <p>No blog posts yet. New posts will appear here soon.</p>
                </div>`;
            return;
        }

        allPosts = [];
        grid.innerHTML = '';

        snap.forEach(docSnap => {
            const post = { id: docSnap.id, ...docSnap.data() };
            allPosts.push(post);

            const dateObj = post.date ? new Date(post.date) : (post.createdAt?.toDate ? post.createdAt.toDate() : new Date());
            const dateLabel = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

            const card = document.createElement('div');
            card.className = 'glass-card blog-card';
            card.setAttribute('data-aos', 'fade-up');
            card.innerHTML = `
                <div class="blog-img">
                    <img src="${escapeHtml(post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=700&q=80')}" alt="${escapeHtml(post.title)}">
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="fa-regular fa-calendar"></i> ${dateLabel}</span>
                        <span><i class="fa-regular fa-folder"></i> ${escapeHtml(post.category || 'General')}</span>
                    </div>
                    <h4>${escapeHtml(post.title)}</h4>
                    <p>${escapeHtml(post.excerpt || (post.content ? post.content.slice(0, 110) + '...' : ''))}</p>
                    <span class="blog-readmore">Read More <i class="fa-solid fa-arrow-right"></i></span>
                </div>
            `;
            card.addEventListener('click', () => window.openBlogModal(post));
            grid.appendChild(card);
        });

        if (window.bindCursorHover) window.bindCursorHover();
        if (window.AOS) window.AOS.refreshHard();
    } catch (err) {
        console.error('[Blog] Failed to load from Firestore:', err);
        grid.innerHTML = `
            <div class="blog-empty">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p>Could not load blog posts right now.</p>
            </div>`;
    }
}

// ---------- INIT ----------
if (isFirebaseConfigured) {
    renderProjects();
    renderCertificates();
    renderBlogs();
} else {
    console.info('[Site Data] Firebase not configured yet — showing static placeholder content.');
}
