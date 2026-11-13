# ZERO DAY

ZERO DAY is a cybersecurity-themed 2D platform game for an Ethical Hacking class. Byte, a digital security agent, must stop the rogue AI NULL.

This repository currently contains the project architecture only. Movement, jumping, levels, enemies, and scoring are not built yet.

The full requirements are in [PRD.md](PRD.md).

## Requirements

- A modern browser (Chrome, Edge, or Firefox)
- Python 3, used only as a simple local web server
- An internet connection the first time you open the game, so the browser can download Pyodide

## Run the game locally

Opening `index.html` by double-clicking it will not work. The page has to load `python/game.py` over HTTP.

1. Open a terminal in this project folder.
2. Start a local server:

```powershell
python -m http.server 8000
```

If that command is not found, try:

```powershell
py -m http.server 8000
```

3. In your browser, open [http://localhost:8000](http://localhost:8000).
4. You should see the title **ZERO DAY** and a status message saying Python is running through Pyodide.
5. Stop the server with `Ctrl+C` when you are done.

## Project layout

```text
ZeroDay/
├── index.html        # Page structure and the canvas
├── css/style.css     # Dark neon page styling
├── js/main.js        # Loads Pyodide and talks to Python
├── python/game.py    # Python game logic (boot status only, for now)
├── assets/           # Future images and sounds
├── PRD.md            # Requirements (do not treat this as code)
└── README.md         # This file
```

## Publish to GitHub Pages

The site is static. GitHub Pages can host it with no build step.

1. Create a GitHub repository and push this project to the `main` branch.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set the source to **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder, then save.
5. After the site finishes deploying, open the Pages URL. It looks like `https://<username>.github.io/<repository>/`.

Keep `index.html` at the repository root so Pages can find it. Relative paths such as `css/style.css` and `python/game.py` work both on your computer and on GitHub Pages.
