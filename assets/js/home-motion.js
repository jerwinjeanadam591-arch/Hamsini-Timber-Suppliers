(function () {
    'use strict';

    var railToggle = document.querySelector('[data-home-rail-toggle]');

    if (railToggle) {
        railToggle.addEventListener('click', function () {
            var paused = railToggle.getAttribute('aria-pressed') !== 'true';
            var rail = railToggle.closest('.home-photo-rail');

            railToggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
            railToggle.textContent = paused ? 'Play image movement' : 'Pause image movement';

            if (rail) {
                rail.classList.toggle('is-paused', paused);
            }
        });
    }

    var hero = document.querySelector('[data-home-hero]');

    if (!hero) {
        return;
    }

    document.documentElement.classList.add('home-motion-ready');

    var slides = Array.prototype.slice.call(hero.querySelectorAll('[data-hero-slide]'));
    var dots = Array.prototype.slice.call(hero.querySelectorAll('[data-hero-go]'));
    var previous = hero.querySelector('[data-hero-previous]');
    var next = hero.querySelector('[data-hero-next]');
    var toggle = hero.querySelector('[data-hero-toggle]');
    var status = hero.querySelector('[data-hero-status]');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var activeIndex = Math.max(0, slides.findIndex(function (slide) {
        return slide.classList.contains('is-active');
    }));
    var paused = reducedMotion.matches;
    var hovered = false;
    var focusedOnSlideLink = false;
    var timer;

    if (!slides.length) {
        return;
    }

    function updateToggle() {
        if (!toggle) {
            return;
        }

        toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
        toggle.textContent = paused ? 'Play slideshow' : 'Pause slideshow';
    }

    function clearTimer() {
        window.clearTimeout(timer);
    }

    function canAdvance() {
        return !paused && !hovered && !focusedOnSlideLink && !document.hidden && !reducedMotion.matches;
    }

    function scheduleNext() {
        clearTimer();

        if (!canAdvance()) {
            return;
        }

        timer = window.setTimeout(function () {
            showSlide(activeIndex + 1, false);
            scheduleNext();
        }, 4000);
    }

    function showSlide(index, announce) {
        activeIndex = (index + slides.length) % slides.length;

        slides.forEach(function (slide, slideIndex) {
            var active = slideIndex === activeIndex;

            slide.classList.toggle('is-active', active);
            slide.setAttribute('aria-hidden', active ? 'false' : 'true');
            slide.inert = !active;
        });

        dots.forEach(function (dot, dotIndex) {
            var active = dotIndex === activeIndex;

            dot.classList.toggle('is-active', active);

            if (active) {
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.removeAttribute('aria-current');
            }
        });

        if (announce && status) {
            status.textContent = 'Slide ' + (activeIndex + 1) + ' of ' + slides.length;
        }

        scheduleNext();
    }

    if (previous) {
        previous.addEventListener('click', function () {
            showSlide(activeIndex - 1, true);
        });
    }

    if (next) {
        next.addEventListener('click', function () {
            showSlide(activeIndex + 1, true);
        });
    }

    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            showSlide(Number(dot.getAttribute('data-hero-go')), true);
        });
    });

    if (toggle) {
        toggle.addEventListener('click', function () {
            paused = !paused;
            updateToggle();
            scheduleNext();
        });
    }

    hero.addEventListener('mouseenter', function () {
        hovered = true;
        clearTimer();
    });

    hero.addEventListener('mouseleave', function () {
        hovered = false;
        scheduleNext();
    });

    hero.addEventListener('focusin', function (event) {
        if (event.target.closest('.home-hero-slide a')) {
            focusedOnSlideLink = true;
            clearTimer();
        }
    });

    hero.addEventListener('focusout', function (event) {
        var target = event.relatedTarget;
        var stayingOnSlideLink = target && target.closest &&
            target.closest('.home-hero-slide a');

        if (event.target.closest('.home-hero-slide a') && !stayingOnSlideLink) {
            focusedOnSlideLink = false;
            scheduleNext();
        }
    });

    document.addEventListener('visibilitychange', scheduleNext);

    function handleMotionPreference(event) {
        if (event.matches) {
            paused = true;
        }

        updateToggle();
        scheduleNext();
    }

    if (reducedMotion.addEventListener) {
        reducedMotion.addEventListener('change', handleMotionPreference);
    } else if (reducedMotion.addListener) {
        reducedMotion.addListener(handleMotionPreference);
    }

    showSlide(activeIndex, false);
    updateToggle();
})();
