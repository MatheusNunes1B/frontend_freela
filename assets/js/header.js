let menuBurger = document.querySelector('.menu-burger');
let headerMenu = document.querySelector('.header-menu');
let menuIconOff = menuBurger?.querySelector('.off');
let menuIconOn = menuBurger?.querySelector('.on');

menuBurger?.addEventListener('click', () => {
    const isOpen = !headerMenu.classList.contains('hidden');

    headerMenu.classList.toggle('hidden', isOpen);
    menuBurger.classList.toggle('bg-brand', !isOpen);
    menuIconOff?.classList.toggle('hidden', !isOpen);
    menuIconOn?.classList.toggle('hidden', isOpen);
});
