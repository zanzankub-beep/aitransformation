// Parallax Effect
const layer1 = document.getElementById('layer1');
if (layer1) {
    document.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        layer1.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Quiz Data
const questions = [
    { q: "เส้นคืออะไรในงานศิลปะ?", a: ["การเคลื่อนที่ของจุด", "พื้นผิวของวัตถุ", "พื้นที่ว่าง", "ความสว่างของสี"], c: 0 },
    { q: "เส้นตรงให้ความรู้สึกแบบใด?", a: ["อิสระ", "มั่นคง แข็งแรง", "นุ่มนวล", "สับสน"], c: 1 },
    { q: "เส้นโค้งมักสื่ออารมณ์แบบใด?", a: ["อันตราย", "เรียบง่าย", "ไหลลื่น อ่อนโยน", "เร่งรีบ"], c: 2 },
    { q: "เส้นซิกแซกให้ความรู้สึก...", a: ["น่ากลัว ตื่นเต้น", "สงบ", "เป็นระเบียบ", "หนักแน่น"], c: 0 },
    { q: "เส้นประใช้เพื่ออะไร?", a: ["หยุดสายตา", "แบ่งพื้นที่", "ทำให้วัตถุดูแข็งแรง", "เพิ่มน้ำหนัก"], c: 1 },
    { q: "เส้นแนวนอนให้ความรู้สึก...", a: ["มั่นคง", "สงบ ผ่อนคลาย", "เคลื่อนไหว", "อันตราย"], c: 1 },
    { q: "เส้นแนวตั้งสื่อความหมายใด?", a: ["ความมั่นคง ความสูง", "ความเร็ว", "ความน่ากลัว", "ความโกลาหล"], c: 0 },
    { q: "เส้นทแยงหมายถึงอะไร?", a: ["นิ่งสงบ", "เคลื่อนไหวและพลัง", "นุ่มนวล", "สมดุล"], c: 1 },
    { q: "เส้นมีหน้าที่ใดต่อองค์ประกอบภาพ?", a: ["ทำให้ภาพมืด", "กำหนดทิศทางสายตา", "ลดรายละเอียด", "เพิ่มเงา"], c: 1 },
    { q: "ข้อใดไม่ใช่ประเภทของเส้น?", a: ["เส้นตรง", "เส้นโค้ง", "เส้นสามมิติ", "เส้นซิกแซก"], c: 2 },
    { q: "เส้นต่อเนื่องช่วยให้เกิดอะไร?", a: ["การเคลื่อนไหวของรูป", "ความมืด", "ความหยาบ", "พื้นผิวเงา"], c: 0 },
    { q: "ลักษณะเส้นหนาให้ความรู้สึกแบบใด?", a: ["หนักแน่น", "เบาสบาย", "สับสน", "อ่อนแอ"], c: 0 },
    { q: "เส้นบางให้ความรู้สึกแบบใด?", a: ["มั่นคง", "เคร่งเครียด", "ละเอียด อ่อนหวาน", "แข็งแรง"], c: 2 },
    { q: "ศิลปินใช้เส้นเพื่ออะไร?", a: ["สร้างมิติและกำหนดรูปร่าง", "ทำให้สีสดขึ้น", "ลดความคม", "เพิ่มความหนัก"], c: 0 },
    { q: "เส้นที่ลากอิสระไม่เป็นระเบียบเรียกว่า?", a: ["เส้นควบคุม", "เส้นอิสระ", "เส้นตั้งใจ", "เส้นเรขาคณิต"], c: 1 }
];

const quizForm = document.getElementById("quiz");
const startPage = document.getElementById("startPage");
const quizPage = document.getElementById("quizPage");
const resultPage = document.getElementById("resultPage");
const warn = document.getElementById("warn");
const scoreText = document.getElementById("scoreText");
const scoreGraph = document.getElementById("scoreGraph");

// Render Questions
if (quizForm) {
    questions.forEach((item, index) => {
        let box = document.createElement("div");
        box.className = "glass p-6";
        let ansHTML = "";
        item.a.forEach((ch, i) => {
            ansHTML += `
            <label class='flex items-center gap-3 py-1 cursor-pointer'>
                <input type="radio" name="q${index}" value="${i}" class="accent-brand-accent">
                <span>${ch}</span>
            </label>`;
        });
        box.innerHTML = `<h3 class='font-bold text-lg mb-3'>${index + 1}. ${item.q}</h3>${ansHTML}`;
        quizForm.appendChild(box);
    });
}

function startQuiz() {
    if (startPage) startPage.classList.add("hidden");
    if (quizPage) quizPage.classList.remove("hidden");
}

function checkScore() {
    // Check if all questions are answered
    for (let i = 0; i < questions.length; i++) {
        if (!document.querySelector(`input[name='q${i}']:checked`)) {
            warn.innerHTML = `กรุณาตอบข้อที่ <span class='text-brand-accent'>${i + 1}</span>`;
            return;
        }
    }

    let score = 0;
    let reviewHTML = "";

    document.querySelectorAll('#quiz > div').forEach((box, i) => {

        const selected = document.querySelector(`input[name='q${i}']:checked`);
        const userAns = parseInt(selected.value);
        const correctAns = questions[i].c;

        if (userAns === correctAns) {
            box.classList.add("correct");
            score++;
        } else {
            box.classList.add("wrong");
        }

        // Generate Answer Review
        reviewHTML += `
            <div class="p-4 rounded-xl border ${userAns === correctAns ? "border-green-400 bg-green-800/20" : "border-red-400 bg-red-800/20"
            }">
                <p class="font-bold text-lg">ข้อ ${i + 1}. ${questions[i].q}</p>
                <p class="mt-1">คุณตอบ: 
                    <span class="${userAns === correctAns ? 'text-green-300' : 'text-red-300'}">
                        ${questions[i].a[userAns]}
                    </span>
                </p>
                <p>คำตอบที่ถูกต้องคือ: 
                    <span class="text-brand-accent font-bold">
                        ${questions[i].a[correctAns]}
                    </span>
                </p>
            </div>
        `;
    });

    // Hide Quiz, Show Results
    quizPage.classList.add("hidden");
    resultPage.classList.remove("hidden");

    // Display Score
    scoreText.innerHTML = `คุณได้คะแนน <span class='text-brand-accent text-4xl'>${score}</span> / 15`;

    // Insert Review
    const answerReview = document.getElementById("answerReview");
    if (answerReview) answerReview.innerHTML = reviewHTML;

    // Render Chart
    if (scoreGraph) {
        new Chart(scoreGraph, {
            type: 'doughnut',
            data: {
                labels: ['ถูก', 'ผิด'],
                datasets: [{
                    data: [score, 15 - score],
                    backgroundColor: ['#00f260', '#ff4545'],
                }]
            }
        });
    }
}
