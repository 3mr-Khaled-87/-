// ========================================================
// Main Script - Unified Theme & Navigation
// ========================================================

const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const darkModeLegacy = document.getElementById('dark');
const lightModeLegacy = document.getElementById('light');

function syncThemeState() {
    const isDark = localStorage.getItem('darkmode') === 'dark';
    if (isDark) {
        document.body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        if (darkModeLegacy) darkModeLegacy.style.opacity = '1';
        if (lightModeLegacy) lightModeLegacy.style.opacity = '0.5';
    } else {
        document.body.classList.remove('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        if (lightModeLegacy) lightModeLegacy.style.opacity = '1';
        if (darkModeLegacy) darkModeLegacy.style.opacity = '0.5';
    }
}

// Single Unified Toggle Button
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isCurrentlyDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkmode', isCurrentlyDark ? '' : 'dark');
        syncThemeState();
    });
}

// Legacy toggle support
if (darkModeLegacy) {
    darkModeLegacy.addEventListener('click', () => {
        localStorage.setItem('darkmode', 'dark');
        syncThemeState();
    });
}
if (lightModeLegacy) {
    lightModeLegacy.addEventListener('click', () => {
        localStorage.setItem('darkmode', '');
        syncThemeState();
    });
}

// Run on page load and listen for theme updates across tabs/pages
syncThemeState();
window.addEventListener('storage', syncThemeState);

// Mobile Navigation active icons
const icons = document.querySelectorAll('.icon');
icons.forEach((icon) => {
    icon.addEventListener('click', () => {
        icons.forEach((i) => i.classList.remove('hero'));
        icon.classList.add('hero');
    });
});

// Changing text with Typed.js (if element exists and Typed is loaded)
const changingTextElem = document.getElementById('changing-text');
if (changingTextElem && typeof Typed !== 'undefined') {
    new Typed('#changing-text', {
        strings: [' القرآن ', ' الأذكار ', ' الأحاديث ', ' مواقيت الصلاة '],
        typeSpeed: 50,
        backSpeed: 10,
        loop: true
    });
}

// Floating Sadaqa Modal (نافذة الصدقة الجارية المنبثقة)
const sadaqaFloatBtn = document.getElementById('sadaqaFloatBtn');
const sadaqaModalBackdrop = document.getElementById('sadaqaModalBackdrop');
const sadaqaModalClose = document.getElementById('sadaqaModalClose');
const sadaqaModalAcceptBtn = document.getElementById('sadaqaModalAcceptBtn');

function openSadaqaModal() {
    if (sadaqaModalBackdrop) sadaqaModalBackdrop.classList.add('active');
}

function closeSadaqaModal() {
    if (sadaqaModalBackdrop) sadaqaModalBackdrop.classList.remove('active');
}

if (sadaqaFloatBtn) {
    sadaqaFloatBtn.addEventListener('click', openSadaqaModal);
}
if (sadaqaModalClose) {
    sadaqaModalClose.addEventListener('click', closeSadaqaModal);
}
if (sadaqaModalAcceptBtn) {
    sadaqaModalAcceptBtn.addEventListener('click', closeSadaqaModal);
}
if (sadaqaModalBackdrop) {
    sadaqaModalBackdrop.addEventListener('click', (e) => {
        if (e.target === sadaqaModalBackdrop) {
            closeSadaqaModal();
        }
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSadaqaModal();
});
