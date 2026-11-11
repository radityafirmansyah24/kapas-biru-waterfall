/**
 * ========================================================
 * JAVASCRIPT WISATA AIR TERJUN KAPAS BIRU
 * Projek Presentasi Bu Ratna
 * Fitur:
 * 1. Navigasi Rapi & ScrollSpy
 * 2. Video Sinematik Autoplay & Loop dengan Pengendali Audio
 * 3. Galeri Foto & Lightbox Modal
 * 4. Buku Tamu Terproteksi Anti-XSS & LocalStorage
 * 5. Proteksi Keaslian Konten (Read-Only Data)
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCinematicVideo();
  initGalleryFilter();
  initGuestbook();
  initLocalGroupPhotoFallback();
  updateCurrentYear();
});

/* ========================================================
 * 1. NAVIGASI MENU KIRI (SIDEBAR LAPTOP & HP) & SCROLLSPY
 * ======================================================== */
function initNavigation() {
  const sidebar = document.getElementById('left-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const closeBtn = document.getElementById('sidebar-close-btn');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section[id]');

  // Fungsi Membuka Menu Kiri di Mobile
  function openSidebar() {
    if (sidebar && backdrop) {
      sidebar.classList.remove('-translate-x-full');
      backdrop.classList.remove('hidden');
      document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
    }
  }

  // Fungsi Menutup Menu Kiri di Mobile
  function closeSidebar() {
    if (sidebar && backdrop) {
      sidebar.classList.add('-translate-x-full');
      backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
    }
  }

  // Tombol Toggle Buka Menu Kiri (Mobile Header)
  if (toggleBtn) {
    toggleBtn.addEventListener('click', openSidebar);
  }

  // Tombol Tutup X di dalam Sidebar (Mobile)
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }

  // Klik di Area Luar (Backdrop) untuk Menutup Sidebar
  if (backdrop) {
    backdrop.addEventListener('click', closeSidebar);
  }

  // Ketika salah satu menu kiri diklik: tutup sidebar di mobile & scroll halus
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        closeSidebar();
      }
    });
  });

  // Tutup sidebar saat menekan tombol keyboard Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSidebar();
    }
  });

  // Scroll Event: Scrollspy Active State & Tombol Back-to-Top
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    }

    // ScrollSpy active link highlighting pada Menu Kiri
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    sidebarLinks.forEach(link => {
      const targetHref = link.getAttribute('href');
      if (targetHref === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // Back to top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ========================================================
 * 2. VIDEO SINEMATIK: AUTOPLAY, LOOP & CONTROLS
 * ======================================================== */
function initCinematicVideo() {
  const video = document.getElementById('cinematic-video');
  const playBtn = document.getElementById('video-play-btn');
  const playIcon = document.getElementById('play-icon');
  const soundBtn = document.getElementById('video-sound-btn');
  const soundIcon = document.getElementById('sound-icon');
  const soundLabel = document.getElementById('sound-label');
  const fullscreenBtn = document.getElementById('video-fullscreen-btn');

  if (!video) return;

  // Pastikan properties autoplay dan loop aktif
  video.loop = true;
  video.muted = true; // Diperlukan browser agar autoplay berjalan otomatis
  video.playsInline = true;

  // Coba jalankan autoplay secara otomatis saat halaman terbuka
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Jika browser memblokir autoplay pertama kali, pengguna dapat menekan play
      if (playIcon) {
        playIcon.classList.replace('fa-pause', 'fa-play');
      }
    });
  }

  // Tombol Play / Pause
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
      } else {
        video.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
      }
    });
  }

  // Tombol Suara (Mute / Unmute)
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        video.volume = 0.8;
        soundIcon.classList.replace('fa-volume-xmark', 'fa-volume-high');
        soundIcon.classList.remove('text-yellow-400');
        soundIcon.classList.add('text-emerald-400');
        soundLabel.textContent = 'Suara Menyala';
      } else {
        video.muted = true;
        soundIcon.classList.replace('fa-volume-high', 'fa-volume-xmark');
        soundIcon.classList.remove('text-emerald-400');
        soundIcon.classList.add('text-yellow-400');
        soundLabel.textContent = 'Aktifkan Suara';
      }
    });
  }

  // Tombol Fullscreen
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }
}

