(function () {
    'use strict';

    function track(eventName, parameters) {
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, parameters || {});
        }
    }

    document.addEventListener('click', function (event) {
        var link = event.target.closest('a');

        if (!link) {
            return;
        }

        if (link.href.indexOf('tel:') === 0) {
            track('phone_click', { location: link.closest('header, footer, section')?.className || 'site' });
        } else if (link.href.indexOf('wa.me') !== -1) {
            track('whatsapp_click', { location: link.closest('header, footer, section')?.className || 'site' });
        } else if (link.href.indexOf('contact.html') !== -1) {
            track('quote_cta_click', { location: link.closest('header, footer, section')?.className || 'site' });
        }
    });

    var form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', function () {
            track('quote_form_submit', { material: form.elements.material?.value || 'unspecified' });
        });
    }
})();
