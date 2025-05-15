import { handleFileUpload, handleDragDrop, initFaqAccordion } from '../../assets/js/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize FAQ accordion
  initFaqAccordion();

  // Initialize file upload
  const fileInput = document.getElementById('fileInput');
  const uploadArea = document.getElementById('uploadArea');
  const uploadBtn = document.querySelector('.upload-btn');

  if (fileInput && uploadArea) {
    // Handle clicks on the upload area
    uploadArea.addEventListener('click', () => {
      fileInput.click();
    });

    // Handle clicks on the upload button
    if (uploadBtn) {
      uploadBtn.addEventListener('click', () => {
        fileInput.click();
      });
    }

    // Handle file upload through input
    handleFileUpload(fileInput, (imageData, file) => {
      console.log('File uploaded:', file.name);
      // In a real app, this would display the image editor
      showImageEditor(imageData);
    });

    // Handle drag and drop
    handleDragDrop(uploadArea, (imageData, file) => {
      console.log('File dropped:', file.name);
      // In a real app, this would display the image editor
      showImageEditor(imageData);
    });

    // Handle sample images
    const sampleImages = document.querySelectorAll('.sample-image');
    sampleImages.forEach(sample => {
      sample.addEventListener('click', () => {
        const imageSrc = sample.getAttribute('data-src');
        if (imageSrc) {
          console.log('Sample image selected:', imageSrc);
          // In a real app, this would display the image editor
          showImageEditor(imageSrc);
        }
      });
    });

    // Handle pasted images
    uploadArea.addEventListener('image-pasted', (e) => {
      const { imageData, file } = e.detail;
      console.log('Image pasted:', file.name);
      // In a real app, this would display the image editor
      showImageEditor(imageData);
    });
  }

  // Add scroll animations
  const elements = document.querySelectorAll('.step-card, .feature-card, .benefit-card');

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

  // Elements
  const editorSection = document.getElementById('editorSection');
  const previewImage = document.getElementById('previewImage');
  const watermarkContainer = document.getElementById('watermarkContainer');
  const textControls = document.getElementById('textControls');
  const imageControls = document.getElementById('imageControls');
  const watermarkText = document.getElementById('watermarkText');
  const textColor = document.getElementById('textColor');
  const textSize = document.getElementById('textSize');
  const textOpacity = document.getElementById('textOpacity');
  const watermarkImage = document.getElementById('watermarkImage');
  const imageSize = document.getElementById('imageSize');
  const imageOpacity = document.getElementById('imageOpacity');
  const resetBtn = document.getElementById('resetBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  // State
  let currentWatermark = null;
  let watermarkType = 'text';
  let watermarkPosition = 'middle-center';

  // Event Listeners
  uploadArea.addEventListener('dragover', handleDragOver);
  uploadArea.addEventListener('dragleave', handleDragLeave);
  uploadArea.addEventListener('drop', handleDrop);
  fileInput.addEventListener('change', handleFileSelect);
  
  document.querySelectorAll('.watermark-type-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.watermark-type-buttons button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      watermarkType = btn.dataset.type;
      updateControlsVisibility();
    });
  });

  document.querySelectorAll('.position-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.position-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      watermarkPosition = btn.dataset.position;
      updateWatermarkPosition();
    });
  });

  // Text watermark controls
  watermarkText.addEventListener('input', updateTextWatermark);
  textColor.addEventListener('input', updateTextWatermark);
  textSize.addEventListener('input', updateTextWatermark);
  textOpacity.addEventListener('input', updateTextWatermark);

  // Image watermark controls
  watermarkImage.addEventListener('change', handleWatermarkImageSelect);
  imageSize.addEventListener('input', updateImageWatermark);
  imageOpacity.addEventListener('input', updateImageWatermark);

  // Action buttons
  resetBtn.addEventListener('click', resetWatermark);
  downloadBtn.addEventListener('click', downloadImage);

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
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageFile(file);
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      handleImageFile(file);
    }
  }

  function handleImageFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      editorSection.style.display = 'block';
      resetWatermark();
    };
    reader.readAsDataURL(file);
  }

  function updateControlsVisibility() {
    if (watermarkType === 'text') {
      textControls.style.display = 'block';
      imageControls.style.display = 'none';
      createTextWatermark();
    } else {
      textControls.style.display = 'none';
      imageControls.style.display = 'block';
    }
  }

  function createTextWatermark() {
    if (currentWatermark) {
      watermarkContainer.removeChild(currentWatermark);
    }

    const watermark = document.createElement('div');
    watermark.className = 'watermark text-watermark';
    watermark.textContent = watermarkText.value || 'Watermark';
    watermark.style.color = textColor.value;
    watermark.style.fontSize = `${textSize.value}px`;
    watermark.style.opacity = textOpacity.value / 100;
    watermarkContainer.appendChild(watermark);
    currentWatermark = watermark;
    updateWatermarkPosition();
  }

  function updateTextWatermark() {
    if (watermarkType === 'text') {
      createTextWatermark();
    }
  }

  function handleWatermarkImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        createImageWatermark(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function createImageWatermark(src) {
    if (currentWatermark) {
      watermarkContainer.removeChild(currentWatermark);
    }

    const watermark = document.createElement('img');
    watermark.className = 'watermark image-watermark';
    watermark.src = src;
    watermark.style.width = `${imageSize.value}%`;
    watermark.style.opacity = imageOpacity.value / 100;
    watermarkContainer.appendChild(watermark);
    currentWatermark = watermark;
    updateWatermarkPosition();
  }

  function updateImageWatermark() {
    if (watermarkType === 'image' && currentWatermark) {
      currentWatermark.style.width = `${imageSize.value}%`;
      currentWatermark.style.opacity = imageOpacity.value / 100;
    }
  }

  function updateWatermarkPosition() {
    if (!currentWatermark) return;

    const positions = {
      'top-left': { top: '10px', left: '10px', transform: 'none' },
      'top-center': { top: '10px', left: '50%', transform: 'translateX(-50%)' },
      'top-right': { top: '10px', right: '10px', transform: 'none' },
      'middle-left': { top: '50%', left: '10px', transform: 'translateY(-50%)' },
      'middle-center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
      'middle-right': { top: '50%', right: '10px', transform: 'translateY(-50%)' },
      'bottom-left': { bottom: '10px', left: '10px', transform: 'none' },
      'bottom-center': { bottom: '10px', left: '50%', transform: 'translateX(-50%)' },
      'bottom-right': { bottom: '10px', right: '10px', transform: 'none' }
    };

    const position = positions[watermarkPosition];
    Object.assign(currentWatermark.style, position);
  }

  function resetWatermark() {
    if (currentWatermark) {
      watermarkContainer.removeChild(currentWatermark);
      currentWatermark = null;
    }
    watermarkText.value = '';
    textColor.value = '#ffffff';
    textSize.value = '24';
    textOpacity.value = '50';
    imageSize.value = '30';
    imageOpacity.value = '50';
    document.querySelector('[data-position="middle-center"]').click();
    document.querySelector('[data-type="text"]').click();
  }

  function downloadImage() {
    if (!previewImage.src) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const watermark = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      if (currentWatermark) {
        if (watermarkType === 'text') {
          ctx.font = `${textSize.value}px Arial`;
          ctx.fillStyle = textColor.value;
          ctx.globalAlpha = textOpacity.value / 100;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          const positions = {
            'top-left': { x: 50, y: 30 },
            'top-center': { x: canvas.width / 2, y: 30 },
            'top-right': { x: canvas.width - 50, y: 30 },
            'middle-left': { x: 50, y: canvas.height / 2 },
            'middle-center': { x: canvas.width / 2, y: canvas.height / 2 },
            'middle-right': { x: canvas.width - 50, y: canvas.height / 2 },
            'bottom-left': { x: 50, y: canvas.height - 30 },
            'bottom-center': { x: canvas.width / 2, y: canvas.height - 30 },
            'bottom-right': { x: canvas.width - 50, y: canvas.height - 30 }
          };

          const pos = positions[watermarkPosition];
          ctx.fillText(watermarkText.value || 'Watermark', pos.x, pos.y);
        } else {
          watermark.src = currentWatermark.src;
          watermark.onload = () => {
            const size = (canvas.width * imageSize.value) / 100;
            const x = watermarkPosition.includes('left') ? 20 :
                     watermarkPosition.includes('right') ? canvas.width - size - 20 :
                     canvas.width / 2 - size / 2;
            const y = watermarkPosition.includes('top') ? 20 :
                     watermarkPosition.includes('bottom') ? canvas.height - size - 20 :
                     canvas.height / 2 - size / 2;

            ctx.globalAlpha = imageOpacity.value / 100;
            ctx.drawImage(watermark, x, y, size, size);
            ctx.globalAlpha = 1;

            const link = document.createElement('a');
            link.download = 'watermarked-image.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
          };
        }
      } else {
        const link = document.createElement('a');
        link.download = 'watermarked-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };

    img.src = previewImage.src;
  }

  // Initialize
  updateControlsVisibility();
});

