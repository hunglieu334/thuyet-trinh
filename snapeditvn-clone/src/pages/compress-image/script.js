import { handleFileUpload, handleDragDrop, initFaqAccordion, formatFileSize } from '../../assets/js/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize FAQ accordion
  initFaqAccordion();

  // Elements
  const fileInput = document.getElementById('fileInput');
  const uploadArea = document.getElementById('uploadArea');
  const editorSection = document.getElementById('editorSection');
  const originalImage = document.getElementById('originalImage');
  const compressedImage = document.getElementById('compressedImage');
  const originalSize = document.getElementById('originalSize');
  const compressedSize = document.getElementById('compressedSize');
  const compressionRatio = document.getElementById('compressionRatio');
  const qualitySlider = document.getElementById('quality');
  const maxWidthInput = document.getElementById('maxWidth');
  const formatSelect = document.getElementById('format');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const imageCounter = document.getElementById('imageCounter');
  const resetBtn = document.getElementById('resetBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  // State
  let uploadedFiles = [];
  let currentFileIndex = 0;
  let currentFile = null;

  // Event Listeners
  uploadArea.addEventListener('dragover', handleDragOver);
  uploadArea.addEventListener('dragleave', handleDragLeave);
  uploadArea.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileSelect);
  qualitySlider.addEventListener('input', updateCompression);
  maxWidthInput.addEventListener('input', updateCompression);
  formatSelect.addEventListener('change', updateCompression);
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
      originalSize.textContent = formatFileSize(currentFile.size);
      updateCompression();
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

  function updateCompression() {
    if (!currentFile) return;

    const quality = qualitySlider.value / 100;
    const maxWidth = parseInt(maxWidthInput.value);
    const format = formatSelect.value;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Calculate new dimensions
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = (maxWidth * height) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob
      canvas.toBlob((blob) => {
        compressedImage.src = URL.createObjectURL(blob);
        compressedSize.textContent = formatFileSize(blob.size);
        
        const ratio = ((currentFile.size - blob.size) / currentFile.size * 100).toFixed(1);
        compressionRatio.textContent = `${ratio}%`;
      }, `image/${format}`, quality);
    };

    img.src = originalImage.src;
  }

  function resetSettings() {
    qualitySlider.value = 80;
    maxWidthInput.value = 1920;
    formatSelect.value = 'jpeg';
    updateCompression();
  }

  function downloadImages() {
    if (!currentFile) return;

    const link = document.createElement('a');
    link.download = `compressed_${currentFile.name}`;
    link.href = compressedImage.src;
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

// Mock function for compression UI (in a real app, this would initialize the compression tool)
function showCompressorUI(files) {
  // Create a preview modal (for demonstration purposes)
  const modal = document.createElement('div');
  modal.className = 'compressor-modal';

  let filesHTML = '';
  files.forEach((file, index) => {
    const fileSize = formatFileSize(file.size);
    const reader = new FileReader();

    reader.onload = (e) => {
      const filePreview = document.getElementById(`file-preview-${index}`);
      if (filePreview) {
        filePreview.src = e.target.result;
      }
    };

    reader.readAsDataURL(file);

    filesHTML += `
      <div class="file-item">
        <div class="file-preview">
          <img id="file-preview-${index}" src="" alt="${file.name}">
        </div>
        <div class="file-info">
          <div class="file-name">${file.name}</div>
          <div class="file-size">Original: ${fileSize}</div>
          <div class="compression-slider">
            <label>Compression level:</label>
            <input type="range" min="0" max="100" value="75" class="slider">
            <span>75%</span>
          </div>
        </div>
      </div>
    `;
  });

  modal.innerHTML = `
    <div class="compressor-content">
      <div class="compressor-header">
        <h3>Compress Images</h3>
        <button class="close-btn">&times;</button>
      </div>
      <div class="files-list">
        ${filesHTML}
      </div>
      <div class="compression-options">
        <div class="option">
          <label>
            <input type="checkbox" checked> Preserve image quality
          </label>
        </div>
        <div class="option">
          <label>
            <input type="checkbox"> Convert to JPG (smaller size)
          </label>
        </div>
        <div class="option">
          <label>
            <input type="checkbox"> Resize images
          </label>
        </div>
      </div>
      <div class="compression-actions">
        <button class="btn btn-outline">Cancel</button>
        <button class="btn btn-primary compress-btn">Compress Now</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Add simple styling
  const style = document.createElement('style');
  style.textContent = `
    .compressor-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .compressor-content {
      background-color: white;
      border-radius: 12px;
      width: 90%;
      max-width: 800px;
      max-height: 90vh;
      overflow: auto;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    .compressor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .files-list {
      padding: 1rem;
      max-height: 50vh;
      overflow-y: auto;
    }
    .file-item {
      display: flex;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }
    .file-preview {
      width: 100px;
      height: 100px;
      margin-right: 1rem;
      border-radius: 8px;
      overflow: hidden;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .file-preview img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .file-info {
      flex: 1;
    }
    .file-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .file-size {
      color: #666;
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
    }
    .compression-slider {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    .slider {
      flex: 1;
    }
    .compression-options {
      padding: 1rem;
      background-color: #f5f5f5;
    }
    .option {
      margin-bottom: 0.5rem;
    }
    .compression-actions {
      padding: 1rem;
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      border-top: 1px solid #eee;
    }
  `;

  document.head.appendChild(style);

  // Handle close button
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  // Handle cancel button
  const cancelBtn = modal.querySelector('.btn-outline');
  cancelBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  // Handle compression sliders
  const sliders = modal.querySelectorAll('.slider');
  sliders.forEach(slider => {
    const valueDisplay = slider.nextElementSibling;
    slider.addEventListener('input', () => {
      valueDisplay.textContent = `${slider.value}%`;
    });
  });

  // Handle compress button
  const compressBtn = modal.querySelector('.compress-btn');
  compressBtn.addEventListener('click', () => {
    compressBtn.textContent = 'Compressing...';
    compressBtn.disabled = true;

    // Simulate compression process
    setTimeout(() => {
      const fileItems = modal.querySelectorAll('.file-item');

      fileItems.forEach((item, index) => {
        const sizeElement = item.querySelector('.file-size');
        const originalSize = sizeElement.textContent.replace('Original: ', '');

        // Calculate a simulated compressed size (in a real app this would be the actual compressed size)
        const compressionRate = parseInt(item.querySelector('.slider').value) / 100;
        const reducedSize = Math.round((1 - compressionRate) * parseFloat(originalSize));

        // Add compressed size information
        sizeElement.innerHTML = `Original: ${originalSize} → Compressed: ${reducedSize} ${originalSize.split(' ')[1]} <span style="color: green;">(${Math.round(compressionRate * 100)}% smaller)</span>`;
      });

      // Add download buttons
      const actionsDiv = modal.querySelector('.compression-actions');
      actionsDiv.innerHTML = `
        <button class="btn btn-outline close-btn">Close</button>
        <button class="btn btn-primary download-btn">Download All</button>
      `;

      // Handle new close button
      actionsDiv.querySelector('.close-btn').addEventListener('click', () => {
        document.body.removeChild(modal);
      });

      // Handle download button
      actionsDiv.querySelector('.download-btn').addEventListener('click', () => {
        alert('In a real app, this would download the compressed images. Compression completed successfully!');
        document.body.removeChild(modal);
      });
    }, 2000); // Simulate 2-second compression process
  });
}
