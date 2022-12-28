const timeElement = document.getElementById("time");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");
const settingsElement = document.getElementById("settings");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

chrome.storage.sync.get(["name"], (res) => {
  const name = res.name ?? "";

  if (name !== "") {
    nameElement.textContent = `Hi ${name}!`;
  } else {
    createBtn("ftue-name", "Setup your name: ");
  }
});

settingsElement.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});

stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  });
});

updateLiveElements();
setInterval(updateLiveElements, 1000);

function createBtn(id, additionalText) {
  const divRef = document.getElementById("name-field");
  const btn = document.createElement("BUTTON");
  const txt = document.createTextNode("Add my name");

  nameElement.textContent = additionalText;

  btn.setAttribute("id", id);
  btn.setAttribute("class", "make-it-inline");
  btn.appendChild(txt);
  btn.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });

  divRef.appendChild(btn);
}

function updateLiveElements() {
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `The time is ${currentTime}`;

  chrome.storage.local.get(["timer"], (res) => {
    const time = res.timer ?? 0;

    timerElement.textContent = `Active timer: ${time} seconds`;
  });
}
