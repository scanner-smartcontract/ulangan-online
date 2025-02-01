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

// Event listener untuk tombol tema
document.querySelectorAll(".themes button").forEach(button => {
    button.addEventListener("click", () => {
        const theme = button.getAttribute("data-theme");
        showQuiz("quiz-harian", theme);
    });
});

// Tampilkan soal UTS dan UAS saat halaman dimuat
window.onload = () => {
    showQuiz("quiz-uts", "uts");
    showQuiz("quiz-uas", "uas");
};
