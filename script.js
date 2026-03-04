// ---- Hero Slider ----
(function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    let timer;

    function goTo(n) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (n + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(next, 5000);
    }

    document.getElementById('nextBtn')?.addEventListener('click', () => { next(); startTimer(); });
    document.getElementById('prevBtn')?.addEventListener('click', () => { prev(); startTimer(); });

    dots.forEach(dot => {
        dot.addEventListener('click', () => { goTo(+dot.dataset.index); startTimer(); });
    });

    startTimer();
})();


// ---- Testimonial Slider ----
(function () {
    const cards = document.querySelectorAll('.testi-card');
    let testiIndex = 0;

    function updateTesti(dir) {
        if (window.innerWidth > 900) return;
        cards[testiIndex].style.display = 'none';
        testiIndex = (testiIndex + dir + cards.length) % cards.length;
        cards[testiIndex].style.display = 'block';
    }

    function initTesti() {
        if (window.innerWidth > 900) {
            cards.forEach(c => c.style.display = '');
        } else {
            cards.forEach((c, i) => c.style.display = i === 0 ? 'block' : 'none');
            testiIndex = 0;
        }
    }

    document.getElementById('testiNext')?.addEventListener('click', () => updateTesti(1));
    document.getElementById('testiPrev')?.addEventListener('click', () => updateTesti(-1));

    window.addEventListener('resize', initTesti);
    initTesti();
})();


// ---- Mobile Nav Toggle ----
(function () {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('navMenu');

    toggle?.addEventListener('click', () => {
        menu.classList.toggle('open');
        const open = menu.classList.contains('open');
        toggle.setAttribute('aria-expanded', open);
        const spans = toggle.querySelectorAll('span');
        if (open) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            menu?.classList.remove('open');
            const spans = toggle?.querySelectorAll('span');
            spans?.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });
})();


// ---- Navbar Scroll Style ----
(function () {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar?.classList.add('scrolled');
        else navbar?.classList.remove('scrolled');
    }, { passive: true });
})();


// ---- Scroll Reveal ----
(function () {
    const items = document.querySelectorAll('.reveal');

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });

    function checkImmediate() {
        items.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 200) {
                el.classList.add('visible');
            } else {
                obs.observe(el);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkImmediate);
    } else {
        checkImmediate();
    }

    // Also check on scroll
    window.addEventListener('scroll', () => {
        items.forEach(el => {
            if (!el.classList.contains('visible')) {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight + 80) {
                    el.classList.add('visible');
                    obs.unobserve(el);
                }
            }
        });
    }, { passive: true });
})();


// ---- Counter Animation ----
(function () {
    const counters = document.querySelectorAll('.stat-number');
    let started = false;

    function animateCount(el) {
        const target = +el.dataset.target;
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const tick = () => {
            current += step;
            if (current >= target) { el.textContent = target.toLocaleString(); return; }
            el.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            started = true;
            counters.forEach(animateCount);
            obs.disconnect();
        }
    }, { threshold: 0.3 });

    const strip = document.querySelector('.stats-strip');
    if (strip) obs.observe(strip);
})();


// ---- Scroll to Top ----
(function () {
    const btn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) btn?.classList.add('visible');
        else btn?.classList.remove('visible');
    }, { passive: true });

    btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


// ---- Quick Form Submission ----
(function () {
    const form = document.querySelector('.quick-form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.textContent;
        btn.textContent = '✓ Submitted! We\'ll contact you soon.';
        btn.style.background = '#1a7a3c';
        form.reset();
        setTimeout(() => {
            btn.textContent = orig;
            btn.style.background = '';
        }, 4000);
    });
})();
