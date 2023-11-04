const ipDisplay = document.getElementById("ip-display");
window.addEventListener("load", (e) => {
  getIP().then((res) => {
    ipDisplay.innerHTML = `Your Current IP Address is <span id="ip-address">${res.ip}</span>`;
    localStorage.setItem("ipAddress", res.ip);
  });
});

async function getIP() {
  const res = await fetch("https://api.ipify.org?format=json");
  const ip = await res.json();

  return ip;
}

const startButton = document.querySelector("#ip>button");

startButton.addEventListener("click", (e) => {
  window.location.href = "postOffice.html";
});
