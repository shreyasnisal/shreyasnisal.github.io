
// DonuTilt Carousel
let donutiltCarousel_currentIndex = 0;
const donutiltCarousel_totalSlides = 5;
const donutiltCarousel = document.getElementById("donutilt-carousel");

const donutiltThumbnailsContainer = document.getElementById("donutilt-thumbnails");

// Generate Thumbnails
const donutiltSlideImages = [
    "../../img/DonuTilt/LevelSelect.png",
    "../../img/DonuTilt/SimpleLevel.png",
    "../../img/DonuTilt/ComplexLevel.png",
    "../../img/DonuTilt/Victory.png",
    "../../img/DonuTilt/Credits.png"
];

donutiltSlideImages.forEach((src, index) => {
    const thumb = document.createElement("div");
    thumb.classList.add("thumbnail");
    if (index === 0) thumb.classList.add("active"); // First thumbnail is active

    const img = document.createElement("img");
    img.src = src;
    
    thumb.appendChild(img);
    thumb.onclick = () => goToDonutiltSlide(index);

    donutiltThumbnailsContainer.appendChild(thumb);
});

function rotateDonutiltCarousel(direction) {
    let newIndex = donutiltCarousel_currentIndex + direction;

    if (newIndex < 0 || newIndex >= donutiltCarousel_totalSlides) return;

    goToDonutiltSlide(newIndex);
}

function goToDonutiltSlide(index) {
    donutiltCarousel_currentIndex = index;
    donutiltCarousel.style.transform = `translateX(${-donutiltCarousel_currentIndex * 100}%)`;

    updateDonutiltNavigationButtons();
    updateDonutiltActiveThumbnail();
}

function updateDonutiltNavigationButtons() {
    const prevButton = document.querySelector("#donutilt-carousel-container .prev");
    const nextButton = document.querySelector("#donutilt-carousel-container .next");

    prevButton.classList.toggle("disabled", donutiltCarousel_currentIndex === 0);
    nextButton.classList.toggle("disabled", donutiltCarousel_currentIndex === donutiltCarousel_totalSlides - 1);
}

function updateDonutiltActiveThumbnail() {
    document.querySelectorAll("#donutilt-thumbnails .thumbnail").forEach((thumb, index) => {
        thumb.classList.toggle("active", index === donutiltCarousel_currentIndex);
    });
}

//----------------------------------------------------------------------------
