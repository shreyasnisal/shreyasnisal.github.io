
const sections = ['landing', 'projects', 'youtube', 'about', 'experience', 'publications']

const observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting === true) {
        if (entries[0]['intersectionRatio'] > 0.2) {
            for (var s in sections) {
                if (s !== 'landing') {
                    document.getElementById(sections[s] + '-navitem').classList.remove("selected-navitem");
                }
            }
            document.getElementById(entries[0].target.id + "-navitem").classList.add("selected-navitem");
        }
    }
    else
        document.getElementById(entries[0].target.id + "-navitem").classList.remove("selected-navitem");
}, { threshold: [0, 0.2] });

observer.observe(document.querySelector("#landing"));
observer.observe(document.querySelector("#projects"));
observer.observe(document.querySelector("#youtube"));
observer.observe(document.querySelector("#about"));
observer.observe(document.querySelector("#experience"));
observer.observe(document.querySelector("#publications"));


// Menu-Toggler animations

$('.menu-toggler').on('click', function() {
    $('.top-nav').addClass('open')
    $('.top-nav').removeClass('not-open')
});

$('.menu-toggler-close-button').on('click', function() {
    $('.top-nav').removeClass('open')
    $('top-nav').addClass('not-open')
})

$('.top-nav .nav-link').on('click', function() {
    $('.top-nav').removeClass('open')
    $('.top-nav').addClass('not-open')
});


// Show/Hide project archive
$('.project-archive-link').on('click', function() {
    let link = document.getElementsByClassName('project-archive-link')[0]
                        .getElementsByTagName('p')[0];

    $('.project-archive-link i').toggleClass("fa-chevron-down");

    $('.project-archive-link i').toggleClass("fa-chevron-up");

    if (link.innerText === 'View Project Archive') {
        link.innerText = 'Hide Project Archive'
    }
    else {
        link.innerText = 'View Project Archive'
    }

    $('#project-archive').toggleClass('hidden')
})

// Hide preloader
$(window).on('load', function() {
    $('#preloader-container').addClass("hidden")
})