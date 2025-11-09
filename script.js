// Navbar mobile toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));

// Navigasi antar halaman
const pages = document.querySelectorAll('.page');
document.getElementById('home-link').addEventListener('click', () => showPage('page1'));
document.getElementById('moment-link').addEventListener('click', () => showPage('page3'));

function showPage(id) {
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  navLinks.classList.remove('show');
}

// Kotak misteri
document.getElementById('mysteryBox').addEventListener('click', () => {
  showPage('page2');
  generateParticles();
});

// Tombol Rayakan
document.getElementById('celebrateBtn').addEventListener('click', startConfetti);

// ====== CONFETTI EFFECT ======
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function createConfetti() {
  const colors = [
    '#ffadc6', '#ffd1dc', '#ff9aa2', '#ffb6c1',
    '#ffc1e3', '#ffe6f2', '#fff0f5'
  ];
  const totalConfetti = 400; // jumlah partikel (lebih banyak)

  confetti = [];

  for (let i = 0; i < totalConfetti; i++) {
    // posisi awal bisa dari atas, kiri, atau kanan
    const side = Math.floor(Math.random() * 3);
    let x, y, vx, vy;

    if (side === 0) { // dari atas
      x = Math.random() * canvas.width;
      y = -10;
      vx = Math.random() * 2 - 1; // gerak kanan kiri
      vy = Math.random() * 3 + 2;
    } else if (side === 1) { // dari kiri
      x = -10;
      y = Math.random() * canvas.height;
      vx = Math.random() * 3 + 2;
      vy = Math.random() * 1.5 - 0.5;
    } else { // dari kanan
      x = canvas.width + 10;
      y = Math.random() * canvas.height;
      vx = -Math.random() * 3 - 2;
      vy = Math.random() * 1.5 - 0.5;
    }

    confetti.push({
      x, y, vx, vy,
      r: Math.random() * 8 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * Math.PI,
      rotateSpeed: (Math.random() - 0.5) * 0.1
    });
  }
}



function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.ellipse(c.x, c.y, c.r, c.r / 2, c.tilt, 0, Math.PI * 2);
    ctx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach(c => {
    c.x += c.vx;
    c.y += c.vy;
    c.tilt += c.rotateSpeed;

    // reset jika keluar layar
    if (c.y > canvas.height + 20 || c.x < -20 || c.x > canvas.width + 20) {
      const side = Math.floor(Math.random() * 3);
      if (side === 0) {
        c.x = Math.random() * canvas.width;
        c.y = -10;
        c.vx = Math.random() * 2 - 1;
        c.vy = Math.random() * 3 + 2;
      } else if (side === 1) {
        c.x = -10;
        c.y = Math.random() * canvas.height;
        c.vx = Math.random() * 3 + 2;
        c.vy = Math.random() * 1.5 - 0.5;
      } else {
        c.x = canvas.width + 10;
        c.y = Math.random() * canvas.height;
        c.vx = -Math.random() * 3 - 2;
        c.vy = Math.random() * 1.5 - 0.5;
      }
    }
  });
}


function startConfetti() {
  confetti = [];
  createConfetti();
  let duration = 3000;
  let end = Date.now() + duration;
  (function animate() {
    drawConfetti();
    if (Date.now() < end) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  })();
}

// ====== BACKGROUND PARTICLES ======
function generateParticles() {
  const container = document.getElementById('particles');
  container.innerHTML = '';
  const colors = ['#ffb6c1', '#ffcce6', '#ffd6eb', '#fff0f5'];
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 15 + 10 + 'px';
    particle.style.width = size;
    particle.style.height = size;
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDuration = (8 + Math.random() * 5) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(particle);
  }
}

// Resize canvas saat ubah ukuran layar
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ==== Modal Gambar/Video dengan Scroll Vertikal (Mobile) dan Navigasi (Desktop) ====
const modal = document.getElementById('imageModal');
const modalImg = modal.querySelector('img');
const galleryItems = Array.from(document.querySelectorAll('.gallery img, .gallery video'));
let currentIndex = 0;

// Tambahkan elemen tambahan (panah + tombol close)
const arrowHint = document.createElement('div');
arrowHint.className = 'scroll-hint';
arrowHint.textContent = '⬇️ Geser ke bawah untuk lanjut';
modal.appendChild(arrowHint);

const closeBtn = document.createElement('button');
closeBtn.className = 'close-btn';
closeBtn.innerHTML = '✖';
modal.appendChild(closeBtn);

