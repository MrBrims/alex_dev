new Parallax(document.getElementById('scene'));
new Parallax(document.getElementById('scene1'));
new Parallax(document.getElementById('scene2'));
new Parallax(document.getElementById('scene3'));

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});

(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();



const tabItem = Array.from(document.querySelectorAll('.tabs__nav-items'))
const tabContent = Array.from(document.querySelectorAll('.tabs__content-item'))

const clearActiveClass = (element, className = '--active-tab') => {
  element.find(item => item.classList.remove(`${className}`))
}

const addActiveClass = (element, index, className = '--active-tab') => {
  element[index].classList.add(`${className}`)
}

const checkoutTabs = (item, index) => {
  item.addEventListener('click', () => {

    if (item.classList.contains('--active-tab')) return

    clearActiveClass(tabItem)
    clearActiveClass(tabContent)

    addActiveClass(tabItem, index)
    addActiveClass(tabContent, index)
  })
}

tabItem.forEach(checkoutTabs)


const marketingItem = Array.from(document.querySelectorAll('.marketing__name-box'))
const marketingContent = Array.from(document.querySelectorAll('.marketing__description'))

const clearMarketingClass = (element, className = '--marketing-active') => {
  element.find(item => item.classList.remove(`${className}`))
}

const addMarketingClass = (element, index, className = '--marketing-active') => {
  element[index].classList.add(`${className}`)
}

const checkoutMarketingTabs = (item, index) => {
  item.addEventListener('click', () => {

    if (item.classList.contains('--marketing-active')) return

    clearMarketingClass(marketingItem)
    clearMarketingClass(marketingContent)

    addMarketingClass(marketingItem, index)
    addMarketingClass(marketingContent, index)
  })
}

marketingItem.forEach(checkoutMarketingTabs)


var swiper = new Swiper(".swiperPartners", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: ".partners__slider-next",
    prevEl: ".partners__slider-prev",
  },
  pagination: {
    el: ".partners-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    880: {
      slidesPerView: 3,
    },
  },
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav__link').forEach((link) => {
        link.classList.toggle(
          'nav__link--active',
          link.getAttribute('href').replace('#', '') === entry.target.id
        );
      });
    }
  });
}, {
  threshold: 0.5,
});

document.querySelectorAll('.section').forEach(
  (section) => observer.observe(section),
);


const menuLinks = document.querySelectorAll('.nav__link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}

const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');
const sidebarClose = document.querySelector('.sidebar__close');
const contentSidebarClose = document.querySelector('.content', '::before')
if (menuBtn) {
  menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle('--sidebar-active');
    sidebar.classList.toggle('--sidebar-active');
    content.classList.toggle('--sidebar-active');
  });
}
if (sidebarClose) {
  sidebarClose.addEventListener("click", function () {
    menuBtn.classList.toggle('--sidebar-active');
    sidebar.classList.toggle('--sidebar-active');
    content.classList.toggle('--sidebar-active');
  });
}
if (contentSidebarClose) {
  contentSidebarClose.addEventListener("click", function () {
    menuBtn.classList.remove('--sidebar-active');
    sidebar.classList.remove('--sidebar-active');
    content.classList.remove('--sidebar-active');
  });
}
