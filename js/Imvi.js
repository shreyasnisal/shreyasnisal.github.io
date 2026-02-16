
// Imvi Carousel
let imviCarousel_currentIndex = 0;
const imviCarousel_totalSlides = 3;
const imviCarousel = document.getElementById("imvi-carousel");

const imviThumbnailsContainer = document.getElementById("imvi-thumbnails");

// Generate Thumbnails
const imviSlideImages = [
    "../../img/Imvi/Shrine.png",
    "../../img/Imvi/Shrine_Inscription.png",
    "../../img/Imvi/StarSigil.png"
];

imviSlideImages.forEach((src, index) => {
    const thumb = document.createElement("div");
    thumb.classList.add("thumbnail");
    if (index === 0) thumb.classList.add("active"); // First thumbnail is active

    const img = document.createElement("img");
    img.src = src;
    
    thumb.appendChild(img);
    thumb.onclick = () => goToImviSlide(index);

    imviThumbnailsContainer.appendChild(thumb);
});

function rotateImviCarousel(direction) {
    let newIndex = imviCarousel_currentIndex + direction;

    if (newIndex < 0 || newIndex >= imviCarousel_totalSlides) return;

    goToImviSlide(newIndex);
}

function goToImviSlide(index) {
    imviCarousel_currentIndex = index;
    imviCarousel.style.transform = `translateX(${-imviCarousel_currentIndex * 100}%)`;

    updateImviNavigationButtons();
    updateImviActiveThumbnail();
}

function updateImviNavigationButtons() {
    const prevButton = document.querySelector("#imvi-carousel-container .prev");
    const nextButton = document.querySelector("#imvi-carousel-container .next");

    prevButton.classList.toggle("disabled", imviCarousel_currentIndex === 0);
    nextButton.classList.toggle("disabled", imviCarousel_currentIndex === imviCarousel_totalSlides - 1);
}

function updateImviActiveThumbnail() {
    document.querySelectorAll("#imvi-thumbnails .thumbnail").forEach((thumb, index) => {
        thumb.classList.toggle("active", index === imviCarousel_currentIndex);
    });
}

//----------------------------------------------------------------------------
