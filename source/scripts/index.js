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


//scroll button

const leftButton = document.getElementById('scrollToLeft');
const rightButton = document.getElementById('scrollToRight');
const nav = document.querySelector('.nav');

rightButton.addEventListener('click', () => {
  nav.scrollBy({
    left: 50,
    behavior: 'smooth',
  });


// Показываем кнопку "Влево"
leftButton.style.visibility = 'visible';
leftButton.style.opacity = '1';

// Проверяем, достигли ли конца, чтобы скрыть кнопку "Вправо"
const maxScrollLeft = nav.scrollWidth - nav.clientWidth;
setTimeout(() => {
  if (nav.scrollLeft >= maxScrollLeft) {
    rightButton.classList.add('hidden');
  }
}, 500);
});

// Скролл влево
leftButton.addEventListener('click', () => {
nav.scrollBy({
  left: -50,
  behavior: 'smooth',
});

// Показываем кнопку "Вправо"
rightButton.classList.remove('hidden');

// Скрываем кнопку "Влево", если вернулись к началу
setTimeout(() => {
  if (nav.scrollLeft === 0) {
    leftButton.style.visibility = 'hidden';
    leftButton.style.opacity = '0';
  }
}, 500);
});
