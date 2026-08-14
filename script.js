const audio = document.getElementById("audio");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const status = document.getElementById("status");

const START_TIME = 71;   // 1:00
const STOP_TIME = 120;   // 2:00

let startedFromOneMinute = false;

// Metadata load होने पर position 1:00 पर तैयार कर दें
audio.addEventListener("loadedmetadata", () => {
  audio.currentTime = START_TIME;
  status.textContent = "Ready • 01:11 से शुरू होगा";
});

// Native audio ▶️ Play दबाने पर भी सीधे 1:00 से शुरू होगा
audio.addEventListener("play", () => {
  if (!startedFromOneMinute) {
    audio.currentTime = START_TIME;
    startedFromOneMinute = true;
    status.textContent = "Playing • 01:11 से";
  }
});

// 2:00 पर अपने-आप रोकें
audio.addEventListener("timeupdate", () => {
  if (audio.currentTime >= STOP_TIME) {
    audio.pause();
    audio.currentTime = START_TIME;
    startedFromOneMinute = false;
    status.textContent = "Stopped • 2:00 पर";
  }
});

// नीचे वाला button भी 1:00 से चलाए
startBtn.addEventListener("click", async () => {
  audio.currentTime = START_TIME;
  startedFromOneMinute = true;
  status.textContent = "Playing • 01:11 से";
  try {
    await audio.play();
  } catch (error) {
    status.textContent = "Play दबाकर audio शुरू करें";
  }
});

// फिर से button
resetBtn.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = START_TIME;
  startedFromOneMinute = false;
  status.textContent = "Ready • 01:11 से शुरू होगा";
});
