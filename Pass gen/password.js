const output = document.getElementById("passwordOutput");
const lengthSlider = document.getElementById("lengthSlider");
const lengthDisplay = document.getElementById("lengthDisplay");
const strengthBar = document.getElementById("strengthBar");

const opts = {
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  numbers: document.getElementById("numbers"),
  symbols: document.getElementById("symbols"),
};

const chars = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

function generatePassword() {
  let charPool = "";
  let length = parseInt(lengthSlider.value);
  let finalPassword = "";

  Object.keys(opts).forEach(key => {
    if (opts[key].checked) {
      charPool += chars[key];
    }
  });

  if (charPool === "") {
    output.value = "❌ Please select at least one option.";
    return;
  }

  for (let i = 0; i < length; i++) {
    finalPassword += charPool[Math.floor(Math.random() * charPool.length)];
  }

  output.value = finalPassword;
  updateStrength(finalPassword);
}

function updateStrength(password) {
  let score = 0;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  if (password.length >= 12) score += 1;

  const levels = ["bg-red-500", "bg-yellow-400", "bg-green-400", "bg-cyan-400", "bg-emerald-400"];
  strengthBar.className = `h-3 rounded-full ${levels[score - 1] || "bg-gray-400"}`;
}

function copyPassword() {
  const pass = output.value;
  if (!pass || pass.includes("❌")) return;
  navigator.clipboard.writeText(pass).then(() => {
    alert("📋 Password copied to clipboard!");
  });
}
