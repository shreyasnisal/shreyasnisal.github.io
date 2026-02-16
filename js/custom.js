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

const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const prefersDarkMode = themeQuery.matches;
var themeStr = localStorage.getItem('theme');
var isThemeToggled = false;
if (themeStr !== null)
{
	isThemeToggled = (prefersDarkMode && themeStr === 'light') || (!prefersDarkMode && themeStr === 'dark');
}

if (isThemeToggled)
{
	isThemeToggled = !isThemeToggled;
	toggleTheme();
}

// Hide preloader
$(window).on('load', function() {
	$('#preloader-container').addClass("hidden");
})

function toggleTheme() {
	const rootElement = document.documentElement;

	isThemeToggled = !isThemeToggled;

	var switchToLight = false;
	if (prefersDarkMode)
	{
		switchToLight = isThemeToggled;
	}
	else
	{
		switchToLight = !isThemeToggled;
	}


	if (switchToLight)
	{
		rootElement.style.setProperty('--theme-color', '#E5E5E5');
		rootElement.style.setProperty('--anti-theme-color', '#4F4F4F');
		rootElement.style.setProperty('--primary-text-color', '#828282');
		rootElement.style.setProperty('--secondary-text-color', '#4F4F4F');
		rootElement.style.setProperty('--accent-color', '#9B51E0');
		rootElement.style.setProperty('--shadow-color', '0');
		rootElement.style.setProperty('--light-span-display', 'inline');
		rootElement.style.setProperty('--dark-span-display', 'none');
		rootElement.style.setProperty('--light-tooltip-visibility', 'visible');
		rootElement.style.setProperty('--dark-tooltip-visibility', 'hidden');

		localStorage.setItem('theme', 'light');
	}
	else
	{
		rootElement.style.setProperty('--theme-color', '#121212');
		rootElement.style.setProperty('--anti-theme-color', '#E5E5E5');
		rootElement.style.setProperty('--primary-text-color', '#D1D1D1');
		rootElement.style.setProperty('--secondary-text-color', '#A6A6A6');
		rootElement.style.setProperty('--accent-color', '#7A3EB9');
		rootElement.style.setProperty('--shadow-color', '255');
		rootElement.style.setProperty('--dark-span-display', 'inline');
		rootElement.style.setProperty('--light-span-display', 'none');
		rootElement.style.setProperty('--dark-tooltip-visibility', 'visible');
		rootElement.style.setProperty('--light-tooltip-visibility', 'hidden');

		localStorage.setItem('theme', 'dark');
	}
}

themeQuery.addEventListener('change', () => {
	if (localStorage.getItem('theme') === null)
		toggleTheme();
});
