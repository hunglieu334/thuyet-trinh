/**
 * Utility functions for SnapEdit clone
 */

// Handle image upload from file input
export function handleFileUpload(fileInput, callback) {
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        callback(e.target.result, file);
      };
      reader.readAsDataURL(file);
    }
  });
}

// Handle drag and drop functionality
export function handleDragDrop(dropArea, callback) {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
      dropArea.classList.add('highlight');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
      dropArea.classList.remove('highlight');
    }, false);
  });

  dropArea.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        callback(e.target.result, file);
      };
      reader.readAsDataURL(file);
    }
  }, false);
}

// Handle clipboard paste
export function handleClipboardPaste(element, callback) {
  element.addEventListener('paste', (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (e) => {
          callback(e.target.result, blob);
        };
        reader.readAsDataURL(blob);
      }
    }
  });
}

// Toggle FAQ items
export function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = answer.classList.contains('active');

      // Close all answers
      document.querySelectorAll('.faq-answer').forEach(a => {
        a.classList.remove('active');
      });

      // Toggle current answer
      if (!isActive) {
        answer.classList.add('active');
      }
    });
  });
}

// Mobile menu toggle
export function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
}

// Format file size
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Check if device is mobile
export function isMobile() {
  return window.innerWidth < 768;
}

// Initialize all common functions
export function initCommon() {
  initFaqAccordion();
  initMobileMenu();

  // Add paste event to document
  document.addEventListener('DOMContentLoaded', () => {
    handleClipboardPaste(document, (imageData, file) => {
      const uploadAreas = document.querySelectorAll('.drop-area');
      if (uploadAreas.length > 0) {
        const event = new CustomEvent('image-pasted', {
          detail: { imageData, file }
        });
        uploadAreas[0].dispatchEvent(event);
      }
    });
  });
}
