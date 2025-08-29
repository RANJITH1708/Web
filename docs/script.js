document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    // --- 1. SMOOTH SCROLLING ON CLICK ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const targetId = link.dataset.target;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    // --- 2. SCROLLSPY: HIGHLIGHT NAV LINK ON SCROLL ---
    const updateActiveLink = (targetId) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            
            if (link.dataset.target === targetId) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40% 0px', 
        threshold: 0
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveLink(entry.target.id);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    contentSections.forEach(section => {
        observer.observe(section);
    });

    // Handle initial page load with a hash in the URL
    if (window.location.hash) {
        const initialTargetId = window.location.hash.substring(1);
        const initialTargetSection = document.getElementById(initialTargetId);
        if (initialTargetSection) {
            setTimeout(() => {
                initialTargetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
});
