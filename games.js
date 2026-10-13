/* ============================================================
   EDUPLAY SETTINGS + GAME LIST  (the only file you need to edit)
   ------------------------------------------------------------
   To make a game playable, set "playUrl" to the game's web address
   (e.g. "https://yourname.github.io/flag-master/") or to a folder
   in this site (e.g. "games/flag-master/index.html").
   embed: true  = show the game inside the page
   embed: false = open the game in a new tab
   Leave playUrl empty ("") and the game shows "Coming soon".
   ============================================================ */
const SITE = {
  name: "EduPlay",
  email: "",            // e.g. "hello@example.com" (leave empty to hide)
  social: {             // paste full links; empty ones are hidden
    YouTube: "", Instagram: "", TikTok: "", GitHub: ""
  }
};

const CATEGORIES = [
  { name: "Geography", icon: "🌍" },
  { name: "Space", icon: "🪐" },
  { name: "Science", icon: "🔬" },
  { name: "History", icon: "🏛️" },
  { name: "General Knowledge", icon: "💡" }
];

const GAMES = [
  {
    id: "flag-master", title: "Flag Master", category: "Geography", icon: "🚩",
    colors: ["#2563eb", "#7c3aed"], featured: true,
    short: "Guess countries from their flags.",
    description: "Look at a flag and work out which country it belongs to. Learn colours, symbols and patterns from around the world.",
    instructions: ["Press Play to start.", "Look at the flag shown on screen.", "Pick or type the country you think it belongs to.", "Keep going to learn more flags."],
    playUrl: "", embed: true
  },
  {
    id: "cosmic-explorer", title: "Cosmic Explorer", category: "Space", icon: "🪐",
    colors: ["#4f46e5", "#0ea5e9"], featured: true,
    short: "Explore planets and learn about the universe.",
    description: "Travel through the solar system, visit each planet and discover facts about space.",
    instructions: ["Press Play to launch.", "Choose a planet to visit.", "Read the facts you discover.", "Explore every planet."],
    playUrl: "", embed: true
  },
  {
    id: "guess-the-country", title: "Guess the Country", category: "Geography", icon: "🧭",
    colors: ["#9333ea", "#2563eb"], featured: true,
    short: "Discover countries using clues.",
    description: "Read clues about a mystery country and guess it. Fewer clues means a better result.",
    instructions: ["Press Play to begin.", "Read the first clue.", "Guess the country, or reveal another clue.", "Learn something new each round."],
    playUrl: "", embed: true
  }
];

/* ---------- shared helpers (no need to edit below) ---------- */
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const isPlayable = g => !!g.playUrl;

function thumb(g) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${g.colors[0]}"/><stop offset="1" stop-color="${g.colors[1]}"/></linearGradient></defs><rect width="640" height="360" fill="url(#a)"/><circle cx="540" cy="60" r="110" fill="#fff" opacity=".08"/><circle cx="90" cy="320" r="130" fill="#fff" opacity=".07"/><text x="320" y="225" font-size="150" text-anchor="middle">${g.icon}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function gameCard(g) {
  const ready = isPlayable(g);
  return `<article class="card">
    <a class="card-img" href="game.html?game=${g.id}" tabindex="-1" aria-hidden="true"><img src="${thumb(g)}" alt="" width="640" height="360" loading="lazy"></a>
    <div class="card-body">
      <span class="tag">${esc(g.category)}</span>
      <h3>${esc(g.title)}</h3>
      <p>${esc(g.short)}</p>
      <div class="card-foot">
        <a class="btn ${ready ? "btn-primary" : "btn-ghost"}" href="game.html?game=${g.id}" aria-label="${ready ? "Play" : "View"} ${esc(g.title)}">${ready ? "Play" : "Coming soon"}</a>
      </div>
    </div></article>`;
}

/* shared: mobile menu, footer, social links */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menu-btn"), nav = document.getElementById("nav");
  if (btn) {
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
    nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", false); } });
  }
  const soc = document.getElementById("social");
  if (soc) {
    const links = Object.entries(SITE.social).filter(([, u]) => u);
    soc.innerHTML = links.map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(n)}</a>`).join("");
  }
  const c = document.getElementById("contact-line");
  if (c) c.innerHTML = SITE.email
    ? `Questions or ideas? Email <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>.`
    : `Contact details will appear here once the site owner adds them.`;
  const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
});
