const nameInput = document.getElementById("name-input");
const timeInput = document.getElementById("time-input");
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");

saveBtn.addEventListener("click", () => {
  const name = nameInput.value ?? "";
  const notificationTime = timeInput.value;

  chrome.storage.sync.set({
    name,
    notificationTime,
  });
  checkNameValue();
});

clearBtn.addEventListener("click", () => {
  const name = "";

  nameInput.value = name;

  chrome.storage.sync.set(
    {
      name,
    },
    () => {
      console.log(`Name is set to ${name}`);
    }
  );
  checkNameValue();
});

chrome.storage.sync.get(["name", "notificationTime"], (res) => {
  const tempName = res.name ?? "";

  nameInput.value = tempName;
  timeInput.value = res.notificationTime ?? 1000;
  checkNameValue();
});

function checkNameValue() {
  if (nameInput.value === "") {
    clearBtn.disabled = true;
  } else {
    clearBtn.disabled = false;
  }
}
