(function () {
    'use strict';

    var menuItems = [
        { label: 'Home', href: 'index.html' },
        { label: 'About', href: 'about.html' },
        { label: 'Services', href: 'service.html' },
        { label: 'Gallery', href: 'portfolio.html' },
        { label: 'Contact', href: 'contact.html' }
    ];
    var currentPage = decodeURIComponent(window.location.pathname).split('/').pop() || 'index.html';

    document.querySelectorAll('.Indastre_menu > ul.nav_scroll').forEach(function (menu) {
        var fragment = document.createDocumentFragment();
        var navigation = menu.closest('nav');

        if (navigation) {
            navigation.setAttribute('aria-label', 'Main navigation');
        }

        menuItems.forEach(function (item) {
            var listItem = document.createElement('li');
            var link = document.createElement('a');

            link.href = item.href;
            link.textContent = item.label;

            if (
                currentPage === item.href ||
                (item.href === 'service.html' && currentPage === 'service-details.html') ||
                (item.href === 'portfolio.html' && currentPage === 'portfolio-details.html')
            ) {
                link.setAttribute('aria-current', 'page');
            }

            listItem.appendChild(link);
            fragment.appendChild(listItem);
        });

        if (menu.closest('.mobile-menu')) {
            var quoteItem = document.createElement('li');
            var quoteLink = document.createElement('a');

            quoteLink.href = 'contact.html';
            quoteLink.textContent = 'Request a Quote';
            quoteItem.appendChild(quoteLink);
            fragment.appendChild(quoteItem);
        }

        menu.replaceChildren(fragment);
    });

    document.querySelectorAll('.Indastres-btn a').forEach(function (link) {
        link.childNodes[0].textContent = 'Request a Quote';
    });
})();
