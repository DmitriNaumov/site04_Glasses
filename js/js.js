$(function () {

    'use strict';


    // ---- AOS plagin ---- //
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });


    //load page preloader
    $(document).ready(function () {
        setTimeout(() => {
            $('body, .preloader, .preloader__txt, .preloader__box').addClass('active');
            animLoad();
        }, 800);
    });

    //load page options
    function animLoad() {
        let tl = new TimelineMax({ paused: true });

        tl.staggerFrom("nav.nav > .anim", 0.8, {
            y: 100,
            opacity: 0,
            ease: Expo.easeInOut
        }, "0.1", "+=1.2");
        tl.staggerFrom(".header__bott-scroll, .header__social-item", 0.8, {
            y: 100,
            opacity: 0,
            ease: Expo.easeInOut
        }, "0.1", "-=0.8");
        tl.staggerFrom(".img_bg", 0.8, {
            height: 100,
            opacity: 0,
            ease: Expo.easeInOut
        }, "0.1", "-=0.5");
        tl.staggerFrom(".header__let, .header__num", 0.8, {
            x: -100,
            opacity: 0,
            ease: Expo.easeInOut
        }, "0.1", "-=0.5");
        tl.staggerFrom(".header__title > span", 0.8, {
            y: 100,
            opacity: 0,
            ease: Expo.easeInOut
        }, "0.1", "-=0.8");

        tl.reverse();
        $(document).ready(function () {
            tl.reversed(!tl.reversed())
        });
    }
    // animLoad();


    //menu option
    function animMenu() {
        let tl = new TimelineMax({ paused: true });

        tl.to(".menu-container", 1, {
            left: 0,
            ease: Expo.easeInOut
        });

        tl.staggerFrom(".menu > div", 0.8, {
            y: 100,
            opacity: 0,
            ease: Expo.easeInOut
        }, "0.1", "-=0.4");

        tl.staggerFrom(".socials", 0.8, {
            y: 100, opacity: 0, ease: Expo.easeOut
        }, "0.4", "-=0.6");

        tl.reverse();
        $(document).on("click", ".burger", function () {
            tl.reversed(!tl.reversed())
        });
        $(document).on("click", ".menu-close", function () {
            tl.reversed(!tl.reversed())
        });
        $(document).on("click", ".menu__item-link", function () {
            tl.reversed(!tl.reversed())
        });
    }
    animMenu();


    // ---- script scroll menu ---- //
    $("#menu").on("click", ".menu__item-link", function (event) {
        event.preventDefault();
        let id = $(this).attr('href'),
            top = $(id).offset().top;
        setTimeout(function () {
            $('body,html').animate({ scrollTop: top }, 1000);
        }, 1000);
    });


    // ---- scroll dovn on click button_go ---- //
    $('.header-scroll').click(function () {
        let scroll = $('.popular').offset().top;
        $('html, body').animate({ scrollTop: scroll }, 350);
    });


    // ---- menu fixed active ---- //
    $(window).scroll(function () {
        let scrollDock = $(document).scrollTop();
        let scrollMain = $('.main').offset().top;

        if (scrollDock > 1) {
            $('.nav').addClass("active");
        } else {
            $('.nav').removeClass("active");
        }

        if (scrollDock + 80 >= scrollMain) {
            $('.up').fadeIn();
        } else {
            $('.up').fadeOut();
        }
    });

    $('.up').click(function () {
        var up = $('.header').offset().top;
        $('html, body').animate({ scrollTop: up }, 350);
    });


    //accordion
    let topItem = $('.top__item');
    topItem.on('click', function () {
        let timeAnim = 250;
        $('.top__item').removeClass('active');
        $(this).addClass('active');
        $('.top__head').next().slideUp(timeAnim);
        $(this).find('.top__head').next().slideDown(timeAnim);

        let id = $(this).data('id');
        $('.top__img-item').removeClass("active");
        $('#' + id + '-top__img').addClass("active");
    });

});