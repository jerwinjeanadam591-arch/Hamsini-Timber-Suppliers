(function () {
    'use strict';

    var form = document.getElementById('contact-form');
    var status = document.getElementById('contact-form-status');
    var whatsappButton = document.querySelector('.contact-whatsapp-submit');

    if (!form) {
        return;
    }

    if (whatsappButton) {
        whatsappButton.addEventListener('click', function () {
            if (!form.reportValidity()) {
                return;
            }

            var data = new FormData(form);
            var message = [
                'Hello Hamsini Timber Supply, I would like to enquire about:',
                'Name: ' + (data.get('name') || 'Not provided'),
                'Email: ' + (data.get('email') || 'Not provided'),
                'Phone / WhatsApp: ' + (data.get('phone') || 'Not provided'),
                'Material: ' + (data.get('material') || 'Not specified'),
                'Project / sizes: ' + (data.get('subject') || 'Not provided'),
                'Details: ' + data.get('message')
            ].join('\n');

            window.open(
                'https://wa.me/255719536091?text=' + encodeURIComponent(message),
                '_blank',
                'noopener,noreferrer'
            );
        });
    }

    if (new URLSearchParams(window.location.search).get('sent') === '1' && status) {
        status.textContent = 'Thanks. Your enquiry has been sent and we will respond as soon as possible.';
        status.classList.add('is-success');
    }

    form.addEventListener('submit', function () {
        if (status) {
            status.textContent = 'Sending your enquiry…';
            status.classList.remove('is-success');
        }
    });
})();
