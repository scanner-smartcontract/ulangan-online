// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Data soal ulangan
const questions = {
    tema1: [
        {
            question: "Apa ibukota Indonesia?",
            answers: ["Jakarta", "Bandung", "Surabaya", "Medan"],
            correctAnswer: 0
        },
        {
            question: "Siapa presiden pertama Indonesia?",
            answers: ["Soekarno", "Soeharto", "Jokowi", "Megawati"],
            correctAnswer: 0
        }
    ],
    tema2: [
        {
            question: "Berapa hasil dari 2 + 2?",
            answers: ["3", "4", "5", "6"],
            correctAnswer: 1
        },
        {
            question: "Apa warna langit pada siang hari?",
            answers: ["Merah", "Biru", "Hijau", "Kuning"],
            correctAnswer: 1
        }
    ],
    tema3: [
        {
            question: "Apa nama planet terdekat dari matahari?",
            answers: ["Bumi", "Mars", "Venus", "Merkurius"],
            correctAnswer: 3
        },
        {
            question: "Siapa penemu gravitasi?",
            answers: ["Einstein", "Newton", "Galileo", "Tesla"],
            correctAnswer: 1
        }
    ],
    uts: [
        {
            question: "Apa simbol kimia untuk air?",
            answers: ["H2O", "CO2", "O2", "NaCl"],
            correctAnswer: 0
        }
    ],
    uas: [
        {
            question: "Apa nama benua terbesar di dunia?",
            answers: ["Asia", "Afrika", "Amerika", "Eropa"],
            correctAnswer: 0
        }
    ]
};

// Timer
let timeLeft = 600; // 10 menit dalam detik
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Waktu: ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Waktu habis!");
            calculateScore();
        }
    }, 1000);
}

// Fungsi untuk menampilkan soal
function showQuiz(quizId, theme) {
    const quizContainer = document.getElementById(quizId);
    quizContainer.innerHTML = "";

    questions[theme].forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <div class="answers">
                ${q.answers.map((a, i) => `
                    <label>
                        <input type="radio" name="question${index}" value="${i}">
                        ${a}
                    </label>
                `).join("")}
            </div>
        `;
        quizContainer.appendChild(questionDiv);
    });
}

// Fungsi untuk menghitung skor
function calculateScore() {
    let score = 0;
    Object.keys(questions).forEach(theme => {
        questions[theme].forEach((q, index) => {
            const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedAnswer && parseInt(selectedAnswer.value) === q.correctAnswer) {
                score++;
            }
        });
    });
    document.getElementById("score").textContent = `Skor Anda: ${score}`;
}

// Event listener untuk tombol tema
document.querySelectorAll(".themes button").forEach(button => {
    button.addEventListener("click", () => {
        const theme = button.getAttribute("data-theme");
        showQuiz("quiz-harian", theme);
    });
});

// Event listener untuk tombol submit
document.getElementById("submit-btn").addEventListener("click", calculateScore);

// Login dengan Firebase
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            document.getElementById("login-section").style.display = "none";
            document.getElementById("quiz-section").style.display = "block";
            startTimer();
        })
        .catch((error) => {
            alert("Login gagal: " + error.message);
        });
});

// Tampilkan soal UTS dan UAS saat halaman dimuat
window.onload = () => {
    showQuiz("quiz-uts", "uts");
    showQuiz("quiz-uas", "uas");
};
