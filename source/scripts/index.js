//burger

const burger = document.querySelector('.burger-icon');
const close = document.querySelector('.catalog__close');
const catalog = document.querySelector('.catalog');

burger.addEventListener('click', function () {
  catalog.classList.add('catalog--open');
});

close.addEventListener('click', function () {
  catalog.classList.remove('catalog--open');
})



const leftButton = document.getElementById('scrollToLeft');
const rightButton = document.getElementById('scrollToRight');
const nav = document.querySelector('.nav');

rightButton.addEventListener('click', () => {
  nav.scrollBy({
    left: 200,
    behavior: 'smooth',
  });


leftButton.style.visibility = 'visible';
leftButton.style.opacity = '1';

const maxScrollLeft = nav.scrollWidth - nav.clientWidth;
setTimeout(() => {
  if (nav.scrollLeft >= maxScrollLeft) {
    rightButton.classList.add('hidden');
  }
}, 500);
});

leftButton.addEventListener('click', () => {
nav.scrollBy({
  left: -200,
  behavior: 'smooth',
});

rightButton.classList.remove('hidden');

setTimeout(() => {
  if (nav.scrollLeft === 0) {
    leftButton.style.visibility = 'hidden';
    leftButton.style.opacity = '0';
  }
}, 500);
});
