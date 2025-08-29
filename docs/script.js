document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    // Function to set the active section
    const setActiveSection = (targetId) => {
        // Update content sections
        contentSections.forEach(section => {
            section.classList.toggle('active', section.id === targetId);
        });

        // Update navigation links
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.target === targetId);
        });
    };

    // Event listener for navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;
            setActiveSection(targetId);
            // Optional: Update URL hash for better history
            window.location.hash = targetId;
        });
    });

    // Check for a hash in the URL on page load
    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
        setActiveSection(currentHash);
    } else {
        // Default to the 'home' section if no hash is present
        setActiveSection('home');
    }
});
