// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", function() {
            const accordionContent = this.nextElementSibling;

            // Close all other accordion items
            const allContents = document.querySelectorAll(".accordion-content");
            allContents.forEach(content => {
                if (content !== accordionContent) {
                    content.style.maxHeight = null;
                }
            });

            // Toggle the current accordion item
            if (accordionContent.style.maxHeight) {
                accordionContent.style.maxHeight = null;
            } else {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            }
        });
    });
});
