EduPlay - free static website (plain HTML, CSS, JavaScript)

FILES
  index.html        Home page
  game.html         Page used by every game (game.html?game=flag-master)
  css/style.css     All design
  js/games.js       YOUR SETTINGS + GAME LIST (edit this one)
  js/home.js        Search and category filters
  js/game.js        Game page, embed / new-tab logic
  games/            Optional: folders for games you host here
  favicon.svg, robots.txt

CONNECT A GAME: open js/games.js, find the game, put its web address between the quotes of playUrl.
ADD A GAME: copy one { ... } block in GAMES, change the id, title, text and playUrl.
