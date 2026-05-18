(function () {
  const unlock = (message, targetUrl) => {
    const status = document.querySelector("[data-status]");
    if (status) status.textContent = message;
    if (targetUrl) {
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 900);
    }
  };

  const playSound = (id) => {
    const audio = document.getElementById(id);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  window.SAU = { unlock, playSound };

  // Login page
  const loginForm = document.querySelector("[data-login-form]");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const studentId = document.querySelector("#student-id")?.value.trim().toUpperCase();
      const accessCode = document.querySelector("#access-code")?.value.trim().toUpperCase();

      const ok =
        studentId === "SAU-1107" &&
        (accessCode === "VERITAS" || accessCode === "AURELIUS");

      if (ok) {
        playSound("access-sfx");
        unlock("Identity verified. Redirecting to student dashboard...", "portal.html");
      } else {
        playSound("error-sfx");
        const status = document.querySelector("[data-status]");
        if (status) status.textContent = "Access denied. Unrecognized credentials.";
      }
    });
  }

  // Generic code check boxes
  document.querySelectorAll("[data-code-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const answer = form.querySelector("input")?.value.trim().toUpperCase();
      const code = (form.dataset.answer || "").toUpperCase();
      const target = form.dataset.target || "";
      const successText = form.dataset.success || "Unlocked.";
      const failText = form.dataset.fail || "Incorrect code.";

      if (answer === code) {
        playSound("unlock-sfx");
        unlock(successText, target);
      } else {
        playSound("error-sfx");
        const status = form.parentElement.querySelector("[data-status]");
        if (status) status.textContent = failText;
      }
    });
  });
})();
