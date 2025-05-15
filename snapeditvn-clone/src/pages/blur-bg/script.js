import { formatFileSize } from '../../assets/js/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const editorSection = document.getElementById('editorSection');
    const originalImage = document.getElementById('originalImage');
    const blurredImage = document.getElementById('blurredImage');
    const originalSize = document.getElementById('originalSize');
    const blurredSize = document.getElementById('blurredSize');
    const blurRadius = document.getElementById('blurRadius');
    const brightness = document.getElementById('brightness');
    const contrast = document.getElementById('contrast');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const imageCounter = document.getElementById('imageCounter');
    const resetBtn = document.getElementById('resetBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    // State
    let uploadedFiles = [];
    let currentFileIndex = 0;

    // Event Listeners
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', handleFileSelect);
    blurRadius.addEventListener('input', updateBlur);
    brightness.addEventListener('input', updateBlur);
    contrast.addEventListener('input', updateBlur);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    resetBtn.addEventListener('click', resetSettings);
    downloadBtn.addEventListener('click', downloadImages);

    // Drag and Drop Handlers
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
        handleFiles(files);
    }

    // File Selection Handler
    function handleFileSelect(e) {
        const files = Array.from(e.target.files);
        handleFiles(files);
    }

    // File Processing
    function handleFiles(files) {
        if (files.length === 0) return;

        uploadedFiles = files;
        currentFileIndex = 0;
        showCurrentImage();
        editorSection.style.display = 'block';
        updateNavigationButtons();
    }

    // Image Display
    function showCurrentImage() {
        const file = uploadedFiles[currentFileIndex];
        const reader = new FileReader();

        reader.onload = (e) => {
            originalImage.src = e.target.result;
            originalImage.onload = () => {
                originalSize.textContent = `Kích thước: ${formatFileSize(file.size)}`;
                updateBlur();
            };
        };

        reader.readAsDataURL(file);
        updateImageCounter();
    }

    function showPreviousImage() {
        if (currentFileIndex > 0) {
            currentFileIndex--;
            showCurrentImage();
            updateNavigationButtons();
        }
    }

    function showNextImage() {
        if (currentFileIndex < uploadedFiles.length - 1) {
            currentFileIndex++;
            showCurrentImage();
            updateNavigationButtons();
        }
    }

    function updateImageCounter() {
        imageCounter.textContent = `${currentFileIndex + 1}/${uploadedFiles.length}`;
    }

    function updateNavigationButtons() {
        prevBtn.disabled = currentFileIndex === 0;
        nextBtn.disabled = currentFileIndex === uploadedFiles.length - 1;
    }

    // Blur Effect
    function updateBlur() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = originalImage;

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Apply filters
        ctx.filter = `blur(${blurRadius.value}px) brightness(${brightness.value}%) contrast(${contrast.value}%)`;
        ctx.drawImage(img, 0, 0);

        // Update blurred image
        blurredImage.src = canvas.toDataURL('image/jpeg', 0.9);
        
        // Calculate and display size
        const base64str = blurredImage.src.split(',')[1];
        const decodedSize = atob(base64str).length;
        blurredSize.textContent = `Kích thước: ${formatFileSize(decodedSize)}`;
    }

    // Reset Settings
    function resetSettings() {
        blurRadius.value = 20;
        brightness.value = 100;
        contrast.value = 100;
        updateBlur();
    }

    // Download Handler
    function downloadImages() {
        const link = document.createElement('a');
        link.download = `blurred_${uploadedFiles[currentFileIndex].name}`;
        link.href = blurredImage.src;
        link.click();
    }

    // Scroll Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    });

    document.querySelectorAll('.scroll-element').forEach((el) => observer.observe(el));
}); 