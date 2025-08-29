document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    // --- 1. SMOOTH SCROLLING ON CLICK ---
    // This part handles what happens when a user clicks a link in the sidebar.
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent the default browser jump.
            e.preventDefault(); 
            
            const targetId = link.dataset.target;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Use the browser's built-in smooth scroll functionality.
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update the URL hash in the address bar. This is good for accessibility and sharing.
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    // --- 2. SCROLLSPY: HIGHLIGHT NAV LINK ON SCROLL ---
    // This part watches the user scroll and updates the sidebar to show which section they are in.

    // A helper function to update which link is 'active'.
    const updateActiveLink = (targetId) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            
            // If the link's target matches the ID of the section in view, make it active.
            if (link.dataset.target === targetId) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    };

    // Options for the Intersection Observer.
    const observerOptions = {
        root: null, // This means the viewport is the area we are watching.
        // The margin adjusts the "trigger point". This highlights the link when a section 
        // is near the top of the screen, which feels more natural than waiting for the exact top.
        rootMargin: '0px 0px -40% 0px', 
        threshold: 0
    };

    // The function that runs whenever a section enters or leaves the trigger point.
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // isIntersecting is true when the element is in view according to our options.
            if (entry.isIntersecting) {
                updateActiveLink(entry.target.id);
            }
        });
    };

    // Create the observer.
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Tell the observer to start watching each of your content sections.
    contentSections.forEach(section => {
        observer.observe(section);
    });

    // Handle initial page load with a hash in the URL
    if (window.location.hash) {
        const initialTargetId = window.location.hash.substring(1);
        const initialTargetSection = document.getElementById(initialTargetId);
        if (initialTargetSection) {
            // Use a timeout to ensure the scroll happens after the page has fully loaded
            setTimeout(() => {
                initialTargetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
});
