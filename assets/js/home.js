// BANNER
let banners = document.querySelectorAll('.banner-area a');
let counters = document.querySelectorAll('.banner-counter-item');
let currentBanner = 0;
let bannerInterval;

banners.forEach((banner, index) => {
    banner.classList.add('absolute', 'inset-0', 'block', 'transition-opacity', 'duration-300');
    banner.classList.toggle('opacity-100', index === currentBanner);
    banner.classList.toggle('opacity-0', index !== currentBanner);
    banner.querySelector('img')?.classList.add('w-full');
});

counters.forEach((item, key) => {
    item.addEventListener('click', () => {
        currentBanner = key;
        showBanner(key);
        restartBannerTimer();
    });
});

restartBannerTimer();

function showBanner(n) {
    banners.forEach((banner, index) => {
        banner.classList.toggle('opacity-100', index === n);
        banner.classList.toggle('opacity-0', index !== n);
        banner.classList.toggle('z-10', index === n);
    });

    counters.forEach((counter, index) => {
        counter.classList.toggle('opacity-100', index === n);
        counter.classList.toggle('opacity-30', index !== n);
    });
}

function restartBannerTimer() {
    clearInterval(bannerInterval);
    bannerInterval = setInterval(nextBanner, 2000);
}

function nextBanner() {
    if (currentBanner + 1 >= banners.length) {
        currentBanner = 0;
    } else {
        currentBanner++;
    }

    showBanner(currentBanner);
}
