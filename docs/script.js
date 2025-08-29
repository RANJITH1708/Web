document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    // Function to set the active section based on a target ID
    const setActiveSection = (targetId) => {
        // Hide all content sections and remove active class from all links
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Show the target content section and set the corresponding link to active
        const targetSection = document.getElementById(targetId);
        const targetLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);

        if (targetSection) {
            targetSection.classList.add('active');
        }
        if (targetLink) {
            targetLink.classList.add('active');
        }
    };

    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor link behavior
            const targetId = link.dataset.target;
            setActiveSection(targetId);
            // Optionally update the URL hash
            window.history.pushState(null, null, `#${targetId}`);
        });
    });

    // Check for a hash in the URL on initial page load
    const currentHash = window.location.hash.substring(1);
    if (currentHash && document.getElementById(currentHash)) {
        setActiveSection(currentHash);
    } else {
        // Default to the 'home' section if no valid hash is present
        setActiveSection('home');
    }
});
