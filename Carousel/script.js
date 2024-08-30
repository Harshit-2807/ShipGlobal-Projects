class Carousel {
    constructor(element) {
        this.carousel = element;
        this.images = this.carousel.querySelector('.carousel-images');
        this.prevButton = this.carousel.querySelector('.carousel-button-prev');
        this.nextButton = this.carousel.querySelector('.carousel-button-next');
        this.indicators = this.carousel.querySelector('.carousel-indicators');

        this.currentIndex = 0;
        this.imagesCount = 5;
        this.fallbackImageUrl = 'https://picsum.photos/800/400?grayscale';
        this.autoPlayInterval = null;
        this.autoPlayDelay = 750;

        this.init();
    }

    init() {
        this.loadPicsumImages();
        this.createIndicators();
        this.addEventListeners();
        this.showImage(this.currentIndex);
        this.startAutoPlay();
    }

    loadPicsumImages() {
        for (let i = 0; i < this.imagesCount; i++) {
            const img = document.createElement('img');
            img.src = `https://picsum.photos/800/400?random=${i}`;
            img.alt = `Random Picsum Image ${i + 1}`;
            img.classList.add('carousel-image');
            img.addEventListener('error', () => this.handleImageError(img));
            this.images.appendChild(img);
        }
        this.imageElements = this.images.querySelectorAll('.carousel-image');
    }

    handleImageError(img) {
        img.src = this.fallbackImageUrl;
        img.alt = 'Fallback Image';
    }

    createIndicators() {
        for (let i = 0; i < this.imagesCount; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            indicator.dataset.index = i;
            this.indicators.appendChild(indicator);
        }
    }

    addEventListeners() {
        this.prevButton.addEventListener('click', () => this.showPrevImage());
        this.nextButton.addEventListener('click', () => this.showNextImage());
        this.indicators.addEventListener('click', (e) => {
            if (e.target.classList.contains('carousel-indicator')) {
                this.showImage(parseInt(e.target.dataset.index));
            }
        });
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    showImage(index) {
        this.currentIndex = index;
        this.images.style.transform = `translateX(-${index * 100}%)`;
        this.updateIndicators();
    }

    showPrevImage() {
        this.showImage((this.currentIndex - 1 + this.imagesCount) % this.imagesCount);
    }

    showNextImage() {
        this.showImage((this.currentIndex + 1) % this.imagesCount);
    }

    updateIndicators() {
        this.indicators.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoPlay() {
        if (this.autoPlayInterval) return;
        this.autoPlayInterval = setInterval(() => {
            this.showNextImage();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Carousel(document.querySelector('.carousel'));
});