document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const mainContent = document.querySelector('.main-content');

    // Function to handle click-to-scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Function to update active link based on scroll position
    const updateActiveLink = () => {
        let currentSectionId = '';
        
        contentSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            // Check if the scroll position is within the bounds of the section
            if (mainContent.scrollTop >= sectionTop - sectionHeight / 3) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.target === currentSectionId) {
                link.classList.add('active');
            }
        });
    };
    
    // Use Intersection Observer for more efficient scroll tracking
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.target === targetId);
                });
            }
        });
    }, {
        root: mainContent,
        threshold: 0.5 // Section is considered active when 50% is visible
    });

    contentSections.forEach(section => {
        observer.observe(section);
    });
});
