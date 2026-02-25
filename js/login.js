// --- 1. Particle System ---
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let num = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < num; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * (innerWidth - size * 4) + size * 2;
        let y = Math.random() * (innerHeight - size * 4) + size * 2;
        particlesArray.push(new Particle(x, y, Math.random() * 2 - 1, Math.random() * 2 - 1, size, '#00FF88'));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dist = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (dist < (canvas.width / 7) * (canvas.height / 7)) {
                ctx.strokeStyle = 'rgba(0,255,136,' + (1 - (dist / 20000)) + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

init();
animate();

// --- 2. Login Logic ---
const form = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;

    // Get existing users
    let users = JSON.parse(localStorage.getItem('myUsers')) || [];

    // Add default admin (hardcoded)
    const admin = { username: "6620110010", password: "30012551" };
    if (!users.find(x => x.username === admin.username)) users.push(admin);

    const found = users.find(user => user.username === u && user.password === p);

    if (found) {
        localStorage.setItem('sessionUser', found.username);
        messageDiv.style.color = "#00FF88";
        messageDiv.innerText = `ยินดีต้อนรับคุณ ${found.username}!`;
        // Redirect to index.html (Main Page)
        setTimeout(() => { window.location.href = "index.html"; }, 1200);
    } else {
        messageDiv.style.color = "#ff4444";
        messageDiv.innerText = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!";
    }
});