// Fungsi menampilkan item (foto/video)
function showMedia(index) {
  if (index < 0) index = galleryItems.length - 1;
  if (index >= galleryItems.length) index = 0;
  currentIndex = index;

  const item = galleryItems[currentIndex];
  modal.innerHTML = ''; // hapus isi lama
  modal.appendChild(closeBtn);
  modal.appendChild(arrowHint);

  if (item.tagName.toLowerCase() === 'img') {
    const newImg = document.createElement('img');
    newImg.src = item.src;
    modal.appendChild(newImg);
  } else {
    const newVid = document.createElement('video');
    newVid.src = item.src;
    newVid.controls = true;
    newVid.autoplay = true;
    newVid.style.maxWidth = '90%';
    newVid.style.maxHeight = '80%';
    newVid.style.borderRadius = '15px';
    modal.appendChild(newVid);
  }

  modal.style.display = 'flex';
  arrowHint.style.display = 'block';
  closeBtn.style.display = 'block';
}

// Klik item galeri → tampil di modal
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    showMedia(index);
  });
});

// Tombol close (❌)
closeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  modal.style.display = 'none';
});

// Klik luar → tutup (desktop)
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// Keyboard navigation (desktop)
window.addEventListener('keydown', (e) => {
  if (modal.style.display === 'flex') {
    if (e.key === 'ArrowRight') showMedia(currentIndex + 1);
    if (e.key === 'ArrowLeft') showMedia(currentIndex - 1);
    if (e.key === 'Escape') modal.style.display = 'none';
  }
});

// Scroll navigation (desktop)
window.addEventListener('wheel', (e) => {
  if (modal.style.display === 'flex' && window.innerWidth > 768) {
    if (e.deltaY > 0 || e.deltaX > 0) showMedia(currentIndex + 1);
    if (e.deltaY < 0 || e.deltaX < 0) showMedia(currentIndex - 1);
  }
});

// Scroll bawah untuk pindah (mobile)
let startY = 0;
modal.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
});

modal.addEventListener('touchend', (e) => {
  const endY = e.changedTouches[0].clientY;
  const diff = startY - endY;
  if (Math.abs(diff) > 50) {
    if (diff > 0) showMedia(currentIndex + 1); // geser ke atas → next
    else showMedia(currentIndex - 1);          // geser ke bawah → prev
  }
});




// Panggil setelah masuk ke page2
document.getElementById('mysteryBox').addEventListener('click', () => {
  showPage('page2');
  generateParticles();
  const msg = document.querySelector('#page2 .message-container p');
  msg.textContent = "";
  typingEffect(msg, "Doa Ini sebenarnya panjang,tetapi disingkat. semoga semua yang diinginkan tercapai. #mudahmudahanmudah 💕✨");
});

// ==== EFEK KETIK UNTUK PESAN ====
function typingEffect(element, text, speed = 60) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}


// Musik toggle
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let playing = false;

musicBtn.addEventListener('click', () => {
  if (playing) {
    music.pause();
    musicBtn.textContent = "🔇";
  } else {
    music.play();
    musicBtn.textContent = "🔊";
  }
  playing = !playing;
});


// Balon lucu
function spawnBalloon() {
  const zone = document.getElementById('balloonZone');
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.style.left = Math.random() * 90 + 'vw';
  balloon.style.animationDuration = (4 + Math.random() * 2) + 's';
  balloon.textContent = '🥳';
  balloon.addEventListener('click', () => balloon.remove());
  zone.appendChild(balloon);
  setTimeout(() => balloon.remove(), 6000);
}
setInterval(spawnBalloon, 1000);


// ==== TIME CAPSULE FRIENDSHIP TIMER ====
const startDate = new Date("2018-07-16");

function updateFriendshipTimer() {
  const now = new Date();
  const diff = now - startDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  const remainingDays = days - years * 365 - months * 30;

  const text = `😱 Adewe Konconan wes Suwe jir, wes 
  <b>${years}</b> tahun, <b>${months}</b> bulan, dan <b>${remainingDays}</b> hari 😱`;

  document.getElementById("friendshipTimer").innerHTML = text;
}

// jalankan saat halaman ucapan muncul
document.getElementById('mysteryBox').addEventListener('click', () => {
  setTimeout(updateFriendshipTimer, 1000);
});


// ==== DARK MODE TOGGLE ====
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // ubah ikon tombol
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
    updateParticlesColor("cyan"); // ubah warna partikel ke biru cyan
  } else {
    themeToggle.textContent = "🌙";
    updateParticlesColor("pink"); // kembalikan ke pink
  }
});



function updateParticlesColor(mode) {
  const particles = document.querySelectorAll(".particle");
  particles.forEach(p => {
    if (mode === "cyan") {
      const glow = Math.random() * 0.5 + 0.5;
      p.style.backgroundColor = `rgba(0, 255, 255, ${glow})`;
      p.style.boxShadow = `0 0 ${5 + Math.random() * 10}px rgba(0,255,255,0.6)`;
    } else {
      p.style.backgroundColor = `rgba(255, 182, 193, ${Math.random() * 0.5 + 0.5})`;
      p.style.boxShadow = `0 0 ${3 + Math.random() * 5}px rgba(255,182,193,0.4)`;
    }
  });
}

