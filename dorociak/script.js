// Galeria lightbox i animacje sekcji

document.addEventListener('DOMContentLoaded', function() {
  // Pobranie elementów galerii i lightboxa
  const galleryImages = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox .close');
  const prevBtn = document.querySelector('.lightbox .prev');
  const nextBtn = document.querySelector('.lightbox .next');

  let currentImgIndex = 0;
  const images = Array.from(galleryImages).map(img => img.src);

  // Otwieranie lightboxa po kliknięciu w miniaturę
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentImgIndex = index;
      updateLightboxImage();
      lightbox.classList.add('active');
    });
  });

  // Ustawienie obrazu w lightboxie
  function updateLightboxImage() {
    lightboxImg.src = images[currentImgIndex];
    lightboxImg.alt = galleryImages[currentImgIndex].alt;
  }

  // Zamknięcie lightboxa
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Poprzednie zdjęcie
  function showPrevImage() {
    currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  // Następne zdjęcie
  function showNextImage() {
    currentImgIndex = (currentImgIndex + 1) % images.length;
    updateLightboxImage();
  }

  // Obsługa przycisków zamknięcia i nawigacji
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);

  // Zamknięcie po kliknięciu w tło lightboxa
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Obsługa klawiatury (ESC, strzałki)
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
    }
  });

  // Animacja sekcji przy przewijaniu strony
  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(40px)';
  });

  // Funkcja ujawniająca sekcje podczas scrollowania
  function revealSections() {
    document.querySelectorAll('.section').forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        section.style.transition = 'opacity 0.8s, transform 0.8s';
        section.style.opacity = 1;
        section.style.transform = 'translateY(0)';
      }
    });
  }

  window.addEventListener('scroll', revealSections);
  window.addEventListener('load', revealSections);
});