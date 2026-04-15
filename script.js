(function () {
  "use strict";

  // --- Date in header ---
  const dateEl = document.getElementById("today-date");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Theme toggle with persistence ---
  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) document.documentElement.setAttribute("data-theme", storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // --- Load news from a local JSON file, with a sensible fallback ---
  const grid = document.getElementById("news-grid");
  const sectionNote = document.querySelector(".section-head .muted");

  const fallbackStories = [
    {
      category: "Tech",
      title: "Les outils d'IA transforment les rédactions modernes",
      summary:
        "Les rédacteurs combinent jugement humain et automatisation pour publier plus vite sans sacrifier la rigueur.",
      author: "Rédaction",
      date: new Date().toISOString(),
    },
    {
      category: "Marchés",
      title: "Les indices mondiaux stables à l'approche des résultats",
      summary:
        "Les investisseurs scrutent les signaux des banques centrales avant la saison des résultats.",
      author: "Service Marchés",
      date: new Date().toISOString(),
    },
    {
      category: "Monde",
      title: "Les discussions climatiques se concentrent sur l'adaptation",
      summary:
        "Les délégations plaident pour un déploiement plus rapide des fonds vers les régions vulnérables.",
      author: "Service Monde",
      date: new Date().toISOString(),
    },
  ];

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (_) {
      return "";
    }
  }

  function render(stories) {
    if (!grid) return;
    grid.innerHTML = "";
    stories.forEach((story) => {
      const article = document.createElement("article");
      article.className = "card";
      article.innerHTML = `
        <div class="card-body">
          <span class="card-cat">${escapeHtml(story.category || "Actu")}</span>
          <h3 class="card-title">${escapeHtml(story.title || "")}</h3>
          <p class="card-summary">${escapeHtml(story.summary || "")}</p>
          <div class="card-meta">
            <span>${escapeHtml(story.author || "Rédaction")}</span>
            <time datetime="${escapeHtml(story.date || "")}">${formatDate(story.date)}</time>
          </div>
        </div>
      `;
      grid.appendChild(article);
    });
    if (sectionNote) {
      sectionNote.textContent =
        stories.length > 1
          ? `${stories.length} articles`
          : `${stories.length} article`;
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  fetch("news.json", { cache: "no-store" })
    .then((res) => {
      if (!res.ok) throw new Error("Échec du chargement de news.json");
      return res.json();
    })
    .then((data) => {
      const stories = Array.isArray(data) ? data : data.stories || [];
      render(stories.length ? stories : fallbackStories);
    })
    .catch(() => {
      render(fallbackStories);
      if (sectionNote) sectionNote.textContent = "Articles d'exemple affichés";
    });
})();
