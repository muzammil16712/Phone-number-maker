
let mode = "manual";

function setMode(selectedMode) {
  mode = selectedMode;
  document.getElementById("start").style.display = (mode === "manual") ? "block" : "none";
}

function generateNumbers() {
  const network = document.getElementById("network").value.trim();
  const start = document.getElementById("start").value.trim();
  const quantity = parseInt(document.getElementById("quantity").value);
  let output = "";
  let used = JSON.parse(localStorage.getItem("usedNumbers") || "[]");

  if (!network || !quantity || (mode === "manual" && !start)) {
    alert("Please fill in all fields.");
    return;
  }

  let generated = [];
  while (generated.length < quantity) {
    let number = "";

    if (mode === "manual") {
      number = network + (parseInt(start) + generated.length).toString().padStart(7, "0");
    } else {
      let randomNum = Math.floor(1000000 + Math.random() * 8999999);
      number = network + randomNum;
    }

    if (!used.includes(number)) {
      generated.push(number);
      used.push(number);
    }
  }

  localStorage.setItem("usedNumbers", JSON.stringify(used));
  output = generated.join("\n");
  document.getElementById("output").value = output;
  document.getElementById("thankYou").classList.add("hidden");
  document.getElementById("rate").classList.add("hidden");
}

function copyNumbers() {
  const textarea = document.getElementById("output");
  textarea.select();
  document.execCommand("copy");
  document.getElementById("thankYou").classList.remove("hidden");
  document.getElementById("rate").classList.remove("hidden");
}