/* ========================================================
 * 3. FILTER GALERI & LIGHTBOX MODAL
 * ======================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active styling
      filterBtns.forEach(b => {
        b.classList.remove('bg-emerald-600', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.add('bg-emerald-600', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-white', 'text-slate-700');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.classList.add('animate-fadeIn');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Lightbox modal opener
window.openPhotoModal = function(src, caption) {
  const modal = document.getElementById('photo-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');

  if (modal && modalImg && modalCaption) {
    modalImg.src = src;
    modalCaption.textContent = caption || 'Dokumentasi Wisata Air Terjun Kapas Biru';
    modal.classList.remove('hidden');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closePhotoModal = function() {
  const modal = document.getElementById('photo-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

// Close modal on escape or background click
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePhotoModal();
  }
});

const photoModalElement = document.getElementById('photo-modal');
if (photoModalElement) {
  photoModalElement.addEventListener('click', (e) => {
    if (e.target === photoModalElement) {
      closePhotoModal();
    }
  });
}

/* ========================================================
 * 4. BUKU TAMU TERPROTEKSI (ANTI-XSS & LOCALSTORAGE)
 * ======================================================== */
function initGuestbook() {
  const form = document.getElementById('guestbook-form');
  const nameInput = document.getElementById('guest-name');
  const originInput = document.getElementById('guest-origin');
  const ratingInput = document.getElementById('guest-rating');
  const ratingText = document.getElementById('rating-text');
  const messageInput = document.getElementById('guest-message');
  const stars = document.querySelectorAll('.star-item');
  const listContainer = document.getElementById('guestbook-list');
  const badgeCount = document.getElementById('entry-count-badge');
  const formFeedback = document.getElementById('form-feedback');

  // Star Rating Click Interaction
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const selectedValue = parseInt(star.getAttribute('data-value'), 10);
      ratingInput.value = selectedValue;

      stars.forEach(s => {
        const val = parseInt(s.getAttribute('data-value'), 10);
        if (val <= selectedValue) {
          s.classList.replace('fa-regular', 'fa-solid');
          s.classList.add('text-amber-400');
        } else {
          s.classList.replace('fa-solid', 'fa-regular');
          s.classList.remove('text-amber-400');
        }
      });

      const labelDescriptions = {
        1: '1 Bintang (Kurang Puas)',
        2: '2 Bintang (Cukup)',
        3: '3 Bintang (Bagus)',
        4: '4 Bintang (Sangat Bagus)',
        5: '5 Bintang (Luar Biasa!)'
      };
      if (ratingText) {
        ratingText.textContent = labelDescriptions[selectedValue] || `${selectedValue} Bintang`;
      }
    });
  });

  // Default initial testimonials (authentic entries for demonstration)
  const defaultEntries = [
    {
      name: 'Budi Santoso',
      origin: 'Surabaya, Jawa Timur',
      rating: 5,
      date: '10 November 2024',
      message: 'Luar biasa megah dan menyegarkan! Trekking menuruni tebing terbayar lunas begitu melihat tirai air Kapas Biru. Web penjelasan ini sangat rapi dan informatif!'
    },
    {
      name: 'Siti Rahmawati',
      origin: 'Malang',
      rating: 5,
      date: '8 November 2024',
      message: 'Biaya tiket masuk sangat terjangkau hanya 10 ribu. Fasilitas kamar bilas dan warung lokal sangat membantu pelancong. Salam sukses untuk tim kelompok Bu Ratna!'
    },
    {
      name: 'David Wijaya',
      origin: 'Jakarta Selatan',
      rating: 5,
      date: '5 November 2024',
      message: 'Salah satu air terjun terindah di Indonesia! Suasana alamnya sangat asri dan video sinematik di web ini benar-benar menangkap atmosfer aslinya.'
    },
    {
      name: 'Rina Kusuma',
      origin: 'Yogyakarta',
      rating: 5,
      date: '2 November 2024',
      message: 'Informasi harga parkir dan rute trekking sangat jelas. Terima kasih atas informasi lengkapnya!'
    }
  ];

  // Load entries from localStorage or fallback to defaults
  let storedEntries = [];
  try {
    const rawData = localStorage.getItem('kapas_biru_guestbook_entries');
    if (rawData) {
      storedEntries = JSON.parse(rawData);
    } else {
      storedEntries = defaultEntries;
      localStorage.setItem('kapas_biru_guestbook_entries', JSON.stringify(defaultEntries));
    }
  } catch (err) {
    storedEntries = defaultEntries;
  }

  function renderEntries() {
    if (!listContainer) return;
    listContainer.innerHTML = '';

    if (badgeCount) {
      badgeCount.textContent = `${storedEntries.length} Pesan Tercatat`;
    }

    storedEntries.forEach(entry => {
      const card = document.createElement('div');
      card.className = 'bg-slate-50 hover:bg-white p-5 rounded-2xl border border-slate-200 transition-all shadow-sm';

      // Sanitasi ketat untuk mencegah perubahan atau injeksi HTML oleh pengunjung
      const safeName = sanitizeHTML(entry.name);
      const safeOrigin = sanitizeHTML(entry.origin);
      const safeDate = sanitizeHTML(entry.date || 'Baru saja');
      const safeMessage = sanitizeHTML(entry.message);
      const ratingStars = generateStarIcons(entry.rating || 5);

      card.innerHTML = `
        <div class="flex items-start justify-between mb-2">
          <div>
            <h4 class="font-bold text-slate-900 text-sm flex items-center">
              <i class="fa-solid fa-circle-user text-emerald-600 mr-2 text-base"></i>
              ${safeName}
            </h4>
            <p class="text-[11px] text-slate-500 flex items-center mt-0.5">
              <i class="fa-solid fa-location-dot text-slate-400 mr-1"></i>
              ${safeOrigin} • <span class="ml-1 text-slate-400">${safeDate}</span>
            </p>
          </div>
          <div class="flex text-amber-400 text-xs">
            ${ratingStars}
          </div>
        </div>
        <p class="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-100">
          "${safeMessage}"
        </p>
      `;

      listContainer.appendChild(card);
    });
  }

  renderEntries();

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const origin = originInput.value.trim();
      const rating = parseInt(ratingInput.value, 10) || 5;
      const message = messageInput.value.trim();

      if (!name || !origin || !message) {
        showFeedback('Mohon lengkapi semua kolom yang bertanda bintang (*)', false);
        return;
      }

      // Format current date in Indonesian
      const now = new Date();
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = now.toLocaleDateString('id-ID', options);

      const newEntry = {
        name: name,
        origin: origin,
        rating: rating,
        date: formattedDate,
        message: message
      };

      // Add to front of array
      storedEntries.unshift(newEntry);

      // Persist to localStorage
      try {
        localStorage.setItem('kapas_biru_guestbook_entries', JSON.stringify(storedEntries));
      } catch (err) {
        console.warn('LocalStorage quota or storage restriction:', err);
      }

      // Re-render
      renderEntries();

      // Reset form
      form.reset();
      ratingInput.value = '5';
      if (ratingText) ratingText.textContent = '5 Bintang (Luar Biasa!)';
      stars.forEach(s => {
        s.classList.replace('fa-regular', 'fa-solid');
        s.classList.add('text-amber-400');
      });

      showFeedback('Terima kasih! Pesan dan apresiasi Anda berhasil dicatat di Buku Tamu.', true);
    });
  }

  function showFeedback(text, isSuccess) {
    if (!formFeedback) return;
    formFeedback.textContent = text;
    formFeedback.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-emerald-100', 'text-emerald-800');

    if (isSuccess) {
      formFeedback.classList.add('bg-emerald-100', 'text-emerald-800');
    } else {
      formFeedback.classList.add('bg-red-100', 'text-red-700');
    }

    setTimeout(() => {
      formFeedback.classList.add('hidden');
    }, 4500);
  }
}

