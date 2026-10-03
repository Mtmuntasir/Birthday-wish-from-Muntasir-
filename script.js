document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const sealBtn = document.getElementById("seal-btn");
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const cardContainer = document.getElementById("card-container");

  // --- 1. Envelope Open Animation ---
  sealBtn.addEventListener("click", () => {
    envelope.classList.add("open");

    // Envelope slide out & show card after animation
    setTimeout(() => {
      envelopeWrapper.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      envelopeWrapper.style.opacity = "0";
      envelopeWrapper.style.transform = "scale(0.8)";
      
      setTimeout(() => {
        envelopeWrapper.classList.add("hidden");
        cardContainer.classList.remove("hidden");
        initScratchCard(); // Initialize scratch effect
      }, 600);
    }, 1200);
  });

  // --- 2. Scratch Card Logic ---
  function initScratchCard() {
    const canvas = document.getElementById("scratch-canvas");
    const ctx = canvas.getContext("2d");

    // Fill canvas with gold/metallic color
    ctx.fillStyle = "#c5a059";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Overlay text on scratch layer
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px Poppins";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH HERE ✨", canvas.width / 2, canvas.height / 2 + 6);

    let isDrawing = false;

    function scratch(e) {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || e.touches[0].clientX) - rect.left;
      const y = (e.clientY || e.touches[0].clientY) - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();
    }

    // Mouse Events
    canvas.addEventListener("mousedown", (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("mouseup", () => { isDrawing = false; });

    // Touch Events for Mobile
    canvas.addEventListener("touchstart", (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener("touchmove", scratch);
    canvas.addEventListener("touchend", () => { isDrawing = false; });
  }
});
