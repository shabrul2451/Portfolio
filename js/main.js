(() => {

    const hamburgerBtn = document.querySelector('.hamburger-btn'),
        navMenu = document.querySelector('.nav-menu'),
        closeNavBtn = navMenu.querySelector('.close-nav-menu');

    hamburgerBtn.addEventListener('click', showNavMenu);
    closeNavBtn.addEventListener('click', hideNavMenu);
    function  showNavMenu() {
        navMenu.classList.add('open');
    }
    function  hideNavMenu() {
        navMenu.classList.remove('open');
        fadeOutEffect();
    }
    function fadeOutEffect() {
        document.querySelector('.fade-out-effect').classList.add('active');
        setTimeout(() => {
            document.querySelector('.fade-out-effect').classList.remove('active');
        },300)
    }

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('link-item')){
            if (event.target.hash !== ''){
                event.preventDefault();
                const  hash = event.target.hash;
                document.querySelector('.section.active').classList.add('hide');
                document.querySelector('.section.active').classList.remove('active');

                document.querySelector(hash).classList.add('active');
                document.querySelector(hash).classList.remove('hide');

                navMenu.querySelector('.active').classList.add('outer-shadow','hover-in-shadow');
                navMenu.querySelector('.active').classList.remove('active', 'inner-shadow');
                if (navMenu.classList.contains('open')){
                    event.target.classList.add('active', 'inner-shadow');
                    event.target.classList.remove('outer-shadow', 'hover-in-shadow');
                    hideNavMenu();
                }
                else {
                    let navItems = navMenu.querySelectorAll('.link-item');
                    navItems.forEach((item) => {
                        if (hash === item.hash){
                            item.classList.add('active', 'inner-shadow');
                            item.classList.remove('outer-shadow', 'hover-in-shadow');
                        }
                    });
                    fadeOutEffect();
                }
                //add hash to url
                window.location.hash = hash;
            }
        }
    })
})();



/*
about section
*/
(() => {
    const aboutSection = document.querySelector('.about-section'),
        tabContainer = document.querySelector('.about-tabs');

    tabContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('tab-item') && !event.target.classList.contains('active')){
            const target = event.target.getAttribute('data-target');

            tabContainer.querySelector('.active').classList.remove('outer-shadow','active');
            event.target.classList.add('active','outer-shadow');
            aboutSection.querySelector('.tab-content.active').classList.remove('active');
            aboutSection.querySelector(target).classList.add('active');
        }
    })
})();

/*
service section
*/
(() => {
    const filterContainer = document.querySelector('.portfolio-filter'),
        portfolioItemsContainer = document.querySelector('.portfolio-items'),
        portfolioItems = document.querySelectorAll('.portfolio-item'),
        popup = document.querySelector('.portfolio-popup'),
        prevBtn = popup.querySelector('.pp-prev'),
        nextBtn = popup.querySelector('.pp-next'),
        closeBtn = popup.querySelector('.pp-close'),
        projectDetailsContainer = popup.querySelector('.pp-details'),
        projectDetailsBtn = popup.querySelector('.pp-project-details-btn');
    let itemIndex, slideIndex, screenshots;

    filterContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('filter-item') && !event.target.classList.contains('active')){
            filterContainer.querySelector('.active').classList.remove('outer-shadow', 'active');
            event.target.classList.add('active', 'outer-shadow');

            const target = event.target.getAttribute('data-target');
            portfolioItems.forEach((item) => {
                if (target === item.getAttribute('data-category') || target === 'all'){
                    item.classList.remove('hide');
                    item.classList.add('show');
                }else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            })
        }
    });

    function bodyScrollingToggle() {
        document.body.classList.toggle('stop-scrolling');
    }

    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;

            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);

            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            screenshots = screenshots.split(',');
            if (screenshots.length ===1){
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            }
            else {
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    });
    closeBtn.addEventListener('click', () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains('active')){
            popupDetailsToggle();
        }
    });

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector('.pp-img');
        popup.querySelector('.pp-loader').classList.add('active');
        popupImg.src = imgSrc;

        popupImg.onload = () => {
            popup.querySelector('.pp-loader').classList.remove('active');
        };
        popup.querySelector('.pp-counter').innerHTML = (slideIndex+1) + ' of ' + screenshots.length;
    }

    nextBtn.addEventListener('click', () => {
        if (slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        popupSlideshow();
    });
    prevBtn.addEventListener('click', () => {
        if (slideIndex === 0){
            slideIndex = screenshots.length-1;
        }
        else {
            slideIndex--;
        }
        popupSlideshow();
    });

    function popupDetails(){
        if (!portfolioItems[itemIndex].querySelector('.portfolio-item-details')){
            projectDetailsBtn.style.display = 'none';
            return;
        }
        projectDetailsBtn.style.display = 'block';
        popup.querySelector('.pp-project-details').innerHTML = portfolioItems[itemIndex].querySelector('.portfolio-item-details').innerHTML;

        popup.querySelector('.pp-title h2').innerHTML = portfolioItems[itemIndex].querySelector('.portfolio-item-tittle').innerHTML;

        popup.querySelector('.pp-project-category').innerHTML = portfolioItems[itemIndex].getAttribute('data-category');

    }

    projectDetailsBtn.addEventListener('click', () => {
        popupDetailsToggle();
    });
    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains('active')){
            projectDetailsBtn.querySelector('i').classList.add('fa-plus');
            projectDetailsBtn.querySelector('i').classList.remove('fa-minus');
            projectDetailsContainer.classList.remove('active');
            projectDetailsContainer.style.maxHeight = 0 + 'px';
        }else {
            projectDetailsBtn.querySelector('i').classList.remove('fa-plus');
            projectDetailsBtn.querySelector('i').classList.add('fa-minus');
            projectDetailsContainer.classList.add('active');
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + 'px';
            popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }
})();

/*
testimonial slider*/
(() => {
    const sliderContainer = document.querySelector('.testimonial-slider-container'),
        slides = sliderContainer.querySelectorAll('.testimonial-item'),
        slideWidth = sliderContainer.offsetWidth,
        prevBtn = document.querySelector('.testimonial-slider-nav .prev'),
        nextBtn = document.querySelector('.testimonial-slider-nav .next');

    let slideIndex = 0;
    slides.forEach((slide) => {
        slide.style.width = slideWidth + 'px';
    });
    sliderContainer.style.width = slideWidth * slides.length + 'px';

    nextBtn.addEventListener('click', () => {
        if (slideIndex === slides.length-1){
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + 'px';
    });
    prevBtn.addEventListener('click', () => {
        if (slideIndex === 0){
            slideIndex = slides.length-1;
        }
        else {
            slideIndex--;
        }
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + 'px';
    })
})();


(() => {
    
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
        if (!section.classList.contains('active')) {
            section.classList.add('hide')
        }   
    })

})();


window.addEventListener("load", () => {
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloader").style.display="none";
    },600)
});


//listen for submit
document.querySelector('.contact-form1').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();

    let name = document.querySelector('.name').value;
    let email = document.querySelector('.email').value;
    let subject = document.querySelector('.subject').value;
    let message = document.querySelector(".message").value;
    console.log(name);
    sendEmail(name, email, subject, message);
}

function sendEmail(name, email, subject, message){
    Email.send({
        Host: 'smtp.gmail.com',
        Username: 'shabrul2451@gmail.com',
        Password: 'bh0974316',
        To: 'shabrul2451@gmail.com',
        From: 'mislam163003@bscse.uiu.ac.bd',
        Subject: 'kisuna',
        Body : 'sssssssssssssssss'
    }).then(
        message => alert(message)
    );
}