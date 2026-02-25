// --- User Profile Management ---
function initUserProfile() {
    const loggedInUser = localStorage.getItem('sessionUser');
    const loginNavBtn = document.getElementById('login-nav-btn');
    const userProfileNav = document.getElementById('user-profile-nav');
    const userActualName = document.getElementById('user-actual-name');
    const userAvatarImg = document.getElementById('user-avatar-img');
    const fileInput = document.getElementById('file-input');

    if (loggedInUser) {
        if (loginNavBtn) loginNavBtn.classList.add('hidden');
        if (userProfileNav) {
            userProfileNav.classList.remove('hidden');
            userProfileNav.classList.add('flex');
        }

        const savedName = localStorage.getItem('profileName') || loggedInUser;
        const savedImg = localStorage.getItem('profileImgData');

        if (userActualName) userActualName.innerText = savedName;

        if (userAvatarImg) {
            if (savedImg) {
                userAvatarImg.src = savedImg;
            } else {
                userAvatarImg.src = `https://ui-avatars.com/api/?name=${savedName}&background=00f260&color=000`;
            }
        }

        if (fileInput) {
            fileInput.addEventListener('change', function () {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const imageData = e.target.result;
                        if (userAvatarImg) userAvatarImg.src = imageData;
                        localStorage.setItem('profileImgData', imageData);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
}

function changeProfileName() {
    const newName = prompt("กรุณากรอกชื่อที่ต้องการเปลี่ยน:");
    if (newName && newName.trim() !== "") {
        localStorage.setItem('profileName', newName);
        window.location.reload();
    }
}

function logout() {
    if (confirm("ต้องการออกจากระบบใช่หรือไม่?")) {
        localStorage.removeItem('sessionUser');
        localStorage.removeItem('profileName');
        localStorage.removeItem('profileImgData');
        window.location.reload();
    }
}

// --- Popup Ad Logic ---
function openPopup() {
    const popup = document.getElementById("popup-ad");
    if (popup) popup.classList.remove("hidden");
}

function closePopup() {
    const popup = document.getElementById("popup-ad");
    if (popup) popup.classList.add("hidden");
}

// --- Canvas Animation ---
function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 20 + 5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = `hsla(${Math.random() * 360}, 70%, 50%, ${Math.random() * 0.1})`;
            this.shape = Math.random() > 0.5 ? 'circle' : 'square';
            this.angle = 0;
            this.spin = (Math.random() - 0.5) * 0.02;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.angle += this.spin;
            if (this.x > width || this.x < 0) this.speedX *= -1;
            if (this.y > height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            }
            ctx.restore();
        }
    }

    for (let i = 0; i < 40; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// --- Color Tool Logic ---
let currentHue = 0;
let harmonyMode = 'analogous';

function setHarmony(type) {
    harmonyMode = type;
    const slider = document.querySelector('input[type="range"]');
    if (slider) updateColors(slider.value);
}

function updateColors(hue) {
    currentHue = hue;
    const h = parseInt(hue);

    let hue1 = h;
    let hue2, hue3;

    if (harmonyMode === 'analogous') {
        hue2 = (hue1 + 30) % 360;
        hue3 = (hue1 + 60) % 360;
    } else if (harmonyMode === 'complementary') {
        hue2 = (hue1 + 180) % 360;
        hue3 = (hue2 + 30) % 360;
    }

    // Update color swatches
    const swatches = document.querySelectorAll('.color-swatch');
    if (swatches.length >= 3) {
        swatches[0].style.backgroundColor = `hsl(${hue1}, 80%, 50%)`;
        swatches[1].style.backgroundColor = `hsl(${hue2}, 80%, 50%)`;
        swatches[2].style.backgroundColor = `hsl(${hue3}, 80%, 50%)`;
    }
}

// --- UI Interactions ---
function initUI() {
    const cursor = document.getElementById('cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('py-2');
                navbar.classList.remove('py-4');
                navbar.querySelector('.glass-panel').classList.add('bg-black/80');
            } else {
                navbar.classList.add('py-4');
                navbar.classList.remove('py-2');
                navbar.querySelector('.glass-panel').classList.remove('bg-black/80');
            }
        });
    }

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card, .gallery-item').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initUserProfile();
    initCanvas();
    updateColors(0);
    initUI();

    // Popup Ad timer
    setTimeout(openPopup, 2000);
});
