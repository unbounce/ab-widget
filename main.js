
(function() {
    const targetElement = document.querySelector('#ubwidget');
    //const targetElement = document.querySelector('#cvt'); // alternate target

    function removeElements(elements) {
        elements.forEach(elem => elem.parentNode.removeChild(elem));
    }

    function adjustContainerStyles(container) {
        const iframes = container.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            iframe.classList.add('ub-emb-visible');
            iframe.setAttribute("scrolling", "no");
            iframe.style.width = '100% !important';
            iframe.style.height = '100% !important';
        });

        const scrollWrappers = container.querySelectorAll('.ub-emb-scroll-wrapper');
        scrollWrappers.forEach(wrapper => {
            Object.assign(wrapper.style, {
                position: 'absolute',
                padding: '0',
                transition: 'none',
                overflow: 'hidden'
            });
        });
    }

    function handlePotentialDOMChange() {
        const container = document.querySelector('.ub-emb-iframe-wrapper');

        if (container && container.querySelector('iframe')) {
            moveContainerToTarget(container);
            adjustContainerStyles(container);
            
            // Optional: Remove backdrops
            // removeElements(document.querySelectorAll('.ub-emb-overlay .ub-emb-backdrop'));

            removeElements(document.querySelectorAll('.ub-emb-container'));
            
            observer.disconnect(); // Stop observing once our task is complete
        }
    }

    function moveContainerToTarget(container) {
        targetElement.innerHTML = '';
        targetElement.appendChild(container);
    }

    const observer = new MutationObserver(handlePotentialDOMChange);
    observer.observe(document.body, { childList: true, subtree: true });

})();
