var i = 0;
var textIndex = 1;
var speed = 80;
var txt = '<Hi! I am Shreyas />';

var sections = ['home', 'projects', 'programmingvideos', 'about', 'connect']

var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true) {
        if (entries[0]['intersectionRatio'] > 0.2) {
            for (var s in sections) {
            document.getElementById(sections[s] + '-navitem').classList.remove("selected-navitem");
        }
        document.getElementById(entries[0].target.id + "-navitem").classList.add("selected-navitem");
        }
    }
    else
        document.getElementById(entries[0].target.id + "-navitem").classList.remove("selected-navitem");
}, { threshold: [0, 0.2] });

observer.observe(document.querySelector("#home"));
observer.observe(document.querySelector("#projects"));
observer.observe(document.querySelector("#programmingvideos"));
observer.observe(document.querySelector("#about"));
observer.observe(document.querySelector("#connect"));

typeWriter();


function typeWriter() {
    if (i < txt.length) {
        document.getElementById('typeText').innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

function blinkCursor() {
    if (blink)
        document.getElementById(textId).innerHTML += '_';
    
    blink = (blink + 1) % 2;
//    setTimeout(blinkCursor, speed);
}


$('.menu-toggler').on('click', function() {
    $(this).toggleClass('open');
    $('.sidenav').toggleClass('open');
    $(this).toggleClass('not-open')
});

$('.sidenav .nav-link').on('click', function() {
    $('.menu-toggler').removeClass('open');
    $('.sidenav').removeClass('open');
});
