(function () {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if ((path === "" && href === "index.html") || href === path) {
      a.classList.add("active");
    }
  });

  const clock = document.querySelector(".clock");
  function tick() {
    if (!clock) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    clock.textContent = h + ":" + m + ":" + s;
  }
  setInterval(tick, 1000);
  tick();

  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
  }
  const btn = document.querySelector(".theme-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const current =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", current);
      localStorage.setItem("theme", current);
    });
  }

  const toggleCaps = document.getElementById("toggle-captions");
  if (toggleCaps) {
    toggleCaps.addEventListener("click", () => {
      document.querySelectorAll(".gallery figcaption").forEach((c) => {
        c.style.display = c.style.display === "block" ? "none" : "block";
      });
    });
  }

  const form = document.querySelector('form[data-validate="contact"]');
  if (form) {
    form.addEventListener("submit", (e) => {
      const email = form.querySelector('input[name="email"]');
      const msg = form.querySelector('textarea[name="message"]');
      let ok = true;
      if (!email.value.includes("@")) {
        ok = false;
        alert('Proszę podać poprawny adres e-mail (musi zawierać "@").');
      }
      if (msg.value.trim().length < 10) {
        ok = false;
        alert("Wiadomość jest za krótka (min 10 znaków).");
      }
      const topic = form.querySelector('select[name="topic"]');
      localStorage.setItem("lastEmail", email.value);
      localStorage.setItem("lastTopic", topic.value);
      if (!ok) {
        e.preventDefault();
      } else {
        alert("Dziękuję!");
      }
    });

    const lastEmail = localStorage.getItem("lastEmail");
    const lastTopic = localStorage.getItem("lastTopic");
    if (lastEmail) form.querySelector('input[name="email"]').value = lastEmail;
    if (lastTopic) form.querySelector('select[name="topic"]').value = lastTopic;
  }
})();
