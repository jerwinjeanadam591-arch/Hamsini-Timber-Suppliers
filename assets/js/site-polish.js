(function () {
    'use strict';

    var logoSource = 'images/Hamsini Timber Supply Logo.png';
    var logoAlt = 'Hamsini Timber Supply';

    document.querySelectorAll('.site-wordmark, .nav-logo a, .footer-logo a').forEach(function (link) {
        var logo = document.createElement('img');

        logo.src = logoSource;
        logo.alt = logoAlt;
        logo.loading = 'eager';
        logo.decoding = 'async';
        link.classList.add('site-logo-link');
        link.setAttribute('aria-label', logoAlt);
        link.textContent = '';
        link.appendChild(logo);
    });

    document.querySelectorAll(
        '.xs-sidebar-group, .navSidebar-button, .offset-side-bar, ' +
        '.widget-items-search, .pagination, .pagination-bg, ' +
        '.blog-details-comment, .comment-form, .team-social-icon, ' +
        '.footer-widget-social-icon, .single-blog-social-icon, .csd-social-icon, ' +
        '.footer-area > .container > .row.address, .footer-shape, .footer-shape2, ' +
        '.team-shpe, .testi-shape, .slider-shapes, .slider-shapes2, .about-shape2'
    ).forEach(function (element) {
        element.remove();
    });

    document.querySelectorAll('.widget-items').forEach(function (widget) {
        if (widget.querySelector('.catagory-item, .tag-item')) {
            widget.remove();
        }
    });

    document.querySelectorAll('.rpost-title > span').forEach(function (date) {
        date.remove();
    });

    var serviceItems = [
        { label: 'Treated and Untreated Timber', href: 'service.html' },
        { label: 'Structural Timber', href: 'service.html' },
        { label: 'Iron Sheets', href: 'service.html' },
        { label: 'Logistics and Transportation', href: 'service.html' }
    ];

    document.querySelectorAll('.footer-area .footer-widget-menu ul').forEach(function (menu) {
        var fragment = document.createDocumentFragment();

        serviceItems.forEach(function (item) {
            var listItem = document.createElement('li');
            var link = document.createElement('a');

            link.href = item.href;
            link.textContent = item.label;
            listItem.appendChild(link);
            fragment.appendChild(listItem);
        });

        menu.replaceChildren(fragment);
    });

    document.querySelectorAll('.subscribe-form').forEach(function (element) {
        var link = document.createElement('a');

        link.className = 'site-quote-link';
        link.href = 'contact.html';
        link.textContent = 'Request a Quote';
        element.replaceWith(link);
    });

    document.querySelectorAll('.footer-info a[href="#"]').forEach(function (link) {
        link.href = 'https://www.google.com/maps/search/?api=1&query=Mbezi+Luis+Magari+Saba+Street+Dar+es+Salaam';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });

    document.querySelectorAll('a[href="#"]').forEach(function (link) {
        var replacement = document.createElement('span');

        replacement.className = link.className;
        replacement.setAttribute('aria-disabled', 'true');

        while (link.firstChild) {
            replacement.appendChild(link.firstChild);
        }

        link.replaceWith(replacement);
    });

    var whatsappMessage = encodeURIComponent('Hello Hamsini Timber Supply, I would like a quote for timber/building materials.');
    var whatsappUrl = 'https://wa.me/255719536091?text=' + whatsappMessage;

    document.querySelectorAll('[data-whatsapp-link]').forEach(function (link) {
        link.href = whatsappUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });

    if (!document.querySelector('.site-mobile-actions')) {
        var actions = document.createElement('div');
        actions.className = 'site-mobile-actions';
        actions.setAttribute('aria-label', 'Quick contact actions');
        actions.innerHTML =
            '<a href="tel:255719536091"><i class="fas fa-phone-alt" aria-hidden="true"></i><span>Call</span></a>' +
            '<a href="' + whatsappUrl + '" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp" aria-hidden="true"></i><span>WhatsApp</span></a>' +
            '<a class="is-primary" href="contact.html"><i class="fas fa-file-invoice" aria-hidden="true"></i><span>Get a Quote</span></a>';
        document.body.appendChild(actions);
    }
})();
