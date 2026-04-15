(function () {
  "use strict";

  // --- Date in header ---
  const dateEl = document.getElementById("today-date");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString(undefined, {
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
      title: "AI tools reshape the modern newsroom",
      summary:
        "Editors are pairing human judgment with automation to surface stories faster without sacrificing accuracy.",
      author: "Newsroom Staff",
      date: new Date().toISOString(),
    },
    {
      category: "Markets",
      title: "Global indices steady as investors weigh rate outlook",
      summary:
        "Traders are watching central bank signals closely as earnings season gets underway.",
      author: "Markets Desk",
      date: new Date().toISOString(),
    },
    {
      category: "World",
      title: "Climate talks focus on adaptation funding",
      summary:
        "Delegates are pressing for faster deployment of resources to vulnerable regions.",
      author: "World Desk",
      date: new Date().toISOString(),
    },
  ];

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
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
          <span class="card-cat">${escapeHtml(story.category || "News")}</span>
          <h3 class="card-title">${escapeHtml(story.title || "")}</h3>
          <p class="card-summary">${escapeHtml(story.summary || "")}</p>
          <div class="card-meta">
            <span>${escapeHtml(story.author || "Staff")}</span>
            <time datetime="${escapeHtml(story.date || "")}">${formatDate(story.date)}</time>
          </div>
        </div>
      `;
      grid.appendChild(article);
    });
    if (sectionNote) sectionNote.textContent = `${stories.length} stories`;
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
      if (!res.ok) throw new Error("Failed to load news.json");
      return res.json();
    })
    .then((data) => {
      const stories = Array.isArray(data) ? data : data.stories || [];
      render(stories.length ? stories : fallbackStories);
    })
    .catch(() => {
      render(fallbackStories);
      if (sectionNote) sectionNote.textContent = "Showing sample stories";
    });
})();
