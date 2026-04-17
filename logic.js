const input = document.getElementById("input");
const qrContainer = document.getElementById("qr");
const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyBtn");
const themeToggle = document.getElementById("themeToggle");

/* Generate QR */
function generateQR(text) {
  qrContainer.innerHTML = "";

  if (!text.trim()) {
    qrContainer.classList.add("hidden");
    return;
  }

  qrContainer.classList.remove("hidden");

  new QRCode(qrContainer, {
    text: text,
    width: 200,
    height: 200
  });
}

/* Input */
input.addEventListener("input", () => {
  generateQR(input.value);

  // Auto resize
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});

/* Download */
downloadBtn.addEventListener("click", () => {
  const img = qrContainer.querySelector("img");
  if (!img) return;

  const link = document.createElement("a");
  link.href = img.src;
  link.download = "qr.png";
  link.click();
});

/* Copy */
copyBtn.addEventListener("click", () => {
  if (!input.value.trim()) return;

  navigator.clipboard.writeText(input.value);
  copyBtn.textContent = "Copied!";
  setTimeout(() => copyBtn.textContent = "Copy", 1000);
});

/* Theme */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent =
    document.body.classList.contains("light") ? "🌙" : "☀️";
});