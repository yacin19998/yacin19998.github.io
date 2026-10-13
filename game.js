document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("game-root");
  const id = new URLSearchParams(location.search).get("game");
  const g = GAMES.find(x => x.id === id);

  if (!g) {
    document.title = "Game not found | EduPlay";
    main.innerHTML = `<div class="container narrow"><h1>Game not found</h1><p>We couldn't find that game. It may have been moved or the link may be wrong.</p><a class="btn btn-primary" href="index.html#games">Browse all games</a></div>`;
    return;
  }
  document.title = `${g.title} – Free Educational Game | EduPlay`;
  const set = (sel, v) => { const m = document.querySelector(sel); if (m) m.setAttribute("content", v); };
  set('meta[name="description"]', `${g.short} ${g.description}`);
  set('meta[property="og:title"]', `${g.title} | EduPlay`);
  set('meta[property="og:description"]', g.short);
  set('meta[name="twitter:title"]', `${g.title} | EduPlay`);
  set('meta[name="twitter:description"]', g.short);

  const ready = isPlayable(g);
  main.innerHTML = `
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a> / <a href="index.html#games">Games</a> / <span>${esc(g.title)}</span></nav>
    <div class="game-layout">
      <div>
        <div class="stage" id="stage">
          <img src="${thumb(g)}" alt="Preview image for ${esc(g.title)}" width="640" height="360">
        </div>
        <div class="play-row">
          ${ready
            ? `<button class="btn btn-primary btn-lg" id="play" type="button">▶ Play ${esc(g.title)}</button>`
            : `<button class="btn btn-ghost btn-lg" type="button" disabled>Coming soon</button>`}
          ${ready ? `<a class="btn btn-ghost" href="${esc(g.playUrl)}" target="_blank" rel="noopener noreferrer">Open in new tab</a>` : ""}
          <button class="btn btn-ghost" id="fs" type="button" hidden>Full screen</button>
        </div>
        ${ready ? "" : `<p class="note">This game isn't connected yet, so there's nothing to play right now. Check back soon.</p>`}
      </div>
      <aside class="panel">
        <span class="tag">${esc(g.category)}</span>
        <h1>${esc(g.title)}</h1>
        <p>${esc(g.description)}</p>
        <h2>How to play</h2>
        <ol>${g.instructions.map(i => `<li>${esc(i)}</li>`).join("")}</ol>
      </aside>
    </div>
  </div>`;

  const play = document.getElementById("play");
  if (!play) return;
  play.addEventListener("click", () => {
    if (!g.embed) { window.open(g.playUrl, "_blank", "noopener"); return; }
    const stage = document.getElementById("stage");
    stage.innerHTML = `<iframe src="${esc(g.playUrl)}" title="${esc(g.title)}" allow="fullscreen; autoplay" allowfullscreen loading="lazy"></iframe>
      <p class="note embed-note">Game not loading? <a href="${esc(g.playUrl)}" target="_blank" rel="noopener noreferrer">Open it in a new tab</a>.</p>`;
    play.textContent = "Playing…"; play.disabled = true;
    const fs = document.getElementById("fs"); fs.hidden = false;
    fs.onclick = () => stage.querySelector("iframe").requestFullscreen?.();
  });
});