// Mock function for image editor (in a real app, this would initialize the watermark editor)
function showImageEditor(imageData) {
  alert('In a real app, this would open the watermark editor. Image loaded successfully!');

  // Create a preview modal (for demonstration purposes)
  const modal = document.createElement('div');
  modal.className = 'editor-modal';
  modal.innerHTML = `
    <div class="editor-content">
      <div class="editor-header">
        <h3>Add Watermark</h3>
        <button class="close-btn">&times;</button>
      </div>
      <div class="editor-preview">
        <img src="${imageData}" alt="Preview">
      </div>
      <div class="editor-controls">
        <p>In a real application, watermark controls would appear here.</p>
        <button class="btn btn-primary">Save Image</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Add simple styling
  const style = document.createElement('style');
  style.textContent = `
    .editor-modal {
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
    .editor-content {
      background-color: white;
      border-radius: 12px;
      max-width: 90%;
      max-height: 90%;
      overflow: auto;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    .editor-header {
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
    .editor-preview {
      padding: 1rem;
      text-align: center;
    }
    .editor-preview img {
      max-width: 100%;
      max-height: 60vh;
    }
    .editor-controls {
      padding: 1rem;
      text-align: center;
      border-top: 1px solid #eee;
    }
  `;

  document.head.appendChild(style);

  // Handle close button
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}
