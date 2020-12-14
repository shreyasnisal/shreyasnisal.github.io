$('.menu-toggler').on('click', function () {
    $(this).toggleClass('open');
    $('.sidenav').toggleClass('open');
    $(this).toggleClass('not-open')
});

$('.sidenav .nav-link').on('click', function () {
    $('.menu-toggler').removeClass('open');
    $('.sidenav').removeClass('open');
});