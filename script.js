const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const grayscale = document.getElementById('grayscale');
const download = document.getElementById('download');

let img = new Image();

upload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    img.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
};

function applyFilters() {
  ctx.filter = `
    brightness(${brightness.value}%)
    contrast(${contrast.value}%)
    grayscale(${grayscale.value}%)
  `;
  ctx.drawImage(img, 0, 0);
}

[brightness, contrast, grayscale].forEach((input) => {
  input.addEventListener('input', applyFilters);
});

download.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = canvas.toDataURL();
  link.click();
});
