// script.js
document.getElementById('scrollButton').addEventListener('click', () => {
    const mapSection = document.getElementById('mapSection');
    if (mapSection) {
        const rect = mapSection.getBoundingClientRect();
        const scrollToPosition = rect.top + window.scrollY;
        
        window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
        });
    }
});