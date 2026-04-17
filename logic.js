```javascript
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

/* Input Listener */
input.addEventListener("input", () => {
  generateQR(input.value);

  // Auto resize
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});

/* Download QR (FIXED for mobile) */
downloadBtn.addEventListener("click", () => {
  const canvas = qrContainer.querySelector("canvas");
  const img = qrContainer.querySelector("img");

  // Prefer canvas (best for mobile)
  if (canvas) {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "qr.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    });
  } 
  // Fallback if only img exists
  else if (img) {
    fetch(img.src)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "qr.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
      });
  }
});

/* Copy Text */
copyBtn.addEventListener("click", () => {
  if (!input.value.trim()) return;

  navigator.clipboard.writeText(input.value);

  copyBtn.textContent = "Copied!";
  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 1000);
});

/* Theme Toggle */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  themeToggle.textContent =
    document.body.classList.contains("light") ? "🌙" : "☀️";
});
```