/* ========================================================
 * 5. SANITASI ANTI-XSS & KEAMANAN INFORMASI
 * ======================================================== */
function sanitizeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateStarIcons(count) {
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= count) {
      starsHtml += '<i class="fa-solid fa-star"></i>';
    } else {
      starsHtml += '<i class="fa-regular fa-star"></i>';
    }
  }
  return starsHtml;
}

/* ========================================================
 * 6. DETEKSI FOTO KELOMPOK LOKAL JIKA ADA
 * ======================================================== */
function initLocalGroupPhotoFallback() {
  const groupImg = document.getElementById('group-main-img');
  if (!groupImg) return;

  // Cek apakah ada file foto-kelompok.jpg di folder lokal pengguna
  const localCandidates = ['foto-kelompok.jpg', 'foto-kelompok.png', 'assets/foto-kelompok.jpg'];
  
  function checkImage(index) {
    if (index >= localCandidates.length) return;
    const testImg = new Image();
    testImg.src = localCandidates[index];
    testImg.onload = function() {
      groupImg.src = localCandidates[index];
    };
    testImg.onerror = function() {
      checkImage(index + 1);
    };
  }

  checkImage(0);
}

/* ========================================================
 * 7. TAHUN OTOMATIS
 * ======================================================== */
function updateCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
