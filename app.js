window.addEventListener('DOMContentLoaded', () => {

    // Tabs
 
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent( i = 0 ) {
        tabsContent[ i ].classList.add('show');
        tabsContent[ i ].classList.remove('hide');
        tabs[ i ].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click",(event) => {
        const target = event.target;
    
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item,i) => {
            if(target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }

    });

    // NavLinks

const navLinks = document.querySelectorAll('.nav__link[data-nav]');
if(navLinks.length > 0) {
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', onNavLinkClick);
    });
}

function onNavLinkClick(e) {
    const navLink = e.target;
    if(navLink.dataset.nav && document.querySelector(navLink.dataset.nav)) {
        const navBlock = document.querySelector(navLink.dataset.nav);
        const navBlockValue = navBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
        
        window.scrollTo({
            top:navBlockValue,
            behavior:"smooth"
        });

    }
}

// Timer

const deadline = '2022-08-30';

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000*60*60*24)),
          hours = Math.floor((t / 1000*60*60) % 24),
          minutes = Math.floor((t / 1000/60) % 60),
          seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days':days,
        'hours':hours,
        'minutes':minutes,
        'seconds': seconds
    };
}

function getZero(num) {
    if(num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock(selector,endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours); 
        minutes.innerHTML = getZero(t.minutes); 
        seconds.innerHTML = getZero(t.seconds);  

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock('.timer', deadline);


/*Modal***************/

const modalOpen = document.querySelector('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]') ;


function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow='hidden';
    
}      
modalOpen.addEventListener('click', openModal );

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow='';
}

modalCloseBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if ( e.code === "Escape" && modal.classList.contains('show')) {
        closeModal();
    }
});

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll',showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);

// Calc

const result = document.querySelector('.calculating__result span');
let sex = 'female' ,
    height,weight,age,
    ratio = 1.375;

function calcTotal() {
    if (!sex || !height || !weight || !age  || !ratio) {
        result.textContent = '____';
        return;
    }

    if (sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }

}

calcTotal();

function getStaticInformation(parentSelector,activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    
    elements.forEach(elem => {  
        elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
            } else {
                sex = e.target.getAttribute('id');    
            }
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });
    
            e.target.classList.add(activeClass);
    
            calcTotal();
        });
    });

}

getStaticInformation('#gender', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

        if (input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
        } else {
            input.style.border = 'none';
        }

        switch(input.getAttribute('id')) {
            case 'height':
                height = +input.value;
                break;
            case 'weight':
                weight = +input.value;
                break;
            case 'age':
                age = +input.value;
                break;
        }
        calcTotal();
    });
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');
 
   //Slider 
const slides = document.querySelectorAll('.reviews__slide'),
      prev = document.querySelector('.prev__arrow'),
      next = document.querySelector('.next__arrow');
let slideIndex = 1;  

showSlides(slideIndex);

function showSlides(n) {
    if (n > slides.length) {
        slideIndex = 1;
    } if (n < 1) {
        slideIndex = slides.length;
        prev.style.background-color == '#09a66d';
    }

    slides.forEach(item => item.style.display = 'none');

    slides[slideIndex - 1].style.display = '';
} 

function plusSlides(n) {
    showSlides(slideIndex += n);
}

prev.addEventListener('click', () => {
    plusSlides(-1);
});
next.addEventListener('click', () => {
    plusSlides(1);
})
      
//prev.style.background-color == '#fff';








});