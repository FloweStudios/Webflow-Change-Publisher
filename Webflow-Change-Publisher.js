// Get the current domain
var currentDomain = window.location.hostname;

// Function to manage elements based on domain and attributes
function manageElements() {
    // Select all elements with 'prod' or 'stage' attributes
    var elements = document.querySelectorAll('[prod], [stage]');

    // Determine if the domain is staging
    var isStagingDomain = currentDomain.includes('.webflow.io');

    elements.forEach(function (element) {
        if (isStagingDomain) {
            // If it's the staging domain, show elements with 'stage'
            if (element.hasAttribute('stage')) {
                // Restore original display or default to 'block' if not found
                element.style.display = element.getAttribute('data-original-display') || 'block';
            } else {
                element.remove(); // Remove elements that aren't for staging
            }
        } else {
            // If it's not the staging domain (production), show elements with 'prod'
            if (element.hasAttribute('prod')) {
                // Restore original display or default to 'block' if not found
                element.style.display = element.getAttribute('data-original-display') || 'block';
            } else {
                element.remove(); // Remove elements that aren't for production
            }
        }
    });
}

// Store original display styles early to minimize flickering
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[stage], [prod]').forEach(function (element) {
        // Store the original display value if it's not 'none'
        var originalDisplay = getComputedStyle(element).display;
        if (originalDisplay !== 'none') {
            element.setAttribute('data-original-display', originalDisplay);
        }
    });

    // Run the element management logic
    manageElements();
});
