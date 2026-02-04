!(function (e) {
    "use strict";
    var a = e(window);
    e("body");
    if (
        (a.on("load", function () {
            e(".preloader").fadeOut(600);
        }),
        e(".active-sticky-header").length)
    ) {
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function t() {
        e("header.main-header").css("height", e("header .header-sticky").outerHeight());
    }

    var debouncedScroll = debounce(function() {
        var a = e(window).scrollTop();
        t();
        var i = e("header .header-sticky").outerHeight();
        e("header .header-sticky").toggleClass("hide", a > i + 100),
            e("header .header-sticky").toggleClass("active", a > 600);
    }, 10);

    a.on("resize", t);
    e(window).on("scroll", debouncedScroll);
    }
    new Swiper(".hero-slider-layout .swiper", {
        slidesPerView: 1,
        speed: 1e3,
        spaceBetween: 0,
        loop: !0,
        autoplay: { delay: 4e3 },
        pagination: { el: ".swiper-pagination", clickable: !0 },
    });
    if (e(".testimonial-slider").length) {
        new Swiper(".testimonial-slider .swiper", {
            slidesPerView: 1,
            speed: 1e3,
            spaceBetween: 30,
            loop: !0,
            autoplay: { delay: 3e3 },
            pagination: { el: ".swiper-pagination", clickable: !0 },
            breakpoints: { 768: { slidesPerView: 2 }, 991: { slidesPerView: 3 } },
        });
    }
    if (e(".service-images-slider").length) {
        new Swiper(".service-images-slider .swiper", {
            slidesPerView: 1,
            speed: 1e3,
            spaceBetween: 10,
            loop: !0,
            centeredSlides: !0,
            autoplay: { delay: 5e3 },
            navigation: { nextEl: ".swiper-arrow-next", prevEl: ".swiper-arrow-prev" },
        });
    }
    if ((e(".counter").length && e(".counter").counterUp({ delay: 6, time: 3e3 }), e(".reveal").length)) {
        gsap.registerPlugin(ScrollTrigger),
            document.querySelectorAll(".reveal").forEach((e) => {
                let a = e.querySelector("img"),
                    i = gsap.timeline({ scrollTrigger: { trigger: e, toggleActions: "play none none none" } });
                i.set(e, { autoAlpha: 1 }),
                    i.from(e, 1, { xPercent: -100, ease: Power2.out }),
                    i.from(a, 1, { xPercent: 100, scale: 1, delay: -1, ease: Power2.out });
            });
    }
    var i = e(".parallaxie");
    i.length && a.width() > 991 && a.width() > 768 && i.parallaxie({ speed: 0.55, offset: 0 });
    var r = e("#contactForm");
    function s(a, i) {
        if (a) var r = "h3 text-success";
        else r = "h3 text-danger";
        e("#msgSubmit").removeClass().addClass(r).text(i);
    }
    r.validator({ focus: !1 }).on("submit", function (a) {
        var i, t, l, n, o;
        a.isDefaultPrevented() ||
            (a.preventDefault(),
            (i = e("#fullname").val()),
            (t = e("#email").val()),
            (l = e("#phone").val()),
            (n = e("#subject").val()),
            (o = e("#msg").val()),
            e.ajax({
                type: "POST",
                url: "form-process.php",
                data: "fullname=" + i + "&name=&email=" + t + "&phone=" + l + "&subject=" + n + "&message=" + o,
                success: function (e) {
                    "success" == e ? (r[0].reset(), s(!0, "Message Sent Successfully!")) : s(!1, e);
                },
            }));
    });
    if (e(".main-menu").length && e(".responsive-menu").length) {
        var menuContent = e(".main-menu .nav-menu-wrapper").html();
        e(".responsive-menu").append(menuContent);

        e(".navbar-toggle").on("click", function() {
            e(this).toggleClass("active");
            e(".responsive-menu").toggleClass("active");
            e(".body-overlay").toggleClass("active");
        });

        e(".body-overlay").on("click", function() {
            e(".navbar-toggle").removeClass("active");
            e(".responsive-menu").removeClass("active");
            e(this).removeClass("active");
        });
    }
})(jQuery);
