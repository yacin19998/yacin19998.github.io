document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid"), feat = document.getElementById("featured-grid"),
        q = document.getElementById("search"), cats = document.getElementById("cats"),
        status = document.getElementById("result-status");
  let cat = "All";

  feat.innerHTML = GAMES.filter(g => g.featured).map(gameCard).join("");

  cats.innerHTML = [{ name: "All", icon: "✨" }, ...CATEGORIES].map(c =>
    `<button type="button" class="chip" data-cat="${esc(c.name)}" aria-pressed="${c.name === "All"}"><span aria-hidden="true">${c.icon}</span> ${esc(c.name)}</button>`).join("");

  function render() {
    const t = q.value.trim().toLowerCase();
    const list = GAMES.filter(g => (cat === "All" || g.category === cat) &&
      (!t || g.title.toLowerCase().includes(t)));
    grid.innerHTML = list.length ? list.map(gameCard).join("") :
      `<p class="empty">No games match${t ? ` “${esc(q.value.trim())}”` : ""}${cat !== "All" ? ` in ${esc(cat)}` : ""}. Try another name or category — more games are on the way.</p>`;
    status.textContent = `${list.length} game${list.length === 1 ? "" : "s"} shown`;
  }
  cats.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    cat = b.dataset.cat;
    cats.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
    render();
  });
  q.addEventListener("input", render);
  document.getElementById("search-form").addEventListener("submit", e => e.preventDefault());
  render();
});
