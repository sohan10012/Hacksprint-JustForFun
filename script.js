
function updateClock() {
  const now = new Date();
  const clock = document.querySelector("#clock .clock");
  const dateElement = document.querySelector("#clock .date");
  const timezoneSelect = document.getElementById("timezoneSelect");
  const selectedTimezone = timezoneSelect.value;

  let displayTime;
  if (selectedTimezone === "local") {
    displayTime = now;
  } else {
    displayTime = new Date(
      now.toLocaleString("en-US", { timeZone: selectedTimezone })
    );
  }

  const hours = String(displayTime.getHours()).padStart(2, "0");
  const minutes = String(displayTime.getMinutes()).padStart(2, "0");
  const seconds = String(displayTime.getSeconds()).padStart(2, "0");

  clock.innerHTML = `${hours}:${minutes}<span class="pulse">:</span>${seconds}`;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  dateElement.textContent = `${days[displayTime.getDay()]}, ${
    months[displayTime.getMonth()]
  } ${displayTime.getDate()}`;
}

setInterval(updateClock, 1000);
updateClock();

document
  .getElementById("timezoneSelect")
  .addEventListener("change", updateClock);

const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-tab");
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});


const alarmTimeInput = document.getElementById("alarmTime");
const setAlarmButton = document.getElementById("setAlarm");
const alarmStatus = document.getElementById("alarmStatus");
let alarmTimeout;

setAlarmButton.addEventListener("click", () => {
  const alarmTime = alarmTimeInput.value;
  if (alarmTime) {
    const [hours, minutes] = alarmTime.split(":");
    const now = new Date();
    const alarm = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    if (alarm > now) {
      const timeToAlarm = alarm - now;
      alarmStatus.textContent = "Alarm set";
      alarmTimeout = setTimeout(() => {
        alert("Alarm!");
        alarmStatus.textContent = "";
      }, timeToAlarm);
    } else {
      alarmStatus.textContent = "Please set a future time";
    }
  } else {
    alarmStatus.textContent = "Please set a valid time";
  }
});

const stopwatchDisplay = document.getElementById("stopwatchDisplay");
const startStopwatchButton = document.getElementById("startStopwatch");
const resetStopwatchButton = document.getElementById("resetStopwatch");
let stopwatchInterval;
let stopwatchTime = 0;

function updateStopwatch() {
  const hours = Math.floor(stopwatchTime / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((stopwatchTime % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (stopwatchTime % 60).toString().padStart(2, "0");
  stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

startStopwatchButton.addEventListener("click", () => {
  if (startStopwatchButton.textContent === "Start") {
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      updateStopwatch();
    }, 1000);
    startStopwatchButton.textContent = "Stop";
  } else {
    clearInterval(stopwatchInterval);
    startStopwatchButton.textContent = "Start";
  }
});

resetStopwatchButton.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  updateStopwatch();
  startStopwatchButton.textContent = "Start";
});

const timerMinutesInput = document.getElementById("timerMinutes");
const timerDisplay = document.getElementById("timerDisplay");
const startTimerButton = document.getElementById("startTimer");
const resetTimerButton = document.getElementById("resetTimer");
let timerInterval;
let timerTime = 0;

function updateTimer() {
  const minutes = Math.floor(timerTime / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timerTime % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
  if (timerTime === 0) {
    clearInterval(timerInterval);
    alert("Timer finished!");
    startTimerButton.textContent = "Start";
  }
}

startTimerButton.addEventListener("click", () => {
  if (startTimerButton.textContent === "Start") {
    const minutes = parseInt(timerMinutesInput.value);
    if (isNaN(minutes) || minutes <= 0) {
      alert("Please enter a valid number of minutes");
      return;
    }
    timerTime = minutes * 60;
    timerInterval = setInterval(() => {
      timerTime--;
      updateTimer();
    }, 1000);
    startTimerButton.textContent = "Stop";
  } else {
    clearInterval(timerInterval);
    startTimerButton.textContent = "Start";
  }
});

resetTimerButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerTime = 0;
  updateTimer();
  startTimerButton.textContent = "Start";
});

const alarmSound = document.getElementById("alarmSound");

setAlarmButton.addEventListener("click", () => {
  const alarmTime = alarmTimeInput.value;
  if (alarmTime) {
    const [hours, minutes] = alarmTime.split(":");
    const now = new Date();
    const alarm = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    if (alarm > now) {
      const timeToAlarm = alarm - now;
      alarmStatus.textContent = "Alarm set";
      alarmTimeout = setTimeout(() => {
        alarmSound.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
        alert("Alarm!");
        alarmStatus.textContent = "";

        // Stop the alarm sound after 15 seconds
        setTimeout(() => {
          alarmSound.pause();
          alarmSound.currentTime = 0; // Reset the audio to the beginning
        }, 15000); // 15000 milliseconds = 15 seconds
      }, timeToAlarm);
    } else {
      alarmStatus.textContent = "Please set a future time";
    }
  } else {
    alarmStatus.textContent = "Please set a valid time";
  }
});
