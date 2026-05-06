// === Durasi dalam detik ===
const workTime = 25 * 60; // 25 menit
const breakTime = 5 * 60;  // 5 menit
let timeLeft = workTime;
let timer;
let isRunning = false;
let currentMode = "work";

// === DOM Elements ===
const timeDisplay = document.getElementById('time');
const modeText = document.getElementById('mode-text');
const progressCircle = document.querySelector('.progress');

// Lingkaran progress (2πr, r=90 => 565)
const circleLength = 565;
progressCircle.style.strokeDasharray = circleLength;
progressCircle.style.strokeDashoffset = circleLength;

// === Update Display ===
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    let totalTime = currentMode === "work" ? workTime : breakTime;
    let progressPercent = (timeLeft / totalTime) * circleLength;
    progressCircle.style.strokeDashoffset = progressPercent;

    modeText.textContent = currentMode === "work" ? "Fokus Kerja" : "Waktu Istirahat";
}

// === Mulai Timer ===
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                alert(currentMode === "work" ? "Waktunya Istirahat!" : "Saatnya Kembali Bekerja!");
                // Switch mode otomatis
                setMode(currentMode === "work" ? "break" : "work");
            }
        }, 1000);
    }
}

// === Reset Timer ===
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = currentMode === "work" ? workTime : breakTime;
    updateDisplay();
}

// === Set Mode (work/break) ===
function setMode(mode) {
    currentMode = mode;
    timeLeft = mode === "work" ? workTime : breakTime;
    updateDisplay();
    clearInterval(timer);
    isRunning = false;
}

// === Event Listeners ===
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('work').addEventListener('click', () => setMode('work'));
document.getElementById('break').addEventListener('click', () => setMode('break'));

// === Inisialisasi pertama ===
updateDisplay();