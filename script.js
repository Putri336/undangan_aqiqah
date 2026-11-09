// Script Kontrol Musik & Interaksi Undangan Aqiqah

document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const musicControl = document.getElementById("musicControl");
  const navLinks = document.querySelectorAll(".nav-link");

  let isPlaying = false;

  // Fungsi toggle musik
  function toggleMusic() {
    if (!bgMusic) return;

    if (isPlaying) {
      bgMusic.pause();
      musicControl.classList.remove("playing");
      isPlaying = false;
    } else {
      bgMusic.play().then(() => {
        musicControl.classList.add("playing");
        isPlaying = true;
      }).catch(err => {
        console.log("Audio play dibatasi browser sampai ada interaksi:", err);
      });
    }
  }

  if (musicControl) {
    musicControl.addEventListener("click", toggleMusic);
  }

  // Coba putar otomatis saat interaksi pertama pengguna jika audio tersedia
  const startAudioOnFirstInteraction = () => {
    if (!isPlaying && bgMusic && bgMusic.src) {
      bgMusic.play().then(() => {
        musicControl.classList.add("playing");
        isPlaying = true;
      }).catch(() => {
        // Abaikan jika browser belum mengizinkan
      });
    }
    document.removeEventListener("click", startAudioOnFirstInteraction);
    document.removeEventListener("touchstart", startAudioOnFirstInteraction);
  };

  document.addEventListener("click", startAudioOnFirstInteraction);
  document.addEventListener("touchstart", startAudioOnFirstInteraction);

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

  // Ganti placeholder dengan foto asli jika foto-bayi.jpg sudah dimasukkan
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
