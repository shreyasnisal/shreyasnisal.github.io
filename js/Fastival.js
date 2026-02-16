
// Fastival Carousel
let fastivalCarousel_currentIndex = 0;
const fastivalCarousel_totalSlides = 4;
const fastivalCarousel = document.getElementById("fastival-carousel");

const fastivalThumbnailsContainer = document.getElementById("fastival-thumbnails");

// Generate Thumbnails
const fastivalSlideImages = [
    "../../img/Fastival/CharacterSelect.png",
    "../../img/Fastival/SinglePlayer.png",
    "../../img/Fastival/Split2.png",
    "../../img/Fastival/Split4.png"
];

fastivalSlideImages.forEach((src, index) => {
    const thumb = document.createElement("div");
    thumb.classList.add("thumbnail");
    if (index === 0) thumb.classList.add("active"); // First thumbnail is active

    const img = document.createElement("img");
    img.src = src;
    
    thumb.appendChild(img);
    thumb.onclick = () => goToFastivalSlide(index);

    fastivalThumbnailsContainer.appendChild(thumb);
});

function rotateFastivalCarousel(direction) {
    let newIndex = fastivalCarousel_currentIndex + direction;

    if (newIndex < 0 || newIndex >= fastivalCarousel_totalSlides) return;

    goToFastivalSlide(newIndex);
}

function goToFastivalSlide(index) {
    fastivalCarousel_currentIndex = index;
    fastivalCarousel.style.transform = `translateX(${-fastivalCarousel_currentIndex * 100}%)`;

    updateFastivalNavigationButtons();
    updateFastivalActiveThumbnail();
}

function updateFastivalNavigationButtons() {
    const prevButton = document.querySelector("#fastival-carousel-container .prev");
    const nextButton = document.querySelector("#fastival-carousel-container .next");

    prevButton.classList.toggle("disabled", fastivalCarousel_currentIndex === 0);
    nextButton.classList.toggle("disabled", fastivalCarousel_currentIndex === fastivalCarousel_totalSlides - 1);
}

function updateFastivalActiveThumbnail() {
    document.querySelectorAll("#fastival-thumbnails .thumbnail").forEach((thumb, index) => {
        thumb.classList.toggle("active", index === fastivalCarousel_currentIndex);
    });
}

//----------------------------------------------------------------------------
