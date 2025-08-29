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
                // The main content panel is the element that scrolls
                mainContent.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Use Intersection Observer to automatically update active nav link on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to the corresponding link
                document.querySelector(`.nav-link[data-target="${targetId}"]`).classList.add('active');
            }
        });
    }, {
        root: mainContent, // Observe intersections within the main scrolling container
        threshold: 0.5 // Section is active when 50% is visible
    });

    contentSections.forEach(section => {
        observer.observe(section);
    });
});
