let score = 0;
let currentQuestion = {};
let timeLeft = 15;
let timer;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 20) + 1; // Angka 1-20
    const num2 = Math.floor(Math.random() * 20) + 1; // Angka 1-20
    const operator = Math.random();
    let question, answer;

    if (operator < 0.25) {
        // Penjumlahan
        question = `${num1} + ${num2}`;
        answer = num1 + num2;
    } else if (operator < 0.5) {
        // Pengurangan
        question = `${num1} - ${num2}`;
        answer = num1 - num2;
    } else if (operator < 0.75) {
        // Perkalian
        question = `${num1} x ${num2}`;
        answer = num1 * num2;
    } else {
        // Pembagian
        question = `${num1 * num2} : ${num2}`; // Pastikan hasilnya bulat
        answer = num1; // Hasil pembagian
    }

    currentQuestion = {
        question: question,
        answer: answer
    };

    document.getElementById("mathQuestion").innerText = currentQuestion.question;
    resetTimer();
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById("timeLeft").innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timeLeft").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("message").innerText = `Waktu habis! Jawaban yang benar adalah ${currentQuestion.answer}.`;
            document.getElementById("answerInput").value = "";
            generateQuestion();
        }
    }, 1000);
}

document.getElementById("submitButton").addEventListener("click", () => {
    checkAnswer();
});

// Tambahkan event listener untuk mendeteksi penekanan tombol "Enter"
document.getElementById("answerInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

function checkAnswer() {
    const answerInput = document.getElementById("answerInput");
    const message = document.getElementById("message");
    const userAnswer = parseInt(answerInput.value);

    if (userAnswer === currentQuestion.answer) {
        score++;
        message.innerText = "Jawaban Benar!";
        document.getElementById("score").innerText = `Skor: ${score}`;
    } else {
        message.innerText = `Jawaban Salah! Jawaban yang benar adalah ${currentQuestion.answer}.`;
    }

    answerInput.value = "";
    generateQuestion();
}

// Memulai permainan
generateQuestion();
