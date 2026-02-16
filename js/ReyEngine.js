
// Games Carousel
let gamesCarousel_currentIndex = 0;
const gamesCarousel_totalSlides = 6;
const gamesCarousel = document.getElementById("games-carousel");

const gamesThumbnailsContainer = document.getElementById("games-thumbnails");

// Generate Thumbnails
const gamesSlideImages = [
    "../../img/ReyEngine/Starship.gif",
    "../../img/ReyEngine/Libra.gif",
    "../../img/Doomenstein/Doomenstein.gif",
    "../../img/SimpleMinerVR/SimpleMinerVR.gif",
    "../../img/Vaporum/Vaporum_Attacks.gif",
    "../../img/ReyTD/ReyTD_Animated.gif"
];

gamesSlideImages.forEach((src, index) => {
    const thumb = document.createElement("div");
    thumb.classList.add("thumbnail");
    if (index === 0) thumb.classList.add("active"); // First thumbnail is active

    const img = document.createElement("img");
    img.src = src;
    
    thumb.appendChild(img);
    thumb.onclick = () => goToGamesSlide(index);

    gamesThumbnailsContainer.appendChild(thumb);
});

function rotateGamesCarousel(direction) {
    let newIndex = gamesCarousel_currentIndex + direction;

    if (newIndex < 0 || newIndex >= gamesCarousel_totalSlides) return;

    goToGamesSlide(newIndex);
}

function goToGamesSlide(index) {
    gamesCarousel_currentIndex = index;
    gamesCarousel.style.transform = `translateX(${-gamesCarousel_currentIndex * 100}%)`;

    updateGamesNavigationButtons();
    updateGamesActiveThumbnail();
}

function updateGamesNavigationButtons() {
    const prevButton = document.querySelector("#games-carousel-container .prev");
    const nextButton = document.querySelector("#games-carousel-container .next");

    prevButton.classList.toggle("disabled", gamesCarousel_currentIndex === 0);
    nextButton.classList.toggle("disabled", gamesCarousel_currentIndex === gamesCarousel_totalSlides - 1);
}

function updateGamesActiveThumbnail() {
    document.querySelectorAll("#games-thumbnails .thumbnail").forEach((thumb, index) => {
        thumb.classList.toggle("active", index === gamesCarousel_currentIndex);
    });
}

//----------------------------------------------------------------------------

// VisualTests Carousel
let visualTestsCarousel_currentIndex = 0;
const visualTestsCarousel_totalSlides = 3;
const visualTestsCarousel = document.getElementById("visualtests-carousel");

const visualTestsThumbnailsContainer = document.getElementById("visualtests-thumbnails");

// Generate Thumbnails
const visualTestsSlideImages = [
    "../../img/ReyEngine/MVT_Splines.gif",
    "../../img/ReyEngine/MVT_Pachinko.gif",
    "../../img/ReyEngine/MVT_RaycastVsTileGrid.png"
];

visualTestsSlideImages.forEach((src, index) => {
    const thumb = document.createElement("div");
    thumb.classList.add("thumbnail");
    if (index === 0) thumb.classList.add("active"); // First thumbnail is active

    const img = document.createElement("img");
    img.src = src;
    
    thumb.appendChild(img);
    thumb.onclick = () => goToVisualTestsSlide(index);

    visualTestsThumbnailsContainer.appendChild(thumb);
});

function rotateVisualTestsCarousel(direction) {
    let newIndex = visualTestsCarousel_currentIndex + direction;

    if (newIndex < 0 || newIndex >= visualTestsCarousel_totalSlides) return;

    goToVisualTestsSlide(newIndex);
}

function goToVisualTestsSlide(index) {
    visualTestsCarousel_currentIndex = index;
    visualTestsCarousel.style.transform = `translateX(${-visualTestsCarousel_currentIndex * 100}%)`;

    updateVisualTestsNavigationButtons();
    updateVisualTestsActiveThumbnail();
}

function updateVisualTestsNavigationButtons() {
    const prevButton = document.querySelector("#visualtests-carousel-container .prev");
    const nextButton = document.querySelector("#visualtests-carousel-container .next");

    prevButton.classList.toggle("disabled", visualTestsCarousel_currentIndex === 0);
    nextButton.classList.toggle("disabled", visualTestsCarousel_currentIndex === visualTestsCarousel_totalSlides - 1);
}

function updateVisualTestsActiveThumbnail() {
    document.querySelectorAll("#visualtests-thumbnails .thumbnail").forEach((thumb, index) => {
        thumb.classList.toggle("active", index === visualTestsCarousel_currentIndex);
    });
}
