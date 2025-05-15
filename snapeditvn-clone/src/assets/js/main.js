import { initCommon } from './utils.js';

// Initialize common functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initCommon();

  // Initialize language selector
  const languageSelector = document.querySelector('.language-selector');
  if (languageSelector) {
    languageSelector.addEventListener('click', (e) => {
      e.preventDefault();
      // In a real app, this would change the language
      console.log('Language changed');
    });
  }

  // Initialize sample images
  const sampleImages = document.querySelectorAll('.sample-image');
  if (sampleImages.length > 0) {
    sampleImages.forEach(image => {
      image.addEventListener('click', () => {
        const imageUrl = image.getAttribute('data-src');
        const uploadAreas = document.querySelectorAll('.drop-area');

        if (uploadAreas.length > 0 && imageUrl) {
          const event = new CustomEvent('sample-image-selected', {
            detail: { imageUrl }
          });
          uploadAreas[0].dispatchEvent(event);
        }
      });
    });
  }

  // Initialize scroll animations
  const scrollElements = document.querySelectorAll('.scroll-element');

  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('scrolled');
  };

  const hideScrollElement = (element) => {
    element.classList.remove('scrolled');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 90)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });

  // Initialize on page load
  handleScrollAnimation();

  // App Download Button
  const appDownloadButtons = document.querySelectorAll('.app-download-btn');
  if (appDownloadButtons.length > 0) {
    appDownloadButtons.forEach(button => {
      button.addEventListener('click', () => {
        const platform = button.getAttribute('data-platform');
        if (platform === 'ios') {
          window.open('https://apps.apple.com/us/app/snapedit-remove-objects/id1611282499', '_blank');
        } else if (platform === 'android') {
          window.open('https://play.google.com/store/apps/details?id=snapedit.app.remove', '_blank');
        }
      });
    });
  }
});
