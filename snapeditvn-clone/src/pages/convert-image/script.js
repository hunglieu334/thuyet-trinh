import { handleFileUpload, handleDragDrop, initFaqAccordion, formatFileSize } from '../../assets/js/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize FAQ accordion
  initFaqAccordion();

  // Elements
  const fileInput = document.getElementById('fileInput');
  const uploadArea = document.getElementById('uploadArea');
  const editorSection = document.getElementById('editorSection');
  const originalImage = document.getElementById('originalImage');
  const convertedImage = document.getElementById('convertedImage');
  const originalFormat = document.getElementById('originalFormat');
  const originalSize = document.getElementById('originalSize');
  const convertedFormat = document.getElementById('convertedFormat');
  const convertedSize = document.getElementById('convertedSize');
  const formatButtons = document.querySelectorAll('.format-btn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const imageCounter = document.getElementById('imageCounter');
  const resetBtn = document.getElementById('resetBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  // State
  let uploadedFiles = [];
  let currentFileIndex = 0;
  let currentFile = null;
  let selectedFormat = 'jpeg';

  // Event Listeners
  uploadArea.addEventListener('dragover', handleDragOver);
  uploadArea.addEventListener('dragleave', handleDragLeave);
  uploadArea.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileSelect);
  formatButtons.forEach(btn => btn.addEventListener('click', handleFormatSelect));
  prevBtn.addEventListener('click', showPreviousImage);
  nextBtn.addEventListener('click', showNextImage);
  resetBtn.addEventListener('click', resetSettings);
  downloadBtn.addEventListener('click', downloadImages);

  // Functions
  function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  }

  function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
  }

  function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      handleFiles(files);
    }
  }

  function handleFileSelect(e) {
    const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      handleFiles(files);
    }
  }

  function handleFiles(files) {
    uploadedFiles = files;
    currentFileIndex = 0;
    showCurrentImage();
    editorSection.style.display = 'block';
  }

  function showCurrentImage() {
    if (uploadedFiles.length === 0) return;

    currentFile = uploadedFiles[currentFileIndex];
    const reader = new FileReader();

    reader.onload = (e) => {
      originalImage.src = e.target.result;
      originalFormat.textContent = currentFile.type.split('/')[1].toUpperCase();
      originalSize.textContent = formatFileSize(currentFile.size);
      convertImage();
    };

    reader.readAsDataURL(currentFile);
    updateImageCounter();
  }

  function showPreviousImage() {
    if (currentFileIndex > 0) {
      currentFileIndex--;
      showCurrentImage();
    }
  }

  function showNextImage() {
    if (currentFileIndex < uploadedFiles.length - 1) {
      currentFileIndex++;
      showCurrentImage();
    }
  }

  function updateImageCounter() {
    imageCounter.textContent = `${currentFileIndex + 1}/${uploadedFiles.length}`;
    prevBtn.disabled = currentFileIndex === 0;
    nextBtn.disabled = currentFileIndex === uploadedFiles.length - 1;
  }

  function handleFormatSelect(e) {
    const format = e.currentTarget.dataset.format;
    selectedFormat = format;

    // Update active state
    formatButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.format === format);
    });

    convertImage();
  }

  function convertImage() {
    if (!currentFile) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Convert to selected format
      canvas.toBlob((blob) => {
        convertedImage.src = URL.createObjectURL(blob);
        convertedFormat.textContent = selectedFormat.toUpperCase();
        convertedSize.textContent = formatFileSize(blob.size);
      }, `image/${selectedFormat}`);
    };

    img.src = originalImage.src;
  }

  function resetSettings() {
    selectedFormat = 'jpeg';
    formatButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.format === 'jpeg');
    });
    convertImage();
  }

  function downloadImages() {
    if (!currentFile) return;

    const link = document.createElement('a');
    link.download = `converted_${currentFile.name.split('.')[0]}.${selectedFormat}`;
    link.href = convertedImage.src;
    link.click();
  }

  // Add scroll animations
  const elements = document.querySelectorAll('.step-card, .benefit-card, .feature-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(element => {
    observer.observe(element);
    element.classList.add('scroll-element');
  });
});
