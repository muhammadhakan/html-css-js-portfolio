// ========== Theme Toggle ==========
const toggleBtn = document.getElementById('toggleTheme');
const body = document.body;

function setTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light');
    toggleBtn.textContent = '🌙';
  } else {
    body.classList.remove('light');
    toggleBtn.textContent = '☀️';
  }
  localStorage.setItem('theme', theme);
}

toggleBtn.addEventListener('click', () => {
  if (body.classList.contains('light')) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
});

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// ========== Parallax Effect ==========
window.addEventListener('scroll', () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  const scrollTop = window.pageYOffset;

  parallaxElements.forEach((el, i) => {
    const speed = 0.3 + i * 0.1;
    el.style.transform = `translateY(${scrollTop * speed}px)`;
  });
});

// ========== Starfield Background ==========
const canvas = document.getElementById('starfield');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50;

const starCount = 1000;
const starsGeometry = new THREE.BufferGeometry();
const starPositions = [];

for (let i = 0; i < starCount; i++) {
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 200;
  const z = (Math.random() - 0.5) * 200;
  starPositions.push(x, y, z);
}

starsGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(starPositions, 3)
);

const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

let mouseX = 0,
  mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);

  stars.rotation.x += 0.0005 + mouseY * 0.001;
  stars.rotation.y += 0.001 + mouseX * 0.0015;

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

// ========== Contact Form ==========
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill out all fields.';
    formMessage.style.color = 'red';
    return;
  }

  formMessage.textContent = 'Sending...';
  formMessage.style.color = 'orange';

  const serviceID = 'service_x1h4nus';     // ganti dengan ID layanan kamu
  const templateID = 'template_51f3tgi';   // ganti dengan ID template kamu

  const templateParams = {
    from_name: name,
    from_email: email,
    message: message
  };

  // Kirim email dengan EmailJS
  emailjs.send(serviceID, templateID, templateParams)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      formMessage.textContent = 'Message sent successfully!';
      formMessage.style.color = 'lightgreen';
      contactForm.reset();
    })
    .catch((error) => {
      console.error('FAILED...', error);
      // Tampilkan error detail di form
      formMessage.innerHTML = `
        Failed to send message. Please try again.<br>
        <small style="color: gray;">Error: ${error.text || JSON.stringify(error)}</small>
      `;
      formMessage.style.color = 'red';
    });
});


