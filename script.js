// Script Kontrol Musik & Interaksi Undangan Aqiqah

document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const musicControl = document.getElementById("musicControl");
  const btnOpenInvitation = document.getElementById("btnOpenInvitation");
  const invitationCover = document.getElementById("invitationCover");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sinkronisasi status tombol animasi dengan audio asli
  if (bgMusic && musicControl) {
    bgMusic.addEventListener("play", () => {
      musicControl.classList.add("playing");
    });
    bgMusic.addEventListener("pause", () => {
      musicControl.classList.remove("playing");
    });
  }

  // Fungsi toggle play / pause musik
  function toggleMusic() {
    if (!bgMusic) return;

    if (bgMusic.paused) {
      bgMusic.play().catch(err => {
        console.warn("Pemutaran audio dibatasi browser:", err);
      });
    } else {
      bgMusic.pause();
    }
  }

  if (musicControl) {
    musicControl.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMusic();
    });
  }

  // Fungsi saat tombol "Buka Undangan" diklik
  if (btnOpenInvitation && invitationCover) {
    btnOpenInvitation.addEventListener("click", () => {
      // 1. Putar musik langsung dari event klik resmi (100% diizinkan browser)
      if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(err => {
          console.warn("Gagal memutar audio:", err);
        });
      }

      // 2. Buka layar cover dengan animasi transisi
      invitationCover.classList.add("opened");
      document.body.classList.remove("cover-active");

      // Hapus event listener interaksi tambahan
      removeInteractionListeners();
    });
  }

  // Backup: jika pengguna mengetuk/mengklik di area lain
  function playAudioOnInteraction() {
    if (bgMusic && bgMusic.paused) {
      bgMusic.play().then(() => {
        removeInteractionListeners();
      }).catch(() => {
        // Biarkan tetap aktif jika browser belum mengizinkan
      });
    }
  }

  function removeInteractionListeners() {
    document.removeEventListener("click", playAudioOnInteraction);
    document.removeEventListener("touchstart", playAudioOnInteraction);
  }

  document.addEventListener("click", playAudioOnInteraction);
  document.addEventListener("touchstart", playAudioOnInteraction);

  // Coba putar otomatis saat halaman dibuka (jika diizinkan pengaturan browser pengguna)
  if (bgMusic) {
    bgMusic.play().catch(() => {
      // Browser modern biasanya memblokir autoplay tanpa klik, ini normal dan ditangani oleh tombol cover
    });
  }

  // Active Navbar link on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // Deteksi foto bayi
  const babyPhoto = document.getElementById("babyPhoto");
  if (babyPhoto) {
    const testImg = new Image();
    testImg.onload = () => {
      babyPhoto.src = "img/foto-bayi.jpg";
    };
    testImg.src = "img/foto-bayi.jpg";
  }

  console.log("Undangan Aqiqah siap ditampilkan!");
});
