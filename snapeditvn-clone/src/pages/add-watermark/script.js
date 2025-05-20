document.addEventListener('DOMContentLoaded', function() {
  const langSelect = document.getElementById('languageSelect');
  langSelect.addEventListener('click', function(e) {
    this.classList.toggle('open');
  });

  document.addEventListener('click', function(e) {
    if (!langSelect.contains(e.target)) {
      langSelect.classList.remove('open');
    }
  });
});

// FAQ toggle
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

// Upload ảnh và preview
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const imageGroup = document.getElementById('imageGroup');

uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    // Thay thế 2 ảnh trong nhóm bằng ảnh upload
    const imgs = imageGroup.querySelectorAll('img');
    imgs[0].src = e.target.result;
    imgs[1].src = e.target.result;
  };
  reader.readAsDataURL(file);
});

// Popup modal thử ngay
const tryBtn = document.getElementById('tryBtn');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');

tryBtn.addEventListener('click', () => {
  modal.classList.remove('modal-hidden');
  modal.classList.add('modal-visible');
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('modal-visible');
  modal.classList.add('modal-hidden');
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('modal-visible');
    modal.classList.add('modal-hidden');
  }
});


